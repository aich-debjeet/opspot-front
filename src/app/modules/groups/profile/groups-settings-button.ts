import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { GroupsService } from '../groups-service';
import { ReportCreatorComponent } from '../../report/creator/creator.component';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { Client } from '../../../services/api/client';
import { Session } from '../../../services/session';

@Component({
  selector: 'opspot-groups-settings-button',
  template: `
    <button class="icon-more-vertical f-15 focusNone" style="padding: 0;background: #fff; 
    border: 0 !important;" (click)="toggleMenu($event)" id="group-settings-menu">
    </button>
    <ul class="opspot-dropdown-menu" [hidden]="!showMenu" >

      <!-- owner functions -->
      <li class="mdl-menu__item" *ngIf="group['is:owner'] || group['is:admin'] " (click)="toggleEdit()" id="group-settings-edit">
          <ng-container *ngIf="!editing">Edit</ng-container>
          <ng-container *ngIf="editing">Save</ng-container>
      </li>

      <li class="mdl-menu__item" *ngIf="(group['is:owner'] || group['is:admin']) && group.videoChatDisabled" (click)="toggleVideoChat(true)" id="group-settings-enable-gathering">Enable Gathering</li>
      <li class="mdl-menu__item" *ngIf="(group['is:owner'] || group['is:admin']) && !group.videoChatDisabled" (click)="toggleVideoChat(false)" id="group-settings-disable-gathering">Disable Group
      Video Chat</li>

      <!-- <li class="mdl-menu__item" *ngIf="(group['is:owner'] || group['is:admin']) && group.moderated" (click)="toggleModeration(false)" id="group-settings-disable-moderation">Disable moderation</li>
      <li class="mdl-menu__item" *ngIf="(group['is:owner'] || group['is:admin']) && !group.moderated" (click)="toggleModeration(true)" id="group-settings-enable-moderation">Enable moderation</li> -->

      <li class="mdl-menu__item" *ngIf="(group['is:owner'] || group['is:admin']) && !group.membership" (click)="togglePublic(true)" id="group-settings-make-public">Make public</li>
      <li class="mdl-menu__item" *ngIf="(group['is:owner'] || group['is:admin']) && group.membership" (click)="togglePublic(false)" id="group-settings-make-closed">Make private</li>

      <!-- Member functions -->
      <li class="mdl-menu__item" [hidden]="group['is:muted']" (click)="mute()" i18n="@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__DISABLE_NOTIFICATIONS" id="group-settings-disable-notification">Disable Notifications</li>
      <li class="mdl-menu__item" [hidden]="!group['is:muted']" (click)="unmute()" i18n="@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__ENABLE_NOTIFICATIONS" id="group-settings-enable-notification">Enable Notifications</li>

      <!-- admin functions -->
      <li class="mdl-menu__item" *ngIf="session.isAdmin() && !group.mature" (click)="setExplicit(true)" i18n="@@M__ACTION__SET_EXPLICIT" id="group-admin-set-explicit">Set Explicit</li>
      <li class="mdl-menu__item" *ngIf="session.isAdmin() && group.mature" (click)="setExplicit(false)" i18n="@@M__ACTION__REMOVE_EXPLICIT" id="group-admin-remove-explicit">Remove Explicit</li>
      <li class="mdl-menu__item" *ngIf="!(group['is:owner'] || group['is:admin']) && !group['is:creator']" (click)="report(); showMenu = false" i18n="@@M__ACTION__REPORT" id="group-admin-report">Report</li>
      <li class="mdl-menu__item" *ngIf="group['is:creator']" [hidden]="group.deleted" (click)="deletePrompt()" i18n="@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__DELETE_GROUP" id="group-settings-delete-community">Delete Community</li>
    
      </ul>
    <div class="opspot-bg-overlay" (click)="toggleMenu($event)" [hidden]="!showMenu"></div>
    <m-modal [open]="(group['is:owner'] || group['is:admin']) && isGoingToBeDeleted" (closed)="isGoingToBeDeleted = false">
    <div class="delete-confirmation-wrapper">
      <div class="mdl-card__supporting-text">
        <p i18n="@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__DELETE_GROUP_CONFIRM" class="m-modal-confirm-body text-lg">Are you sure you want to delete {{ group.name | truncate: [50, '...']}}? This action cannot be undone.</p>
      </div>
      <div class="mdl-card__actions">
        <button (click)="delete()" class="btn btn-primary" id="group-confirm-button">
          <ng-container i18n="@@M__ACTION__CONFIRM">Confirm</ng-container>
        </button>
        <button (click)="cancelDelete()"  class="btn btn-outline-primary" id="group-cancel-button">
          <ng-container i18n="@@M__ACTION__CANCEL">Cancel</ng-container>
        </button>
      </div>
    </div>
    </m-modal>
    <m-modal [open]="featureModalOpen" (closed)="onFeatureModalClose($event)">
      <div class="m-button-feature-modal">
        <select [(ngModel)]="category">
          <option value="not-selected" i18n="@@M__COMMON__SELECT_A_CATEGORY">-- SELECT A CATEGORY --</option>
          <option *ngFor="let category of categories" [value]="category.id">{{category.label}}</option>
        </select>
        <button class="mdl-button mdl-button--colored" (click)="feature()" i18n="@@M__ACTION__FEATURE">Feature</button>
      </div>
    </m-modal>
   <style>
    .focusNone{
      outline:none;
    }
    .delete-confirmation-wrapper {
      padding: 16px 56px 16px 16px;
    }
    .text-lg {
      color: #263238;
      font-size: 15px;
      line-height: 24px;
      font-weight: 400;
    }
    .btn-outline-primary{
      margin-left: 8px;
    }
   </style>
  `
})

export class GroupsSettingsButton {

  group: any = {
    'is:muted': false,
    deleted: false
  };

  @Input('group') set _group(value: any) {
    if (!value) return;
    this.group = value;

    this.featured = value.featured_id || value.featured === true;
  }

  @Output() groupChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();

  editing: boolean = false;
  showMenu: boolean = false;

  isGoingToBeDeleted: boolean = false;

  categories: Array<any> = [];
  category: string = 'not-selected';

  featured: boolean = false;

  featureModalOpen: boolean = false;

  constructor(
    public service: GroupsService, 
    public client: Client,
    public session: Session, 
    public overlayService: OverlayModalService, 
    public router: Router) {
  }

  ngOnInit() {
    this.initCategories();
  }

  initCategories() {
    for (let category in window.Opspot.categories) {
      this.categories.push({
        id: category,
        label: window.Opspot.categories[category],
      });
    }
  }

  async mute() {
    this.group['is:muted'] = true;

    try {
      const isMuted: boolean = await this.service.muteNotifications(this.group)
      this.group['is:muted'] = isMuted;
    } catch (e) {
      this.group['is:muted'] = false;
    }

    this.showMenu = false;
  }

  async unmute() {
    this.group['is:muted'] = false;

    try {
      const isMuted: boolean = await this.service.unmuteNotifications(this.group);
      this.group['is:muted'] = isMuted;
    } catch (e) {
      this.group['is:muted'] = true;
    }

    this.showMenu = false;
  }

  openFeatureModal() {
    this.featureModalOpen = true;
  }

  async feature() {
    this.featured = true;
    this.group.featured = true;

    try {
      await this.client.put(`api/v1/admin/feature/${this.group.guid}/${this.category}`, {})
      this.featureModalOpen = false;
    } catch (e) {
      this.featured = false;
    }
  }

  async unfeature() {
    this.featured = false;
    this.group.featured = false;

    try {
      await this.client.delete(`api/v1/admin/feature/${this.group.guid}`);
    } catch (e) {
      this.featured = true;
    }
  }

  onFeatureModalClose(e) {
    this.featureModalOpen = false;
  }

  report() {
    this.overlayService.create(ReportCreatorComponent, this.group, {
      class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium',
    })
      .present();
  }

  deletePrompt() {
    this.isGoingToBeDeleted = true;
  }

  cancelDelete() {
    this.isGoingToBeDeleted = false;
  }

  setExplicit(value) {
    this.service.setExplicit(this.group.guid, value)
      .then(result => {
        if (result) {
          this.group.mature = value;
        }
      });
  }

  delete() {

    if (!this.isGoingToBeDeleted) {
      return;
    }

    this.group.deleted = true;

    this.service.deleteGroup(this.group)
      .then((deleted) => {
        this.group.deleted = deleted;

        if (deleted) {
          this.router.navigate(['/groups/members']);
        }
      });

    this.showMenu = false;
    this.isGoingToBeDeleted = false;
  }

  toggleMenu(e) {
    e.stopPropagation();
    if (this.showMenu) {
      this.showMenu = false;

      return;
    }
    this.showMenu = true;
    // TODO: [emi] Maybe refresh state?
  }

  toggleEdit() {
    this.router.navigate([`/groups/edit/${this.group.guid}`])
  }

  toggleVideoChat(enabled: boolean) {
    this.group.videoChatDisabled = enabled ? 0 : 1;
    this.client.post(`api/v1/groups/group/${this.group.guid}`, { videoChatDisabled: this.group.videoChatDisabled });
    this.groupChange.next(this.group);
  }

  toggleModeration(enabled: boolean) {
    this.group.moderated = enabled ? 1 : 0;
    this.client.post(`api/v1/groups/group/${this.group.guid}`, { moderated: this.group.moderated });
    this.groupChange.next(this.group);
  }

  togglePublic(enabled: boolean) {
    this.group.membership = enabled ? 2 : 0;
    this.client.post(`api/v1/groups/group/${this.group.guid}`, { membership: this.group.membership })
    this.groupChange.next(this.group);
  }

}

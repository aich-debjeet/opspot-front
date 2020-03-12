import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { OrganizationService } from '../organization-service';
import { ReportCreatorComponent } from '../../report/creator/creator.component';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { Client } from '../../../services/api/client';
import { Session } from '../../../services/session';
import { CommonEventsService } from '../../../services/common-events.service';

@Component({
  selector: 'opspot-organization-settings-button',
  template: `
    <button class="icon-more-vertical f-15 focusNone" id="organization-setting-button" style="padding: 0;background: #fff;
    border: 0 !important;" (click)="toggleMenu($event)">
    </button>

    <ul class="opspot-dropdown-menu" [hidden]="!showMenu" >
      <!-- owner functions -->
      <li class="mdl-menu__item" *ngIf="organization['is:owner']" (click)="toggleEdit()">
          <ng-container *ngIf="!editing">Edit</ng-container>
          <ng-container *ngIf="editing">Save</ng-container>
      </li>

      <!-- Member functions -->
      <li class="mdl-menu__item" [hidden]="organization['is:muted']" (click)="mute()" i18n="@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__DISABLE_NOTIFICATIONS" id="organization-setting-disable-notification">Disable Notifications</li>
      <li class="mdl-menu__item" [hidden]="!organization['is:muted']" (click)="unmute()" i18n="@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__ENABLE_NOTIFICATIONS" id="organization-setting-enable-notification">Enable Notifications</li>

      <!-- admin functions -->
      <li class="mdl-menu__item" *ngIf="session.isAdmin() && !organization.mature" (click)="setExplicit(true)" i18n="@@M__ACTION__SET_EXPLICIT" id="organization-setting-set-explicit">Set Explicit</li>
      <li class="mdl-menu__item" *ngIf="session.isAdmin() && organization.mature" (click)="setExplicit(false)" i18n="@@M__ACTION__REMOVE_EXPLICIT" id="organization-setting-remove-explicit">Remove Explicit</li>
      <li class="mdl-menu__item" *ngIf="!organization['is:owner'] && !organization['is:creator']" (click)="report(); showMenu = false" i18n="@@M__ACTION__REPORT" id="organization-setting-report">Report</li>
      <li class="mdl-menu__item" *ngIf="organization['is:creator']" [hidden]="organization.deleted" (click)="deletePrompt()" i18n="@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__DELETE_GROUP" id="organization-setting-delete-organizatopn">Delete Organization</li>
    </ul>
    <div class="opspot-bg-overlay" (click)="toggleMenu($event)" [hidden]="!showMenu"></div>

    <m-modal [open]="organization['is:owner'] && isGoingToBeDeleted" (closed)="isGoingToBeDeleted = false">
      <div class="delete-confirmation-wrapper">
        <div class="mdl-card__supporting-text" id="organization-setting-confirmation-window">
          <p class="m-modal-confirm-body text-lg">Are you sure you want to delete {{ organization.name }}? This action cannot be undone.</p>
        </div>
        <div class="mdl-card__actions">
          <button (click)="delete()" id="organization-setting-delete-action" class="btn btn-primary">
            <ng-container i18n="@@M__ACTION__CONFIRM">Confirm</ng-container>
          </button>
          <button (click)="cancelDelete()" id="organization-setting-cancel-action" class="btn btn-outline-primary">
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
        <button class="mdl-button mdl-button--colored" id="organization-setting-feature-button" (click)="feature()" i18n="@@M__ACTION__FEATURE">Feature</button>
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

export class OrganizationSettingButton {

  organization: any = {
    'is:muted': false,
    deleted: false
  };

  @Input('organization') set _organization(value: any) {
    if (!value) return;
    this.organization = value;
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
    public service: OrganizationService, 
    public client: Client, 
    public session: Session, 
    public overlayService: OverlayModalService, 
    public router: Router,
    public commService: CommonEventsService
  ) { }

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
    this.organization['is:muted'] = true;

    try {
      const isMuted: boolean = await this.service.muteNotifications(this.organization)
      this.organization['is:muted'] = isMuted;
    } catch (e) {
      this.organization['is:muted'] = false;
    }
    this.showMenu = false;
  }

  async unmute() {
    this.organization['is:muted'] = false;

    try {
      const isMuted: boolean = await this.service.unmuteNotifications(this.organization);
      this.organization['is:muted'] = isMuted;
    } catch (e) {
      this.organization['is:muted'] = true;
    }
    this.showMenu = false;
  }

  openFeatureModal() {
    this.featureModalOpen = true;
  }

  async feature() {
    this.featured = true;
    this.organization.featured = true;
    try {
      await this.client.put(`api/v1/admin/feature/${this.organization.guid}/${this.category}`, {})
      this.featureModalOpen = false;
    } catch (e) {
      this.featured = false;
    }
  }

  async unfeature() {
    this.featured = false;
    this.organization.featured = false;
    try {
      await this.client.delete(`api/v1/admin/feature/${this.organization.guid}`);
    } catch (e) {
      this.featured = true;
    }
  }

  onFeatureModalClose(e) {
    this.featureModalOpen = false;
  }

  report() {
    this.overlayService.create(ReportCreatorComponent, this.organization,{
      class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium'
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
    this.service.setExplicit(this.organization.guid, value)
      .then(result => {
        if (result) {
          this.organization.mature = value;
        }
      });
  }

  delete() {
    if (!this.isGoingToBeDeleted) {
      return;
    }

    this.organization.deleted = true;

    this.service.deleteGroup(this.organization)
      .then((deleted) => {
        this.organization.deleted = deleted;
        if (deleted) {
          // setTimeout(() => {
          //   this.navUpdateOrg();    
          // }, 2000);
          this.navUpdateOrg();    
          this.router.navigate(['/newsfeed/subscribed']);
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
    this.router.navigate([`/organization/edit/${this.organization.guid}`])
  }

  toggleVideoChat(enabled: boolean) {
    this.organization.videoChatDisabled = enabled ? 0 : 1;
    this.client.post(`api/v3/organizations/organization/${this.organization.guid}`, { videoChatDisabled: this.organization.videoChatDisabled });
    this.groupChange.next(this.organization);
  }

  toggleModeration(enabled: boolean) {
    this.organization.moderated = enabled ? 1 : 0;
    this.client.post(`api/v3/organizations/organization/${this.organization.guid}`, { moderated: this.organization.moderated });
    this.groupChange.next(this.organization);
  }

  togglePublic(enabled: boolean) {
    this.organization.membership = enabled ? 2 : 0;
    this.client.post(`api/v3/organizations/organization/${this.organization.guid}`, { membership: this.organization.membership })
    this.groupChange.next(this.organization);
  }

  navUpdateOrg() {
    this.commService.trigger({
      component: 'TopbarComponent',
      action: 'orgDeleted'
    });
   }

}

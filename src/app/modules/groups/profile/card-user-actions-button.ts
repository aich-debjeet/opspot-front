import { Component, EventEmitter } from '@angular/core';

import { GroupsService } from '../groups-service';

@Component({
  selector: 'opspot-groups-card-user-actions-button',
  inputs: ['group', 'user'],
  template: `
  <button class="icon-more-vertical btnDefault" id="card-user-action-menu" *ngIf="(group['is:owner'] || group['is:admin']) || (group['is:moderator'] && !(user['is:owner']||user['is:moderator']))" (click)="toggleMenu($event)">

  </button>

  <ul class="opspot-dropdown-menu" [hidden]="!showMenu">
    <li class="mdl-menu__item" id="card-user-action-remove-from-group"
      *ngIf="(group['is:owner'] || group['is:moderator'] || group['is:admin']) && !(user['is:owner']||user['is:moderator']) && user['is:member']"
      (click)="removePrompt()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_FROM_GROUP">
      Remove from Group
    </li>
    <li class="mdl-menu__item" id="card-user-action-re-invite-to-group"
      *ngIf="(group['is:owner'] || group['is:admin'] ||  group['is:moderator']) && !user['is:member'] && !wasReInvited"
      (click)="reInvite()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__REINVITE">
      Re-invite to Group
    </li>
    <li class="mdl-menu__item" *ngIf="(group['is:owner'] || group['is:admin'] || group['is:moderator']) && wasReInvited" id="card-user-action-invited">
      <span class="opspot-menu-info-item" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__INVITED">Invited</span>
    </li>
    <li class="mdl-menu__item" id="card-user-action-make-admin"
      *ngIf="(group['is:owner'] || group['is:admin']) && !(user['is:owner']||user['is:moderator'] || user['is:admin']) && user['is:member']"
      (click)="grantOwnership()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__MAKE_ADMIN">
      Make Admin
    </li>
    <li class="mdl-menu__item" id="card-user-action-remove-as-admin"
      *ngIf="(group['is:owner'] || group['is:admin']) && (user['is:owner'] ||user['is:admin'])&& user['is:member']"
      (click)="revokeOwnership()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_AS_ADMIN">
      Remove as Admin
    </li>
    <li class="mdl-menu__item" id="card-user-action-make-as-moderator"
      *ngIf="(group['is:owner'] || group['is:admin']) && !(user['is:owner']||user['is:moderator']) && user['is:member']"
      (click)="grantModerator()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__MAKE_MODERATOR">
      Make Moderator
    </li>
    <li class="mdl-menu__item" id="card-user-action-remove-as-moderator"
      *ngIf="(group['is:owner'] || group['is:admin']) && user['is:moderator'] && user['is:member']"
      (click)="revokeModerator()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_AS_MODERATOR">
      Remove as Moderator
    </li>
  </ul>
  <div class="opspot-bg-overlay" (click)="toggleMenu($event)" [hidden]="!showMenu"></div>

  <m-modal [open]="kickPrompt">
      <div class="delete-confirmation-wrapper">
      <div class="mdl-card__supporting-text">
        <p i18n="@@GROUPS__REMOVE_X_FROM_Y_CONFIRM" class="m-modal-confirm-body text-lg">Are you sure you want to remove {{ user.username }} from {{ group.name }}?</p>
        <p><input type="checkbox" #ban> <ng-container i18n="@@M__COMMON__BAN_PERMANENTLY">Ban permanently</ng-container></p>
      </div>
      <div class="opspot-modal-dialog-actions">
        <button (click)="kick(ban.checked)" id="card-user-action-confirm" class="btn btn-primary">
          <ng-container i18n="@@M__ACTION__CONFIRM">Confirm</ng-container>
        </button>
        <button (click)="cancelRemove()" id="card-user-action-cancel" class="btn btn-outline-primary">
          <ng-container i18n="@@M__ACTION__CANCEL">Cancel</ng-container>
        </button>
      </div>
      </div>
  </m-modal>

  <style>
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

export class GroupsCardUserActionsButton {

  group: any = {
  };
  user: any = {
    'is:member': false,
    'is:moderator': false,
    'is:owner': false,
    'is:creator': false,
    'is:banned': false
  };

  kickPrompt: boolean = false;
  kickBan: boolean = false;

  wasReInvited: boolean = false;

  showMenu: boolean = false;

  constructor(public service: GroupsService) {
  }

  toggleMenu(e) {
    e.stopPropagation();
    if (this.showMenu) {
      // alert();

      this.showMenu = false;

      return;
    }
    this.showMenu = true;
    // TODO: [emi] Maybe refresh state?
  }

  removePrompt() {
    this.showMenu = false;

    this.kickPrompt = true;
    this.kickBan = false;
  }

  cancelRemove() {
    this.kickPrompt = false;
  }

  kick(ban: boolean = false) {
    let action;

    this.kickPrompt = false;

    if (ban) {
      action = this.service.ban(this.group, this.user.guid);
    } else {
      action = this.service.kick(this.group, this.user.guid);
    }

    action.then((done: boolean) => {
      this.user['is:member'] = !done;
      this.user['is:banned'] = done && ban;

      this.kickPrompt = !done;
      this.changeCounter('members:count', -1);
    });

    this.showMenu = false;
  }

  reInvite() {
    this.service.invite(this.group, this.user.username)
      .then(() => {
        this.wasReInvited = true;
      })
      .catch(e => {
        this.wasReInvited = false;
      });

    this.showMenu = false;
  }

  grantOwnership() {
    // this.user['is:owner'] = true;
    this.user['is:admin'] = true;

    this.service.grantOwnership({ guid: this.group.guid }, this.user.guid)
      .then((data: boolean) => {
        // this.user['is:owner'] = data;
        this.user['is:admin'] = data;
      });

    this.showMenu = false;
  }

  revokeOwnership() {
    // this.user['is:owner'] = false;
    this.user['is:admin'] = false;

    this.service.revokeOwnership({ guid: this.group.guid }, this.user.guid)
      .then((data: boolean) => {
        // this.user['is:owner'] = data;
        this.user['is:admin'] = data;
      });

    this.showMenu = false;
  }

  /**
   * Grant moderation
   */
  grantModerator() {
    this.user['is:moderator'] = true;

    this.service.grantModerator({ guid: this.group.guid }, this.user.guid)
      .then((isModerator: boolean) => {
        this.user['is:moderator'] = isModerator;
      });

    this.showMenu = false;
  }

  /**
   * Revoke moderation
   */
  revokeModerator() {
    this.user['is:moderator'] = false;

    this.service.revokeModerator({ guid: this.group.guid }, this.user.guid)
      .then((isModerator: boolean) => {
        this.user['is:moderator'] = isModerator;
      });

    this.showMenu = false;
  }

  private changeCounter(counter: string, val = 0) {
    if (typeof this.group[counter] !== 'undefined') {
      this.group[counter] = parseInt(this.group[counter], 10) + val;
    }
  }

}

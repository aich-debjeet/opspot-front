import { Component, EventEmitter } from '@angular/core';

import { GroupsService } from '../../../modules/groups/groups-service';

@Component({
  selector: 'opspot-organization-card-user-actions-button',
  inputs: ['organization', 'user'],
  template: `
  <button class="icon-more-vertical btnDefault" *ngIf="organization['is:owner'] || (organization['is:moderator'] && !(user['is:owner']||user['is:moderator']))" (click)="toggleMenu($event)">

  </button>

  <ul class="opspot-dropdown-menu" [hidden]="!showMenu">
    <li class="mdl-menu__item"
      *ngIf="(organization['is:owner'] || organization['is:moderator']) && !(user['is:owner']||user['is:moderator']) && user['is:member']"
      (click)="removePrompt()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_FROM_GROUP">
      Remove from Group
    </li>
    <li class="mdl-menu__item"
      *ngIf="(organization['is:owner'] || organization['is:moderator']) && !user['is:member'] && !wasReInvited"
      (click)="reInvite()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__REINVITE">
      Re-invite to Group
    </li>
    <li class="mdl-menu__item" *ngIf="(organization['is:owner'] || organization['is:moderator']) && wasReInvited">
      <span class="opspot-menu-info-item" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__INVITED">Invited</span>
    </li>
    <li class="mdl-menu__item"
      *ngIf="organization['is:owner'] && !(user['is:owner']||user['is:moderator']) && user['is:member']"
      (click)="grantOwnership()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__MAKE_ADMIN">
      Make Admin
    </li>
    <li class="mdl-menu__item"
      *ngIf="organization['is:owner'] && user['is:owner'] && user['is:member']"
      (click)="revokeOwnership()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_AS_ADMIN">
      Remove as Admin
    </li>
    <li class="mdl-menu__item"
      *ngIf="organization['is:owner'] && !(user['is:owner']||user['is:moderator']) && user['is:member']"
      (click)="grantModerator()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__MAKE_MODERATOR">
      Make Moderator
    </li>
    <li class="mdl-menu__item"
      *ngIf="organization['is:owner'] && user['is:moderator'] && user['is:member']"
      (click)="revokeModerator()" i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_AS_MODERATOR">
      Remove as Moderator
    </li>
  </ul>
  <div class="opspot-bg-overlay" (click)="toggleMenu($event)" [hidden]="!showMenu"></div>

  <m-modal [open]="kickPrompt">
      <div class="mdl-card__supporting-text">
        <p i18n="@@GROUPS__REMOVE_X_FROM_Y_CONFIRM">Are you sure you want to remove {{ user.username }} from {{ organization.name }}?</p>
        <p><input type="checkbox" #ban> <ng-container i18n="@@M__COMMON__BAN_PERMANENTLY">Ban permanently</ng-container></p>
      </div>
      <div class="opspot-modal-dialog-actions">
        <button (click)="kick(ban.checked)" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
          <ng-container i18n="@@M__ACTION__CONFIRM">Confirm</ng-container>
        </button>
        <button (click)="cancelRemove()" class="mdl-button mdl-js-button mdl-button--colored">
          <ng-container i18n="@@M__ACTION__CANCEL">Cancel</ng-container>
        </button>
      </div>
  </m-modal>
  `
})

export class OrganizationCardUserActionsButton {

  organization: any = {
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
      action = this.service.ban(this.organization, this.user.guid);
    } else {
      action = this.service.kick(this.organization, this.user.guid);
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
    this.service.invite(this.organization, this.user.username)
      .then(() => {
        this.wasReInvited = true;
      })
      .catch(e => {
        this.wasReInvited = false;
      });

    this.showMenu = false;
  }

  grantOwnership() {
    this.user['is:owner'] = true;

    this.service.grantOwnership({ guid: this.organization.guid }, this.user.guid)
      .then((isOwner: boolean) => {
        this.user['is:owner'] = isOwner;
      });

    this.showMenu = false;
  }

  revokeOwnership() {
    this.user['is:owner'] = false;

    this.service.revokeOwnership({ guid: this.organization.guid }, this.user.guid)
      .then((isOwner: boolean) => {
        this.user['is:owner'] = isOwner;
      });

    this.showMenu = false;
  }

  /**
   * Grant moderation
   */
  grantModerator() {
    this.user['is:moderator'] = true;

    this.service.grantModerator({ guid: this.organization.guid }, this.user.guid)
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

    this.service.revokeModerator({ guid: this.organization.guid }, this.user.guid)
      .then((isModerator: boolean) => {
        this.user['is:moderator'] = isModerator;
      });

    this.showMenu = false;
  }

  private changeCounter(counter: string, val = 0) {
    if (typeof this.organization[counter] !== 'undefined') {
      this.organization[counter] = parseInt(this.organization[counter], 10) + val;
    }
  }

}

import { Component, EventEmitter } from '@angular/core';

import { Client } from '../../../../services/api';
import { Session } from '../../../../services/session';
import { OverlayModalService } from '../../../../services/ux/overlay-modal';
import { BanModalComponent } from '../../../ban/modal/modal.component';
import { ReportCreatorComponent } from '../../../report/creator/creator.component';
import { Router } from '@angular/router';
import { ProfileReportComponent } from '../../../report/profile-report/profile-report.component';


@Component({
  selector: 'opspot-button-user-dropdown',
  inputs: ['user'],
  outputs: ['userChanged'],
  template: `

   <a class="o-prof-option"><i class="icon-more-vertical"  
  (click)="toggleMenu($event)"></i></a> 
    <ul class="opspot-dropdown-menu" [hidden]="!showMenu" >
      <li class="mdl-menu__item" [hidden]="user.blocked" (click)="openModal()" i18n="@@OPSPOT__BUTTONS__USER_DROPDOWN__BLOCK">Block</li>
      <li class="mdl-menu__item" [hidden]="!user.blocked" (click)="unBlock()" i18n="@@OPSPOT__BUTTONS__USER_DROPDOWN__UNBLOCK">Un-Block</li>
      <li class="mdl-menu__item" [hidden]="!user.subscribed" (click)="unSubscribe()" i18n="@@OPSPOT__BUTTONS__USER_DROPDOWN__UNSUBSCRIBE">Unsubscribe</li>
      <li class="mdl-menu__item"
        *ngIf="session.isAdmin()"
        [hidden]="user.banned === 'yes'"
        (click)="banToggle = true; showMenu = false"
        i18n="@@OPSPOT__BUTTONS__USER_DROPDOWN__BAN_GLOBALLY"
        >
        Ban globally
      </li>
      <li class="mdl-menu__item" *ngIf="session.isAdmin()" [hidden]="user.banned !== 'yes'" (click)="unBan()" i18n="@@OPSPOT__BUTTONS__USER_DROPDOWN__UNBAN_GLOBALLY">Un-ban globally</li>
      <li class="mdl-menu__item"
        *ngIf="session.isAdmin()"
        (click)="viewLedger()"
        i18n="@@OPSPOT_BUTTON__USER_DROPDOWN__VIEW_LEDGER"
      >
        View Ledger
      </li>
      <li class="mdl-menu__item"
        *ngIf="session.isAdmin()"
        (click)="viewWithdrawals()"
        i18n="@@OPSPOT_BUTTON__USER_DROPDOWN__VIEW_WITHDRAWALS"
      >
        View Withdrawals
      </li>
      <li class="mdl-menu__item"
        *ngIf="session.isAdmin()"
        (click)="viewEmail()"
        i18n="@@OPSPOT_BUTTON__USER_DROPDOWN__VIEW_EMAIL_ADDR"
      >
        E-mail Address
      </li>
      <li class="mdl-menu__item"
        (click)="report(); showMenu = false"
        i18n="@@M__ACTION__REPORT"
      >
        Report
      </li>
      <li class="mdl-menu__item"
        *ngIf="session.isAdmin()"
        [hidden]="user.is_mature"
        (click)="setExplicit(true); showMenu = false"
        i18n="@@M__ACTION__MARK_EXPLICIT"
      >
        Set as restricted
      </li>
      <li class="mdl-menu__item"
        *ngIf="session.isAdmin()"
        [hidden]="!user.is_mature"
        (click)="setExplicit(false); showMenu = false"
        i18n="@@M__ACTION__REMOVE_EXPLICIT"
      >
        Remove restricted
      </li>
      <li class="mdl-menu__item"
        *ngIf="session.isAdmin()"
        (click)="reindex(); showMenu = false"
        i18n="@@M__ACTION__REINDEX"
      >
        Reindex
      </li>
      <ng-container *ngIf="session.isAdmin()">
        <li class="mdl-menu__item" [hidden]="user.rating === 1" (click)="setRating(1)" i18n="@@M__ACTION__MARK_AS_SAFE">Mark as Safe</li>
        <li class="mdl-menu__item" [hidden]="user.rating === 2" (click)="setRating(2)" i18n="@@M__ACTION__MENU__MARK_AS_OPEN">Mark as Open</li>
      </ng-container>
    </ul>
    <div class="opspot-bg-overlay" (click)="toggleMenu($event)" [hidden]="!showMenu"></div>

    <m-modal-confirm *ngIf="banToggle"
      [open]="true"
      [closeAfterAction]="true"
      (closed)="banToggle = false"
      (actioned)="ban()"
      yesButton="Ban user"
      i18n-yesButton="@@M__ACTION__BAN_USER"
    >
      <p confirm-message i18n="@@OPSPOT__BUTTONS__USER_DROPDOWN__BAN_USER_CONFIRM_MESSAGE">
          Are you sure you want to ban this user?<br><br>
          This will close all open sessions and lock him/her out from Opspot.
      </p>
      <p confirm-success-message i18n="@@OPSPOT__BUTTONS__USER_DROPDOWN__BAN_USER_SUCCESS_MESSAGE">
          User has been banned.
      </p>
    </m-modal-confirm>
    <m-modal-confirm *ngIf="banMonetizationToggle"
      [open]="true"
      [closeAfterAction]="true"
      (closed)="banMonetizationToggle = false"
      (actioned)="banMonetization()"
      yesButton="Ban user"
      i18n-yesButton="@@M__ACTION__BAN_USER"
    >
      <p confirm-message i18n="@@OPSPOT__BUTTONS__USER_DROPDOWN__BAN_MONETIZATION_CONFIRM_MESSAGE">
          Are you sure you want to ban this user from monetization?<br><br>
          This will close all open sessions and decline pending payments.<br>
          There's no UNDO. This will NOT ban the user from Opspot.
      </p>
      <p confirm-success-message i18n="@@OPSPOT__BUTTONS__USER_DROPDOWN__BAN_MONETIZATION_SUCCESS_MESSAGE">
          User has been banned from monetization.
      </p>
    </m-modal-confirm>
    <m-modal *ngIf="viewEmailToggle" [open]="true" (closed)="viewEmailToggle = false">
      <div class="mdl-card__supporting-text" style="padding: 64px; font-size: 20px; text-align: center;">
        @{{user.username}}'s email:
        <a *ngIf="user.email" [href]="'mailto:' + user.email" style="text-decoration: none;">{{user.email}}</a>
        <ng-container *ngIf="!user.email">...</ng-container>
      </div>
    </m-modal>

    <m-modal *ngIf="openBlockModal" [open]="true" (closed)="openBlockModal = false">
    <div class="o-block">
    <div class="o-block__head">
        <h4>Block {{user.name}}</h4>
       <!-- <a class="o-block-close hidden-under-tablet"><i class="icon-x"></i></a> -->
    </div><!-- block head end -->
    <div class="o-block__content">
        <p class="caption-regular">
            If you block {{user.name}}, {{user.name}} will no longer be able to see your posts, tag you, invite you to communities or network with you. 
        </p>
    </div>
    <div class="o-block__action">
        <button type="button" class="btn btn-outline-primary btn--block hidden-above-tablet">Cancel</button>
        <button type="button" class="btn btn-primary btn--block" (click)="block()">Block</button>
    </div>
    </div>
    </m-modal>


  `,
  styleUrls:  ['./user-dropdown.scss']
})

export class UserDropdownButton {

  user: any = {
    blocked: false
  };
  userChanged: EventEmitter<any> = new EventEmitter;
  showMenu: boolean = false;
  banToggle: boolean = false;
  banMonetizationToggle: boolean = false;
  viewEmailToggle: boolean = false;
  openBlockModal = false;
  openReportModal = false;

  

  constructor(
    public session: Session,
    public client: Client,
    public overlayService: OverlayModalService,
    public router: Router
  ) {
  }

  /**
   * Reindex the user
   */
  reindex() {
    this.client.post('api/v2/admin/reindex', {guid: this.user.guid});
  }

  block() {
    var self = this;
    this.user.blocked = true;
    this.client.put('api/v1/block/' + this.user.guid, {})
      .then((response: any) => {
        self.user.blocked = true;
      })
      .catch((e) => {
        self.user.blocked = false;
      });
    this.showMenu = false;
  }

  unBlock() {
    var self = this;
    this.user.blocked = false;
    this.client.delete('api/v1/block/' + this.user.guid, {})
      .then((response: any) => {
        self.user.blocked = false;
      })
      .catch((e) => {
        self.user.blocked = true;
      });
    this.showMenu = false;
  }

  unSubscribe() {
    this.user.subscribed = false;
    this.client.delete('api/v1/subscribe/' + this.user.guid, {})
      .then((response: any) => {
        this.user.subscribed = false;
      })
      .catch((e) => {
        this.user.subscribed = true;
      });
  }

  ban() {
    this.user.banned = 'yes';
    this.overlayService.create(BanModalComponent, this.user)
      .present();

    this.banToggle = false;
  }

  unBan() {
    this.user.banned = 'no';
    this.client.delete(`api/v1/admin/ban/${this.user.guid}`, {})
      .then(() => {
        this.user.banned = 'no';
      })
      .catch(e => {
        this.user.banned = 'yes';
      });

    this.showMenu = false;
  }

  banMonetization() {
    this.user.ban_monetization = 'yes';
    this.client.put(`api/v1/admin/monetization/ban/${this.user.guid}`, {})
      .then(() => {
        this.user.ban_monetization = 'yes';
      })
      .catch(e => {
        this.user.ban_monetization = 'no';
      });

    this.banMonetizationToggle = false;
  }

  unBanMonetization() {
    this.user.ban_monetization = 'no';
    this.client.delete(`api/v1/admin/monetization/ban/${this.user.guid}`, {})
      .then(() => {
        this.user.ban_monetization = 'no';
      })
      .catch(e => {
        this.user.ban_monetization = 'yes';
      });

    this.showMenu = false;
  }

  toggleMenu(e) {
    e.stopPropagation();
    if (this.showMenu) {
      this.showMenu = false;

      return;
    }
    this.showMenu = true;
    var self = this;
    this.client.get('api/v1/block/' + this.user.guid)
      .then((response: any) => {
        self.user.blocked = response.blocked;
      });

    if (this.session.isAdmin()) {
      this.client.get(`api/v1/admin/monetization/ban/${this.user.guid}`)
        .then((response: any) => {
          if (typeof response.banned !== 'undefined') {
            self.user.ban_monetization = response.banned ? 'yes' : 'no';
          }
        });
    }
  }

  report() {
    this.overlayService.create(ProfileReportComponent, this.user, {
      class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium',
    })
          .present();
  }

  async setSpam(value: boolean) {
    this.user['spam'] = value ? 1 : 0;

    try {
      if (value) {
        await this.client.put(`api/v1/admin/spam/${this.user.guid}`);
      } else {
        await this.client.delete(`api/v1/admin/spam/${this.user.guid}`);
      }
    } catch (e) {
      this.user['spam'] = !value ? 1 : 0;
    }
  }

  async setExplicit(value: boolean) {
    this.user.is_mature = value;
    try {
      await this.client.post(`api/v1/entities/explicit/${this.user.guid}`, { value: value ? '1': '0' });
    } catch (e) {
      this.user.is_mature = !value;
    }
  }

  async setRating(rating: number) {
    await this.client.post(`api/v1/admin/rating/${this.user.guid}/${rating}`, {});
    this.user.rating = rating;
  }

  viewLedger() {
    this.router.navigate(['/wallet/tokens/transactions', { remote: this.user.username }])
  }

  viewWithdrawals() {
    this.router.navigate(['/admin/withdrawals', { user: this.user.username }])
  }

  async viewEmail() {
    this.viewEmailToggle = true;

    try {
      const { email } = await this.client.get(`api/v2/admin/user/${this.user.username}/email`) as any;
      this.user.email = email;
    } catch (e) {
      console.error('viewEmail', e);
    }
  }

  openModal(){
    this.openBlockModal = true;
    }

}


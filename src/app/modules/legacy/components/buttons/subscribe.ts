import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Session } from '../../../../services/session';
import { Client } from '../../../../services/api';
import { SignupModalService } from '../../../../modules/modals/signup/service';

@Component({
  selector: 'opspot-button-subscribe',
  template: `
    <button id="follow" class="btn btn-outline-primary" [ngClass]="{'btn-sm btn--prof':sideBar,' btn-xs':!sideBar}"
    *ngIf="!_user.subscribed" (click)="subscribe($event)">
      Follow
    </button>
    <button id="unfollow" class="btn btn-outline-primary" [ngClass]="{'btn-sm btn--prof':sideBar,'btn-xs':!sideBar}"  *ngIf="_user.subscribed" (click)="unSubscribe($event)">
      <span>
        <ng-container i18n="@@OPSPOT__BUTTONS__UNSUBSCRIBE__SUBSCRIBED_LABEL">Unfollow</ng-container>
      </span>
    </button>
  `
})
// <span>
      //   <ng-container i18n="@@M__ACTION__SUBSCRIBE">Subscribe</ng-container>
      // </span>

export class SubscribeButton {

  _user: any = {
    subscribed: false
  };
  _inprogress: boolean = false;
  _content: any;
  _listener: Function;
  showModal: boolean = false;
  @Output('subscribed') onSubscribed: EventEmitter<any> = new EventEmitter();
  @Input('sideBar')sideBar:boolean;
  constructor(public session: Session, public client: Client, public modal: SignupModalService) {
  }

  @Input('user')
  set user(value: any) {
    if (value !== null) {
      this._user = value;
      // console.log(this._user)
    }
  }

  subscribe(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.session.isLoggedIn()) {
      this.modal.setSubtitle('You need to have a channel in order to subscribe').open();
      return false;
    }

    this._user.subscribed = true;
    this.onSubscribed.next();
    
    this.client.post('api/v1/subscribe/' + this._user.guid, {})
      .then((response: any) => {
        if (response && response.error) {
          throw 'error';
        }

        this._user.subscribed = true;
      })
      .catch((e) => {
        this._user.subscribed = false;
        alert('You can\'t subscribe to this user.');
      });
  }

  unSubscribe(e) {
    e.preventDefault();
    e.stopPropagation();
    this._user.subscribed = false;
    this.client.delete('api/v1/subscribe/' + this._user.guid, {})
      .then((response: any) => {
        this._user.subscribed = false;
      })
      .catch((e) => {
        this._user.subscribed = true;
      });
  }

}

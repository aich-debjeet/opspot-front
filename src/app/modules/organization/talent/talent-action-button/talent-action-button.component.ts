import { Component, OnInit, EventEmitter } from '@angular/core';
import { Client } from '../../../../services/api';

@Component({
  selector: 'app-talent-action-button',
  inputs: ['_talent : talent', 'organization'],
  outputs: ['_remove: remove'],
  template: `
  <button class="icon-more-vertical btnDefault" id="card-user-action-button" *ngIf="organization['is:owner']" (click)="toggleMenu($event)">

  </button>

  <ul class="opspot-dropdown-menu" [hidden]="!showMenu">
    <li class="mdl-menu__item" id="card-user-action-remove-from-organization"
       i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_FROM_GROUP" (click)="remove()">
      Remove Talent
    </li>
  </ul>
  <div class="opspot-bg-overlay" (click)="toggleMenu($event)" [hidden]="!showMenu"></div>
  `
})
export class TalentactionbuttonComponent implements OnInit {

  showMenu = false;
  constructor(
    private client: Client
  ) { }

  talent: any;
  set _talent(value: any) {
    this.talent = value;
  }
  _remove: EventEmitter<any> = new EventEmitter();
  organization: any = {
  };

  ngOnInit() {
  }

  toggleMenu(e) {
    e.stopPropagation();
    if (this.showMenu) {
      this.showMenu = false;
      return;
    }
    this.showMenu = true;
  }

  remove() {
    this.client.delete('api/v3/organizations/organization/talent/' + this.talent.guid)
      .then((data: any) => {
        this.showMenu = false;
        this._remove.next(this.talent);
      })
      .catch((e) => {
      });
  }


}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talent-action-button',
  template: `
  <button class="icon-more-vertical btnDefault" id="card-user-action-button" (click)="toggleMenu($event)">

  </button>

  <ul class="opspot-dropdown-menu" [hidden]="!showMenu">
    <li class="mdl-menu__item" id="card-user-action-remove-from-organization"
       i18n="@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_FROM_GROUP">
      Remove Talent
    </li>
  </ul>
  <div class="opspot-bg-overlay" (click)="toggleMenu($event)" [hidden]="!showMenu"></div>

  <m-modal>
      <div class="delete-confirmation-wrapper">
      <div class="mdl-card__supporting-text">
        <p i18n="@@GROUPS__REMOVE_X_FROM_Y_CONFIRM" class="m-modal-confirm-body text-lg">Are you sure you want to remove talent?</p>
      </div>
      <div class="opspot-modal-dialog-actions">
        <button (click)="kick()" id="card-user-action-organization-confirm-button" class="btn btn-primary">
          <ng-container i18n="@@M__ACTION__CONFIRM">Confirm</ng-container>
        </button>
        <button (click)="cancelRemove()" id="card-user-action-organization-cancel-button" class="btn btn-outline-primary">
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
export class TalentactionbuttonComponent implements OnInit {

  showMenu = false;
  constructor() { }

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

}

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Session } from '../../../../services/session';
import { Client } from '../../../../services/api';
import { SignupModalService } from '../../../../modules/modals/signup/service';

// had forwardRef(() => RemindComposerModal)
@Component({
  selector: 'opspot-button-remind',
  inputs: ['_object: object', '_entityType: entityType'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="o-actions__link"  *ngIf = "!large" (click)="remind()" [ngClass]="{'selected': object.reminded }">
      <i class="icon-share-2"></i>
      <span class="opspot-counter" *ngIf="object.reminds > 0">{{object.reminds | number}}</span>
    </a>
    <div class="" *ngIf = "large" (click)="remind()" [ngClass]="{'selected': object.reminded }">
    <span class="icon-share-2"></span><span class="text-md f500">Share</span>
    </div>
    <m-modal-remind-composer *ngIf="remindOpen"
    [object]="object"
    [open]="true"
    [default]="message"
    (closed)="remindOpen = false"
    (post)="send($event)"
    ></m-modal-remind-composer>
  `
//   <a class="mdl-color-text--blue-grey-500" (click)="remind()" [ngClass]="{'selected': object.reminded }">
//   <i class="material-icons">repeat</i>
//   <span class="opspot-counter" *ngIf="object.reminds > 0">{{object.reminds | number}}</span>
// </a>

// <m-modal-remind-composer *ngIf="remindOpen"
// [object]="object"
// [open]="true"
// [default]="message"
// (closed)="remindOpen = false"
// (post)="send($event)"
// ></m-modal-remind-composer>
})

export class RemindButton {

  object;
  entityType;
  showModal: boolean = false;
  message: string = '';
  remindOpen: boolean = false;
  @Input() large: boolean = false;

  constructor(public session: Session, public client: Client, private modal: SignupModalService) {
  }

  set _object(value: any) {
    this.object = value;
  }

  set _entityType(value: any) {
    this.entityType = value;
  }

  remind() {
    var self = this;

    if (this.object.reminded)
      return false;

    if (!this.session.isLoggedIn()) {
      this.modal.open();
      return false;
    }

    this.remindOpen = true;
  }

  send($event) {
    if ($event.message) {
      this.message = $event.message;
    }

    this.object.reminded = true;
    this.object.reminds++;

    this.client.post('api/v2/newsfeed/remind/' + this.object.guid, {
      message: this.message
    })
      .catch(e => {
        this.object.reminded = false;
        this.object.reminds--;
      });
  }

}

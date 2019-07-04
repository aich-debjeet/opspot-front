import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Client } from '../../../../services/api';

@Component({
  selector: 'opspot-button-comment',
  inputs: ['_object: object'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="o-actions__link" >
      <i class=" icon-message-square"></i>
      <span class="o-action-count text-sm grey" *ngIf="object['comments:count'] > 0">
       <span>{{object['comments:count'] | number}}</span>
      </span>
    </a>
  `
//   <a class="mdl-color-text--blue-grey-500" [ngClass]="{'selected': object['comments:count'] > 0 }">
//   <i class="material-icons">chat_bubble</i>
//   <span class="opspot-counter" *ngIf="object['comments:count'] > 0">{{object['comments:count'] | number}}</span>
// </a>
})

export class CommentButton {

  object;

  constructor(public client : Client) {
  }

  set _object(value : any){
    this.object = value;
  }

}

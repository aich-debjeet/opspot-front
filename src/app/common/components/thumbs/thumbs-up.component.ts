import { ChangeDetectorRef, ChangeDetectionStrategy, Component, DoCheck, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Session } from '../../../services/session';
import { Client } from '../../../services/api';
import { WalletService } from '../../../services/wallet';
import { SignupModalService } from '../../../modules/modals/signup/service';


@Component({
  selector: 'opspot-button-thumbs-up',
  inputs: ['_object: object'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- TODO @gayatri: check if can reuse the markup -->
    <a *ngIf="!large" class="o-actions__link" (click)="thumb()" >
      <i class='spot-ico' [ngClass]="{'icon-heart-filled': has(),'icon-heart':!has() }"></i>
      <span class="o-action-count text-sm grey" *ngIf="object['thumbs:up:count'] > -1"><span>{{object['thumbs:up:count'] | number}}</span></span>
    </a>
    <div *ngIf="large" class="spot-ico-block" (click)="thumb()">
    <i class='spot-ico' [ngClass]="{'icon-heart-filled': has(),'icon-heart':!has() }">
    </i>
    <span class="text-md f500">Like</span> 
    </div>
  `,
  styles: [`
      a {
          cursor: pointer;
      }
      .icon-heart-filled{
        color:red;
      }
      .spot-ico{
        font-size:19px !important;
      }
      .spot-ico-block{
        display:flex;
        justify-content : center;
        align-items: center;
      }
  `],
})

export class ThumbsUpButton implements DoCheck, OnChanges {

  @Input() large: boolean = false;
  changesDetected: boolean = false;
  object = {
    'guid': null,
    'owner_guid': null,
    'thumbs:up:user_guids': []
  };
  showModal: boolean = false;

  @Output() liked: EventEmitter<any> = new EventEmitter();

  constructor(
    public session: Session,
    public client: Client,
    public wallet: WalletService,
    private modal: SignupModalService,
    private cd: ChangeDetectorRef,  
  ) {
  }

  set _object(value: any) {
    if (!value)
      return;
    this.object = value;
    if (!this.object['thumbs:up:user_guids'])
      this.object['thumbs:up:user_guids'] = [];
  }

  thumb() {
    if (!this.session.isLoggedIn()) {
      this.modal.setSubtitle('You need to have a channel to vote').open();
      this.showModal = true;
      return false;
    }

    this.client.put('api/v1/thumbs/' + this.object.guid + '/up', {});
    if (!this.has()) {
      //this.object['thumbs:up:user_guids'].push(this.session.getLoggedInUser().guid);
      this.object['thumbs:up:user_guids'] = [this.session.getLoggedInUser().guid];
      this.object['thumbs:up:count']++;
      this.liked.emit(this.object['thumbs:up:count']);
    } else {
      for (let key in this.object['thumbs:up:user_guids']) {
        if (this.object['thumbs:up:user_guids'][key] === this.session.getLoggedInUser().guid)
          delete this.object['thumbs:up:user_guids'][key];
      }
      this.object['thumbs:up:count']--;
      this.liked.emit(this.object['thumbs:up:count']);
    }
  }

  has() {
    for (var guid of this.object['thumbs:up:user_guids']) {
      if (guid === this.session.getLoggedInUser().guid)
        return true;
    }
    return false;
  }

  ngOnChanges(changes) {
  }

  ngDoCheck() {
    this.changesDetected = false;
    if (this.object['thumbs:up:count'] != this.object['thumbs:up:count:old']) {
        this.object['thumbs:up:count:old'] = this.object['thumbs:up:count'];
        this.changesDetected = true;
    }

    if (this.changesDetected) {
      this.cd.detectChanges();
    }
  }
}

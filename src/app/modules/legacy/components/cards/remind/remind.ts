import { Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Input } from '@angular/core';

import { Client } from '../../../../../services/api';
import { Session } from '../../../../../services/session';
import { AttachmentService } from '../../../../../services/attachment';

@Component({
  moduleId: module.id,
  selector: 'opspot-remind',
  inputs: ['object', '_events: events'],
  templateUrl: '../activity/activity.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Remind {

  opspot = window.Opspot;

  activity: any;
  @Input() boosted: boolean = false;
  hideTabs: boolean;
  routerLink1 = '';

  events: EventEmitter<any>;
  eventsSubscription: any;

  editing: boolean = false;
  commentsToggle: boolean = false;
  showBoostOptions: boolean = false;
  translateToggle: any;
  translateEvent: EventEmitter<any> = new EventEmitter();
  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  isTranslatable: boolean = false;
  menuOptions: any = [];
  canDelete: boolean = false;

  constructor(
    public session: Session,
    public client: Client,
    public attachment: AttachmentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.hideTabs = true;
  }

  set _events(value: any) {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }

    this.events = value;

    this.eventsSubscription = this.events.subscribe(({ action, args = [] }) => {
      switch (action) {
        case 'translate':
          this.translate.apply(this, args);
          break;
      }

      this.changeDetectorRef.markForCheck();
    });
  }

  set object(value: any) {
    this.activity = value;
    this.activity.boosted = this.boosted;

    if (
      this.activity.custom_type == 'batch'
      && this.activity.custom_data
      && this.activity.custom_data[0].src
    ) {
      this.activity.custom_data[0].src = this.activity.custom_data[0].src.replace(this.opspot.site_url, this.opspot.cdn_url);
    }
    if (this.activity.entity_type == 'event') {
      if (this.activity.end_time_date) {
        this.routerLink1 = '/event/view';
      } else {
        this.routerLink1 = '/showtimez'
      }
    }


  }

  getOwnerIconTime() {
    let session = this.session.getLoggedInUser();
    if (session && session.guid === this.activity.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.activity.ownerObj.icontime;
    }
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  toDate(timestamp) {
    return new Date(timestamp * 1000);
  }

  translate($event: any) {
    this.translateEvent.emit($event);
  }

  propagateTranslation(e?) {
    return;
  }

  save() { /* NOOP */ }

  openComments() { /* NOOP */ }

  showBoost() { /* NOOP */ }

  showWire() { /* NOOP */ }

  togglePin() { /* NOOP */ }

  menuOptionSelected(e) { /* NOOP */ }
}

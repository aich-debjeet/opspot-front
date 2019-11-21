import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Client } from '../../services/api';
import { Session } from '../../services/session';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayModalService } from '../../services/ux/overlay-modal';
import { ShowtimezFormComponent } from '../forms/showtimez-form/showtimez-form.component';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../services/translation';


@Component({
  selector: 'app-showtimez',
  templateUrl: './showtimez.component.html',
  styleUrls: ['./showtimez.component.scss']
})
export class ShowtimezComponent implements OnInit {
  guid: string;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef,
    public overlayModal: OverlayModalService,
    public translationService: TranslationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.guid = params.get('guid');
        this.load();
      }
    });
  }

  // activity: any;
  opspot = window.Opspot;

  boosted: boolean = false;
  commentsToggle: boolean = false;
  translateToggle: boolean = false;
  // translateEvent: EventEmitter<any> = new EventEmitter();
  showBoostOptions: boolean = false;
  private _showBoostMenuOptions: boolean = false;
  count;
  visible: boolean = false;
  inProgress: boolean = false;
  showTimez: any;


  _delete: EventEmitter<any> = new EventEmitter();
  @Input() focusedCommentGuid: string;
  scroll_listener;

  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  onViewed: EventEmitter<{ activity, visible }> = new EventEmitter<{ activity, visible }>();

  isTranslatable: boolean;
  canDelete: boolean = false;
  showRatingToggle: boolean = false;
  offset = '';
  translateEvent: EventEmitter<any> = new EventEmitter();

  private defaultMenuOptions: Array<string> = ['edit', 'translate', 'share', 'mute', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];
  menuOptions: Array<string> = ['edit', 'translate', 'follow', 'feature', 'delete', 'report', 'block', 'rating'];

  load() {
    if (this.inProgress)
      return false;
    this.inProgress = true;
    this.client.get('api/v1/newsfeed/single/' + this.guid)
      .then((data: any) => {
        if (data.activity) {
          this.showTimez = data.activity;
          this.count = this.showTimez['thumbs:up:count'];

          if (data.activity.owner_obj) {
            this.showTimez['ownerObj'] = data.activity.owner_obj;
          }
          this.inProgress = false;
        }
        this.isTranslatable = (
          this.translationService.isTranslatable(this.showTimez)
        );
        this.detectChanges();
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

  getOwnerIconTime() {
    let session = this.session.getLoggedInUser();
    if (session && session.guid === this.showTimez.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.showTimez.ownerObj.icontime;
    }
  }

  delete($event: any = {}) {
    this.client.delete(`api/v3/event/${this.showTimez.entity_guid}`)
      .then((response: any) => {
        this.router.navigate([`newsfeed/subscribed`]);
        // this._delete.next(this.showTimez);
      })
      .catch(e => {
        alert((e && e.message) || 'Server error');
      });
  }

  async togglePin() {
    this.showTimez.bookmark = !this.showTimez.bookmark;
    const url: string = `api/v3/bookmark/${this.showTimez.entity_guid}/image`;
    try {
      if (this.showTimez.bookmark) {
        await this.client.post(url);
      } else {
        await this.client.delete(url);
      }
    } catch (e) {
      this.showTimez.bookmark = !this.showTimez.bookmark;
    }
  }


  async wireSubmitted(wire?) {
    if (wire && this.showTimez.wire_totals) {
      this.showTimez.wire_totals.tokens =
        parseFloat(this.showTimez.wire_totals.tokens) + (wire.amount * Math.pow(10, 18));
      this.detectChanges();
    }
  }

  menuOptionSelected(option: string) {
    switch (option) {
      case 'edit':
        //this.editing = true;
        this.editOptions();
        break;
      case 'delete':
        this.delete();
        break;
      case 'set-explicit':
        // this.setExplicit(true);
        break;
      case 'remove-explicit':
        //this.setExplicit(false);
        break;
      case 'translate':
        this.translateToggle = true;
        break;
    }
  }


  editOptions() {
    if (this.showTimez) {
      this.overlayModal.create(ShowtimezFormComponent, this.showTimez, {
        class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
        // listen to the update callback
        onUpdate: (payload: any) => {
          // make update to local var
          this.updateShowTimez(payload);
        }
      }).present();
    }
  }


  updateShowTimez(data: any) {
    this.showTimez.blurb = data.description;
    this.showTimez.location = data.location;
    this.showTimez.title = data.title;
    this.showTimez.start_time_date = data.start_time_date;
    this.showTimez.attachment_guid = data.attachment_guid;
    if (data.attachment_guid.length > 0) {
      this.showTimez.custom_data[0].src = this.opspot.cdn_assets_url + 'fs/v1/thumbnail/' + data.attachment_guid[0]
    } else {
      this.showTimez.custom_data[0].src = this.opspot.cdn_assets_url + 'assets/logos/logo.svg'
    }
    // trigger component observe new changes
    this.detectChanges();
  }


  private viewed: boolean = false;

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  liked(count) {
    if (count != this.showTimez['thumbs:up:count:old']) {
      this.count = count;
    } else {
      this.count = this.showTimez['thumbs:up:count']
    }
  }

  propagateTranslation($event) {
    if (this.showTimez.remind_object && this.translationService.isTranslatable(this.showTimez.remind_object)) {
      this.childEventsEmitter.emit({
        action: 'translate',
        args: [$event]
      });
    }
  }


  // setExplicit(value: boolean) {
  //   let oldValue = this.activity.mature,
  //     oldMatureVisibility = this.activity.mature_visibility;

  //   this.activity.mature = value;
  //   this.activity.mature_visibility = void 0;

  //   if (this.activity.custom_data && this.activity.custom_data[0]) {
  //     this.activity.custom_data[0].mature = value;
  //   } else if (this.activity.custom_data) {
  //     this.activity.custom_data.mature = value;
  //   }

  //   this.client.post(`api/v1/entities/explicit/${this.activity.guid}`, { value: value ? '1' : '0' })
  //     .catch(e => {
  //       this.activity.mature = oldValue;
  //       this.activity.mature_visibility = oldMatureVisibility;

  //       if (this.activity.custom_data && this.activity.custom_data[0]) {
  //         this.activity.custom_data[0].mature = oldValue;
  //       } else if (this.activity.custom_data) {
  //         this.activity.custom_data.mature = oldValue;
  //       }
  //     });
  // }
}
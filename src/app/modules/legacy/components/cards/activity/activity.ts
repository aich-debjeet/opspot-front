import { Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, ElementRef, Input, ViewChild } from '@angular/core';
import { Client } from '../../../../../services/api';
import { Session } from '../../../../../services/session';
import { ScrollService } from '../../../../../services/ux/scroll';
import { AttachmentService } from '../../../../../services/attachment';
import { TranslationService } from '../../../../../services/translation';
import { OverlayModalService } from '../../../../../services/ux/overlay-modal';
import { BoostCreatorComponent } from '../../../../boost/creator/creator.component';
import { WireCreatorComponent } from '../../../../wire/creator/creator.component';
import { OpspotVideoComponent } from '../../../../media/components/video/video.component';
import { NewsfeedService } from '../../../../newsfeed/services/newsfeed.service';
import { OpportunityFormComponent } from '../../../../../modules/forms/opportunity-form/opportunity-form.component';
import { BlueStoreFormComponent } from '../../../../../modules/forms/blue-store-form/blue-store-form.component';
import { ShowtimezFormComponent } from '../../../../../modules/forms/showtimez-form/showtimez-form.component';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'opspot-activity',
  host: {

  },
  inputs: ['object', 'commentsToggle', 'focusedCommentGuid', 'visible', 'canDelete', 'showRatingToggle'],
  outputs: ['_delete: delete', 'commentsOpened', 'onViewed', '_deleteBookmark: deleteBookmark'],
  templateUrl: 'activity.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Activity {

  opspot = window.Opspot;
  activity: any;
  boosted: boolean = false;
  commentsToggle: boolean = false;
  shareToggle: boolean = false;
  deleteToggle: boolean = false;
  translateToggle: boolean = false;
  translateEvent: EventEmitter<any> = new EventEmitter();
  showBoostOptions: boolean = false;
  @Input() boost: boolean = false;
  @Input('boost-toggle')
  private _showBoostMenuOptions: boolean = false;

  @Input()
  set showBoostMenuOptions(value: boolean) {
    this._showBoostMenuOptions = value;
    if (!value) {
      this.menuOptions = this.defaultMenuOptions;
    }
    this.menuOptions = this.menuOptions.slice();
  }

  type: string;
  element: any;
  visible: boolean = false;
  remindOpen = false;
  remindMessage = '';

  editing: boolean = false;
  @Input() hideTabs: boolean;

  _delete: EventEmitter<any> = new EventEmitter();
  _deleteBookmark: EventEmitter<any> = new EventEmitter();
  commentsOpened: EventEmitter<any> = new EventEmitter();
  @Input() focusedCommentGuid: string;
  scroll_listener;
  oppGuid;
  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  onViewed: EventEmitter<{ activity, visible }> = new EventEmitter<{ activity, visible }>();

  isTranslatable: boolean;
  canDelete: boolean = false;
  showRatingToggle: boolean = false;
  routerLink1 = "";
  private defaultMenuOptions: Array<string> = ['edit', 'translate', 'mute', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];
  menuOptions: Array<string> = ['edit', 'translate', 'follow', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];

  @ViewChild('player') player: OpspotVideoComponent;

  reachoutMessage = '';
  postHashtagTitle = '';
  postType = '';

  constructor(
    public session: Session,
    public client: Client,
    public scroll: ScrollService,
    public newsfeedService: NewsfeedService,
    _element: ElementRef,
    public attachment: AttachmentService,
    public translationService: TranslationService,
    private overlayModal: OverlayModalService,
    private cd: ChangeDetectorRef,
    private router: Router) {
    this.element = _element.nativeElement;
    this.isVisible();
  }

  ngOnInit() {
  }

  set object(value: any) {
    if (!value)
      return;
    this.activity = value;

    // if (this.activity) {
    //   this.postType = getEntityType(this.activity);
    // }
    // user obj for reach out
    if (value['entity_type'] &&
      (value['entity_type'] == 'opportunity'
        || value['entity_type'] == 'event'
        || value['entity_type'] == 'item')
    ) {
      if (value['entity_type'] == 'opportunity') {
        this.reachoutMessage = 'Is there an opening? ';
        // this.postHashtagTitle = getPostTitle('opportunity');
        // this.loadComponent('opportunity');
      } else if (value['entity_type'] == 'event') {
        this.reachoutMessage = 'I am interested. ';
        // this.postHashtagTitle = getPostTitle('event');
        // this.createComponent('opportunity');
      } else if (value['entity_type'] == 'item') {
        this.reachoutMessage = 'Is this available? ';
        // this.postHashtagTitle = getPostTitle('item');
        // this.createComponent('opportunity');
      }
      this.reachoutMessage += value['perma_url'];
    }

//to display preview while sharing on fb
    this.activity.url = window.Opspot.site_url + 'media/' + value.guid;

    if (
      this.activity.custom_type == 'batch'
      && this.activity.custom_data
      && this.activity.custom_data[0].src
    ) {
      this.activity.custom_data[0].src = this.activity.custom_data[0].src.replace(this.opspot.site_url, this.opspot.cdn_url);
    }
    if (!this.activity.message) {
      this.activity.message = '';
    }
    if (!this.activity.title) {
      this.activity.title = '';
    }
    if (this.activity.entity_type === "event") {
      // this.showTimez = true;
      if (this.activity.end_time_date) {
        this.routerLink1 = "/event"
      } else {
        this.routerLink1 = "/showtimez"
      }
    }

    this.boosted = this.activity.boosted || this.activity.p2p_boosted;

    this.isTranslatable = (
      this.translationService.isTranslatable(this.activity) ||
      (this.activity.remind_object && this.translationService.isTranslatable(this.activity.remind_object))
    );
  }

  getOwnerIconTime() {
    let session = this.session.getLoggedInUser();
    if (session && session.guid === this.activity.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.activity.ownerObj.icontime;
    }
  }

  @Input() set boostToggle(toggle: boolean) {
    //if(toggle)
    //  this.showBoost();
    return;
  }

  save() {
    this.editing = false;
    this.activity.edited = true;
    this.client.post('api/v1/newsfeed/' + this.activity.guid, this.activity);
  }

  delete($event: any = {}) {
    if ($event.inProgress) {
      $event.inProgress.emit(true);
    }
    this.client.delete(`api/v1/newsfeed/${this.activity.guid}`)
      .then((response: any) => {
        if ($event.inProgress) {
          $event.inProgress.emit(false);
          $event.completed.emit(0);
        }
        this._delete.next(this.activity);
      })
      .catch(e => {
        if ($event.inProgress) {
          $event.inProgress.emit(false);
          $event.completed.emit(1);
        }
      });
  }

  openComments() {
    this.commentsToggle = !this.commentsToggle;
    this.commentsOpened.emit(this.commentsToggle);
  }

  async togglePin(activity: any) {
    this.activity.bookmark = !this.activity.bookmark;
    const url: string = `api/v3/bookmark/${this.activity.guid}/${activity.entity_type}`;
    try {
      if (this.activity.bookmark) {
        await this.client.post(url);
      } else {
        await this.client.delete(url);
        this._deleteBookmark.next(this.activity);
      }
    } catch (e) {
      this.activity.bookmark = !this.activity.bookmark;
    }
  }

  showBoost() {
    const boostModal = this.overlayModal.create(BoostCreatorComponent, this.activity, { class: 'modalChanger' });

    boostModal.onDidDismiss(() => {
      this.showBoostOptions = false;
    });

    boostModal.present();
  }

  showWire() {
    if (this.session.getLoggedInUser().guid !== this.activity.owner_guid) {
      this.overlayModal.create(WireCreatorComponent,
        this.activity.remind_object ? this.activity.remind_object : this.activity,
        {
          class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
          onComplete: wire => this.wireSubmitted(wire)
        }).present();
    }
  }

  async wireSubmitted(wire?) {
    if (wire && this.activity.wire_totals) {
      this.activity.wire_totals.tokens =
        parseFloat(this.activity.wire_totals.tokens) + (wire.amount * Math.pow(10, 18));

      this.detectChanges();
    }
  }

  menuOptionSelected(option: string) {
    switch (option) {
      case 'edit':
        this.editOptions();
        break;
      case 'delete':
        this.delete();
        break;
      case 'set-explicit':
        this.setExplicit(true);
        break;
      case 'remove-explicit':
        this.setExplicit(false);
        break;
      case 'translate':
        this.translateToggle = true;
        break;
    }
  }

  shareOptionSelected(option: string) {
    // console.log('shareOptionSelected', option);
    if (option === 'repost') {
      this.remindOpen = true;
    };
  }

  remindPost($event) {
    if ($event.message) {
      this.remindMessage = $event.message;
    }

    this.activity.reminded = true;
    this.activity.reminds++;

    this.client.post('api/v2/newsfeed/remind/' + this.activity.guid, {
      message: this.remindMessage
    })
      .catch(e => {
        this.activity.reminded = false;
        this.activity.reminds--;
      });
  }

  editOptions() {
    if (this.activity.entity_type === 'opportunity') {
      this.overlayModal.create(OpportunityFormComponent, this.activity, {
        class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
        // listen to the update callback
        onUpdate: (payload: any) => {
          this.udpateOpportunity(payload);
        }
      }).present();
    }
    else if (this.activity.entity_type === 'item') {
      this.overlayModal.create(BlueStoreFormComponent, this.activity, {
        class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
        // listen to the update callback
        onUpdate: (payload: any) => {
          // make update to local var
          this.udpateMarketPlace(payload);
        }
      }).present()
    }
    else if (this.activity.entity_type === 'event') {
      if (this.activity.event_type === 'Premium') {
        this.router.navigateByUrl('/campaign/edit/' + this.activity.entity_guid)
      }
      else if (this.activity.end_time_date) {
        this.router.navigateByUrl('/event/edit/' + this.activity.guid)
      } else {
        this.overlayModal.create(ShowtimezFormComponent, this.activity, {
          class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
          // listen to the update callback
          onUpdate: (payload: any) => {
            // make update to local var
            this.udpateShowtime(payload);
          }
        }).present()
      }

    }
    else if (this.activity.entity_type === 'event') {
      if (this.activity.end_time_date) {
        this.router.navigateByUrl('/event/edit/' + this.activity.guid)
      } else {
        this.overlayModal.create(ShowtimezFormComponent, this.activity, {
          class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
          // listen to the update callback
          onUpdate: (payload: any) => {
            // make update to local var
            this.udpateShowtime(payload);
          }
        }).present()
      }

    }
    else {
      this.editing = true;
    }
  }

  udpateOpportunity(data: any) {
    this.activity.category = data.category;
    this.activity.blurb = data.description;
    this.activity.location = data.location;
    this.activity.title = data.title;
    // if (data.attachment_guid.length > 0) {
    //   this.activity.custom_data[0].src = this.opspot.cdn_assets_url + 'fs/v1/thumbnail/' + data.attachment_guid[0]
    // } else {
    //   this.activity.custom_data[0].src = this.opspot.cdn_assets_url + 'assets/ops_icon.png'
    // }
    // trigger component observe new changes
    this.detectChanges();
  }

  udpateMarketPlace(data: any) {
    this.activity.blurb = data.description;
    this.activity.title = data.title;
    this.activity.attachment_guid = data.attachment_guid;
    this.activity.price = data.price;
    this.activity.item_count = data.item_count;
    this.activity.currency = data.currency;
    this.activity.published = 1;
    // trigger component observe new changes
    this.detectChanges();
  }

  udpateShowtime(data: any) {
    this.activity.blurb = data.description;
    //this.activity.attachment_guid = data.attachment_guid;
    this.activity.location = data.location;
    this.activity.title = data.title;
    this.activity.start_time_date = data.start_time_date;
    // if (data.attachment_guid.length > 0) {
    //   this.activity.custom_data[0].src = this.opspot.cdn_assets_url + 'fs/v1/thumbnail/' + data.attachment_guid[0]
    // } else {
    //   this.activity.custom_data[0].src = this.opspot.cdn_assets_url + 'assets/logos/logo.svg'
    // }
    // trigger component observe new changes
    this.detectChanges();
  }

  setExplicit(value: boolean) {
    let oldValue = this.activity.mature,
      oldMatureVisibility = this.activity.mature_visibility;

    this.activity.mature = value;
    this.activity.mature_visibility = void 0;

    if (this.activity.custom_data && this.activity.custom_data[0]) {
      this.activity.custom_data[0].mature = value;
    } else if (this.activity.custom_data) {
      this.activity.custom_data.mature = value;
    }

    this.client.post(`api/v1/entities/explicit/${this.activity.guid}`, { value: value ? '1' : '0' })
      .catch(e => {
        this.activity.mature = oldValue;
        this.activity.mature_visibility = oldMatureVisibility;

        if (this.activity.custom_data && this.activity.custom_data[0]) {
          this.activity.custom_data[0].mature = oldValue;
        } else if (this.activity.custom_data) {
          this.activity.custom_data.mature = oldValue;
        }
      });
  }

  private viewed: boolean = false;

  isVisible() {
    if (this.visible) {
      this.onViewed.emit({ activity: this.activity, visible: true });
      return true;
    }
    this.scroll_listener = this.scroll.listenForView().subscribe((view) => {
      if (this.element.offsetTop - this.scroll.view.clientHeight <= this.scroll.view.scrollTop && !this.visible) {
        //stop listening
        this.scroll.unListen(this.scroll_listener);
        //make visible
        this.visible = true;

        //this.onViewed.emit({activity: this.activity, visible: true});
        //update the analytics
        this.newsfeedService.recordView(this.activity);
      }
    });
  }

  ngOnDestroy() {
    this.scroll.unListen(this.scroll_listener);
  }

  propagateTranslation($event) {
    if (this.activity.remind_object && this.translationService.isTranslatable(this.activity.remind_object)) {
      this.childEventsEmitter.emit({
        action: 'translate',
        args: [$event]
      });
    }
  }

  hide() {
    if (this.player) {
      this.player.pause();
    }
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

}

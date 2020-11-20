import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Client } from '../../services/api';
import { Session } from '../../services/session';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayModalService } from '../../services/ux/overlay-modal';
import { ShowtimezFormComponent } from '../forms/showtimez-form/showtimez-form.component';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../services/translation';
import { ScrollService } from '../../services/ux/scroll';
import { BoostCreatorComponent } from '../boost/creator/creator.component';
import { OpspotTitle } from '../../services/ux/title';


@Component({
  selector: 'app-showtimez',
  templateUrl: './showtimez.component.html',
  styleUrls: ['./showtimez.component.scss']
})
export class ShowtimezComponent implements OnInit {
  guid: string;
  paramsSubscription: Subscription;
  reachoutMessage = 'I am interested in: ';
  user: any;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef,
    public overlayModal: OverlayModalService,
    public translationService: TranslationService,
    private router: Router,
    public scroll: ScrollService,
    public title: OpspotTitle,
  ) { }

  ngOnInit() {
    this.title.setTitle('Showtimez');
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.guid = params.get('guid');
        this.load();
      }
    });
    this.onScroll();
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
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
  isLocked: boolean = false;


  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  onViewed: EventEmitter<{ activity, visible }> = new EventEmitter<{ activity, visible }>();

  isTranslatable: boolean;
  canDelete: boolean = false;
  showRatingToggle: boolean = false;
  offset = '';
  translateEvent: EventEmitter<any> = new EventEmitter();

  remindOpen = false;
  remindMessage = '';

  private defaultMenuOptions: Array<string> = ['edit', 'translate', 'share', 'mute', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];
  menuOptions: Array<string> = ['edit', 'translate', 'follow', 'feature', 'delete', 'report', 'block', 'rating','sponsored'];

  load() {
    if (this.inProgress)
      return false;
    this.inProgress = true;
    this.client.get('api/v1/newsfeed/single/' + this.guid)
      .then((data: any) => {
        if (data.activity) {
          this.showTimez = data.activity;
          // user obj for reach out
          this.user = data.activity.ownerObj;
          this.reachoutMessage += data.activity['perma_url'];
          this.showTimez.url = window.Opspot.site_url + 'showtimez/' + this.showTimez.guid;
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
        this.error = 'Sorry, there was problem.';
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
      })
      .catch(e => {
        alert((e && e.message) || 'Server error');
      });
  }

  async togglePin() {
    this.showTimez.bookmark = !this.showTimez.bookmark;
    const url: string = `api/v3/bookmark/${this.showTimez.guid}/event`;
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
    this.load();
    this.detectChanges();
  }

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

  showBoost() {
    const boostModal = this.overlayModal.create(BoostCreatorComponent, this.showTimez, { class: 'modalChanger' });

    boostModal.onDidDismiss(() => {
      this.showBoostOptions = false;
    });

    boostModal.present();
  }

  propagateTranslation($event) {
    if (this.showTimez.remind_object && this.translationService.isTranslatable(this.showTimez.remind_object)) {
      this.childEventsEmitter.emit({
        action: 'translate',
        args: [$event]
      });
    }
  }

  onScroll() {
    var listen = this.scroll.listen(view => {
      if (view.top > 250) this.isLocked = true;
      if (view.top < 250) this.isLocked = false;
    });
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

    this.showTimez.reminded = true;
    this.showTimez.reminds++;

    this.client.post('api/v2/newsfeed/remind/' + this.showTimez.guid, {
      message: this.remindMessage
    })
      .catch(e => {
        this.showTimez.reminded = false;
        this.showTimez.reminds--;
      });
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
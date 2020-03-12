import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Client } from '../../services/api';
import { Session } from '../../services/session';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayModalService } from '../../services/ux/overlay-modal';
import { BlueStoreFormComponent } from '../forms/blue-store-form/blue-store-form.component';
import { TranslationService } from '../../services/translation';
import { ScrollService } from '../../services/ux/scroll';
import { Subscription } from 'rxjs';
import { BoostCreatorComponent } from '../boost/creator/creator.component';




@Component({
  selector: 'app-bluestore',
  templateUrl: './bluestore.component.html',
  styleUrls: ['./bluestore.component.scss']
})
export class BluestoreComponent implements OnInit {

  guid: string;
  inProgress: boolean = false;
  marketplace: any;
  count
  opspot = window.Opspot;
  allOpportunities: any;
  largeImage: string;
  isTranslatable: boolean;
  canDelete: boolean = false;
  translateToggle: boolean = false;
  _delete: EventEmitter<any> = new EventEmitter();
  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  translateEvent: EventEmitter<any> = new EventEmitter();
  isLocked = false;
  paramsSubscription: Subscription;
  reachoutMessage = 'Is this available? ';
  user: any;
  showBoostOptions: boolean = false;
  // private _showBoostMenuOptions: boolean = false;
  @Input() focusedCommentGuid: string;
  remindOpen = false;
  remindMessage = '';
  menuOptions: Array<string> = ['edit', 'translate', 'follow', 'feature', 'delete', 'report', 'block', 'rating'];
  showVideo = false;
  videoData: any;
  error: string = '';


  constructor(
    private route: ActivatedRoute,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef,
    public overlayModal: OverlayModalService,
    private router: Router,
    public translationService: TranslationService,
    public scroll: ScrollService

  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.guid = params.get('guid');
        this.load();
      }
    });
    this.onScroll();
  }

  load() {
    if (this.inProgress)
      return false;

    this.inProgress = true;

    this.client.get('api/v1/newsfeed/single/' + this.guid)
      .then((data: any) => {
        if (data.activity) {
          this.marketplace = data.activity;
          // user obj for reach out
          this.user = data.activity.ownerObj;
          this.reachoutMessage += data.activity['perma_url'];

          this.marketplace.url = window.Opspot.site_url + 'item/' + this.marketplace.guid;

          if (this.marketplace['custom_data'][0]['entity_type'] === 'video') {
            this.showImage(0, this.marketplace['custom_data'][0]);
          } else {
            this.showImage(0);
          }
          this.count = this.marketplace['thumbs:up:count'];

          if (data.activity.owner_obj) {
            this.marketplace['ownerObj'] = data.activity.owner_obj;
          }
          this.inProgress = false;
        }
        this.isTranslatable = (
          this.translationService.isTranslatable(this.marketplace)
        );
        this.detectChanges();
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }


  getOwnerIconTime() {
    let session = this.session.getLoggedInUser();
    if (session && session.guid === this.marketplace.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.marketplace.ownerObj.icontime;
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
        //this.setExplicit(true);
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
    if (this.marketplace) {
      this.overlayModal.create(BlueStoreFormComponent, this.marketplace, {
        class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
        // listen to the update callback
        onUpdate: (payload: any) => {
          // make update to local var
          // alert(payload)
          this.udpateMarketPlace(payload);
        }
      }).present();
    }
  }

  udpateMarketPlace(data: any) {
    this.load();
    this.detectChanges();
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  liked(count) {
    if (count != this.marketplace['thumbs:up:count:old']) {
      this.count = count;
    } else {
      this.count = this.marketplace['thumbs:up:count']
    }
  }

  async togglePin() {
    this.marketplace.bookmark = !this.marketplace.bookmark;
    const url: string = `api/v3/bookmark/${this.marketplace.guid}/item`;
    try {
      if (this.marketplace.bookmark) {
        await this.client.post(url);
      } else {
        await this.client.delete(url);
      }
    } catch (e) {
      this.marketplace.bookmark = !this.marketplace.bookmark;
    }
  }

  delete($event: any = {}) {
    if ($event.inProgress) {
      $event.inProgress.emit(true);
    }
    this.client.delete(`api/v3/marketplace/${this.marketplace.entity_guid}`)
      .then((response: any) => {
        this.router.navigate([`newsfeed/subscribed`]);
      })
      .catch(e => {
        alert((e && e.message) || 'Server error');
      });
  }

  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }]
  };

  slickInit(e) {
    // console.log('slick initialized in activity');
  }
  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }

  showImage(i, data?) {
    if (data) {
      this.showVideo = true;
      this.videoData = data;
      // console.log("video: ", data);
    } else {
      this.showVideo = false;
      this.largeImage = this.marketplace.custom_data[i].src;
      // console.log(" this.largeImage: ", this.largeImage);
    }
  }

  propagateTranslation($event) {
    if (this.marketplace.remind_object && this.translationService.isTranslatable(this.marketplace.remind_object)) {
      this.childEventsEmitter.emit({
        action: 'translate',
        args: [$event]
      });
    }
  }

  async wireSubmitted(wire?) {
    if (wire && this.marketplace.wire_totals) {
      this.marketplace.wire_totals.tokens =
        parseFloat(this.marketplace.wire_totals.tokens) + (wire.amount * Math.pow(10, 18));

      this.detectChanges();
    }
  }

  showBoost() {
    const boostModal = this.overlayModal.create(BoostCreatorComponent, this.marketplace, { class: 'modalChanger' });

    boostModal.onDidDismiss(() => {
      this.showBoostOptions = false;
    });

    boostModal.present();
  }

  onScroll() {
    var listen = this.scroll.listen(view => {
      if (view.top > 250) this.isLocked = true;
      if (view.top < 250) this.isLocked = false;
    });
  }

  shareOptionSelected(option: string) {
    if (option === 'repost') {
      this.remindOpen = true;
    };
  }

  remindPost($event) {
    if ($event.message) {
      this.remindMessage = $event.message;
    }

    this.marketplace.reminded = true;
    this.marketplace.reminds++;

    this.client.post('api/v2/newsfeed/remind/' + this.marketplace.guid, {
      message: this.remindMessage
    })
      .catch(e => {
        this.marketplace.reminded = false;
        this.marketplace.reminds--;
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}

import { ChangeDetectorRef, Component, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Client } from '../../../services/api';
import { Session } from '../../../services/session';

import { RecommendedService } from '../components/video/recommended.service';
import { AttachmentService } from '../../../services/attachment';
import { ContextService } from '../../../services/context.service';
import { OpspotTitle } from '../../../services/ux/title';
import { PostFormComponent } from '../../forms/post-form/post-form.component';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { BoostCreatorComponent } from '../../boost/creator/creator.component';
import { TranslationService } from '../../../services/translation';

@Component({
  moduleId: module.id,
  selector: 'm-media--view',
  templateUrl: 'view.component.html',
  styleUrls: ['view.component.scss'],
  providers: [{
    provide: RecommendedService,
    useFactory: RecommendedService._,
    deps: [Client]
  }],
})

export class MediaViewComponent {

  isTranslatable: boolean;
  canDelete: boolean = false;

  opspot = window.Opspot;
  guid: string;
  entity: any;
  inProgress: boolean = true;
  error: string = '';
  deleteToggle: boolean = false;

  theaterMode: boolean = false;
  count: any;
  largeImage: string;
  editing: boolean = false;
  menuOptions: Array<string> = ['edit', 'translate', 'follow', 'feature', 'delete', 'report', 'rating'];
  paramsSubscription: Subscription;
  queryParamsSubscription$: Subscription;
  focusedCommentGuid: string = '';
  showMyJourneyWidget = false;
  showBoostOptions: boolean = false;
  translateToggle = false;
  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  translateEvent: EventEmitter<any> = new EventEmitter();
  remindOpen = false;
  remindMessage = '';
  showVideo = false;
  showAudio = false;
  videoData: any;

  constructor(
    public session: Session,
    public client: Client,
    public router: Router,
    public title: OpspotTitle,
    public route: ActivatedRoute,
    public attachment: AttachmentService,
    public context: ContextService,
    private cd: ChangeDetectorRef,
    public overlayModal: OverlayModalService,
    public translationService: TranslationService,
  ) { }

  ngOnInit() {
    this.title.setTitle('');

    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.guid = params.get('guid');
        this.load(true);
      }
    });

    this.queryParamsSubscription$ = this.route.queryParamMap.subscribe(params => {
      this.focusedCommentGuid = params.get('comment_guid');
      if (this.focusedCommentGuid) {
        window.scrollTo(0, 500);
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.queryParamsSubscription$.unsubscribe();
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


  load(refresh: boolean = false) {
    if (refresh) {
      // this.entity = {};
      this.detectChanges();
    }
    this.inProgress = true;
    this.client.get('api/v1/newsfeed/single/' + this.guid, { children: false })
      .then((response: any) => {
        // if (response.activity.type !== 'object') {
        //   return;
        // }
        if (response.activity) {
          this.entity = response.activity;

          this.entity.url = window.Opspot.site_url + 'media/' + this.entity.guid;

          // if (this.entity['custom_data'][0]['entity_type'] === 'video' || this.entity['custom_data'][0]['entity_type'] === 'audio' || this.entity['custom_data'][0]['entity_type'] === 'image') {
          //   this.showImage(0, this.entity['custom_data'][0]);
          // } else {
          //   this.showImage(0);
          // }
          this.count = this.entity['thumbs:up:count'];

          if (this.entity.title) {
            this.title.setTitle(this.entity.title);
          }

          if (this.entity.tags.length > 0) {
            for (var i = 0; i < this.entity['tags'].length; i++) {
              var specialHashtag = 'myjourney' + this.entity.ownerObj.username
              if (specialHashtag == this.entity['tags'][i]) {
                this.showMyJourneyWidget = true;
                break;
              }
            }
          }
        }

        this.isTranslatable = (
          this.translationService.isTranslatable(this.entity)
        );
        this.inProgress = false;
        this.detectChanges();
      })
      .catch((e) => {
        this.inProgress = false;
        this.error = 'Sorry, there was problem.';
      });
  }

  delete() {
    this.client.delete('api/v1/media/' + this.guid)
      .then((response: any) => {
        const type: string = this.entity.subtype === 'video' ? 'videos' : 'images';
        this.router.navigate([`newsfeed/subscribed`]);
      })
      .catch(e => {
        alert((e && e.message) || 'Server error');
      });
  }

  getNext() {
    if (this.entity.container_guid === this.entity.owner_guid
      || !this.entity.album_children_guids
      || this.entity.album_children_guids.length <= 1) {
      return;
    }

    let pos = this.entity['album_children_guids'].indexOf(this.entity.guid);
    //bump up if less than 0
    if (pos <= 0)
      pos = 1;
    //bump one up if we are in the same position as ourself
    if (this.entity['album_children_guids'][pos] === this.entity.guid)
      pos++;
    //reset back to 0 if we are are the end
    if (pos >= this.entity['album_children_guids'].length)
      pos = 0;

    return this.entity['album_children_guids'][pos];
  }

  menuOptionSelected(option: string) {
    switch (option) {
      case 'edit':
        //this.router.navigate(['/media/edit', this.entity.guid]);
        // this.editOptions();
        this.editing = true;
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

  save() {
    this.editing = false;
    this.entity.edited = true;
    this.client.post('api/v1/newsfeed/' + this.entity.guid, this.entity);
  }

  editOptions() {
    if (this.entity) {
      this.overlayModal.create(PostFormComponent, this.entity, {
        class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
        // listen to the update callback
        onUpdate: (payload: any) => {
          // make update to local var
          // alert(payload)
          //this.udpateMarketPlace(payload);
        }
      }).present();
    }
  }

  async wireSubmitted(wire?) {
    if (wire && this.entity.wire_totals) {
      this.entity.wire_totals.tokens =
        parseFloat(this.entity.wire_totals.tokens) + (wire.amount * Math.pow(10, 18));
      this.detectChanges();
    }
  }

  setExplicit(value: boolean) {
    this.entity.mature = value;
    this.detectChanges();

    this.client.post(`api/v1/entities/explicit/${this.entity.guid}`, { value: value ? '1' : '0' })
      .catch(e => {
        this.entity.mature = !!this.entity.mature;
        this.detectChanges();
      });
  }

  liked(count) {
    if (count != this.entity['thumbs:up:count:old']) {
      this.count = count;
    } else {
      this.count = this.entity['thumbs:up:count']
    }
  }

  getThumbnail() {
    const url = this.entity.paywalled || (this.entity.wire_threshold && this.entity.wire_threshold !== '0') ? this.opspot.site_url : this.opspot.cdn_url;
    return url + `fs/v1/thumbnail/${this.entity.guid}/xlarge`;
  }

/**
 * Todo: Temp fix for single paid post.
 * Pending with multiple with type album
 */
  // showImage(i, data?) {
  //   if (data && data.entity_type === 'video') {
  //     this.showVideo = true;
  //     this.showAudio = false;
  //     this.videoData = data;
  //   } else if (data && data.entity_type === 'audio') {
  //     this.showVideo = false;
  //     this.showAudio = true;
  //     this.videoData = data;
  //   } else {
  //     this.showVideo = false;
  //     this.showAudio = false;
  //     this.largeImage = this.entity.custom_data[i].src;
  //   }
  // }

  async togglePin() {
    this.entity.bookmark = !this.entity.bookmark;
    const url: string = `api/v3/bookmark/${this.entity.guid}/image`;
    try {
      if (this.entity.bookmark) {
        await this.client.post(url);
      } else {
        await this.client.delete(url);
      }
    } catch (e) {
      this.entity.bookmark = !this.entity.bookmark;
    }
  }

  showBoost() {
    const boostModal = this.overlayModal.create(BoostCreatorComponent, this.entity, { class: 'modalChanger' });

    boostModal.onDidDismiss(() => {
      this.showBoostOptions = false;
    });

    boostModal.present();
  }

  private detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  propagateTranslation($event) {
    if (this.entity.remind_object && this.translationService.isTranslatable(this.entity.remind_object)) {
      this.childEventsEmitter.emit({
        action: 'translate',
        args: [$event]
      });
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

    this.entity.reminded = true;
    this.entity.reminds++;

    this.client.post('api/v2/newsfeed/remind/' + this.entity.guid, {
      message: this.remindMessage
    })
      .catch(e => {
        this.entity.reminded = false;
        this.entity.reminds--;
      });
  }

  getOwnerIconTime() {
    // TODO @gayatri: check for an alternate to prevent heavy work in child comp
    let session = this.session.getLoggedInUser();
    if(session && session.guid === this.entity.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.entity.ownerObj.icontime;
    }
  }


}

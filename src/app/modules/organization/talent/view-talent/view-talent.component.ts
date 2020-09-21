import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../../services/api';
import { OverlayModalService } from '../../../../services/ux/overlay-modal';
import { TranslationService } from '../../../../services/translation';
import { ScrollService } from '../../../../services/ux/scroll';
import { Session } from '../../../../services/session';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CreateTalent } from '../create/create-talent';
import { BoostCreatorComponent } from '../../../boost/creator/creator.component';
import { OrganizationService } from '../../organization-service';


@Component({
  selector: 'app-view-talent',
  templateUrl: './view-talent.component.html',
  styleUrls: ['./view-talent.component.scss']
})
export class ViewTalentComponent implements OnInit {

  orgGuid: string;
  talentGuid: string;
  inProgress: boolean = false;
  talent: any;
  count
  opspot = window.Opspot;
  largeImage: string;
  isTranslatable: boolean;
  canDelete: boolean = false;
  translateToggle: boolean = false;
  _delete: EventEmitter<any> = new EventEmitter();
  childEventsEmitter: EventEmitter<any> = new EventEmitter();
  translateEvent: EventEmitter<any> = new EventEmitter();
  isLocked = false;
  paramsSubscription: Subscription;
  reachoutMessage = 'I am interested in: ';
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
  organization: any;
  showList: boolean = false;


  constructor(
    private route: ActivatedRoute,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef,
    public overlayModal: OverlayModalService,
    private router: Router,
    public translationService: TranslationService,
    public scroll: ScrollService,
    private service: OrganizationService,

  ) { }

  ngOnInit() {
    if (window.innerWidth < 785) {
      this.showList = true;
    }
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid') && params.get('talentGuid')) {
        this.orgGuid = params.get('guid');
        this.talentGuid = params.get('talentGuid');
        this.load();
        this.loadOrg(this.orgGuid);
      }
    });
    this.onScroll();
  }

  async loadOrg(guid) {
    let organization = await this.service.load(guid)
    if (organization)
      this.organization = organization;
  }

  load() {
    if (this.inProgress)
      return false;

    this.inProgress = true;

    this.client.get('api/v1/newsfeed/single/' + this.talentGuid)
      .then((data: any) => {
        if (data.activity) {
          this.talent = data.activity;
          // // user obj for reach out
          this.user = data.activity.ownerObj;
          this.reachoutMessage += data.activity['perma_url'];

          // this.talent.url = window.Opspot.site_url + 'item/' + this.talent.guid;

          if (this.talent['custom_data'][0]['entity_type'] === 'video') {
            this.showImage(0, this.talent['custom_data'][0]);
          } else {
            this.showImage(0);
          }
          this.count = this.talent['thumbs:up:count'];

          if (data.activity.ownerObj) {
            this.talent['ownerObj'] = data.activity.ownerObj;
          }
          if (data.activity.containerObj) {
            this.talent['containerObj'] = data.activity.containerObj;
          }
          this.inProgress = false;
        }
        this.isTranslatable = (
          this.translationService.isTranslatable(this.talent)
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
    if (session && session.guid === this.talent.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.talent.ownerObj.icontime;
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
    if (this.talent) {
      this.overlayModal.create(CreateTalent, this.talent, {
        class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
        // listen to the update callback
        onUpdate: (payload: any) => {
          // make update to local var
          // alert(payload)
          this.udpateTalent(payload);
        }
      }).present();
    }
  }

  udpateTalent(data: any) {
    this.load();
    this.detectChanges();
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  liked(count) {
    if (count != this.talent['thumbs:up:count:old']) {
      this.count = count;
    } else {
      this.count = this.talent['thumbs:up:count']
    }
  }

  async togglePin() {
    this.talent.bookmark = !this.talent.bookmark;
    const url: string = `api/v3/bookmark/${this.talent.guid}/talent`;
    try {
      if (this.talent.bookmark) {
        await this.client.post(url);
      } else {
        await this.client.delete(url);
      }
    } catch (e) {
      this.talent.bookmark = !this.talent.bookmark;
    }
  }

  delete($event: any = {}) {
    if ($event.inProgress) {
      $event.inProgress.emit(true);
    }
    this.client.delete(`api/v3/organizations/organization/talent/${this.talent.guid}`)
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
    // console.log('slick initialized in talent');
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
      this.largeImage = this.talent.custom_data[i].src;
      // console.log(" this.largeImage: ", this.largeImage);
    }
  }

  propagateTranslation($event) {
    if (this.talent.remind_object && this.translationService.isTranslatable(this.talent.remind_object)) {
      this.childEventsEmitter.emit({
        action: 'translate',
        args: [$event]
      });
    }
  }

  async wireSubmitted(wire?) {
    if (wire && this.talent.wire_totals) {
      this.talent.wire_totals.tokens =
        parseFloat(this.talent.wire_totals.tokens) + (wire.amount * Math.pow(10, 18));

      this.detectChanges();
    }
  }

  showBoost() {
    const boostModal = this.overlayModal.create(BoostCreatorComponent, this.talent, { class: 'modalChanger' });

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

    this.talent.reminded = true;
    this.talent.reminds++;

    this.client.post('api/v2/newsfeed/remind/' + this.talent.guid, {
      message: this.remindMessage
    })
      .catch(e => {
        this.talent.reminded = false;
        this.talent.reminds--;
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }


}

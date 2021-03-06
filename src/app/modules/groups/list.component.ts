import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Client } from '../../services/api';
import { OpspotTitle } from '../../services/ux/title';
import { Session } from '../../services/session';
import { OpspotGroupListResponse } from '../../interfaces/responses';
import { ContextService } from '../../services/context.service';
import { HashtagsSelectorModalComponent } from '../hashtags/hashtag-selector-modal/hashtags-selector.component';
import { OverlayModalService } from '../../services/ux/overlay-modal';

@Component({
  selector: 'm-groups--list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})

export class GroupsListComponent {

  opspot;

  moreData: boolean = true;
  moreData1: boolean = true;
  moreData2: boolean = true;
  offset: string = '';
  offset1: string = '';
  offset2: string = '';


  inProgress: boolean = false;
  all: boolean = false;
  entities: Array<any> = [];
  myCommunities: Array<any> = [];
  memberCommunities: Array<any> = [];
  filter: string = 'top';
  paramsSubscription: Subscription;
  rating: number = 1;
  preventHashtagOverflow: boolean = false;
  dev = false;
  showMyCommunities: boolean = false;
  ownerGuid: any;

  constructor(
    public client: Client,
    public route: ActivatedRoute,
    public router: Router,
    public title: OpspotTitle,
    private context: ContextService,
    public session: Session,
    private overlayModal: OverlayModalService,
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Communities');
    this.context.set('group');
    this.opspot = window.Opspot;
    this.detectWidth();

    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params['filter']) {
        if (params['filter'] === 'suggested' && !this.session.isLoggedIn()) {
          this.router.navigate(['/login']);
        }
        this.filter = params['filter'];

        this.inProgress = false;
        this.moreData = true;
        this.entities = [];
        this.myCommunities = [];

        if (this.session.isLoggedIn())
          this.rating = this.session.getLoggedInUser().boost_rating;
        this.ownerGuid = this.session.getLoggedInUser().guid;

        this.load(true);
        this.loadMyCommunities(true);
        this.loadMemberCommunities(true);
      }
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  reloadTags(all: boolean) {
    this.all = all;
    this.load(true);
  }


  communityTabsToggle() {
    if (this.showMyCommunities) {
      this.showMyCommunities = false;
    } else {
      this.showMyCommunities = true;
    }
  }

  load(refresh: boolean = false) {

    if (this.inProgress)
      return;

    if (refresh) {
      this.offset = '';
      this.entities = [];
      this.moreData = true;
    }

    let endpoint, key;

    switch (this.filter) {
      case 'top':
        if (!this.session.isLoggedIn()) {
          this.router.navigate(['/login']);
        }
        endpoint = `api/v2/entities/suggested/groups`;
        if (this.all)
          endpoint += '/all';
        key = 'entities';
        break;
      case 'suggested':
        endpoint = `api/v2/entities/suggested/groups`;
        key = 'entities';
        break;
      default:
        //@gayatri  this route need to check and have to make it dynamic
        endpoint = `api/v1/groups/all/` + this.ownerGuid;
        key = 'groups';
        if (this.all)
          this.router.navigate(['/groups/top']);
        break;
    }

    this.inProgress = true;
    this.client.get(endpoint, {
      limit: 50,
      offset: this.offset,
      rating: this.rating
    })
      .then((response: OpspotGroupListResponse) => {

        if (!response[key] || response[key].length === 0) {
          this.moreData = false;
          this.inProgress = false;
          if (this.filter == 'top')
            this.openHashtagsSelector();
          return false;
        }
     
        if (refresh) {
          this.entities = response[key];
        } else {
          if (this.offset)
            response[key].shift();

          this.entities.push(...response[key]);
        }

        this.offset = response['load-next'];
        if (!this.offset) {
          this.moreData = false;
        }
        this.inProgress = false;
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

  loadMyCommunities(refresh: boolean = false) {

    // if (this.inProgress)
    //   return;

    if (refresh) {
      this.offset1 = '';
      this.myCommunities = [];
      this.moreData1 = true;
    }

    let endpoint, key;
    endpoint = `api/v1/groups/owner/` + this.ownerGuid;
    key = 'groups';

    // this.inProgress = true;
    this.client.get(endpoint, {
      limit: 12,
      offset: this.offset1,
      rating: this.rating
    })
      .then((response: OpspotGroupListResponse) => {

        if (!response[key] || response[key].length === 0) {
          // this.inProgress = false;
          this.moreData1 = false;
        }

        if (refresh) {
          this.myCommunities = response[key];
        } else {
          if (this.offset1)
            response[key].shift();
          this.myCommunities.push(...response[key]);
        }

        this.offset1 = response['load-next'];
        if (!this.offset1) {
          this.moreData1 = false;
        }
        // this.inProgress = false;
      })
      .catch((e) => {
        // this.inProgress = false;
      });
  }

  loadMemberCommunities(refresh: boolean = false) {
    // if (this.inProgress)
    //   return;

    if (refresh) {
      this.offset2 = '';
      this.memberCommunities = [];
      this.moreData2 = true;
    }

    let endpoint, key;
    endpoint = `api/v1/groups/member/` + this.ownerGuid;
    key = 'groups';

    // this.inProgress = true;
    this.client.get(endpoint, {
      limit: 12, 
      offset: this.offset2,
      rating: this.rating
    })
      .then((response: OpspotGroupListResponse) => {

        if (!response[key] || response[key].length === 0) {
          // this.inProgress = false;
          this.moreData2 = false;
        }

        if (refresh) {
          this.memberCommunities = response[key];
        } else {
          if (this.offset2)
            response[key].shift();
          this.memberCommunities.push(...response[key]);
        }

        this.offset2 = response['load-next'];
        if (!this.offset2) {
          this.moreData2 = false;
        }
        // this.inProgress = false;
      })
      .catch((e) => {
        // this.inProgress = false;
      });
  }

  reloadTopFeed() {
    this.load(true);
  }

  onOptionsChange(e: { rating }) {
    this.rating = e.rating;

    if (this.inProgress) {
      return setTimeout(() => {
        this.onOptionsChange(e);
      }, 100); //keep trying every 100ms
    }
    this.load(true);
  }

  @HostListener('window:resize') detectWidth() {
    this.preventHashtagOverflow = window.innerWidth < 400;
  }

  openHashtagsSelector() {
    this.overlayModal.create(HashtagsSelectorModalComponent, {}, {
      class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium-large',
      onSelected: () => {
        this.load(true); //refresh list
      },
    }).present();
  }

}

export { GroupsProfile } from './profile/profile';
export { GroupsCreator } from './create/create';
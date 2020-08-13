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
  selector: 'm-organization--list',
  templateUrl: 'list.component.html',
  styleUrls:['./list.components.scss']
})

export class OrganizationListComponent {

  opspot;

  moreData: boolean = true;
  inProgress: boolean = false;
  all: boolean = false;
  offset: string = '';
  entities: Array<any> = [];
  filter: string = 'top';
  paramsSubscription: Subscription;
  rating: number = 1;
  preventHashtagOverflow: boolean = false;
  ownerGuid: any;
  showMyCommunities: boolean = false;
  organization  = "";
  memberOrganizations: Array<any> = [];
  offset2: string = '';
  moreData2: boolean = true;





  constructor(
    public client: Client,
    public route: ActivatedRoute,
    public router: Router,
    public title: OpspotTitle,
    // private context: ContextService,
    public session: Session,
    private overlayModal: OverlayModalService,
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Organization');
    // this.context.set('group');
    this.opspot = window.Opspot;
    this.detectWidth();
    this.getUsersOrganization();

    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params['filter']) {
        if (params['filter'] === 'suggested' && !this.session.isLoggedIn()) {
          this.router.navigate(['/login']);
        }
        this.filter = params['filter'];

        this.inProgress = false;
        this.moreData = true;
        this.entities = [];

        if (this.session.isLoggedIn())
          this.rating = this.session.getLoggedInUser().boost_rating;
        this.ownerGuid = this.session.getLoggedInUser().guid;

        this.load(true);
        this.loadMemberOrganizations(true);
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
        endpoint = `api/v2/entities/suggested/organizations`;
        if (this.all)
          endpoint += '/all';
        key = 'entities';
        break;
      case 'suggested':
        endpoint = `api/v2/entities/suggested/organizations`;
        key = 'entities';
        break;
      default:
        //@gayatri  this route need to check and have to make it dynamic
        endpoint = `api/v3/organizations/${this.filter}/` + this.ownerGuid;
        key = 'organizations';
        break;
    }

    // endpoint = `api/v3/organizations/all`;
    // key = 'organizations';

    this.inProgress = true;
    this.client.get(endpoint, {
      limit: 12,
      offset: this.offset,
      rating: this.rating
    })
      .then((response: OpspotGroupListResponse) => {

        // if (response['has-owned-organization']){
        //    this.showCreateButton = false;
        // }
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


  loadMemberOrganizations(refresh: boolean = false) {

    // if (this.inProgress)
    //   return;

    if (refresh) {
      this.offset2 = '';
      this.memberOrganizations = [];
      // this.moreData = true;
    }

    let endpoint, key;
    endpoint = `api/v3/organizations/member/` + this.ownerGuid;
    key = 'organizations';

    // this.inProgress = true;
    this.client.get(endpoint, {
      limit: 12,
      offset: this.offset2,
      rating: this.rating
    })
      .then((response: OpspotGroupListResponse) => {

        if (!response[key] || response[key].length === 0) {
          this.moreData2 = false;
          // this.inProgress = false;
        }

        if (refresh) {
          this.memberOrganizations = response[key];
        } else {
          if (this.offset2)
            response[key].shift();
          this.memberOrganizations.push(...response[key]);
        }

        this.offset2 = response['load-next'];
        if (!this.offset) {
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

  communityTabsToggle() {
    if (this.showMyCommunities) {
      this.showMyCommunities = false;
    } else {
      this.showMyCommunities = true;
    }
  }
  
  getUsersOrganization() {
    this.inProgress = true;
    let ownerGuid = this.session.getLoggedInUser().guid;

    this.client.get(`api/v3/organizations/owner/` + ownerGuid, {
      limit: 12,
      offset: '',
      rating: 1
    })
      .then((response) => {
        if(response && response['organizations']) {
          this.organization = response['organizations'][0];
        }
        this.inProgress = false
      })
      .catch((e) => { });

  }

}

// export { GroupsProfile } from './profile/profile';
// export { GroupsCreator } from './create/create';

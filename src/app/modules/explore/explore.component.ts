import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TopbarHashtagsService } from '../hashtags/service/topbar.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from '../../services/api';
import { Session } from '../../services/session';
import { OpspotTitle } from '../../services/ux/title';
import { OverlayModalService } from '../../services/ux/overlay-modal';
import { InTheSpotlightComponent } from '../forms/in-the-spotlight/in-the-spotlight.component';

@Component({
  selector: 'app-explore',
  host: { '(keyup)': 'keyup_srch($event)' },
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  exploreArray = [];
  filteredArray = [];
  hashtags: [];
  _exploreTabList: Array<any> = [{ id: 'IN the Spotlight', val: 'inthespotlight' }, { id: 'My Journey', val: 'myjourney' }, { id: 'Community', val: 'group' }, { id: 'Organization', val: 'organization' }, { id: 'Blue Store', val: 'marketplace' }, { id: 'Showtimez/Events', val: 'event' }];
  paramsSubscription: Subscription;
  q: string = '';
  type: string = '';
  container: string = '';
  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  ref: string = '';
  _activeFilter = 'IN the Spotlight';
  _loadMoreFilter = 'inthespotlight';

  slideConfig = {
    slidesToShow: 8,
    slidesToScroll: 8,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    public service: TopbarHashtagsService,
    private router: Router,
    private route: ActivatedRoute,
    public client: Client,
    public session: Session,
    public title: OpspotTitle,
    public overlayModal: OverlayModalService,
  ) {
    this.paramsSubscription = this.route.queryParams.subscribe(params => {
      if (typeof params['q'] !== 'undefined') {
        this.q = decodeURIComponent(params['q'] || '');
        // console.log(this.q)
      }

      if (typeof params['type'] !== 'undefined') {
        this.type = params['type'] || '';
        // console.log(this.type)
      }

      if (typeof params['id'] !== 'undefined') {
        this.container = params['id'] || '';
        // console.log(this.container)
      }

      if (typeof params['ref'] !== 'undefined') {
        this.ref = params['ref'] || '';
        // console.log(this.ref);
      }
      // this.reset();
      this.inProgress = false;
      this.offset = '';
      this.reset();
      this.searchMore(true, this._exploreTabList[0].val);
      // this.triggerSearchApi();
    });
  }

  async ngOnInit() {
    this.title.setTitle('Explore');
    // await this.load();
  }

  // load hashtags
  // async load() {
  //   try {
  //     this.hashtags = await this.service.load(20);
  //     // console.log(this.hashtags);
  //   } catch (e) {
  //     // console.log(e);
  //   }
  // }

  switchCategoryType(property: string, value: string) {
    console.log(property, value)
    this._activeFilter = property;
    this._loadMoreFilter = value;
    this.searchMore(true, value)
    // this.router.navigate(['/explore'], {
    //   queryParams: {
    //     q: this.q,
    //     type: `${this.type}`,
    //     ref: `${this.ref}`
    //   }
    // });
  }

  /**
   *
   * @param e to be removed at final stage
   */

  // async triggerSearchApi(refresh: boolean = true) {
  //   let endpoint = 'api/v2/search';
  //   const data = {
  //     q: this.q,
  //     limit: 12,
  //     offset: this.offset,
  //     taxonomies: this.type
  //   };
  //   let response: any = await this.client.get(endpoint, data);
  //   // console.log(response);
  // }

  onChange(e: any) {
    this.type = e;
    this.router.navigate(['/explore'], {
      queryParams: {
        type: `${this.type}`,
        q: this.q,
        ref: `${this.ref}`
      }
      // queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      // skipLocationChange: true
      // do not trigger navigation
    });
  }


  keyup_srch(eve: any) {
    if (this.q.length == 0) {
      this.filteredArray = this.exploreArray;
    } else {
      if (this._loadMoreFilter == 'inthespotlight') {
        this.filteredArray = this.exploreArray.filter(item => item.title.toString().toLowerCase() == this.q.toString().toLowerCase())
      }
      else if (this._loadMoreFilter == 'group' || this._loadMoreFilter == 'organization') {
        this.filteredArray = this.exploreArray.filter(item => item.name.toString().toLowerCase() == this.q.toString().toLowerCase())
      } else if (this._loadMoreFilter == 'marketplace' || this._loadMoreFilter == 'event') {
        this.filteredArray = this.exploreArray.filter(item => item.blurb.toString().toLowerCase() == this.q.toString().toLowerCase())
      }
      else {
        this.filteredArray = this.exploreArray.filter(item => item.message.toString().toLowerCase() == this.q.toString().toLowerCase())
      }
    }
  }

  search() {
    this.router.navigate(['/explore'], {
      queryParams: {
        q: this.q,
        type: `${this.type}`,
        ref: `${this.ref}`
      }
    });
  }

  async searchMore(refresh: boolean = false, filter: string) {
    let _entityType = 'activity';
    if (this.inProgress) {
      return;
    }
    if (refresh) {
      this.offset = '';
      this.exploreArray.length = 0;
      this.filteredArray.length = 0;
    }
    if (filter == 'Organization' || filter == 'organization') {
      _entityType = 'organization';
    }
    if (filter == 'Community' || filter == 'group') {
      _entityType = 'group';
    }
    this.inProgress = true;
    this.client
      .get(
        `api/v3/explore/${_entityType}`,
        {
          activity_type: _entityType == 'activity' ? filter : '',
          limit: 50,
          offset: this.offset
        },
        { cache: true }
      )
      .then((data: any) => {
        let respData: any = data;
        if ((respData.hasOwnProperty('activity') && respData['activity'].length == 0) || (respData.hasOwnProperty('groups') && respData['groups'].length == 0) || (respData.hasOwnProperty('organizations') && respData['organizations'].length == 0)) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        } else {
          if (this.filteredArray && !refresh) {
            if (respData['activity']) {
              this.exploreArray.push(...respData.activity);
              this.filteredArray = this.exploreArray;
            }
            else if (respData['groups']) {
              this.exploreArray.push(...respData.groups);
              this.filteredArray = this.exploreArray;
            }
            else if (respData['organizations']) {
              this.exploreArray.push(...respData.organizations);
              this.filteredArray = this.exploreArray;
            }
          } else {
            if (respData['activity']) {
              this.exploreArray.push(...respData.activity);
              this.filteredArray = this.exploreArray;
            }
            if (respData['groups']) {
              this.exploreArray.push(...respData.groups);
              this.filteredArray = this.exploreArray;
            }
            if (respData['organizations']) {
              this.exploreArray.push(...respData.organizations);
              this.filteredArray = this.exploreArray;
            }
          }
          this.moreData = true;
          this.offset = respData['load-next'];
          this.inProgress = false;
        }
      })
      .catch(e => {
        console.error(e)
        this.inProgress = false;
      });
  }
  // async searchMore(refresh: boolean = false) {
  //   if (this.inProgress) {
  //     return;
  //   }
  //   if (refresh) {
  //     this.offset = '';
  //   }
  //   this.inProgress = true;
  //   this.client
  //     .get(
  //       `api/v2/feeds/global/top/${this.type}`,
  //       {
  //         hashtags: this.ref,
  //         period: '12h',
  //         all: '',
  //         purpose: 'explore',
  //         query: this.q,
  //         nsfw: '',
  //         sync: '1',
  //         as_activities: '1',
  //         from_timestamp: '',
  //         limit: 24,
  //         offset: this.offset
  //       },
  //       { cache: true }
  //     )
  //     .then((data: any) => {
  //       let respData: any = data;
  //       if (respData.entities.length === 0) {
  //         this.moreData = false;
  //         this.inProgress = false;
  //         return false;
  //       }
  //       if (this.filteredArray && !refresh) {
  //         // console.log('added data');
  //         this.filteredArray = this.exploreArray = this.exploreArray.concat(
  //           respData.entities
  //         );
  //       } else {
  //         // console.log('added new data');
  //         this.filteredArray = this.exploreArray = respData.entities;
  //       }
  //       this.moreData = true;
  //       this.offset = respData['load-next'];
  //       this.inProgress = false;
  //     })
  //     .catch(e => {
  //       this.inProgress = false;
  //     });
  // }
  reset() {
    // console.log(this.exploreArray);
    this.filteredArray = this.exploreArray = [];
  }

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
  _createSpotlight() {
    this.overlayModal.create(InTheSpotlightComponent, '', {
      class: 'm-overlay-modal--report m-overlay-modal--medium-hashtagforms',
      // listen to the update callback
      onUpdate: (payload: any) => {
        this.exploreArray.unshift(payload);
        this.overlayModal.dismiss();
      }
    }).present();
  }
}

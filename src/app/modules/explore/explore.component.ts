import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TopbarHashtagsService } from '../hashtags/service/topbar.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from '../../services/api';
import { Session } from '../../services/session';

@Component({
  selector: 'app-explore',
  host: { '(keyup)': 'keyup($event)' },
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  exploreArray = [];
  filteredArray = [];
  hashtags: [];
  paramsSubscription: Subscription;
  q: string = '';
  type: string = '';
  container: string = '';
  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  ref: string = '';

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
    public session: Session
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
      this.searchMore(true);
      // this.triggerSearchApi();
    });
  }

  async ngOnInit() {
    await this.load();
  }

  // load hashtags
  async load() {
    try {
      this.hashtags = await this.service.load(20);
      // console.log(this.hashtags);
    } catch (e) {
      // console.log(e);
    }
  }

  switchCategoryType(sType: string) {
    console.log(sType);
    this.ref = sType;
    this.router.navigate(['/explore'], {
      queryParams: {
        q: this.q,
        type: `${this.type}`,
        ref: `${this.ref}`
      }
    });
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

  // keyup event for search
  keyup(e) {
    // if (e.keyCode === 13) {
      // console.log(this.q);
      // this.search();
      if (!this.filteredArray || !this.q) {
        return (this.filteredArray = this.exploreArray);
      }
      // filter items array, items which match and return true will be
      // kept, false will be filtered out
      //   console.log('Before filter',this.filteredArray)
      // this.filteredArray = this.exploreArray.filter((item) => item.message.toString().toLowerCase().indexOf((this.q).toLowerCase()) !== -1);
      // console.log('After Filter',this.filteredArray)
      const matchFound = this.exploreArray.find(item => item.message.toString().toLowerCase().indexOf(this.q.toLowerCase()) !== -1);
      if (matchFound) {
        // console.log('Before filter', this.filteredArray)
        this.filteredArray = this.exploreArray.filter(
          item =>
            item.message
              .toString()
              .toLowerCase()
              .indexOf(this.q.toLowerCase()) !== -1
        );
        // console.log('After filter', this.filteredArray)
      }
    // }
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

  async searchMore(refresh: boolean = false) {
    if (this.inProgress) {
      return;
    }
    if (refresh) {
      this.offset = '';
    }
    this.inProgress = true;
    this.client
      .get(
        `api/v2/feeds/global/top/${this.type}`,
        {
          hashtags: this.ref,
          period: '12h',
          all: '',
          query: this.q,
          nsfw: '',
          sync: '1',
          as_activities: '1',
          from_timestamp: '',
          limit: 24,
          offset: this.offset
        },
        { cache: true }
      )
      .then((data: any) => {
        let respData: any = data;
        if (respData.entities.length === 0) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }
        if (this.filteredArray && !refresh) {
          console.log('added data');
          this.filteredArray = this.exploreArray = this.exploreArray.concat(
            respData.entities
          );
        } else {
          console.log('added new data');
          this.filteredArray = this.exploreArray = respData.entities;
        }
        this.moreData = true;
        this.offset = respData['load-next'];
        this.inProgress = false;
      })
      .catch(e => {
        this.inProgress = false;
      });
  }
  reset() {
    console.log(this.exploreArray);
    this.filteredArray = this.exploreArray = [];
  }

  slickInit(e) {
    console.log('slick initialized in activity');
  }
  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }
}

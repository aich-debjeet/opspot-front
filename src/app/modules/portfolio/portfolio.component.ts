import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from '../../services/api';
import { SpecialHashtg } from '../../helpers/special-hashtag';
import { OpspotTitle } from '../../services/ux/title';

@Component({
  selector: 'app-portfolio',
  host: {
    '(keyup)': 'keyup($event)'
  },
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  paramsSub: Subscription;
  /**temp variables */
  offset: string = '';
  q: string = '';
  type: string = 'activities';
  filteredArray: Array<Object>;
  entities: Array<Object>;
  requestParams = {
    // TODO @abhijeet check for all valid request params
    hashtags: '',
    period: '12h',
    purpose: 'portfolio',
    all: '',
    query: this.q,
    nsfw: '',
    sync: '1',
    as_activities: '1',
    from_timestamp: '',
    // activity_type: 'portfolio',
    limit: 24,
    offset: this.offset
  };
  channel: any;
  username: string;
  inProgress = false;
  moreData: any;
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private client: Client,
    public title: OpspotTitle,
  ) {
    this.title.setTitle('Portfolio');
  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.requestParams.hashtags = SpecialHashtg.concat('portfolio', params['username'])
      this.loadProfileInfo();
    });
  }

  loadProfileInfo() {
    this.client.get(`api/v1/channel/${this.username}`)
      .then((response: any) => {
        this.channel = response['channel'];
        this.searchMore();
      })
      .catch(e => {
        console.error('Error: ', e);
      });
  }
  /**
   * this method has been replaced with searchMore()
   */
  //   loadPortfolio() {
  //     this.client.get('api/v2/search', this.requestParams)
  //       .then((response: any) => {
  //         this.inProgress = false;
  //         // TODO @debjeet continue here
  //         // this.entities = response['entities'];
  //         console.log('Search result: ', response);
  //       })
  //       .catch(e => {
  //         console.error('Error: ', e);
  //       });
  //   }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  async searchMore(refresh: boolean = false) {
    if (this.inProgress) {
      return;
    }
    if (refresh) {
      // this.offset='';
      this.requestParams.offset = '';
    }
    this.inProgress = true;
    this.client.get(`api/v2/feeds/global/top/${this.type}`, this.requestParams)
    // this.client.get(`api/v4/newsfeed/personal/` + this.channel.guid, this.requestParams)
      .then((data: any) => {
        const respData: any = data;
        if (!respData.entities || respData.entities.length == 0) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }
        if (this.filteredArray && !refresh) {
          this.filteredArray = this.entities = this.entities.concat(respData.entities);
        } else {
          this.filteredArray = this.entities = respData.entities;
        }
        this.moreData = true;

        this.requestParams.offset = data['load-next'];

        this.inProgress = false;
      })
      .catch((e) => {
        this.moreData = false;
        this.inProgress = false;
      });
  }

  keyup(e) {
    if (e.keyCode === 13) {
      if (!this.filteredArray || !this.q) {
        return this.filteredArray = this.entities;
      }
      if (this.entities.find((item: any) => item.message.toString().toLowerCase() === this.q.toLowerCase())) {
        this.filteredArray = this.entities.filter((item: any) => item.message.toString().toLowerCase().indexOf((this.q).toLowerCase()) !== -1)
      }
    }
  }

  onChange(e: any) {
    this.type = e;
    this.reset();
    this.searchMore(true);
  }
  appendData(event: any){
    this.filteredArray= [...this.filteredArray, event['activity']];
    
  }

  reset() {
    this.filteredArray = [];
  }
}
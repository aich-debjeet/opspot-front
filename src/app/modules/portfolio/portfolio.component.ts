import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from '../../services/api';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  paramsSub: Subscription;
  /**temp variables */
  offset: string = '';
  q: string = '';
  type: string = '';
  entities: Array<Object>;
  requestParams = {
    // TODO @abhijeet check for all valid request params
    taxonomies: 'activity',
    offset: '',
    limit: 12,
    rating: 2,
    q: ''
  };
  channel: any;
  username: string;
  inProgress = false;
  moreData: any;

  constructor(
    private route: ActivatedRoute,
    private client: Client
  ) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.requestParams.q = 'portfolio' + params['username'];
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
      this.offset = '';
    }
    this.inProgress = true;
    this.client.get('api/v2/search', this.requestParams)
      .then((data: any) => {
        const respData: any = data;
        if (!respData.entities) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }
        if (this.entities && !refresh) {
          this.entities = this.entities.concat(respData.entities);
        } else {
          this.entities = respData.entities;
        }
        this.offset = data['load-next'];
        this.inProgress = false;
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

}

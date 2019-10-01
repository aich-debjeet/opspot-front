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
  portfolioMedia: any[];
  requestParams = {
    taxonomies: 'activity',
    offset: '',
    limit: 10,
    q: ''
  };
  channel = {
    username: ''
  };
  inProgress = false;

  constructor(
    private route: ActivatedRoute,
    private client: Client
  ) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params) => {
      this.channel.username = params['username'];
      this.requestParams.q = '#portfolio' + params['username'];
      this.loadProfileInfo();
    });
  }

  loadProfileInfo() {
    console.log('loadProfileInfo()');
    try {
      this.inProgress = true;
      this.client.get(`api/v1/channel/${this.channel.username}`, )
        .then((response: any) => {
          this.inProgress = false;
          this.channel = response['channel'];
          this.loadPortfolio();
        })
        .catch(e => {
          console.error('Error: ', e);
        });
    } catch (e) {
      this.inProgress = false;
    }
  }

  loadPortfolio() {
    this.client.get('api/v2/search', this.requestParams)
      .then((response: any) => {
        this.inProgress = false;
        this.loadPortfolio();
      })
      .catch(e => {
        console.error('Error: ', e);
      });
    // console.log('resp', resp);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}

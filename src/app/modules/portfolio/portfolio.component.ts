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

  paramsSubscription: Subscription;
  portfolioMedia: any[];
  username: string;

  constructor(
    private route: ActivatedRoute,
    private client: Client
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.load();
    });
  }

  load() {
    this.client.get('api/v3/portfolio/' + this.username)
    .then((response: any) => {
      this.portfolioMedia = response.data;
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}

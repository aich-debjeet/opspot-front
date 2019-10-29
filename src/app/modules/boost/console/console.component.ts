import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OpspotTitle } from '../../../services/ux/title';
import { BoostService } from '../boost.service';
import { Client } from '../../../services/api';
import { OpspotUser, OpspotActivityObject } from '../../../interfaces/entities';
import { Session } from '../../../services/session';

export type BoostConsoleType = 'newsfeed' | 'content' | 'offers' | 'publisher';
export type BoostConsoleFilter = 'create' | 'history' | 'earnings' | 'payouts' | 'settings' | 'inbox' | 'outbox';

@Component({
  moduleId: module.id,
  providers: [BoostService],
  selector: 'm-boost-console',
  templateUrl: 'console.component.html',
  styleUrls: ['console.component.scss']
})
export class BoostConsoleComponent {

  type: BoostConsoleType = 'newsfeed';
  opspot: Opspot = window.Opspot;
  initialized: boolean = false;
  inProgress: boolean = false;
  boosts: any[] = [];
  offset = '';
  moreData = true;
  feed: Array<Object> = [];
  error: string = '';

  constructor(public session: Session,private router: Router, private route: ActivatedRoute, public title: OpspotTitle, public service: BoostService, public client: Client) {
    this.title.setTitle('Boost Console');
  }

  ngOnInit() {
    // this.route.firstChild.url.subscribe(segments => {
    //   console.log(segments);
    //   this.type = <BoostConsoleType>segments[0].path;
    // });
    this.getMyPosts();
    this.load(true);

  }
  load(refresh?: boolean) {
    if ((this.inProgress && !refresh) || !this.type) {
      return;
    }

    this.inProgress = true;

    if (refresh) {
      this.boosts = [];
      this.offset = '';
      this.moreData = true;
    }

    const type: string = this.type;

    this.service.load(type, '', {
      offset: this.offset
    })
      .then(({ boosts, loadNext }) => {
        console.log(boosts)
        this.inProgress = false;

        if (!boosts.length) {
          this.moreData = false;
          return;
        }

        this.boosts.push(...boosts);
        this.offset = loadNext;
        this.moreData = !!loadNext;
      })
      .catch(e => {
        this.inProgress = false;
        this.moreData = false;
        this.error = (e && e.message) || '';
      });
  }
  getMyPosts(){
    console.log('get my post')
    let params: any = {
      limit: 3,
      offset: ''
    }
    this.client.get('api/v1/newsfeed/personal/' + this.opspot.user.guid, params, { cache: true })
      .then((data: OpspotActivityObject) => {
        if (!data.activity) {
          // this.moreData = false;
          // this.inProgress = false;
          return false;
        }
        if(data.activity){
          // for (let activity of data.activity) {
          //   console.log(activity);
          //   this.feed.push(activity);
          // }
          this.feed = data.activity;
          console.log(data)
        }
      })
      .catch(function (e) {

      });
  }
}

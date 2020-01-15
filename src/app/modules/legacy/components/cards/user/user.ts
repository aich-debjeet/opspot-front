import { Component, OnInit } from '@angular/core';

import { Session } from '../../../../../services/session';
import { Client } from '../../../../../services/api';

@Component({
  moduleId: module.id,
  selector: 'opspot-card-user',
  inputs: ['object', 'avatarSize', 'cardType'],
  templateUrl: 'user.html'
})

export class UserCard implements OnInit {

  user: any;
  opspot = window.Opspot;
  avatarSize: string = 'medium';
  cardType: string = 'default';
  bannerSrc: string;
  offset: string = '';
  subscriptionCount = 0;
  subscriberCount = 0;

  constructor(
    public session: Session,
    public client: Client
  ) { }

  set object(value: any) {
    this.user = value;
    this.bannerSrc = `${this.opspot.cdn_url}fs/v1/banners/${this.user.guid}/fat/${this.user.icontime}`;
  }

  ngOnInit() {
    this.client.get(`api/v1/channel/${this.opspot.user.username}`)
      .then(res => {
        this.subscriptionCount = res['channel']['subscriptions_count'];
        this.subscriberCount = res['channel']['subscribers_count'];
      })
      .catch((err) => {
        // console.log(err);
      });
  }
}
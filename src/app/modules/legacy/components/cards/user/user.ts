import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Session } from '../../../../../services/session';
import { Client } from '../../../../../services/api';

@Component({
  moduleId: module.id,
  selector: 'opspot-card-user',
  inputs: ['object', 'avatarSize', 'cardType'],
  templateUrl: 'user.html',
  styleUrls:['./user.scss']
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
  sidebarMsg = true;

  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor(
    public session: Session,
    public client: Client
  ) { }

  set object(value: any) {
    console.log('Portfolio',value)
    this.user = value;
    this.bannerSrc = `${this.opspot.cdn_url}fs/v1/banners/${this.user.guid}/fat/${this.user.icontime}`;
    if(this.user.guid != this.session.getLoggedInUser().guid){
      this.subscriptionCount= this.user.subscriptions_count;
      this.subscriberCount = this.user.subscribers_count;
    }
  }

  ngOnInit() {
    if (this.user.guid == this.session.getLoggedInUser().guid) {
      this.client.get(`api/v1/channel/${this.user.username}`)
        .then(res => {
          this.subscriptionCount = res['channel']['subscriptions_count'];
          this.subscriberCount = res['channel']['subscribers_count'];
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }

  subscribeCountUpdate(event: any) {
    if (event) {
      this.update.next('follow');
    } else this.update.next('unFollow');
  }

  removeUser(user: any) {
    this.remove.next(user);
  }
}
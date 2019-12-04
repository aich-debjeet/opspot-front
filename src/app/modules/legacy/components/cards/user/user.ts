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
  subscriptionCount;
  subscriberCount;
   
  constructor(public session: Session, public client: Client) {
  }
  
  set object(value: any) {
    this.user = value;
    this.bannerSrc = `${this.opspot.cdn_url}fs/v1/banners/${this.user.guid}/fat/${this.user.icontime}`;
  }
ngOnInit(){
  //  console.log(this.user)

  /* 
    @sashi/anup: quick fix TODO:
  */
  this.client.get('api/v1/subscribe/subscriptions/' + this.user.guid, { offset: this.offset })
  .then(res=>{
   this.subscriptionCount=Math.abs(res['users'].length-1)
  })
  .catch(err=>console.log(err))
  
  this.client.get('api/v1/subscribe/subscribers/' + this.user.guid, { offset: this.offset })
  .then(res=>{
   this.subscriberCount=Math.abs(res['users'].length)
  })
  .catch(err=>console.log(err))

}
}
import { Component, OnInit } from '@angular/core';
import { Session } from '../../../../services/session';
import { Client } from '../../../../services/api/client';

@Component({
  selector: 'app-appuser',
  templateUrl: './appuser.component.html',
  inputs: ['object'],
  styleUrls: ['./appuser.component.scss']
})
export class AppuserComponent implements OnInit {

  user: any;
  opspot = window.Opspot;
  avatarSize: string = 'medium';
  bannerSrc: string;
  offset: string = '';


  constructor(public session: Session, public client: Client) { }

  set object(value: any) {
    this.user = value;
    // console.log("user: ", value)
    this.bannerSrc = `${this.opspot.cdn_url}fs/v1/banners/${this.user.guid}/fat/${this.user.icontime}`;
  }







  ngOnInit() {
  }

}

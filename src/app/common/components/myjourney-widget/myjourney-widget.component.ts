import { Component, OnInit } from '@angular/core';
import { OpspotActivityObject, OpspotUser } from '../../../../app/interfaces/entities';
import { Session } from '../../../../app/services/session';
import { Client } from '../../../../app/services/api';
import { SpecialHashtg } from '../../../helpers/special-hashtag';

@Component({
  inputs: ['user'],
  selector: 'app-myjourney-widget',
  templateUrl: './myjourney-widget.component.html',
  styleUrls: ['./myjourney-widget.component.scss']
})
export class MyjourneyWidgetComponent implements OnInit {

  opspot = window.Opspot;
  user: OpspotUser;
  inProgress: boolean = false;

  entities: any[] = [];

  params: any = {
    // TODO @abhijeet check for all valid request params
    // taxonomies: 'activity',
    offset: '',
    limit: 12,
    // rating: 2,
    // q: ''
    activity_type: 'myjourney'
  };

  constructor(
    public session: Session,
    public client: Client,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    if (this.inProgress) {
      return false;
    }

    // this.params.q = SpecialHashtg.concat('myjourney', this.user.username)
    this.inProgress = true;

    this.client.get('api/v4/newsfeed/personal/' + this.user.guid , this.params)
      .then((resp: any) => {
        if (resp && resp.activity) {
          this.entities = resp.activity;
        }
        this.inProgress = false;
      })
      .catch(function (e) {
        this.inProgress = false;
      });
  }
}

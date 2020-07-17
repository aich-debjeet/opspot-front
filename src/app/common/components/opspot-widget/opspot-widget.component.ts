import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../../services/api/client';
import { Session } from '../../../services/session';
import { OpspotUser } from '../../../../app/interfaces/entities';
import { SpecialHashtg } from '../../../helpers/special-hashtag';

@Component({
  selector: 'opspot-widget',
  templateUrl: 'opspot-widget.component.html'
})
export class OpspotWidgetComponent implements OnInit {

  @Input() entityType: any;
  @Input() seeAllLink: any;
  @Input() user: any;

  entities: any[];
  reqType: string;
  inProgress: boolean = false;
  opspot = window.Opspot;
  // user: OpspotUser;


  constructor(
    private client: Client,
    private session: Session,
  ) { }

  ngOnInit() {
    this.geteData();
  }




  geteData() {
    // console.log('Widget geteData()');
    // this.inProgress = true;
    let ownerGuid = this.session.getLoggedInUser().guid;
    let endPoint, params, key;
    if (this.entityType === 'opportunity') {
      this.reqType = 'opportunities';
      key = 'entities';
      endPoint = `api/v2/feeds/container/${ownerGuid}/${this.reqType}?limit=3&sync=&as_activities=&force_public=1`
      params = {};
    } else if (this.entityType === 'event') {
      this.reqType = 'events';
      key = 'entities'
      endPoint = `api/v2/feeds/container/${ownerGuid}/${this.reqType}?limit=3&sync=&as_activities=&force_public=1`
      params = {};
    } else {
      if (this.user !== "") {
        this.reqType = this.user.username + "'s " + 'Journey'
      }
      endPoint = `api/v4/newsfeed/container/` + this.user.guid
      params = {
        activity_type: 'myjourney',
        offset: '',
        limit: 12,
        // rating: 2,
        // q: ''
      };
      key = 'activity'
    }
    this.client.get(endPoint, params)
      .then((data: any) => {
        if (data && data[key]) {
          this.entities = data[key];
        }
        this.inProgress = false;
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

}

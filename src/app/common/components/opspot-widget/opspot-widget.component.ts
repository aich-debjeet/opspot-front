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

  params: any = {
    // TODO @abhijeet check for all valid request params
    taxonomies: 'activity',
    offset: '',
    limit: 12,
    rating: 2,
    q: ''
  };


  geteData() {
    // console.log('Widget geteData()');
    // this.inProgress = true;
    let ownerGuid = this.session.getLoggedInUser().guid;
    let endPoint;
    if (this.entityType === 'opportunity') {
      this.reqType = 'opportunities';
      endPoint = `api/v2/feeds/container/${ownerGuid}/${this.reqType}?limit=3&sync=&as_activities=&force_public=1`
    } else if (this.entityType === 'event') {
      this.reqType = 'events';
      endPoint = `api/v2/feeds/container/${ownerGuid}/${this.reqType}?limit=3&sync=&as_activities=&force_public=1`
    } else {
      if (this.user !== "") {
        this.reqType = this.user.username + "'s " + 'Journey'
        this.params.q = SpecialHashtg.concat('myjourney',this.user.username)
      }
      endPoint = `api/v2/search`
    }
    this.client.get(endPoint, this.params)
      .then((data: any) => {
        if (data && data.entities) {
          this.entities = data.entities;
        }
        this.inProgress = false;
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

}

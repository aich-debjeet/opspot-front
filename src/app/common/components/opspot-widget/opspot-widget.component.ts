import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../../services/api/client';
import { Session } from '../../../services/session';

@Component({
  selector: 'opspot-widget',
  templateUrl: 'opspot-widget.component.html'
})
export class OpspotWidgetComponent implements OnInit {

  @Input() entityType: any;

  entities: any[];
  reqType: string;
  constructor(
    private client: Client,
    private session: Session
  ) { }

  ngOnInit() {
    this.geteData();
  }

  geteData() {
    console.log('Widget geteData()');
    // this.inProgress = true;
    let ownerGuid = this.session.getLoggedInUser().guid;
    if (this.entityType === 'opportunity') {
      this.reqType = 'opportunities';
    } else {
      this.reqType = 'events';
    }
    this.client.get(`api/v2/feeds/container/${ownerGuid}/${this.reqType}?limit=3&sync=&as_activities=&force_public=1`)
      .then((data: any) => {
        if (data && data.entities) {
          this.entities = data.entities;
        }
      })
      .catch((e) => {
        // this.inProgress = false;
      });
  }

}

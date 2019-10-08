import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../../services/api/client';

@Component({
  selector: 'opspot-widget',
  templateUrl: 'opspot-widget.html'
})
export class OpspotWidgetComponent implements OnInit {

  @Input() entityType: any;

  entities: any[];
  reqType: string;
  constructor(
    private client: Client
  ) { }

  ngOnInit() {
    console.log('Widget entityType: ', this.entityType);
    // return;
    this.geteData();
  }

  geteData() {
    console.log('Widget geteData()');
    // this.inProgress = true;
    // let ownerGuid = this.session.getLoggedInUser().guid;
    if (this.entityType === 'opportunity') {
      this.reqType = 'opportunities';
    } else {
      this.reqType = 'events';
    }
    this.client.get(`api/v2/feeds/container/ownerGuid/${this.reqType}?limit=3&sync=&as_activities=&force_public=1`)
      .then((data: any) => {
        console.log('Widget resp: ', data);
        if (data && data.entities) {
          this.entities = data.entities;
        }
      })
      .catch((e) => {
        // this.inProgress = false;
      });
  }

}

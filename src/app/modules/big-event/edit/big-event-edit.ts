import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api/client';


@Component({
  selector: 'app-big-event-edit',
  templateUrl: './big-event-edit.html',
  styleUrls: ['./big-event-edit.scss']
})
export class BigEventEdit implements OnInit {

  paramsSubscription: Subscription;
  inProgress: boolean = true;
  bigEvent: any;
  opspot = window.Opspot;
  coverImage;

  constructor(
    private route: ActivatedRoute,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef
  ) { }
 
  guid: any;

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.guid = params.get('guid');
        this.load();
      }
    });
  }

  load() {
    // if (this.inProgress)
    //   return false;

    // this.inProgress = true;

    this.client.get('api/v3/event/' + this.guid)
      .then((data: any) => {
        if (data.event) {
          console.log("data: ", data);
          this.bigEvent = data.event;
          if (data.event.owner_obj) {
            this.bigEvent['ownerObj'] = data.event.owner_obj;
          }
          if(this.bigEvent.custom_data){
            this.coverImage = this.bigEvent.custom_data[0].src;
            console.log("this.bigEvent.custom_data[0].src: ", this.bigEvent.custom_data[0].src);
            
          }
          this.inProgress = false;
        }
        this.detectChanges();
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

  private detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

}

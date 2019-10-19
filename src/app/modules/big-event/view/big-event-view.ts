import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api/client';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-big-event-view',
  templateUrl: './big-event-view.html',
  styleUrls: ['./big-event-view.scss']
})
export class BigEventView implements OnInit {

  inProgress: boolean = true;
  bigEvent: any;
  guid;
  paramsSubscription: Subscription;
  opspot = window.Opspot;
  coverImage;


  constructor(
    private formBuilder: FormBuilder,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
  ) { }


  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.guid = params.get('guid');
        this.load();
      }
    });
  }

  getOwnerIconTime() {
    let session = this.session.getLoggedInUser();
    if (session && session.guid === this.bigEvent.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.bigEvent.ownerObj.icontime;
    }
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

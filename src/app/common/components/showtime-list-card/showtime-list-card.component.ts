import { Component, OnInit } from '@angular/core';
import { Session } from '../../../services/session';

@Component({
  selector: 'app-showtime-list-card',
  inputs: ['_object: object'],
  templateUrl: './showtime-list-card.component.html',
  styleUrls: ['./showtime-list-card.component.scss']
})
export class ShowtimeListCardComponent implements OnInit {

  event: any;
  opspot = window.Opspot;

  constructor(public session: Session) {}

  ngOnInit() {}

  // getOwnerIconTime() {
  //   // TODO @gayatri: check for an alternate to prevent heavy work in child comp
  //   let session = this.session.getLoggedInUser();
  //   if (session && session.guid === this.event.ownerObj.guid) {
  //     return session.icontime;
  //   } else {
  //     return this.event.ownerObj.icontime;
  //   }
  // }

  set _object(value) {
    this.event = value;
  }

}

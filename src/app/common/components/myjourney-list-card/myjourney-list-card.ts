import { Component, OnInit } from '@angular/core';
import { Session } from '../../../services/session';

@Component({
    selector: 'app-myjourney-list-card',
    inputs: ['_object: object'],
    templateUrl: './myjourney-list-card.html'
})
export class MyjourneyListCardComponent implements OnInit {

    myjourney: any;
    opspot = window.Opspot;

    constructor(public session: Session) { }

    ngOnInit() { }

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
        this.myjourney = value;
    }

}

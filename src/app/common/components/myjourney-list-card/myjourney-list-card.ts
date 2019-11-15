import { Component, OnInit } from '@angular/core';
import { Session } from '../../../services/session';

@Component({
    selector: 'app-myjourney-list-card',
    inputs: ['_object: object'],
    templateUrl: './myjourney-list-card.html',
    styleUrls: ['./myjourney-list-card.scss']
})
export class MyjourneyListCardComponent implements OnInit {

    myjourney: any;
    opspot = window.Opspot;

    constructor(public session: Session) { }

    ngOnInit() { }
    set _object(value) {
        this.myjourney = value;
    }

}

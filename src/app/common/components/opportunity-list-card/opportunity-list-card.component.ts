import { Component, OnInit } from '@angular/core';
import { Session } from '../../../services/session';

@Component({
  selector: 'app-opportunity-list-card',
  inputs: ['_object: object'],
  templateUrl: './opportunity-list-card.component.html',
  styleUrls: ['./opportunity-list-card.component.scss']
})
export class OpportunityListCardComponent implements OnInit {

  constructor(
   public session: Session,
  ) { }

  ngOnInit() {
  }

  opportunity: any;
  opspot = window.Opspot;

  getOwnerIconTime() {
    // TODO @gayatri: check for an alternate to prevent heavy work in child comp
    let session = this.session.getLoggedInUser();
    if(session && session.guid === this.opportunity.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.opportunity.ownerObj.icontime;
    }
  }

  set _object(value){
    this.opportunity = value;
    console.log('this.opportunity: ', this.opportunity);
  }


}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opportunity-list-card',
  inputs: ['_object: object'],
  templateUrl: './opportunity-list-card.component.html',
  styleUrls: ['./opportunity-list-card.component.scss']
})
export class OpportunityListCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  opportunity: any;

  set _object(value){
    console.log("This value opportunity: ", value);
    this.opportunity = value;
  }


}

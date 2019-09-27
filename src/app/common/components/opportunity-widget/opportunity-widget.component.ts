import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-widget',
  inputs: ['_object: object'],
  templateUrl: './opportunity-widget.component.html',
  styleUrls: ['./opportunity-widget.component.scss']
})
export class OpportunityWidgetComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  }

  allOpportunities: any;

  set _object(value){
    console.log("This value: ", value);
    this.allOpportunities = value;
  }

}

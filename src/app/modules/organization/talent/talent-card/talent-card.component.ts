import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'opspot-talent-card',
  templateUrl: './talent-card.component.html',
  styleUrls: ['./talent-card.component.scss'],
  inputs: ['_talent : talent'],
})
export class TalentCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  talent: any;
  set _talent(value: any) {
    this.talent = value;
  }

}

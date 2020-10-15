import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enroll-cards',
  inputs: ['_object: object'],
  templateUrl: './enroll-cards.component.html',
  styleUrls: ['./enroll-cards.component.scss']
})
export class EnrollCardsComponent implements OnInit {
dispalyEnroll; any;
  constructor() { }

  ngOnInit() {
  }

  set _object(obj:any){
this.dispalyEnroll = obj;
  }

}

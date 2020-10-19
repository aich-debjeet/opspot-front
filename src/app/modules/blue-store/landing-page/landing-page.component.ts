import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
defaultOption: string;
  constructor() { 
    this.defaultOption = 'BlueStore'
  }

  ngOnInit() {
  }

  changeMarketType(type: string){
    this.defaultOption = type;
  }

}

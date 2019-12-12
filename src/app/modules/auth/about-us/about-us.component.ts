import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  opened: boolean = false;
  opspot = window.Opspot;
  tab: string ='WhatIsOps';
  constructor() { }

  scrollToElement($element, s:string): void {
    this.tab= s;
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }


}

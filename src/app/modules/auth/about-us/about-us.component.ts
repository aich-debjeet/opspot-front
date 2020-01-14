import { Component } from '@angular/core';
import { OpspotTitle } from '../../../services/ux/title';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  opened: boolean = false;
  opspot = window.Opspot;
  tab: string ='WhatIsOps';
  constructor(
    public title: OpspotTitle,
  ) {
    this.title.setTitle('About');
   }

  scrollToElement($element, s:string): void {
    this.tab= s;
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }


}

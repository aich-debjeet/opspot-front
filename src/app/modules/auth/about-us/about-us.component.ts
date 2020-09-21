import { Component } from '@angular/core';
import { OpspotTitle } from '../../../services/ux/title';
import { fstat } from 'fs';


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
  
   downloadFile(filePath){

     console.log(filePath)
    var link=document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
    link.remove();
}

  

}



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-security',
  templateUrl: './privacy-security.component.html',
  styleUrls: ['./privacy-security.component.scss']
})
export class PrivacySecurityComponent implements OnInit {
  displayPassword:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  changePassword(){
    if(this.displayPassword) this.displayPassword = false;
    else this.displayPassword = true;
  }
}

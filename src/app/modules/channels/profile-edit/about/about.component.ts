import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Client } from '../../../../services/api/client';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  constructor(private client:Client) { }
  date;
  model:any={}
  data=["Kannada","English" ,"Hindi" ,"Tamil"]

  bsConfig={
    containerClass:'theme-dark-blue',
    adaptivePosition: true,
    dateInputFormat: 'DD-MM-YYYY'
  }
  privacy={dob:'Everyone',height:'Everyone'}
  toggleHeight;
  toggleDob;


  ngOnInit() {
    this.load()

    //set privacy
  }

  changePrivacy(e,arg){
  if(arg==='dob'){
    this.privacy.dob=e;
    this.toggleDob=!this.toggleDob
  }else{
    this.privacy.height=e;
    this.toggleHeight=!this.toggleHeight
  }
 }
 

 async load(){
   let res =await this.client.get('api/v1/channel/me')
   console.log(res)
 }

  onSelect(e){
    console.log(e)
    this.date=e
    this.model.dob=e
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Client } from '../../../../services/api/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  constructor(private client:Client,public router:Router) { 
  this.data=["Kannada","English" ,"Hindi" ,"Tamil"]
  this.load()

  }
  date;
  model:any={}
  data;
  bsConfig={
    containerClass:'theme-dark-blue',
    adaptivePosition: true,
    dateInputFormat: 'DD-MM-YYYY'
  }
  privacy={dob:'Everyone',height:'Everyone'}
  toggleHeight;
  toggleDob;
  aboutError={dob:false,dobInvalid:false,gender:false};
  submitted = false;

  ngOnInit() {

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
   // TODO @shashi: create model for type about
   let res =await this.client.get('api/v1/channel/me')
   let dob=res['channel'].dob
   let response:any=res['channel']
   this.model.dob=new Date(dob)
   this.model.description=response.about.description;
   this.model.gender=response.about.gender;
   this.model.dob_visibility=response.about.dob_visibility;
   this.privacy.dob=response.about.dob_visibility;
   this.privacy.height=response.about.height_and_weight_visibility;
   this.model.height_and_weight_visibility=response.about.height_and_weight_visibility;
   this.model.height=response.about.height;
   this.model.weight=response.about.weight;
   let lngugs=[]
   response.about.language.map(el=>{lngugs.push({display:el,value:el})})
   this.model.languages=lngugs
 }
  
 onSubmit(e){
   this.submitted=true;
   let dob={}
   if(new Date(this.model.dob).getTime()){
    dob['year']= new Date(this.model.dob).getFullYear() 
    dob['month']=this.month[new Date(this.model.dob).getMonth()]
    dob['date']= new Date(this.model.dob).getDate() 
    dob=dob['year']+'-'+dob['month']+'-'+dob['date']
   }else{
     this.aboutError.dobInvalid=true;
   }
    if(new Date().getFullYear()-new Date(this.model.dob).getFullYear()<10){
      this.aboutError.dob=true; }
     
    let language;
    
    if(e.languages){
       language=this.model.languages.map(el=>el.value)
    }  
   
    if(e.valid){
      let about={
        "about":{
          "description":this.model.description,
           "dob":dob,
            "gender":this.model.gender,
            "language":this.model.languages.map(el=>el.value),
            "height":this.model.height,
            "weight":this.model.weight,
            "dob_visibility":this.privacy.dob,
            "height_and_weight_visibility":this.privacy.height
        }
      }

      this.client.post("api/v1/entities/about",about).then(res=>{
        this.router.navigate(['/profile_edit/contact'])
      })
    }
  }


 month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
}

import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../services/api/client';
import { Router } from '@angular/router';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private client :Client,private router:Router) { }


 privacy={location:"Everyone",email:"Everyone" ,phone:"Everyone" ,website:"Everyone"}
 toggleLocation;
 toggleEmail;
 togglePhone;
 toggleWebsite;
 phoneNumber

 model:any={}
 
 ngOnInit(){
   this.load()
 }


  
 changePrivacy(e,arg){


 switch (arg) {
   case "location":
     this.privacy.location = e;
     this.toggleLocation = !this.toggleLocation;
     break;

   case "email":
     this.privacy.email = e;
     this.toggleEmail = !this.toggleEmail;
     break;

   case "phone":
     this.privacy.phone = e;
     this.togglePhone = !this.togglePhone;
     break;

   case "website":
     this.privacy.website = e
     this.toggleWebsite = !this.toggleWebsite;
     break;

 }
 
}


async load(){
  let res={}
  res=await this.client.get('api/v1/channel/me') ;
  res=res['channel']
    this.model.phoneNumber=res["phone"].substring(2)
    this.model.email=res['email']
    if(res['contact_details']){
     this.model.location=res['contact_details'].location;
     this.model.website=res['contact_details'].website;
     this.privacy.email=res['contact_details'].email_visibility;
     this.privacy.location=res['contact_details'].location_visibility;
     this.privacy.website=res['contact_details'].website_visibility;
     this.privacy.phone=res['contact_details'].phone_visibility;
    }
  }

    onSubmit() {


      let contact = {
        "contact_details": {
          "email": this.model.email,
          "location": this.model.location ? this.model.location : '',
          "phone": this.model.phoneNumber.internationalNumber,
          "website": this.model.website ? this.model.website : '',
          "location_visibility": this.privacy.location,
          "phone_visibility": this.privacy.email,
          "email_visibility": this.privacy.phone,
          "website_visibility": this.privacy.website

        }
      }
      this.client.post('api/v1/entities/contact_details', contact).then(res=>{
        this.router.navigate(['/profile/work'])
      })
    }

  }



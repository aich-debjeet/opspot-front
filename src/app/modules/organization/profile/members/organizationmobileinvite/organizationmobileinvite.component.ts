import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../../organization-service';


@Component({
  selector: 'app-organization-mobile-invite',
  templateUrl: './organizationmobileinvite.component.html'
})
export class OrganizationMobileInvite implements OnInit {

  constructor(private _location:Location
    ,public route:ActivatedRoute,
     private service:OrganizationService) { 
   this.route.params.subscribe(params=>{
     if(params['guid']){
      this.load(params['guid'])
       
     }
   })

 }

 ngOnInit() {
 }
 organization;

 goBack(){
  this._location.back()
 }

async load(guid){
   let organization= await this.service.load(guid)
   this.organization=organization;
 }
}

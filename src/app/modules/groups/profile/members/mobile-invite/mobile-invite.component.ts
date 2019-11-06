import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../../../groups-service';

@Component({
  selector: 'app-mobile-invite',
  templateUrl: './mobile-invite.component.html',
  styleUrls: ['./mobile-invite.component.scss']
})
export class MobileInviteComponent implements OnInit {

  constructor(private _location:Location
     ,public route:ActivatedRoute,
      private service:GroupsService) { 
    this.route.params.subscribe(params=>{
      if(params['guid']){
       this.load(params['guid'])
        
      }
    })

  }

  ngOnInit() {
  }
  group;

  goBack(){
   this._location.back()
  }

 async load(guid){
    let group= await this.service.load(guid)
    this.group=group;
  }
}


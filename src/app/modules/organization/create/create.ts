

import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OpspotTitle } from '../../../services/ux/title';
import { Session } from '../../../services/session';
import FileHandler from '../../../utils/file-handle';
import {Location} from '@angular/common';
import { ORGANIZATION_TYPE} from '../../../services/list-options';
import { OrganizationService } from '../organization-service';
import { CommonEventsService } from '../../../services/common-events.service';


@Component({
  moduleId: module.id,
  selector: 'opspot-organization-create',
  host: {
    '(keydown)': 'keyDown($event)'
  },
  templateUrl: 'create.html',
})

export class OrganizationCreator {

  
  //code
  skills;
  croppieImage;
  open=false;
  editOrganization;
  organizationTypeList = ORGANIZATION_TYPE;

  //
  @ViewChild('editImgcomp')editImgcomp:ElementRef;
  opspot = window.Opspot;
  banner: any = false;
  avatar: any = false;
  organization: any = {
    name: '',
    description: '',
    membership: 2,
    tags: [],
    invitees: '',
    moderated:0,
    default_view: 0,
    //EXTRA PARAMETERS FOR ORGANIZATION
    category:'',
    location: '',
    entity_type:'organization'
  };
  cropedImg;
  // invitees: Array<any> = [];
  editing: boolean = true;
  editDone: boolean = false;
  inProgress: boolean = false;

  constructor(
    public session: Session, 
    public service: OrganizationService, 
    public router: Router, 
    public title: OpspotTitle ,
    public route:ActivatedRoute,
    private _location: Location,
    public commService: CommonEventsService
    ) {
    this.title.setTitle('Create Organization');
  }

  addBanner(banner: any) {
    this.banner = banner.file;
    this.organization.banner_position = banner.top;
  }

  addAvatar(avatar: any) {
    this.avatar = avatar;
  }

//   membershipChange(value) {
//     this.group.membership = value;
//   }


//   invite(user: any) {
//     for (let i of this.invitees) {
//       if (i.guid === user.guid)
//         return;
//     }
//     this.invitees.push(user);
//   }

//   removeInvitee(i) {
//     this.invitees.splice(i, 1);
//   }

  keyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
  }

  save(e) {

    if (!(this.organization.name && this.organization.location && this.organization.category)) {
      return;
    }

    this.editing = false;
    this.editDone = true;
    this.inProgress = true;

    // this.organization.invitees = this.organization.map((user) => {
    //   return user.guid;
    // });
    //  this.organization.moderated===false?(this.organization.moderated=0):(this.organization.moderated=1);
         
     if(Object.values(this.organization.tags).length>0){
      this.organization.tags=this.organization.tags.map(el=>el.value)
     }


     this.service.save(this.organization)
      .then((guid: any) => {

        this.service.upload({
          guid,
          banner_position: this.organization.banner_position
        }, {
            banner: this.banner,
            avatar: this.avatar
          })
          .then(() => {
            this.inProgress = false;
            this.router.navigate(['organization/profile', guid]);
            this.navUpdateOrg();
          });

      })
      .catch(e => {
        this.editing = true;
        this.inProgress = false;
      });
  }

  onTagsChange(tags) {
  }

  onTagsAdded(tags) {
    if (!this.organization.tags)
      this.organization.tags = [];

    for (let tag of tags) {
      this.organization.tags.push(tag.value);
    }
  }

  onTagsRemoved(tags) {
    for (let tag of tags) {
      for (let i in this.organization.tags) {
        console.log(this.organization.tags[i]);
        if (this.organization.tags[i] == tag.value) {
          this.organization.tags.splice(i, 1);
        }
      }
    }
  }

 ngOnInit(){
  this.route.params.subscribe(params=>{
   if(params['guid']){
     this.load(params['guid'])
     this.editOrganization=true;
   }
  })
 }


 add(e){
  this.open=true;
  FileHandler.fileSelector(e, (res)=>{this.croppieImage=res})
}

  close(){
  this.open=false;
  }

  crop(e){
    this.avatar=e;
    let reader=new FileReader()
    reader.onload=()=>{
       this.cropedImg=reader.result;
    }
    reader.readAsDataURL(e)
    this.organization=this.organization
    this.open=false;
  }

 openCropper(){
 this.editImgcomp.nativeElement.click() 
 }

 async load(guid){
   try{
     let organization= await this.service.load(guid)
     if(organization['is:owner']){
      this.organization=organization         
      organization.tags.map(el=>{ 
       this.organization.tags.push({display:el,value:el})})
       this.organization.tags=this.organization.tags.filter(el=>el.display)
       this.cropedImg=`${this.opspot.cdn_url}fs/v1/avatars/${guid}/medium/${this.organization.icon_time}`;
      }
   }
   catch(e){
     console.log(e)
   }
 }

 
 organizationReset() {
  this._location.back();
 }

 navUpdateOrg() {
  console.log('trigger');
  this.commService.trigger({
    component: 'TopbarComponent',
    action: 'orgCreated'
  });
 }

}


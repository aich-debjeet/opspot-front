// import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';

// import { GroupsService } from '../groups-service';

// import { OpspotTitle } from '../../../services/ux/title';
// import { Session } from '../../../services/session';
// import FileHandler from '../../../utils/file-handle';

// @Component({
//   moduleId: module.id,
//   selector: 'opspot-groups-create',
//   host: {
//     '(keydown)': 'keyDown($event)'
//   },
//   templateUrl: 'create.html',
// })

// export class GroupsCreator {

  
//   //code
//   skills;
//   croppieImage;
//   open=false;
//   editCommunity;
//   //
//   @ViewChild('editImgcomp')editImgcomp:ElementRef;
//   opspot = window.Opspot;
//   banner: any = false;
//   avatar: any = false;
//   group: any = {
//     name: '',
//     description: '',
//     membership: 2,
//     tags: [],
//     invitees: '',
//     moderated:0,
//     default_view: 0
//   };
//   cropedImg;
//   invitees: Array<any> = [];
//   editing: boolean = true;
//   editDone: boolean = false;
//   inProgress: boolean = false;

//   constructor(public session: Session, public service: GroupsService, public router: Router, public title: OpspotTitle ,public route:ActivatedRoute) {
//     this.title.setTitle('Create Group');
//   }

//   addBanner(banner: any) {
//     this.banner = banner.file;
//     this.group.banner_position = banner.top;
//   }

//   addAvatar(avatar: any) {
//     this.avatar = avatar;
//   }

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

//   keyDown(e) {
//     if (e.keyCode === 13) {
//       e.preventDefault();
//       return false;
//     }
//   }

//   save(e) {

//     if (!this.group.name) {
//       return;
//     }

//     this.editing = false;
//     this.editDone = true;
//     this.inProgress = true;

//     this.group.invitees = this.invitees.map((user) => {
//       return user.guid;
//     });
//      this.group.moderated===false?(this.group.moderated=0):(this.group.moderated=1);
     

//      ///issue  
//     //  console.log(this.group.tags,
        
//     //   )
     
//      if(Object.values(this.group.tags).length>0){
//       this.group.tags=this.group.tags.map(el=>el.value)
//      }


//      this.service.save(this.group)
//       .then((guid: any) => {

//         this.service.upload({
//           guid,
//           banner_position: this.group.banner_position
//         }, {
//             banner: this.banner,
//             avatar: this.avatar
//           })
//           .then(() => {
//             this.router.navigate(['/groups/profile', guid]);
//           });

//       })
//       .catch(e => {
//         this.editing = true;
//         this.inProgress = false;
//       });
//   }

//   onTagsChange(tags) {
//   }

//   onTagsAdded(tags) {
//     if (!this.group.tags)
//       this.group.tags = [];

//     for (let tag of tags) {
//       this.group.tags.push(tag.value);
//     }
//   }

//   onTagsRemoved(tags) {
//     for (let tag of tags) {
//       for (let i in this.group.tags) {
//         console.log(this.group.tags[i]);
//         if (this.group.tags[i] == tag.value) {
//           this.group.tags.splice(i, 1);
//         }
//       }
//     }
//   }

//  ngOnInit(){
//   this.route.params.subscribe(params=>{
//    if(params['guid']){
//      this.load(params['guid'])
//      this.editCommunity=true;
//    }
//   })
//  }


//  add(e){
//   this.open=true;
//   FileHandler.fileSelector(e, (res)=>{this.croppieImage=res})
// }

//   close(){
//   this.open=false;
//   }

//   crop(e){
//     this.avatar=e;
//     let reader=new FileReader()
//     reader.onload=()=>{
//        this.cropedImg=reader.result;
//     }
//     reader.readAsDataURL(e)
//     this.group=this.group
//     this.open=false;
//   }

//  openCropper(){
//  this.editImgcomp.nativeElement.click() 
//  }

//  async load(guid){
//    try{
//      let group= await this.service.load(guid)
//      if(group['is:owner']){
//       this.group=group         
//        group.tags.map(el=>{ 
//        this.group.tags.push({display:el,value:el})})
//        this.group.tags=this.group.tags.filter(el=>el.display)
//        this.cropedImg=`${this.opspot.cdn_url}fs/v1/avatars/${guid}`;
//       }
//       console.log(group)
//    }
//    catch(e){
//      console.log(e)
//    }
//  }

//  // fix: AOT
//  // TODO @shashi: required? 
//  groupReset() {

//  }

// }

import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupsService } from '../groups-service';

import { OpspotTitle } from '../../../services/ux/title';
import { Session } from '../../../services/session';
import FileHandler from '../../../utils/file-handle';
import {Location} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'opspot-groups-create',
  // host: {
  //   '(keydown)': 'keyDown($event)'
  // },
  templateUrl: 'create.html',
})

export class GroupsCreator {

  
  //code
  skills;
  croppieImage;
  open=false;
  editCommunity;
  //
  @ViewChild('editImgcomp')editImgcomp:ElementRef;
  opspot = window.Opspot;
  banner: any = false;
  avatar: any = false;
  group: any = {
    name: '',
    description: '',
    membership: 2,
    tags: [],
    invitees: '',
    moderated: false,
    default_view: 0,
    entity_type: 'community'
  };
  cropedImg;
  invitees: Array<any> = [];
  editing: boolean = true;
  editDone: boolean = false;
  inProgress: boolean = false;

  constructor(
    public session: Session, 
    public service: GroupsService, 
    public router: Router, 
    public title: OpspotTitle ,
    public route:ActivatedRoute,
    private _location: Location
    ) {
    this.title.setTitle('Create Community');
  }

  addBanner(banner: any) {
    this.banner = banner.file;
    this.group.banner_position = banner.top;
  }

  addAvatar(avatar: any) {
    this.avatar = avatar;
  }

  membershipChange(value) {
    this.group.membership = value;
  }


  invite(user: any) {
    for (let i of this.invitees) {
      if (i.guid === user.guid)
        return;
    }
    this.invitees.push(user);
  }

  removeInvitee(i) {
    this.invitees.splice(i, 1);
  }

  keyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
  }

  save(e) {

    if (!this.group.name) {
      return;
    }

    this.editing = false;
    this.editDone = true;
    this.inProgress = true;

    this.group.invitees = this.invitees.map((user) => {
      return user.guid;
    });

     if (this.group.moderated === false) {
      this.group.moderated = 0;
     } else {
      this.group.moderated = 1;
     }

     
         
     if(Object.values(this.group.tags).length>0){
      this.group.tags=this.group.tags.map(el=>el.value)
     }


     this.service.save(this.group)
      .then((guid: any) => {

        this.service.upload({
          guid,
          banner_position: this.group.banner_position
        }, {
            banner: this.banner,
            avatar: this.avatar
          })
          .then(() => {
            this.router.navigate(['/groups/profile', guid]);
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
    if (!this.group.tags)
      this.group.tags = [];

    for (let tag of tags) {
      this.group.tags.push(tag.value);
    }
  }

  onTagsRemoved(tags) {
    for (let tag of tags) {
      for (let i in this.group.tags) {
        console.log(this.group.tags[i]);
        if (this.group.tags[i] == tag.value) {
          this.group.tags.splice(i, 1);
        }
      }
    }
  }

 ngOnInit(){
  this.route.params.subscribe(params=>{
   if(params['guid']){
     this.load(params['guid'])
     this.editCommunity=true;
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
    this.group=this.group
    this.open=false;
  }

 openCropper(){
 this.editImgcomp.nativeElement.click() 
 }

 async load(guid){
   try{
     let group= await this.service.load(guid)
     if(group['is:owner']){
      this.group=group   
      // console.log("group: ", this.group);    
       group.tags.map(el=>{ 
       this.group.tags.push({display:el,value:el})})
       this.group.tags=this.group.tags.filter(el=>el.display)
       this.cropedImg=`${this.opspot.cdn_url}fs/v1/avatars/${guid}/medium/${this.group.icon_time}`;
      }
      // console.log(group)
   }
   catch(e){
    //  console.log(e)
   }
 }

 groupReset() {
  this._location.back();
 }

}


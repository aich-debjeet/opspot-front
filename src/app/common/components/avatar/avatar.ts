import { Component, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { CroppieOptions, ResultOptions, CropData } from 'croppie';


@Component({
  selector: 'opspot-avatar',
  inputs: ['_object: object', '_src: src', '_editMode: editMode','_profileEdit:profileEdit', 'waitForDoneSignal', 'icon', 'showPrompt','groupProfile'],
  outputs: ['added'],
  template: `
  <div *ngIf="!proEdit" class="opspot-avatar" [style.background-image]="'url(' + src + ')'">
    <img *ngIf="!src" src="{{opspot.cdn_assets_url}}assets/avatars/blue/default-large.png" class="mdl-shadow--4dp" />
    <div *ngIf="editing" class="overlay">
      <i class="material-icons">{{icon}}</i>
      <ng-container *ngIf="showPrompt">
        <span *ngIf="src" i18n="@@COMMON__AVATAR__CHANGE">Change avatar</span>
        <span *ngIf="!src" i18n="@@COMMON__AVATAR__ADD">Add an avatar</span>
      </ng-container>  
    </div>
    <input *ngIf="editing" type="file" #file (change)="add($event)"/>
  </div>

  <div *ngIf="proEdit" class="o-prof-img-block">
        <div class="o-avatar-xl o-avatar-xl--prof" [style.background-image]="'url(' + src + ')'" >
            <img *ngIf="!src" src="{{opspot.cdn_assets_url}}assets/avatars/blue/default-large.png" class="mdl-shadow--4dp" />
            <a *ngIf="opspot.user.guid===object.guid||groupProfile||object['is:owner']" class="o-prof-img-edit" (click)="openFileSelect()"><i class="icon-edit-profile"></i></a>
        </div>
      <input  style="display:none" id="onfile" type="file" #file (change)="add($event)"/>
  
      <app-image-croper [open]="open" (closed)=close() [croppieImage]="croppieImage" [croperType]="'circle'" (imgResult)="newImageResultFromCroppie($event)">
      </app-image-croper>
     
    </div>

    <style>
    ::ng-deep .cr-boundary {
      width: 400px;
      height: 400px;
      position: relative;
      overflow: hidden;
      margin: 0 auto;
      z-index: 1;
      // width: 100%;
      // height: 100%;
    }
    
    ::ng-deep .cr-viewport.cr-vp-square {
      width: 200px !important;
      height: 200px !important;
      border-radius: 100%;
      position: absolute;
      border: 2px solid #fff;
      margin: auto;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      -webkit-box-shadow: 0 0 2000px 2000px rgba(0, 0, 0, 0.5);
      box-shadow: 0 0 2000px 2000px rgba(0, 0, 0, 0.5);
      z-index: 0;
    }
    
    ::ng-deep .cr-overlay {
      z-index: 1;
      position: absolute;
      cursor: move;
      -ms-touch-action: none;
      touch-action: none;
      transform: translateZ(0);
    }
    ::ng-deep .cr-slider{
      outline: 0;
      border: 0;
      border-radius: 506px;
      width: 400px;
      max-width: 100%;
      margin: 24px 0;
      transition: box-shadow 0.2s 
    }

    ::ng-deep .cr-slider-wrap{
      text-align:center
    }
    </style>
  `
})
// <div *ngIf="editing" class="overlay">
// <i class="material-icons">{{icon}}</i>
// <ng-container *ngIf="showPrompt">
//   <span *ngIf="src" i18n="@@COMMON__AVATAR__CHANGE">Change avatar</span>
//   <span *ngIf="!src" i18n="@@COMMON__AVATAR__ADD">Add an avatar</span>
// </ng-container>
// </div>

 // <m-modal [open]="open" (closed)="close()"  >
      // <ngx-croppie *ngIf="croppieImage" #ngxCroppie [croppieOptions]="croppiavatareOptions" [imageUrl]="croppieImage" [points]="[0,0,400,400]" (result)="newImageResultFromCroppie($event)">
      // </ngx-croppie>
      // <button class='btn btn-primary btn-xs btn--boost' (click)="done()" >Crop</button>
      // </m-modal>

export class OpspotAvatar {
 
 
 
  opspot: Opspot = window.Opspot;
  object;
  editing: boolean = false;
  proEdit:boolean=false;
  waitForDoneSignal: boolean = true;
  src: string = '';
  index: number = 0;
  icon: string = 'camera';
  showPrompt: boolean = true;
  croppieImage;
  file: any;
  added: EventEmitter<any> = new EventEmitter();
  widthPx = '400';
  heightPx = '400';
  open=false;
  editedImg;
  uploadImg;
  @Output() closed: EventEmitter<any> = new EventEmitter();
  @Input()groupProfile;
   
  public get croppieOptions(): CroppieOptions {
    const opts: CroppieOptions = {};
    opts.viewport = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.boundary = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.enforceBoundary = true;
    return opts;
  }

  close() {
    this.open = false;
    this.closed.emit();
  }

  newImageResultFromCroppie(e){
    this.editedImg=e;
    this.done()
  }

  set _object(value: any) {
    if (!value)
      return;

    value.icontime = value.icontime ? value.icontime : '';
    this.object = value;
    this.src = `${this.opspot.cdn_url}fs/v1/avatars/${this.object.guid}/medium/${this.object.icontime}`;
    if (this.object.type === 'user')
      this.src = `${this.opspot.cdn_url}icon/${this.object.guid}/medium/${this.object.icontime}`;
  }

  set _src(value: any) {
    this.src = value;
  }

  set _editMode(value: boolean) {
    this.editing = value;
    if (!this.editing && this.file)
      this.done();
  }


  
  // profile image edit
  set _profileEdit(value:boolean){
    this.proEdit=value;
    if (!this.editing && this.file)
    this.done();
  }

  add(e) {
    // if (!this.editing)
    //   return;
    var element: any = e.target ? e.target : e.srcElement;
    this.file = element ? element.files[0] : null;

     this.open=true;
    // console.log(this.file)
    /**
     * Set a live preview
     */
    var reader = new FileReader();
    reader.onloadend = () => {
      // this.src = typeof reader.result ===  'string' ? reader.result : reader.result.toString();
      this.croppieImage=typeof reader.result ===  'string' ? reader.result : reader.result.toString()
      // this.modalOpener=true;
    };
    reader.readAsDataURL(this.file);

    element.value = '';

    // console.log(this.waitForDoneSignal);
    // if (this.waitForDoneSignal !== true)
    //   this.done();
  }

//   dataURItoBlob(dataURI) {
//     this.src=dataURI;
//     var startIndex = dataURI.indexOf("base64,") + 7;
//     var b64 = dataURI.substr(startIndex);
//     const byteString = window.atob(b64);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const int8Array = new Uint8Array(arrayBuffer);
//     for (let i = 0; i < byteString.length; i++) {
//       int8Array[i] = byteString.charCodeAt(i);
//     }
//     const blob = new Blob([int8Array], { type: 'image/jpeg/png' });    
//     return blob;
//  }
  
//  base64ToImage(){
//   const date = new Date().valueOf();
//   let text = '';
//   const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (let i = 0; i < 5; i++) {
//     text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
//   }
//   // Replace extension according to your media type
//   const imageName = date + '.' + text + '.jpeg';
//   // call method that creates a blob from dataUri
//   const imageBlob = this.dataURItoBlob(this.editedImg);
//   const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
//   return imageFile;
//  }
   
  done() {
    // this.added.next(this.file);
    // console.log(this.file, this.editedImg)
    // this.editedImg=this.base64ToImage()
    this.added.next(this.editedImg)
    this.file = null;
    this.open=false;
    window.Opspot
  }


  enableEdit(){
    this.editing=true;
  }

  openFileSelect(){
  document.getElementById('onfile').click()
  }
  
}

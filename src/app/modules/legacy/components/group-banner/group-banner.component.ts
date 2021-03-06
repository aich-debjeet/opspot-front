import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-group-banner',
  templateUrl: './group-banner.component.html',
  inputs: ['_object: object', '_src: src', '_top: top', 'overlay', '_editMode: editMode', '_done: done'],
  outputs: ['added'],
  styleUrls: ['./group-banner.component.scss']
})
export class GroupBannerComponent {

  constructor(
    public router: Router,
  ) { }

  opspot: Opspot = window.Opspot;
  object;
  src: string = '';
  index: number = 0;
  top: number = 0;
  file: any;
  open: boolean = false;
  croppieImage;
  added: EventEmitter<any> = new EventEmitter();
  imageChangedEvent: any = '';
  croppedImage: any = '';


  @ViewChild('fileInput') fileInput: ElementRef


  set _object(value: any) {
    if (!value)
      return;
    this.object = value;


    if (!this.object.banner) {
      this.src = 'assets/demo/m2.jpg'
    } else {
      this.src = this.opspot.cdn_url + 'fs/v1/banners/' + this.object.guid + '/' + this.top + '/' + this.object.banner;
    }
  }
  set _top(value: number) {
    if (!value)
      return;
    this.top = value;
  }

  set _src(value: any) {
    this.src = value;
  }

  add(e) {
    this.open = false;
    var element: any = e.target ? e.target : e.srcElement;
    this.file = element ? element.files[0] : null;

    this.open = true;
    /**
     * Set a live preview
     */
    var reader = new FileReader();
    reader.onloadend = () => {
      this.croppieImage = typeof reader.result === 'string' ? reader.result : reader.result.toString();
    };
    reader.readAsDataURL(this.file);

    element.value = '';
  }

  onClick(e) {
    this.fileInput.nativeElement.click()
  }
  newImageResultFromCroppie(e) {
    console.log(e)
    this.added.next({
      index: this.index,
      file: e,
      top: this.top
    });
    this.file = null;
  }

  // fix: AOT
  // TODO @shashi: complete this feature
  close() {
    this.open = false;
    this.added.next({
      index: this.index,
      file: this.file,
      top: this.top
    });
    this.file = null;
  }

  imageCropped(event: any) {
    this.src = event;
    this.file = base64ToFile(this.src);
  }

  fileChangeEvent(event: any): void {
    this.open = true;
    this.imageChangedEvent = event;
  }
  openConversation() {
    this.router.navigate([`groups/${this.object.guid}/conversation`])
  }


}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';

@Component({
  selector: 'app-ngx-img-cropper',
  inputs: ['_imageChangedEvent: imageChangedEvent'],
  outputs: ['_croppedImage: croppedImage'],
  templateUrl: './ngx-img-cropper.component.html',
  styleUrls: ['./ngx-img-cropper.component.scss']
})
export class NgxImgCropperComponent implements OnInit {
  @Input() open;
  @Output() closed: EventEmitter<any> = new EventEmitter();
  _croppedImage: EventEmitter<any> = new EventEmitter();
  imageChangedEvent: any = '';
  croppedImage: any = '';
  scale = 1;
  transform: ImageTransform = {};

  constructor() { }

  ngOnInit() {
  }

  set _imageChangedEvent(event: any) {
    console.log(event);
    this.imageChangedEvent = event;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event)
    this.croppedImage = event.base64;
    this._croppedImage.next(this.croppedImage);
  }
  imageLoaded() {
    // show cropper
  }

  loadImageFailed() {
    // show message
  }
  close() {
    this.closed.emit()
  }

  zoomOut() {
    console.log('zooming out', this.transform)
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    console.log('zooming in', this.transform)
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  crop(){
    this._croppedImage.next(this.croppedImage);
    this.closed.emit()
  }
}

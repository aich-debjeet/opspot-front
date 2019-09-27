import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { CroppieOptions } from 'croppie';
import FileHandler from '../../../utils/file-handle';


@Component({
  selector: 'app-image-croper',
  templateUrl: './image-croper.component.html',
  styleUrls: ['./image-croper.component.scss'],

})
export class ImageCroperComponent implements OnInit {

  constructor() { }



  widthPx = '400';
  heightPx = '400';
  
  public get croppieOptions(): CroppieOptions {
    const opts: CroppieOptions = {};
    opts.viewport = {
      width: 336,
      height:336,
      type:this.croperType

    };
    opts.boundary = {
      width: parseInt(this.widthPx, 10),
      height: parseInt(this.heightPx, 10)
    };
    opts.enforceBoundary = true;
    return opts;
  }


  @Input()croppieImage;
  @Input()open;
  @Input()croperType;
  @Output() closed: EventEmitter<any> = new EventEmitter();
  @Output() imgResult:EventEmitter<any>=new EventEmitter();
  editedImg:any;

  ngOnInit() {
    
  }

  close(){
    this.open = false;
    this.closed.emit()
  }

  imageResult(e){
     this.editedImg=e;
  }

  crop(){
    this.editedImg=FileHandler.base64ToImage(this.editedImg)
    this.imgResult.emit(this.editedImg)
    this.open=false;
    this.editedImg=null;
  }


}

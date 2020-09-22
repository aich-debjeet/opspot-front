import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { remove as _remove, findIndex as _findIndex } from 'lodash';
import { Client } from '../../../services/api/client';

@Component({
  selector: 'app-in-the-spotlight',
  templateUrl: './in-the-spotlight.component.html',
  styleUrls: ['./in-the-spotlight.component.scss']
})
export class InTheSpotlightComponent implements OnInit {
spotlighForm: FormGroup;
cards = [];
inProgress:boolean = false;
_opts: any;
  set opts(opts: any) {
    this._opts = opts;
  }
  constructor(private fb: FormBuilder,
    private client: Client,
    private upload: Upload,
    private attachment: AttachmentService) {
    this.createSpotlight(fb);
   }

  ngOnInit() {
  }
  createSpotlight(formInstance: FormBuilder){
    this.spotlighForm = formInstance.group({
      title:['', Validators.required],
      description:['', Validators.required],
      media:['', Validators.required]
    })
  }
  uploadAttachment(file: HTMLInputElement, event) {
    if (file.value) { // this prevents IE from executing this code twice
      this.inProgress = true;
      this.attachment.upload(file)
        .then(guid => {
          console.log(guid)
          let obj = {};
          obj['guid'] = guid;
          obj['src'] = this.attachment.getPreview();
          this.addAttachment(obj);
          this.inProgress = false;
          // if (this.attachment.isPendingDelete()) {
          //   this.removeAttachment(file);
          // }
          
          file.value = null;
        })
        .catch(e => {
          this.inProgress = false;
          if (e && e.message) {
          }
          file.value = null;
          this.attachment.reset();
        });
    }
  }
  addAttachment(obj) {
    this.cards.push(obj);
    console.log('this.cards',this.cards)
  }
  checkForSrc(object) {
    if (object && object.entity_type === 'video') {
      return object.thumbnail_src;
    } else {
      return object.src;
    }
  }
  removeAttachment(file: HTMLInputElement, imageId: string) {
    if (this.inProgress) {
      this.attachment.abort();
      this.inProgress = false;
      return;
    }
    this.inProgress = true;
    console.log('cards', this.cards)
    // if we're not uploading a file right now
    this.attachment.setPendingDelete(false);
    this.attachment.remove(imageId, file)
      .then(guid => {
        this.inProgress = false;
        console.log('guid',guid)
        file.value = '';
        this.spotlighForm.get('media').setValue('');
        console.log('card deleting', this.cards)
        this.cards = _remove(this.cards, function (n) {
          return n.guid !== guid;
        });
      })
      .catch(e => {
        // console.error(e);
        this.inProgress = false;
        // this.canPost = true;
      });
  }
  postSpotlight(){
    if(!this.spotlighForm.valid)
    return
    const payload:{} = {
      title: this.spotlighForm.value.title,
      description:this.spotlighForm.value.description,
      attachment_guid: this.cards.map(a => a.guid).toString()
    }
    this.client.post('api/v4/admin/inthespotlight',payload).then((response)=>{
      console.log('promise fulfilled', response)
      if(response['status'] == 'success'){
        if (this._opts && this._opts.onUpdate) {
          this._opts.onUpdate(response['activity']);
          // close modal
        }
      }
    }).catch(e => {
      console.log(e);
      alert(e.message);
    });
  }
}

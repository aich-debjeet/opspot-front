import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';

import { remove as _remove, findIndex as _findIndex } from 'lodash';

@Component({
  selector: 'app-my-journey-form',
  templateUrl: './my-journey-form.component.html',
  styleUrls: ['./my-journey-form.component.scss']
})
export class MyJourneyFormComponent implements OnInit {

  @Output() ChangeDefault: EventEmitter<any> = new EventEmitter<any>();
  @Output() Close: EventEmitter<any> = new EventEmitter<any>();
  @Output() load: EventEmitter<any> = new EventEmitter<any>();

  opspot;
  cards = [];
  meta: any = {
    message: '',
    wire_threshold: null
  };
  tags = [];
  isNSFW: boolean = false;

  constructor(
    public session: Session, 
    public client: Client, 
    public upload: Upload, 
    public attachment: AttachmentService, 
    private formBuilder: FormBuilder) {
    this.opspot = window.Opspot;
    this.cards = [];
  }


  ngOnInit() {
  }

  changeToDefault() {
    this.ChangeDefault.emit();
  }

  close() {
    this.Close.emit();
  }

  removeAttachment(file: HTMLInputElement, imageId: string) {
    this.attachment.remove(file, imageId).then((guid) => {
      file.value = '';
      this.cards = _remove(this.cards, function (n) {
        return n.guid !== guid;
      });
    }).catch(e => {
      console.error(e);
    });
  }

  uploadAttachment(file: HTMLInputElement, event) {
    if (file.value) { // this prevents IE from executing this code twice
      this.attachment.upload(file)
        .then(guid => {
          let obj = {};
          obj['guid'] = guid;
          obj['imageLink'] = this.attachment.getPreview();
          this.cards.push(obj);
          file.value = null;
          // this.attachment.reset();
        })
        .catch(e => {
          if (e && e.message) {

          }

          file.value = null;
          this.attachment.reset();
        });
    }
  }

  post() {
    if (!this.meta.message && !this.attachment.has()) {
      return;
    }

    let data = Object.assign(this.meta, this.attachment.exportMeta());

    this.tags.push('myjourney' + this.session.getLoggedInUser().username);
    data.tags = this.tags;
    data.isNSFW = this.isNSFW;
    this.client.post('api/v1/newsfeed', data)
      .then((data: any) => {
        data.activity.boostToggle = true;
        console.log(data)
        this.load.emit(data);
        this.attachment.reset();
        this.meta = { wire_threshold: null };
        this.cards = [];
      })
      .catch((e) => {
        console.log(e.message);
        // this.attachment.reset();
      });
  }

  getPostPreview(message) {
    if (!message.value) {
      return;
    }
    this.attachment.preview(message.value);
  }

  onMessageChange($event) {
    this.meta.message = $event;
    const regex = /(^|\s||)#(\w+)/gim;
    this.tags = [];
    let match;

    while ((match = regex.exec(this.meta.message)) !== null) {
      this.tags.push(match[2]);
    }
  }
}

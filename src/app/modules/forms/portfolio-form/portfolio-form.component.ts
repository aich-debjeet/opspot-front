import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';

import { remove as _remove, findIndex as _findIndex } from 'lodash';
import { SpecialHashtg } from '../../../helpers/special-hashtag';

@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.scss']
})
export class PortfolioFormComponent implements OnInit {

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
  inProgress = false;

  constructor(public session: Session, public client: Client, public upload: Upload, public attachment: AttachmentService, private formBuilder: FormBuilder) {
    this.opspot = window.Opspot;
    this.cards = [];
  }

  ngOnInit() {
  }

  removeAttachment(file: HTMLInputElement, imageId: string) {
    // if (this.inProgress) {
    //   // this.attachment.abort();
    //   this.inProgress = false;
    //   return;
    // }
    this.inProgress = true;
    this.attachment.remove(imageId, file).then((guid) => {
      this.inProgress = false;
      file.value = '';
      this.cards = _remove(this.cards, function (n) {
        return n.guid !== guid;
      });
    }).catch(e => {
      this.inProgress = false;
      // this.canPost = true;
    });
  }

  uploadAttachment(file: HTMLInputElement, event) {
    console.log(file, event, this.attachment)
    if (file.value) { // this prevents IE from executing this code twice
      this.inProgress = true;
      this.attachment.upload(file)
        .then(guid => {
          let obj = {};
          obj['guid'] = guid;
          obj['imageLink'] = this.attachment.getPreview();
          /**
           * temporary fix for video
           */
          if (obj['imageLink'] == null) {
            obj['imageLink'] = 'assets/videos/video_thumbnail.png'
          }
          this.cards.push(obj);
          this.inProgress = false;
          file.value = null;
        })
        .catch(e => {
          console.log(e)
          if (e && e.message) {
          }
          this.inProgress = false;
          file.value = null;
          this.attachment.reset();
        });
    }
  }

  post() {
    if (this.meta.message.length <= 0 && this.attachment.has()) {
      alert('What have You Created today?');
      return;
    }

    let data = Object.assign(this.meta, this.attachment.exportMeta());
    this.tags.push(SpecialHashtg.concat('portfolio', this.session.getLoggedInUser().username))
    data.tags = this.tags;
    data.mature = this.isNSFW;
    this.inProgress = true;

    this.client.post('api/v1/newsfeed', data)
      .then((data: any) => {
        data.activity.boostToggle = true;
        console.log(data)
        this.load.emit(data);
        this.attachment.reset();
        this.meta = { wire_threshold: null };
        this.inProgress = false;
        this.cards = [];
      })
      .catch((e) => {
        this.inProgress = false;
        alert(e.message);
      });
  }

  changeToDefault() {
    this.ChangeDefault.emit();
  }

  close() {
    this.Close.emit();
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

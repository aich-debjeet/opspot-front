import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';

import { remove as _remove, findIndex as _findIndex } from 'lodash';

@Component({
  selector: 'app-blue-store-form',
  templateUrl: './blue-store-form.component.html',
  styleUrls: ['./blue-store-form.component.scss']
})
export class BlueStoreFormComponent implements OnInit {
  @Output() ChangeDefault: EventEmitter<any> = new EventEmitter<any>();
  @Output() Close: EventEmitter<any> = new EventEmitter<any>();
  @Output() load: EventEmitter<any> = new EventEmitter<any>();

  blueStoreForm: FormGroup;
  meta: any = {
    message: '',
    wire_threshold: null
  };
  tags = [];
  cards = [];
  blueStoreSubmitted: boolean = false;
  constructor(public session: Session, public client: Client, public upload: Upload, public attachment: AttachmentService, private formBuilder: FormBuilder) {
    this.blueStoreForm = this.formBuilder.group({
      blueStoreTitle: ['', [Validators.required]],
      blueStoreDescription: ['', [Validators.required]],
      blueStoreUnits: ['', [Validators.required]],
      blueStorePrice: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  changeToDefault() {
    this.ChangeDefault.emit();
  }
  close() {
    this.Close.emit();
  }
  blueStoreSubmit() {
    this.blueStoreSubmitted = true;
    let data = Object.assign(this.meta, this.attachment.exportMeta());

    data.attachment_guid = data.attachment_guid;
    data.title = this.blueStoreForm.value.blueStoreTitle;
    data.description = this.blueStoreForm.value.blueStoreDescription;
    data.price = this.blueStoreForm.value.blueStorePrice;
    data.item_count = this.blueStoreForm.value.blueStoreUnits;
    data.currency = 'INR';


    if (this.blueStoreForm.valid) {
      this.client.post('api/v3/marketplace', data)
        .then((data: any) => {
          // data.activity.boostToggle = true;
          this.load.emit(data);
          this.attachment.reset();
          this.meta = { wire_threshold: null };

          this.blueStoreSubmitted = false;
        })
        .catch((e) => {

          this.blueStoreSubmitted = false;
          alert(e.message);
        });
    }
  }
  uploadAttachment(file: HTMLInputElement, event) {
    if (file.value) { // this prevents IE from executing this code twice

      this.attachment.upload(file)
        .then(guid => {
          let obj = {};
          obj['guid'] = guid;
          obj['imageLink'] = this.attachment.getPreview();
          this.cards.push(obj);
          // if (this.attachment.isPendingDelete()) {
          //   this.removeAttachment(file);
          // }
          file.value = null;
        })
        .catch(e => {
          if (e && e.message) {
          }
          file.value = null;
          this.attachment.reset();
        });
    }
  }

  removeAttachment(file: HTMLInputElement, imageId: string) {

    // if we're not uploading a file right now
    // this.attachment.setPendingDelete(false);
    // this.canPost = false;
    // this.inProgress = true;

    // this.errorMessage = '';

    this.attachment.remove(file, imageId).then((guid) => {
      file.value = '';
      this.cards = _remove(this.cards, function (n) {
        return n.guid !== guid;
      });
    }).catch(e => {
      console.error(e);
    });
  }

}

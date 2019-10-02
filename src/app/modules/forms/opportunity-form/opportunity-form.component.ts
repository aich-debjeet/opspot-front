import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';

import { remove as _remove, findIndex as _findIndex } from 'lodash';

@Component({
  selector: 'app-opportunity-form',
  templateUrl: './opportunity-form.component.html',
  styleUrls: ['./opportunity-form.component.scss']
})
export class OpportunityFormComponent implements OnInit {
  
  @Output() ChangeDefault: EventEmitter<any> = new EventEmitter<any>();
  @Output() Close: EventEmitter<any> = new EventEmitter<any>();
  @Output() load: EventEmitter<any> = new EventEmitter<any>();

  opportunityForm: FormGroup;
  submitted: boolean = false;
  meta: any = {
    message: '',
    wire_threshold: null
  };
  tags = [];
  cards = [];
  
  constructor(public session: Session, public client: Client, public upload: Upload, public attachment: AttachmentService, private formBuilder: FormBuilder) {
    this.opportunityForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      opportunityTitle: ['', [Validators.required]],
      opportunityDescription: ['', [Validators.required]],
      opportunityLocation: ['', [Validators.required]],
      opportunityImage: ['', []]
    }); 
   }

  ngOnInit() {
  }

  changeToDefault() {
    this.ChangeDefault.emit();
  }
  close(){
    this.Close.emit();
  }
  postOpportunity(value) {
    console.log(value)

    this.submitted = true;
    let data = Object.assign(this.meta, this.attachment.exportMeta());

    console.log("data: ", data);
    data.attachment_guid = data.attachment_guid;
    data.title = value.opportunityTitle;
    data.description = value.opportunityDescription;
    data.location = value.opportunityLocation;
    data.category= value.category;
    data.published = true;

    if (this.opportunityForm.valid) {
      this.client.post('api/v3/opportunity', data)
        .then((data: any) => {
          // data.activity.boostToggle = true;
          this.load.emit(data);
          this.attachment.reset();
          this.meta = { wire_threshold: null };
          this.submitted = false;
        })
        .catch((e) => {
          this.submitted = false;
          alert(e.message);
        });
    }
  }
  uploadAttachment(file: HTMLInputElement, event) {
    console.log(file, event, this.attachment)
    if (file.value) { // this prevents IE from executing this code twice

      this.attachment.upload(file)
        .then(guid => {
          let obj = {};
          obj['guid'] = guid;
          obj['imageLink'] = this.attachment.getPreview();
          console.log(guid)
          console.log(obj)
          this.cards.push(obj);
          console.log(this.cards)
          // if (this.attachment.isPendingDelete()) {
          //   this.removeAttachment(file);
          // }
          file.value = null;
        })
        .catch(e => {
          console.log(e)
          if (e && e.message) {
          }
          file.value = null;
          this.attachment.reset();
        });
    }
  }

  removeAttachment(file: HTMLInputElement, imageId: string) {
    console.log(file, imageId)

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
      console.log(this.cards)
    }).catch(e => {
      console.error(e);
    });
  }
}

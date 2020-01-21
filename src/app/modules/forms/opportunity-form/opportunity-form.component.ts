import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';

import { remove as _remove, findIndex as _findIndex } from 'lodash';
import { OverlayModalService } from '../../../services/ux/overlay-modal';

@Component({
  selector: 'app-opportunity-form',
  templateUrl: './opportunity-form.component.html',
  styleUrls: ['./opportunity-form.component.scss']
})
export class OpportunityFormComponent implements OnInit {

  @Output() ChangeDefault: EventEmitter<any> = new EventEmitter<any>();
  @Output() Close: EventEmitter<any> = new EventEmitter<any>();
  @Output() load: EventEmitter<any> = new EventEmitter<any>();

  _opts: any;
  set opts(opts: any) {
    this._opts = opts;
  }

  reqBody = {
    title: null,
    description: null,
    category: null,
    access_id: 2,
    published: 1,
    location: null,
    attachment_guid: ''
  };


  opportunity: any;
  oppGuid: string;
  label = "Create";
  canPost: boolean = true;
  inProgress = false;
  errorMessage = '';
  attach_guid = [];
  imageUploadError: boolean;

  @Input('object') set data(object) {
    this.opportunity = object;
    if (this.opportunity) {
      this.oppGuid = object['entity_guid'];
      this.label = "Edit";
      this.buildForm(this.opportunity);
      this.cards = this.opportunity['custom_data'];
      // this.opportunity['custom_data'].forEach(image => {
      //   this.reqBody.attachment_guid.push(image['guid']);
      // });
      this.opportunity['custom_data'].forEach(image => {
        this.attach_guid.push(image['guid']);
      });
    } else {
      this.buildForm();
    }
  }

  opportunityForm: FormGroup;
  submitted: boolean = false;
  meta: any = {
    message: '',
    wire_threshold: null
  };
  tags = [];
  cards = [];

  constructor(
    public session: Session,
    public client: Client,
    public upload: Upload,
    public attachment: AttachmentService,
    private formBuilder: FormBuilder,
    private overlayModal: OverlayModalService,

  ) {
    // this.buildForm();
  }

  description = '';

  buildForm(data?) {
    if (data) {
      if (data.description) {
        this.description = data.description;
      } if (data.blurb) {
        this.description = data.blurb;
      }
      this.opportunityForm = this.formBuilder.group({
        category: [data['category'] ? data['category'] : '', [Validators.required]],
        opportunityTitle: [data['title'] ? data['title'] : '', [Validators.required]],
        opportunityDescription: [this.description ? this.description : '', [Validators.required]],
        opportunityLocation: [data['location'] ? data['location'] : '', [Validators.required]],
        opportunityImage: ['', []]
      });
    } else {
      this.opportunityForm = this.formBuilder.group({
        category: ['', [Validators.required]],
        opportunityTitle: ['', [Validators.required]],
        opportunityDescription: ['', [Validators.required]],
        opportunityLocation: ['', [Validators.required]],
        opportunityImage: ['', []]
      });
    }
  }

  ngOnInit() {
  }

  changeToDefault() {
    this.ChangeDefault.emit();
  }
  close() {
    this.Close.emit();
  }
  postOpportunity(value) {
    this.submitted = true;
    this.imageUploadError = false;

    // console.log("this.attachment.exportMeta: ", this.attachment.exportMeta());


    let data = Object.assign(this.meta, this.attachment.exportMeta());
    // console.log("data: ", data);
    // console.log("datta: ", data);
    // console.log("attach guid: ", this.attach_guid);
    if (data.attachment_guid.length > 0) {
      this.reqBody.attachment_guid = data.attachment_guid;
    } else if (this.attach_guid.length === 1) {
      this.reqBody.attachment_guid = this.attach_guid[0];
    }
    if (this.reqBody.attachment_guid == '') {
      this.imageUploadError = true;
    }

    this.reqBody.title = value.opportunityTitle;
    this.reqBody.description = value.opportunityDescription;
    this.reqBody.location = value.opportunityLocation;
    this.reqBody.category = value.category;

    if (this.opportunityForm.valid && this.reqBody.attachment_guid != '') {
      let endpoint = 'api/v3/opportunity';
      if (this.oppGuid) {
        endpoint = 'api/v3/opportunity/' + this.oppGuid;
      }
      this.inProgress = true;
      this.client.post(endpoint, this.reqBody)
        .then((resp: any) => {
          this.load.emit(resp);
          this.attachment.reset();
          this.meta = { wire_threshold: null };
          this.submitted = false;
          this.inProgress = false;
          this.changeToDefault();
          // // check if update callback function is avaibale
          if (this._opts && this._opts.onUpdate) {
            this._opts.onUpdate(this.reqBody);
            // close modal
            this.closeModal();
          }
        })
        .catch((e) => {
          this.submitted = false;
          alert(e.message);
          this.inProgress = false;
        });
    }
  }
  uploadAttachment(file: HTMLInputElement, event) {
    if (file.value) { // this prevents IE from executing this code twice
      this.inProgress = true;
      this.attachment.upload(file, this.attach_guid)
        .then(guid => {
          let obj = {};
          obj['guid'] = guid;
          obj['src'] = this.attachment.getPreview();
          this.addAttachment(obj);
          // if (this.attachment.isPendingDelete()) {
          //   this.removeAttachment(file);
          // }
          this.inProgress = false;
          file.value = null;
        })
        .catch(e => {
          if (e && e.message) {
          }
          file.value = null;
          this.inProgress = false;
          this.attachment.reset();
        });
    }
  }

  addAttachment(obj) {
    if (this.cards.length < 1) {
      this.cards.push(obj);
      // this.reqBody.attachment_guid.push(obj['guid']);
    }
  }

  // removeAttachment(guid) {
  //   this.reqBody.attachment_guid = this.reqBody.attachment_guid.filter(i => i !== guid);
  //   this.cards = _remove(this.cards, function (n) {
  //     return n.guid !== guid;
  //   });
  // }

  // removeAttachment(file: HTMLInputElement, imageId: string) {
  //   this.attachment.remove(file, imageId).then((guid) => {
  //     file.value = '';
  //     this.cards = _remove(this.cards, function (n) {
  //       return n.guid !== guid;
  //     });
  //   }).catch(e => {
  //     console.error(e);
  //   });
  // }

  removeAttachment(file: HTMLInputElement, imageId: string) {
    if (this.inProgress) {
      this.attachment.abort();
      this.canPost = true;
      this.inProgress = false;
      this.errorMessage = '';
      return;
    }

    // if we're not uploading a file right now
    this.attachment.setPendingDelete(false);
    this.canPost = false;
    this.inProgress = true;

    this.errorMessage = '';
    this.attachment.remove(imageId,file,this.attach_guid)
      .then(guid => {
        this.inProgress = false;
        this.canPost = true;
        // file.value = '';
        this.cards = _remove(this.cards, function (n) {
          return n.guid !== guid;
        });
      })
      .catch(e => {
        // this.inProgress = false;
        // this.canPost = true;
      });
  }


  closeModal() {
    this.overlayModal.dismiss();
  }
}

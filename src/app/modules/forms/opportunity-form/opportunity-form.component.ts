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

  opportunity: any;
  oppGuid: string;

  @Input('object') set data(object) {
    this.opportunity = object;
    console.log("this.opportunity: ", this.opportunity);  
    if (this.opportunity) {
      this.oppGuid = object['entity_guid'];
      this.buildForm(this.opportunity);
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
      console.log("data in opp form: ", data);
      if(data.description){
        this.description = data.description;
      } if(data.blurb){
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
    let data = Object.assign(this.meta, this.attachment.exportMeta());
    data.attachment_guid = data.attachment_guid;
    data.title = value.opportunityTitle;
    data.description = value.opportunityDescription;
    data.location = value.opportunityLocation;
    data.category = value.category;
    data.access_id = 2,
    data.published = 1;

    if (this.opportunityForm.valid) {
      let endpoint = 'api/v3/opportunity';
      if (this.oppGuid) { 
        endpoint = 'api/v3/opportunity/' + this.oppGuid;
      }
      this.client.post(endpoint, data)
        .then((resp: any) => {
          this.load.emit(resp);
          this.attachment.reset();
          this.meta = { wire_threshold: null };
          this.submitted = false;
          this.changeToDefault();
          // // check if update callback function is avaibale
          if (this._opts && this._opts.onUpdate) {
            this._opts.onUpdate(data);
            // close modal
            this.closeModal();
          }
        })
        .catch((e) => {
          this.submitted = false;
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
    this.attachment.remove(file, imageId).then((guid) => {
      file.value = '';
      this.cards = _remove(this.cards, function (n) {
        return n.guid !== guid;
      });
    }).catch(e => {
      console.error(e);
    });
  }

  closeModal() {
    this.overlayModal.dismiss();
  }
}

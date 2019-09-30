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

  opportunity: any;
  oppGuid: string;

  @Input('object') set data(object) {
    // console.log('INPUT', JSON.stringify(object));
    this.opportunity = object;
    if (this.opportunity) {
      this.oppGuid = object['guid'];
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

   buildForm(data?) {
    if (data) {
      this.opportunityForm = this.formBuilder.group({
        category: [data['category'] ? data['category'] : '', [Validators.required]],
        opportunityTitle: [data['title'] ? data['title'] : '', [Validators.required]],
        opportunityDescription: [data['description'] ? data['description'] : '', [Validators.required]],
        opportunityLocation: [data['location'] ? data['location'] : '', [Validators.required]],
        opportunityImage: [data['image'] ? data['image'] : '', []]
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
  close(){
    this.Close.emit();
  }
  postOpportunity(value) {
    console.log(value);

    this.submitted = true;
    let data = Object.assign(this.meta, this.attachment.exportMeta());

    data.attachment_guid = data.attachment_guid;
    data.title = value.opportunityTitle;
    data.description = value.opportunityDescription;
    data.location = value.opportunityLocation;
    data.opp_type = value.category;
    data.published = true;

    if (this.opportunityForm.valid) {
      alert("dsfsf")
      let endpoint = 'api/v3/opportunity';
      if (this.oppGuid) {
        endpoint = 'api/v3/opportunity/' + this.oppGuid;
      }
      this.client.post(endpoint, data)
        .then((data: any) => {
          alert("dsfsf")
          this.load.emit(data);
          this.attachment.reset();
          this.meta = { wire_threshold: null };
          this.submitted = false;
          this.changeToDefault();
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

  closeModal(){
    this.overlayModal.dismiss();
  }
}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';

import { remove as _remove, findIndex as _findIndex } from 'lodash';
import { OverlayModalService } from '../../../services/ux/overlay-modal';

@Component({
  selector: 'app-blue-store-form',
  templateUrl: './blue-store-form.component.html',
  styleUrls: ['./blue-store-form.component.scss']
})
export class BlueStoreFormComponent implements OnInit {
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
    item_count: null,
    price: 0,
    currency: 'INR',
    access_id: 2,
    published: 1,
    attachment_guid: []
  };

  blueStoreForm: FormGroup;
  meta: any = {
    message: '',
    wire_threshold: null
  };
  tags = [];
  cards = [];
  blueStoreSubmitted: boolean = false;
  bluestore: any;
  bluestoreGuid: any;
  label = "Create"

  description = '';

  constructor(
    public session: Session,
    public client: Client,
    public upload: Upload,
    public attachment: AttachmentService,
    private formBuilder: FormBuilder,
    private overlayModal: OverlayModalService) {
  }

  @Input('object') set data(object) {
    this.bluestore = object;
    if (this.bluestore) {
      this.bluestoreGuid = object['entity_guid'];
      this.buildForm(this.bluestore);
      this.cards = this.bluestore['custom_data'];
      if (this.bluestore['custom_data']) {
        // for(let i = 0; i > this.bluestore['custom_data'].length; i++) {
        //   this.reqBody.attachment_guid.push(this.bluestore['custom_data'][i]['guid']);
        // }
        if(this.bluestoreGuid){
          this.label = "Edit"
        }
        this.bluestore['custom_data'].forEach(image => {
          this.reqBody.attachment_guid.push(image['guid']);
        });
        setTimeout(() => {
          console.log('INITIAL attachment_guid', this.reqBody.attachment_guid);
        }, 500);
      }
    } else {
      this.buildForm();
    }
  }

  buildForm(data?) {
    if (data) {
      if (data.description) {
        this.description = data.description;
      } else if (data.blurb) {
        this.description = data.blurb;
      }
      this.blueStoreForm = this.formBuilder.group({
        blueStoreTitle: [data['title'] ? data['title'] : '', [Validators.required]],
        blueStoreDescription: [this.description ? this.description : '', [Validators.required]],
        blueStoreUnits: [data['item_count'] ? data['item_count'] : '', [Validators.required]],
        blueStorePrice: [data['price'] ? data['price'] : '', []]
      });
    } else {
      this.blueStoreForm = this.formBuilder.group({
        blueStoreTitle: ['', [Validators.required]],
        blueStoreDescription: ['', [Validators.required]],
        blueStoreUnits: ['', [Validators.required]],
        blueStorePrice: ['', []]
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
  blueStoreSubmit() {
    this.blueStoreSubmitted = true;
    // if (this.attachment) {
    //   this.reqBody = Object.assign(this.meta, this.attachment.exportMeta());
    //   console.log('this.reqBody', this.reqBody);
    //   return;
    // }
    // this.reqBody.attachment_guid = this.reqBody.attachment_guid;
    this.reqBody.title = this.blueStoreForm.value.blueStoreTitle;
    this.reqBody.description = this.blueStoreForm.value.blueStoreDescription;
    this.reqBody.price = this.blueStoreForm.value.blueStorePrice;
    this.reqBody.item_count = this.blueStoreForm.value.blueStoreUnits;
    // this.reqBody.currency = 'INR';
    // this.reqBody.access_id = 2,
    // this.reqBody.published = 1;
    // console.log('this.reqBody', this.reqBody);
    // return;

    if (this.blueStoreForm.valid) {
      let endpoint = 'api/v3/marketplace';
      if (this.bluestoreGuid) {
        endpoint = 'api/v3/marketplace/' + this.bluestoreGuid;
      }
      this.client.post(endpoint, this.reqBody)
        .then((resp: any) => {
          // data.activity.boostToggle = true;
          this.load.emit(resp);
          this.attachment.reset();
          this.meta = { wire_threshold: null };
          this.blueStoreSubmitted = false;
          this.changeToDefault();
          // check if update callback function is avaibale
          if (this._opts && this._opts.onUpdate) {
            this._opts.onUpdate(this.reqBody);
            // close modal
            this.closeModal();
          }
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
          obj['src'] = this.attachment.getPreview();
          this.addAttachment(obj);
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

  addAttachment(obj) {
    this.cards.push(obj);
    this.reqBody.attachment_guid.push(obj['guid']);
  }

  // TODO @abhijeet: check of deleting media here is required?
  removeAttachment(guid){
    console.log('DELETE ', guid);
    console.log('DELETE ', this.reqBody.attachment_guid[guid]);
    this.reqBody.attachment_guid = this.reqBody.attachment_guid.filter(i => i !== guid);
    console.log('AFTER DELETE ', this.reqBody.attachment_guid);
    this.cards = _remove(this.cards, function (n) {
      return n.guid !== guid;
    });
  }

  // removeAttachment(file: HTMLInputElement, imageId: string) {

  //   // if we're not uploading a file right now
  //   // this.attachment.setPendingDelete(false);
  //   // this.canPost = false;
  //   // this.inProgress = true;

  //   // this.errorMessage = '';

  //   this.attachment.remove(file, imageId).then((guid) => {
  //     file.value = '';
  //     this.cards = _remove(this.cards, function (n) {
  //       return n.guid !== guid;
  //     });
  //   }).catch(e => {
  //     console.error(e);
  //   });
  // }

  closeModal() {
    this.overlayModal.dismiss();
  }
}

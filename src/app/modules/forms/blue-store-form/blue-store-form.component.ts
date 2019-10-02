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
    let data = Object.assign(this.meta, this.attachment.exportMeta());

    data.attachment_guid = data.attachment_guid;
    data.title = this.blueStoreForm.value.blueStoreTitle;
    data.description = this.blueStoreForm.value.blueStoreDescription;
    data.price = this.blueStoreForm.value.blueStorePrice;
    data.item_count = this.blueStoreForm.value.blueStoreUnits;
    data.currency = 'INR';
    data.access_id = 2,
      data.published = 1;

    console.log("data: ", data);

    console.log("this.blueStoreForm.valid: ", this.blueStoreForm.valid);


    if (this.blueStoreForm.valid) {
      let endpoint = 'api/v3/marketplace';
      if (this.bluestoreGuid) {
        endpoint = 'api/v3/marketplace/' + this.bluestoreGuid;
      }
      this.client.post(endpoint, data)
        .then((resp: any) => {
          // data.activity.boostToggle = true;
          this.load.emit(resp);
          this.attachment.reset();
          this.meta = { wire_threshold: null };
          this.blueStoreSubmitted = false;
          this.changeToDefault();
          // check if update callback function is avaibale
          if (this._opts && this._opts.onUpdate) {
            this._opts.onUpdate(data);
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

  closeModal() {
    this.overlayModal.dismiss();
  }
}

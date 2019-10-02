import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';

import { remove as _remove, findIndex as _findIndex } from 'lodash';
import { OverlayModalService } from '../../../services/ux/overlay-modal';

@Component({
  selector: 'app-showtimez-form',
  templateUrl: './showtimez-form.component.html',
  styleUrls: ['./showtimez-form.component.scss']
})
export class ShowtimezFormComponent implements OnInit {

  @Output() ChangeDefault: EventEmitter<any> = new EventEmitter<any>();
  @Output() Close: EventEmitter<any> = new EventEmitter<any>();
  @Output() load: EventEmitter<any> = new EventEmitter<any>();

  _opts: any;
  set opts(opts: any) {
    this._opts = opts;
  }

  event: any;
  eventGuid: string;

  @Input('object') set data(object) {
    this.event = object;
    if (this.event) {
      this.eventGuid = object['entity_guid'];
      this.buildForm(this.event);
    } else {
      this.buildForm();
    }
  }


  showTimezForm: FormGroup;
  eventSubmitted: boolean = false;
  meta: any = {
    message: '',
    wire_threshold: null
  };
  tags = [];
  cards = [];
  public timeMask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(public session: Session, public client: Client, public upload: Upload, public attachment: AttachmentService, private formBuilder: FormBuilder, private overlayModal: OverlayModalService) {

  }

  ngOnInit() {
  }

  description = '';

  buildForm(data?) {
    if (data) {
      if (data.description) {
        this.description = data.description;
      } if (data.blurb) {
        this.description = data.blurb;
      }
      this.showTimezForm = this.formBuilder.group({
        eventTitle: [data['title'] ? data['title'] : '', [Validators.required]],
        eventDescription: [this.description ? this.description : '', [Validators.required]],
        eventsLocation: [data['location'] ? data['location'] : '', [Validators.required]],
        eventdate: ['', [Validators.required]],
        eventTime: ['', [Validators.required]],
        eventImage: ['']
      })
    } else {
      this.showTimezForm = this.formBuilder.group({
        eventTitle: ['', [Validators.required]],
        eventDescription: ['', [Validators.required]],
        eventsLocation: ['', [Validators.required]],
        eventdate: ['', [Validators.required]],
        eventTime: ['', [Validators.required]],
        eventImage: ['']
      })
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

  eventSubmit() {
    this.eventSubmitted = true;
    let data = Object.assign(this.meta, this.attachment.exportMeta());

    data.attachment_guid = data.attachment_guid;
    data.title = this.showTimezForm.value.eventTitle;
    data.description = this.showTimezForm.value.eventDescription;
    data.location = this.showTimezForm.value.eventsLocation;
    data.access_id = 2;
    data.published = 1;
    data.start_time_date = new Date(`${this.showTimezForm.value.eventdate} ${this.showTimezForm.value.eventTime}`);
    data.end_time_date = new Date(`${this.showTimezForm.value.eventdate} ${this.showTimezForm.value.eventTime}`)

    if (this.showTimezForm.valid) {
      let endpoint = 'api/v3/event';
      if (this.eventGuid) {
        endpoint = 'api/v3/event/' + this.eventGuid;
      }
      this.client.post(endpoint, data)
        .then((resp: any) => {
          // data.activity.boostToggle = true;
          this.load.emit(resp);
          this.attachment.reset();
          this.meta = { wire_threshold: null };

          if (this._opts && this._opts.onUpdate) {
            this._opts.onUpdate(data);
            // close modal
            this.closeModal();
          }

          this.eventSubmitted = false;
          this.changeToDefault();
        })
        .catch((e) => {

          this.eventSubmitted = false;
          alert(e.message);

        });
    }
  }
  changeToDefault() {
    this.ChangeDefault.emit();
  }
  close() {
    this.Close.emit();
  }

  changeRegex(e) {
    if (e.target.value.charAt(0) == '2') {
      this.timeMask[1] = new RegExp('[0-3]')
    } else {
      this.timeMask[1] = new RegExp('[0-9]')
    }
  }

  closeModal() {
    this.overlayModal.dismiss();
  }

}

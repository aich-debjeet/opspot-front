import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';

import { remove as _remove, findIndex as _findIndex } from 'lodash';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { FormValidator } from '../../../helpers/form.validator';
import * as moment from 'moment';


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

  reqBody = {
    title: null,
    description: null,
    location: null,
    access_id: 2,
    published: 1,
    start_time_date: null,
    attachment_guid: ''
  };

  meta: any = {
    message: '',
    wire_threshold: null
  };

  event: any;
  eventGuid: string;
  label = "Create";
  description = '';
  attach_guid = [];

  canPost: boolean = true;
  inProgress = false;
  errorMessage = '';

  bsConfig = {
    containerClass: 'theme-dark-blue',
    adaptivePosition: true,
    dateInputFormat: 'DD-MM-YYYY'
  }

  imageUploadError: boolean;

  @Input('object') set data(object) {
    this.event = object;
    if (this.event) {
      this.eventGuid = object['entity_guid'];
      this.label = "Edit"
      if (this.event['start_time_date']) {
        var date = new Date(parseInt(this.event['start_time_date']));
        var date1 = moment(date).format('DD-MM-YYYY');
        var time1 = moment(date).format('HH:mm');
      }
      this.buildForm(this.event, date1, time1);
      if (this.event['custom_data']) {
        // this.event['custom_data'].forEach(image => {
        //   this.reqBody.attachment_guid.push(image['guid']);
        // });
        this.event['custom_data'].forEach(image => {
          this.attach_guid.push(image['guid']);
        });
      }
      this.cards = this.event['custom_data'];

    } else {
      this.buildForm();
    }
  }


  showTimezForm: FormGroup;
  eventSubmitted: boolean = false;
  // meta: any = {
  //   message: '',
  //   wire_threshold: null
  // };
  tags = [];
  cards = [];
  public timeMask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public session: Session,
    public client: Client,
    public upload: Upload,
    public attachment: AttachmentService,
    private formBuilder: FormBuilder,
    private overlayModal: OverlayModalService) {
  }

  ngOnInit() {
  }


  buildForm(data?, date?, time?) {
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
        eventdate: [date, [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
        eventTime: [time, [Validators.required]],
        eventImage: ['']
      })
    } else {
      this.showTimezForm = this.formBuilder.group({
        eventTitle: ['', [Validators.required]],
        eventDescription: ['', [Validators.required]],
        eventsLocation: ['', [Validators.required]],
        eventdate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
        eventTime: ['', [Validators.required]],
        eventImage: ['']
      })
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
    // alert();
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
        // console.error(e);
        this.inProgress = false;
        // this.canPost = true;
      });
  }

  formatTime(inputTime) {
    var timeString = inputTime;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    return timeString = h + timeString.substr(2, 3) + ampm;
  }

  convertDateToMillis(inputDate, inputTime) {
    if (inputTime) {
      var timeString = this.formatTime(inputTime)
      const d = moment(inputDate.split('-').reverse().join('-')).format('MM/DD/YYYY');

      var myDate = new Date(d);
      var timeReg = /(\d+)\:(\d+)(\w+)/;
      if (timeString) {
        var parts = timeString.match(timeReg);
      }
      var hours = /am/i.test(parts[3]) ?
        function (am) { return am < 12 ? am : 0 }(parseInt(parts[1], 10)) :
        function (pm) { return pm < 12 ? pm + 12 : 12 }(parseInt(parts[1], 10));
      var minutes = parseInt(parts[2], 10);
      var date = new Date(myDate.getTime());
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    }
  }

  eventSubmit() {
    this.imageUploadError = false;
    this.eventSubmitted = true;

    var startTime = this.convertDateToMillis(this.showTimezForm.value.eventdate, this.showTimezForm.value.eventTime)

    let data = Object.assign(this.meta, this.attachment.exportMeta());
    // console.log("data: ", data);

    if (data.attachment_guid.length > 0) {
      this.reqBody.attachment_guid = data.attachment_guid;
    } else if (this.attach_guid.length === 1) {
      this.reqBody.attachment_guid = this.attach_guid[0];
    }

    if (this.reqBody.attachment_guid == '') {
      this.imageUploadError = true;
    }


    this.reqBody.title = this.showTimezForm.value.eventTitle;
    this.reqBody.description = this.showTimezForm.value.eventDescription;
    this.reqBody.location = this.showTimezForm.value.eventsLocation;

    this.reqBody.start_time_date = startTime.getTime();


    if (this.showTimezForm.valid && this.reqBody.attachment_guid != '') {
      let endpoint = 'api/v3/event';
      if (this.eventGuid) {
        endpoint = 'api/v3/event/' + this.eventGuid;
      }
      this.inProgress = true;
      this.client.post(endpoint, this.reqBody)
        .then((resp: any) => {
          // reqBody.activity.boostToggle = true;
          this.load.emit(resp);
          this.attachment.reset();
          // this.meta = { wire_threshold: null };

          if (this._opts && this._opts.onUpdate) {
            this._opts.onUpdate(this.reqBody);
            // close modal
            this.closeModal();
          }
          this.eventSubmitted = false;
          this.inProgress = false;
          this.changeToDefault();
        })
        .catch((e) => {
          this.eventSubmitted = false;
          this.inProgress = false;
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

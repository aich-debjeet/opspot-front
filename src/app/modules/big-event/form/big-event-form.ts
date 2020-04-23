import { Component, OnInit, Input } from "@angular/core";
import { EVENT_TYPES, EVENT_CATEGORY } from '../../../services/list-options';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';
import * as moment from 'moment';
import { FormValidator } from '../../../helpers/form.validator';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from "ngx-toastr";



@Component({
  selector: 'app-big-event-form',
  templateUrl: './big-event-form.html',
  styleUrls: ['./big-event-form.scss']
})
export class BigEventForm implements OnInit {

  eventForm: FormGroup;
  eventTypeList = EVENT_TYPES;
  eventCategoryList = EVENT_CATEGORY;
  eventSubmitted: boolean;
  public timeMask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  // coverImageUploadError: boolean = false;
  lable = 'Create';
  type = 'Event';

  coverImage = '';
  bigEvent: any;
  bigEventGuid: any;

  start_date: any;
  start_time: any;
  end_time: any;
  end_date: any;

  meta: any = {
    message: '',
    wire_threshold: null
  };

  bsConfig = {
    containerClass: 'theme-dark-blue',
    adaptivePosition: true,
    dateInputFormat: 'DD-MM-YYYY'
  }

  imageGuid = '';
  attach_guid = [];
  canPost: boolean = true;
  inProgress = false;
  errorMessage = '';
  reqBody = {
    title: null,
    description: null,
    event_type: null,
    category: null,
    location: null,
    start_time_date: null,
    end_time_date: null,
    // enrollment_start_date: null,
    // enrollment_end_date: null,
    attachment_guid: '',
    access_id: 2,
    published: 1
  };
  @Input('object') set data(object) {
    console.log(object)
    this.bigEvent = object.data;
    if (this.bigEvent) {
      this.lable = "Update";
      this.type = object.type;
      this.bigEventGuid = this.bigEvent['entity_guid'];
      if (this.bigEvent['start_time_date']) {
        var date = new Date(parseInt(this.bigEvent['start_time_date']));
        this.start_date = moment(date).format('DD-MM-YYYY');
        this.start_time = moment(date).format('HH:mm');
      }
      if (this.bigEvent['end_time_date']) {
        var date = new Date(parseInt(this.bigEvent['end_time_date']));
        this.end_date = moment(date).format('DD-MM-YYYY');
        this.end_time = moment(date).format('HH:mm');
      }
      if (this.bigEvent['custom_data']) {
        this.coverImage = this.bigEvent['custom_data'][0].src;
        this.imageGuid = this.bigEvent['custom_data'][0].guid;

        this.attach_guid.push(this.imageGuid);
      }
      this.buildForm(this.bigEvent, this.start_date, this.start_time, this.end_date, this.end_time);
    } else {
      this.type = object.type;
      if (this.type == 'event')
        this.buildForm();
      else if (this.type == 'enrollment')
        this.buildEnrollForm();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    public session: Session,
    public client: Client,
    public upload: Upload,
    public attachment: AttachmentService,
    public router: Router,
    private _location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  buildForm(data?, start_date?, start_time?, end_date?, end_time?) {
    if (data) {
      this.eventForm = this.formBuilder.group({
        eventTitle: [data['title'] ? data['title'] : '', [Validators.required]],
        eventDesc: [data['blurb'] ? data['blurb'] : '', [Validators.required]],
        eventType: [data['event_type'] ? data['event_type'] : '', [Validators.required]],
        eventCategory: [data['category'] ? data['category'] : '', [Validators.required]],
        eventLocation: [data['location'] ? data['location'] : '', [Validators.required]],
        eventStartDate: [start_date, [Validators.required]],
        eventEndDate: [end_date, [Validators.required]],
        eventStartTime: [start_time, [Validators.required]],
        eventEndTime: [end_time, [Validators.required]],
        eventCoverImage: ['', []]
      })
    } else {
      this.eventForm = this.formBuilder.group({
        eventTitle: ['', [Validators.required]],
        eventDesc: ['', [Validators.required]],
        eventType: ['', [Validators.required]],
        eventCategory: ['', [Validators.required]],
        eventLocation: ['', [Validators.required]],
        eventStartDate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
        eventEndDate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
        eventStartTime: ['', [Validators.required]],
        eventEndTime: ['', [Validators.required]],
        eventCoverImage: ['', []]
      })
    }
  }
  buildEnrollForm() {
    this.eventForm = this.formBuilder.group({
      eventTitle: ['', [Validators.required]],
      eventDesc: ['', [Validators.required]],
      eventType: ['', [Validators.required]],
      eventCategory: ['', [Validators.required]],
      eventLocation: ['', [Validators.required]],
      eventStartDate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
      eventEndDate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
      eventStartTime: ['', [Validators.required]],
      eventEndTime: ['', [Validators.required]],
      enrollmentStartDate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
      enrollmentEndDate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
      enrollmentStartTime: ['', [Validators.required]],
      enrollmentEndTime: ['', [Validators.required]],
      eventCoverImage: ['', []]
    })
  }

  changeRegex(e) {
    if (e.target.value.charAt(0) == '2') {
      this.timeMask[1] = new RegExp('[0-3]')
    } else {
      this.timeMask[1] = new RegExp('[0-9]')
    }
  }

  uploadAttachment(file: HTMLInputElement, event) {
    if (file.value) {
      this.inProgress = true;
      this.attachment.upload(file, this.attach_guid)
        .then(guid => {
          let obj = {};
          obj['guid'] = guid;
          obj['src'] = this.attachment.getPreview();
          // this.reqBody.attachment_guid = obj['guid'];
          this.coverImage = obj['src'];
          this.imageGuid = obj['guid'];
          // if (this.attachment.isPendingDelete()) {
          //   this.removeAttachment(file);
          // }
          this.inProgress = false;
          file.value = null;
        })
        .catch(e => {
          if (e && e.message) {
          }
          this.inProgress = false;
          file.value = null;
          this.attachment.reset();
        });
    }
  }


  removeAttachment(file: HTMLInputElement, imageId: string) {
    // alert(imageId)
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
    this.attachment.remove(imageId, file, this.attach_guid)
      .then(guid => {
        this.inProgress = false;
        this.canPost = true;
        this.coverImage = '';
        file.value = '';
        // this.cards = _remove(this.cards, function (n) {
        //   return n.guid !== guid;
        // });
        // console.log(this.cards);
      })
      .catch(e => {
        this.inProgress = false;
        this.canPost = true;
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
      const d = moment(inputDate.split('-').reverse().join('-')).format('L'); // d = "12/12/2017" 
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

  submitEvent() {

    this.eventSubmitted = true;
    if (this.eventForm.invalid) {
      return;
    }

    let data = Object.assign(this.meta, this.attachment.exportMeta());

    if (data.attachment_guid.length > 0) {
      this.reqBody.attachment_guid = data.attachment_guid;
    } else if (this.attach_guid.length == 1) {
      this.reqBody.attachment_guid = this.attach_guid[0];
    }
    // if (data.attachment_guid.length > 0) {
    //   this.reqBody.attachment_guid = data.attachment_guid;
    // } else if (this.attach_guid.length === 1) {
    //   this.reqBody.attachment_guid = this.attach_guid[0];
    // }

    if (this.reqBody.attachment_guid == '') {
      this.toastr.error('Please upload cover image');
      return;
    }

    var startTime = this.convertDateToMillis(this.eventForm.value.eventStartDate, this.eventForm.value.eventStartTime);
    var endTime = this.convertDateToMillis(this.eventForm.value.eventEndDate, this.eventForm.value.eventEndTime);
    let enrollStartTime = this.convertDateToMillis(this.eventForm.value.enrollmentStartDate, this.eventForm.value.enrollmentStartTime);
    let enrollEndTime = this.convertDateToMillis(this.eventForm.value.enrollmentEndDate, this.eventForm.value.enrollmentEndTime);

    this.reqBody.title = this.eventForm.value.eventTitle;
    this.reqBody.description = this.eventForm.value.eventDesc;
    this.reqBody.event_type = (this.type == 'enrollment') ? 'Premium' : this.eventForm.value.eventType;
    this.reqBody.category = this.eventForm.value.eventCategory;
    this.reqBody.location = this.eventForm.value.eventLocation;
    this.reqBody.start_time_date = startTime.getTime();
    this.reqBody.end_time_date = endTime.getTime();
    // this.reqBody.enrollment_start_date = enrollStartTime.getTime();
    // this.reqBody.enrollment_end_date = enrollEndTime.getTime();

    if (this.eventForm.valid && this.reqBody.attachment_guid != '' && this.reqBody.start_time_date != '' && this.reqBody.end_time_date != '') {

      let endpoint = 'api/v3/event';
      if (this.bigEventGuid) {
        endpoint = 'api/v3/event/' + this.bigEventGuid;
      }
      this.inProgress = true;

      this.client.post(endpoint, this.reqBody)
        .then((resp: any) => {
          if (resp && resp.activity && resp.activity['guid'] != '') {
            this.router.navigate(['/event/' + resp.activity['guid']]);
          }
          this.eventSubmitted = false;
          this.inProgress = false;
          this.attachment.reset();
        })
        .catch((e) => {
          this.eventSubmitted = false;
          this.inProgress = false;
          // alert(e.message);
        });
    }
  }

  backClicked() {
    this._location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { EVENT_TYPES, EVENT_CATEGORY } from '../../../services/list-options';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';
import * as moment from 'moment';
import { FormValidator } from '../../../helpers/form.validator';



@Component({
  selector: 'app-big-event-create',
  templateUrl: './big-event-create.html',
  styleUrls: ['./big-event-create.scss']
})
export class BigEventCreate implements OnInit {


  eventForm: FormGroup;
  eventTypeList = EVENT_TYPES;
  eventCategoryList = EVENT_CATEGORY;
  eventSubmitted = false;
  public timeMask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  coverImage: any;

  bsConfig = {
    containerClass: 'theme-dark-blue',
    adaptivePosition: true,
    dateInputFormat: 'DD-MM-YYYY'
  }


  reqBody = {
    title: null,
    description: null,
    event_type: null,
    category: null,
    location: null,
    start_time_date: null,
    end_time_date: null,
    attachment_guid: '',
    access_id: 2,
    published: 1
  };



  constructor(
    private formBuilder: FormBuilder,
    public session: Session,
    public client: Client,
    public upload: Upload,
    public attachment: AttachmentService,
  ) {
    this.eventForm = this.formBuilder.group({
      eventTitle: ['', [Validators.required]],
      eventDesc: ['', [Validators.required]],
      eventType: ['', [Validators.required]],
      eventCategory: ['', [Validators.required]],
      eventLocation: ['', [Validators.required]],
      eventStartDate: ['', [Validators.required, FormValidator.datevalidation]],
      eventEndDate: ['', [Validators.required, FormValidator.datevalidation]],
      eventStartTime: ['', [Validators.required]],
      eventEndTime: ['', [Validators.required]],
      eventCoverImage: ['', []]
    })
  }

  ngOnInit() {
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
      this.attachment.upload(file)
        .then(guid => {
          let obj = {};
          obj['guid'] = guid;
          obj['src'] = this.attachment.getPreview();
          this.reqBody.attachment_guid = obj['guid'];
          this.coverImage = obj['src'];
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
      const d = moment(inputDate).format('L'); // d = "12/12/2017" 
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

    var startTime = this.convertDateToMillis(this.eventForm.value.eventStartDate, this.eventForm.value.eventStartTime)
    var endTime = this.convertDateToMillis(this.eventForm.value.eventEndDate, this.eventForm.value.eventEndTime)

    this.reqBody.title = this.eventForm.value.eventTitle;
    this.reqBody.description = this.eventForm.value.eventDesc;
    this.reqBody.event_type = this.eventForm.value.eventType;
    this.reqBody.category = this.eventForm.value.eventCategory;
    this.reqBody.location = this.eventForm.value.eventLocation;
    this.reqBody.start_time_date = startTime.getTime();
    this.reqBody.end_time_date = endTime.getTime();

    if (this.eventForm.valid && this.reqBody.attachment_guid != '' && this.reqBody.start_time_date != '' && this.reqBody.end_time_date != '') {
      let endpoint = 'api/v3/event';

      this.client.post(endpoint, this.reqBody)
        .then((resp: any) => {

          console.log("Response: ", resp);


          this.eventSubmitted = false;

        })
        .catch((e) => {
          this.eventSubmitted = false;
          alert(e.message);
        });
    }

  }






}

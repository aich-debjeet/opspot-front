import { Component, OnInit } from '@angular/core';
import { EVENT_TYPES, EVENT_CATEGORY } from '../../../services/list-options';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';


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
      eventStartDate: ['', [Validators.required]],
      eventEndDate: ['', [Validators.required]],
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



  submitEvent() {
    this.eventSubmitted = true;
    console.log(this.eventForm.value.eventEndDate)
    console.log(this.eventForm.value.eventEndTime);
    

    this.reqBody.title = this.eventForm.value.eventTitle;
    this.reqBody.description = this.eventForm.value.eventDesc;
    this.reqBody.event_type = this.eventForm.value.eventType;
    this.reqBody.category = this.eventForm.value.eventCategory;
    this.reqBody.location = this.eventForm.value.eventLocation;
    this.reqBody.start_time_date = new Date(`${this.eventForm.value.eventStartDate} ${this.eventForm.value.eventStartTime}`);
    this.reqBody.end_time_date = new Date(`${this.eventForm.value.eventEndDate} ${this.eventForm.value.eventEndTime}`);

    if (this.eventForm.valid && this.reqBody.attachment_guid) {
      let endpoint = 'api/v3/event';

      console.log("RequestBody: ", this.reqBody);


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

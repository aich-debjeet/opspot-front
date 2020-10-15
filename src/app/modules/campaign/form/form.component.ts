import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { AttachmentService } from '../../../services/attachment';
import { FormValidator } from '../../../helpers/form.validator';
import { Client } from '../../../services/api';


@Component({
  selector: 'app-enrolment-form',
  templateUrl: './form.component.html',
  styleUrls: ['./../enrolment.component.scss']
})
export class EnrolmentFormComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter();
  @Input('guid') set _eventGuid(guid) {
    this.eventGuid = guid;
  }

  fileName = '';
  form: FormGroup;
  errorMessage = '';
  attachment_guid = '';
  campaignGuid = environment.campaigns.enrolment.guid;
  formSubmitted: boolean = false;
  resumeUploadError = false;
  attach_guid = [];
  eventGuid: string;
  fileUploaded: boolean = false;
  constructor(
    private fb: FormBuilder,
    private attachment: AttachmentService,
    public client: Client,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      location: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      porfolioLink: ['', [Validators.required]],
      comments: [''],
      agreeTerms: [false],
      resume: [this.fileName]
      // resume: [this.fileName, [Validators.required]]
    });
  }

  submitForm() {
    this.done.emit();
  }

  uploadAttachment(file: HTMLInputElement, event) {
    if (file.value) {
      this.attachment.upload(file, this.attach_guid)
        .then((response) => {
          this.fileUploaded = true;
          this.attachment_guid = response;
        })
        .catch(e => {
          file.value = null;
          this.fileUploaded = false;
          this.attachment.reset();
        });
    }
  }

  submit() {
    this.formSubmitted = true;
    // console.log("Attachment: ", this.attachment_guid);

    if (this.attachment_guid == '') {
      this.resumeUploadError = true;
    }

    if (!this.form.value.agreeTerms) {
      if (!this.form.value.agreeTerms) {
        this.errorMessage = 'To create an account you need to accept terms and conditions.';
      }
      return;
    }


    this.errorMessage = '';
    var formData = {
      'fullname': this.form.value.fullName,
      'email': this.form.value.email,
      'phone_no': this.form.value.mobile,
      'location': this.form.value.location,
      'gender': this.form.value.gender,
      'opspot_link': this.form.value.porfolioLink,
      'comment': this.form.value.comments,
      'attachment_guid': this.attachment_guid,
      'payment_status': 'Pending',
      "total_amount_paid": 2420,
    }

    if (this.form.valid && formData.attachment_guid != '') {
      let endpoint = 'api/v3/event/enrollment/' + this.eventGuid;
      this.client.post(endpoint, formData)
        .then((resp: any) => {
          if (resp.status == 'success') {
            this.done.emit({ form: formData, enrollGuid: resp.guid, campaignGuid: this.eventGuid });
          }

        })
        .catch((e) => {
          this.formSubmitted = false;
          // alert(e.message);
        });
    }
    // this.done.emit(formData);

  }

}

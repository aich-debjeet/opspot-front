import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { AttachmentService } from '../../../services/attachment';
import { FormValidator } from '../../../helpers/form.validator'
import { Client } from '../../../services/api';


@Component({
  selector: 'app-enrolment-form',
  templateUrl: './form.component.html',
  styleUrls: ['./../enrolment.component.scss']
})
export class EnrolmentFormComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter();

  fileName = '';
  form: FormGroup;
  errorMessage = '';
  attachment_guid = '';
  campaignGuid = environment.campaigns.enrolment.guid;
  formSubmitted: boolean = false;
  resumeUploadError = false;
  attach_guid = [];

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
    console.log("File", file.value);

    if (file.value) {
    this.attachment.upload(file, this.attach_guid)
      .then((response) => {
        console.log("Res: ", response);

        this.attachment_guid = response;
        file.value = null;
      })
      .catch(e => {
        file.value = null;
        this.attachment.reset();
      });
    }
  }

  submit() {
    this.formSubmitted = true;
    console.log("Attachment: ", this.attachment_guid);

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
      'attachment_guid': this.attachment_guid
    }
    console.log(this.campaignGuid);


    if (this.form.valid && formData.attachment_guid != '') {
      let endpoint = 'api/v3/campaign/enrolment/' + this.campaignGuid;

      this.client.post(endpoint, formData)
        .then((resp: any) => {
          console.log("Response: ", resp);

        })
        .catch((e) => {
          this.formSubmitted = false;
          // alert(e.message);
        });
    }
    this.done.emit(formData);

  }

}

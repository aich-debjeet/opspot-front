import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { AttachmentService } from '../../../services/attachment';

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

  constructor(
    private fb: FormBuilder,
    private attachment: AttachmentService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
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
      this.attachment.upload(file)
        .then((response) => {
          console.log('Attachment response: ', response);
          file.value = null;
        })
        .catch(e => {
          file.value = null;
          this.attachment.reset();
        });
    }
  }

  submit() {

    if (!this.form.value.agreeTerms) {
      if (!this.form.value.agreeTerms) {
        this.errorMessage = 'To create an account you need to accept terms and conditions.';
      }
      return;
    }

    if (this.form.valid) {
      this.errorMessage = '';
      const formData = {
        'fullname': this.form.value.fullName,
        'email': this.form.value.email,
        'phone_no': this.form.value.mobile,
        'location': this.form.value.location,
        'gender': this.form.value.gender,
        'opspot_link': this.form.value.porfolioLink,
        'comment': this.form.value.comments,
        'attachment_guid': this.attachment_guid
      }
      this.done.emit(formData);
    }

  }

}

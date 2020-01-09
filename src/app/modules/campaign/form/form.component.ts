import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';

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
    private fb: FormBuilder
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

  onFileChange($event) {
    let file = $event.target.files[0];
    this.form.controls['resume'].setValue(file ? file.name : '');
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

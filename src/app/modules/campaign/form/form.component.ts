import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Client } from '../../../services/api';
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
  inProgress: boolean = false;
  campaignGuid = environment.campaigns.enrolment.guid;

  constructor(
    private fb: FormBuilder,
    private client: Client
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
      comments: ['', [Validators.required]],
      agreeTerms: [false],
      resume: [this.fileName, Validators.required]
    });
  }

  submitForm() {
    this.done.emit();
  }

  onFileChange($event) {
    let file = $event.target.files[0];
    this.form.controls['resume'].setValue(file ? file.name : '');
  }

  enrol() {

    if (!this.form.value.agreeTerms) {
      if (!this.form.value.agreeTerms) {
        this.errorMessage = 'To create an account you need to accept terms and conditions.';
      }
      return;
    }

    if (this.form.valid) {
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

      this.inProgress = true;
      this.client.post(`api/v3/campaign/enrolment/${this.campaignGuid}`, formData)
        .then((data: any) => {
          this.inProgress = false;
          this.done.next(data);
        })
        .catch((e) => {
          // console.log(e);
          this.inProgress = false;
          if (e.status === 'error') {
            //two factor?
            this.errorMessage = e.message;
          } else {
            this.errorMessage = "Sorry, there was an error. Please try again.";
          }
          return;
        });
    }

  }

}

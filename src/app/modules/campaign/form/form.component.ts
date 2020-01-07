import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enrolment-form',
  templateUrl: './form.component.html',
  styleUrls: ['./../enrolment.component.scss']
})
export class EnrolmentFormComponent implements OnInit {

  enrolmentForm: FormGroup;
  @Output() done: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.enrolmentForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      location: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      porfolioLink: ['', [Validators.required]],
      comments: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.done.emit();
  }

}

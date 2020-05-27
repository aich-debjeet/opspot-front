import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../helpers/form.validator';
import { OpspotTitle } from '../../../services/ux/title';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  campaignForm : FormGroup;
  constructor(private fb: FormBuilder, private title: OpspotTitle) {
    this.title.setTitle('Campaign-Enrollment');
   }

  ngOnInit() {
  }
  createForm(){
  this.campaignForm = this.fb.group({
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
  });
  }
}

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
    this.createForm();
  }
  createForm(){
  this.campaignForm = this.fb.group({
      campaignTitle: ['', [Validators.required]],
      campaignDesc: ['', [Validators.required]],
      campaignLoc: ['', [Validators.required]],
      enrollStartDate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
      enrollEndDate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
      enrollStartTime: ['', [Validators.required]],
      enrollEndTime: ['', [Validators.required]],
      enrollCoverImage: ['', []],
      gender: ['',[Validators.required]],
      refreshmentMaterials: ['',[Validators.required]],
      gallery: [''],
      orgName: ['', [Validators.required]],
      orgAbout: ['', [Validators.required]],
      orgPic: ['', [Validators.required]],
      allowContact: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]]
  });
  }
}

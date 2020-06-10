import { Component, OnInit } from '@angular/core';
import { Client } from '../../../services/api/client';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../helpers/form.validator';
import { OpspotTitle } from '../../../services/ux/title';
import { AttachmentService } from '../../../services/attachment';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss']
})
export class EditCampaignComponent implements OnInit {
  campaignDetails: any;
  paramsSubscription: Subscription;
  campaignForm : FormGroup;

  constructor(
    public client: Client,
    private route: ActivatedRoute,
    private fb: FormBuilder, private title: OpspotTitle, private attachment: AttachmentService,
  ) {
    console.log('edit a campIGN')
  }

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.loadCampaign(params.get('guid'));
      }
    });
  }
  editForm(){
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
        // allowContact: ['', [Validators.required]],
        price: ['', [Validators.required]],
        duration: ['', [Validators.required]]
    });
    }

  loadCampaign(guid: string) {
    this.client.get('api/v1/newsfeed/single/' + guid)
      .then((data: any) => {
        console.log(data);
        if (data.activity) {
          this.campaignDetails = data.activity;
        }
      })
      .catch((e) => {
      });
  }
}

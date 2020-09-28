import { Component, OnInit } from '@angular/core';
import { Client } from '../../../services/api/client';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../helpers/form.validator';
import { OpspotTitle } from '../../../services/ux/title';
import { AttachmentService } from '../../../services/attachment';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss']
})
export class EditCampaignComponent implements OnInit {
  campaignDetails: any;
  paramsSubscription: Subscription;
  campaignForm: FormGroup;
  displayForm: boolean = false;
  previewCover: boolean = true;
  imgSrc: string;
  cards: Array<any>;
  orgImgSrc: string;

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
  editForm(data?) {
    console.log('form data', data)
    this.campaignForm = this.fb.group({
      campaignTitle: [data['title'] ? data['title'] : '', [Validators.required]],
      campaignDesc: [data['description'] ? data['description'] : '', [Validators.required]],
      campaignLoc: [data['location'] ? data['location'] : '', [Validators.required]],
      enrollStartDate: [data['start_time_date'] ? this.date(data['start_time_date']) : '', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
      enrollEndDate: [data['end_time_date'] ? this.date(data['end_time_date']) : '', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
      enrollStartTime: [data['start_time_date'] ? this.time(data['start_time_date']) : '', [Validators.required]],
      enrollEndTime: [data['end_time_date'] ? this.time(data['end_time_date']) : '', [Validators.required]],
      enrollCoverImage: [data['cover_data'] ? this.setCover(data['cover_data'][0].src) : '', [Validators.required]],
      gender: [data['allowed_gender'] ? data['allowed_gender'] : '', [Validators.required]],
      refreshmentMaterials: [data['brevarges'] ? data['brevarges'] : '', [Validators.required]],
      gallery: [data['custom_data'] ? this.setGallery(data['custom_data']) : '', [Validators.required]],
      orgName: [data['organiser_name'] ? data['organiser_name'] : '', [Validators.required]],
      orgAbout: [data['organiser_about'] ? data['organiser_about'] : '', [Validators.required]],
      orgPic: [data['organiser_data'] ? this.setOrgPic(data['organiser_data']) : '', [Validators.required]],
      // allowContact: ['', [Validators.required]],
      price: [data['enrollment_fees'] ? data['enrollment_fees'] : '', [Validators.required]],
      // duration: ['', [Validators.required]]
    });
  }

  date(dateString) {
    let date = new Date(parseInt(dateString));
    return moment(date).format('DD-MM-YYYY');
  }
  time(dateString) {
    let date = new Date(parseInt(dateString));
    return moment(date).format('HH:mm');
  }
  setCover(image) {
    this.imgSrc = image;
    return image;
  }
  setGallery(data) {
    this.cards = data
    return this.cards;
  }
  setOrgPic(data) {
    this.orgImgSrc = data[0].src;
    return this.orgImgSrc;
  }

  loadCampaign(guid: string) {
    this.client.get('api/v3/event/' + guid)
      .then((data: any) => {
        console.log(data);
        if (data.event) {
          console.log('data', data);
          this.campaignDetails = data.event;
          this.editForm(this.campaignDetails);
          this.displayForm = true;
        }
      })
      .catch((e) => {
      });
  }
}

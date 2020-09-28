import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('file') coverFile: ElementRef;
  @ViewChild('fileGallery') fileGallery: ElementRef;
  @ViewChild('organizationPic') organizationPic: ElementRef;

  constructor(
    public client: Client,
    private route: ActivatedRoute,
    private fb: FormBuilder, private title: OpspotTitle, private attachment: AttachmentService,
  ) {
    console.log('edit a campIGN');
    this.editForm();
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
    if (data != undefined) {
      console.log('executing if');
      this.campaignForm.patchValue({
        campaignTitle: data['title'],
        campaignDesc: data['description'],
        campaignLoc: data['location'],
        orgName: data['organiser_name'],
        orgAbout: data['organiser_about'],
        price: data['enrollment_fees'],
        gender: data['allowed_gender'],
        refreshmentMaterials: data['brevarges'],
        enrollStartDate: this.date(data['start_time_date']),
        enrollEndDate: this.date(data['end_time_date']),
        enrollStartTime: this.time(data['start_time_date']),
        enrollEndTime: this.time(data['end_time_date']),
        enrollCoverImage: this.setCover(data['cover_data'][0].src),
        gallery: this.setGallery(data['custom_data']),
        orgPic: this.setOrgPic(data['organiser_data']),
      });
      console.log('form', this.campaignForm)
    } else {
      this.campaignForm = this.fb.group({
        campaignTitle: ['', [Validators.required]],
        campaignDesc: ['', [Validators.required]],
        campaignLoc: ['', [Validators.required]],
        enrollStartDate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
        enrollEndDate: ['', [Validators.required, FormValidator.validateDate, FormValidator.datevalidation]],
        enrollStartTime: ['', [Validators.required]],
        enrollEndTime: ['', [Validators.required]],
        enrollCoverImage: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        refreshmentMaterials: ['', [Validators.required]],
        gallery: ['', [Validators.required]],
        orgName: ['', [Validators.required]],
        orgAbout: ['', [Validators.required]],
        orgPic: ['', [Validators.required]],
        // allowContact: ['', [Validators.required]],
        price: ['', [Validators.required]],
        // duration: ['', [Validators.required]]
      });
    }
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

  checkKey() { }

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

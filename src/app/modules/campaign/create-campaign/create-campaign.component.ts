import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../helpers/form.validator';
import { OpspotTitle } from '../../../services/ux/title';
import { AttachmentService } from '../../../services/attachment';
import { remove as _remove, findIndex as _findIndex } from 'lodash';
import { Client, Upload } from '../../../services/api';
import { from as fromPromise, Observable } from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  campaignForm: FormGroup;
  imgSrc: '';
  orgImgSrc: '';
  previewCover: boolean = false;
  cards = [];
  bannerGuid: string;
  orgImgGuid: string;
  private valueTimeout;
  juryList: Array<any> = [];
  coverGuids = [];
  meta: any = {
    message: '',
    wire_threshold: null
  };

  public timeMask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  @ViewChild('file') coverFile: ElementRef;
  @ViewChild('fileGallery') fileGallery: ElementRef;
  @ViewChild('organizationPic') organizationPic: ElementRef;

  constructor(private fb: FormBuilder, private title: OpspotTitle, private attachment: AttachmentService, public client: Client,public router: Router ) {
    this.title.setTitle('Campaign-Enrollment');
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
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
  uploadAttachment(event) {
    console.log('firing', this.coverFile, event, this.coverFile.nativeElement);
    this.attachment.upload(this.coverFile.nativeElement)
      .then(guid => {
        console.log(guid);
        if (guid) {
          this.bannerGuid = guid;
          this.previewCover = true;
          this.imgSrc = this.attachment.getPreview();
          console.log(this.campaignForm)
        }
      })

  }

  uploadOrgAttachment(event) {
    console.log('firing', this.organizationPic, event, this.organizationPic.nativeElement);
    this.attachment.upload(this.organizationPic.nativeElement)
      .then(guid => {
        console.log(guid);
        if (guid) {
          this.orgImgGuid = guid;
          this.orgImgSrc = this.attachment.getPreview();
        }
      })
  }
  removeOrgAttachment() {
    this.attachment.remove(this.orgImgGuid, this.organizationPic.nativeElement).then(guid => {
      this.organizationPic.nativeElement.value = "";
      this.orgImgSrc = "";
      this.campaignForm.get('orgPic').setValue(null);
    }).catch(e => { });
  }

  removeAttachment() {
    // console.log(this.coverFile)
    // console.log(this.campaignForm)
    this.attachment.remove(this.bannerGuid, this.coverFile.nativeElement).then(guid => {
      this.previewCover = false;
      this.coverFile.nativeElement.value = "";
      this.imgSrc = "";
      this.campaignForm.get('enrollCoverImage').setValue(null);
    }).catch(e => { });
  }

  uploadGalleryAttachment(event) {
    console.log(event);
    this.attachment.upload(this.fileGallery.nativeElement)
      .then(guid => {
        console.log(guid);
        console.log(this.fileGallery);
        if (guid) {
          let guidObj = {};
          guidObj['guid'] = guid;
          guidObj['src'] = this.attachment.getPreview();
          this.cards.push(guidObj);
          this.coverGuids.push(guid);
          console.log(this.campaignForm)
        }
      })
  }

  removeGalleryAttachment(obj: any) {
    this.attachment.remove(obj.guid, this.fileGallery.nativeElement)
      .then(guid => {
        this.cards = _remove(this.cards, function (n) {
          return n.guid != guid;
        });
        this.coverGuids = _remove(this.coverGuids, function(n) {
          console.log(n);
          return n != guid;
        })
        if (this.cards.length == 0) {
          this.fileGallery.nativeElement.value = ""; //to empty the input placeholder
          this.campaignForm.get('gallery').setValue(null);
        }
      }).then(()=>{})
      .catch(e => {
      });
  }
  onSubmit() {
    console.log('submitted')
    console.warn(this.campaignForm.valid);
    if (this.campaignForm.valid) {
      let reqBody = {};
      reqBody = {
        title: this.campaignForm.value.campaignTitle,
        description: this.campaignForm.value.campaignDesc,
        event_type: 'Premium',
        location: this.campaignForm.value.campaignLoc,
        start_time_date: this.campaignForm.value.enrollStartDate,
        end_time_date: this.campaignForm.value.enrollStartDate,
        attachment_guid: this.coverGuids,
        enrollment_fees: this.campaignForm.value.price,
        brevarges: this.campaignForm.value.refreshmentMaterials,
        allowed_gender:this.campaignForm.value.gender,
        access_id: 2,
        published: 1,
        attachment_license: '',
        cover_attachment_guid: this.bannerGuid ? this.bannerGuid: '',
        organiser_name: this.campaignForm.value.orgName,
        organiser_about: this.campaignForm.value.orgAbout,
        organiser_attachment_guid: this.orgImgGuid ? this.orgImgGuid : '',
      };
      console.log(reqBody)
      this.client.post('api/v3/event', reqBody)
        .then((resp: any) => {
          if (resp && resp.activity && resp.activity['guid'] != '') {
            this.router.navigate(['/campaign/' + resp.activity['entity_guid']]);
            console.log(resp);
          }
          this.attachment.reset();
        })
        .catch((e) => {
          // alert(e.message);
        });
    }
  }
  // searchUser(event) {
  //   console.log(event)
  //   if (this.valueTimeout) {
  //     clearTimeout(this.valueTimeout);
  //   }
  //   this.valueTimeout = setTimeout(async () => {
  //     try {
  //       const response: any = await this.client.get('api/v2/search/suggest', {
  //         q: event,
  //         limit: 5
  //       });
  //       console.log(response);
  //       this.juryList = ['Item1', 'item2', 'item3'];
  //     } catch (e) {
  //       this.juryList = [];
  //     }
  //   }, 300)
  // }


  // public requestAutocompleteItems = (text: string): Observable<any> => {
  //   let resp;
  //   return fromPromise(this.client.get('api/v2/search/suggest', {
  //     q: event,
  //     limit: 5
  //   })).mergeMap('',)
    
    
  //   // this.client.get('api/v2/search/suggest', {
  //   //   q: text,
  //   //   limit: 5
  //   // }).then((data:any) => {resp = data.entities});

  //   // const url = `https://api.github.com/search/repositories?q=${text}`;
  //   // return this.http
  //   //     .get(url)
  //   //     .map((data: any) => data.items.map(item => item.full_name));
  // };
}

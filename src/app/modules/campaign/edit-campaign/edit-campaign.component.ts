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
  juryList: Array<string>;
  @ViewChild('file') coverFile: ElementRef;
  @ViewChild('fileGallery') fileGallery: ElementRef;
  @ViewChild('organizationPic') organizationPic: ElementRef;
  data: any[];
  listContainer: any[];
  updateJury: any[] = [];
  bannerGuid:string = '';
  orgImgGuid: string = '';


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
        juryList: this.returnJury(data['juries']),
        enrollStartDate: this.date(data['start_time_date']),
        enrollEndDate: this.date(data['end_time_date']),
        enrollStartTime: this.time(data['start_time_date']),
        enrollEndTime: this.time(data['end_time_date']),
        enrollCoverImage: this.setCover(data['cover_data'][0]),
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
        juryList: ['', [Validators.required]],
        // allowContact: ['', [Validators.required]],
        price: ['', [Validators.required]],
        // duration: ['', [Validators.required]]
      });
    }
    this.onValueChanges();
  }
  onValueChanges() {
    this.campaignForm.get('juryList').valueChanges.subscribe(val => {
      console.log('value changes', val);

    })
  }
  returnJury(list: Array<any>) {
    this.updateJury = list.map(val => val['guid']);
    this.juryList = list.map(val => val)
    return this.juryList;
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
    this.imgSrc = image.src;
    this.bannerGuid = image.guid
    return image.guid;
  }
  setGallery(data) {
    this.cards = data
    return this.cards;
  }
  setOrgPic(data) {
    this.orgImgSrc = data[0].src;
    this.orgImgGuid = data[0].guid;
    return this.orgImgSrc;
  }

  loadCampaign(guid: string) {
    this.client.get('api/v3/event/' + guid)
      .then((data: any) => {

        if (data.event) {
          this.campaignDetails = data.event;
          this.editForm(this.campaignDetails);
          this.displayForm = true;
        }
      })
      .catch((e) => {
      });
  }
  onTextChange(event) {
    console.log('text change', event);
    if (event.length >= 4) {
      this.client.get('api/v2/search', {
        q: event,
        container: '',
        limit: 10,
        rating: 2,
        offset: ''
      }).then((res) => {
        this.listContainer = res['entities'].map(val => val['ownerObj']).map(({ guid, username }) => ({ guid, username }));
        this.data = res['entities'].filter(val => this.updateJury.indexOf(val.ownerObj.guid) == -1).map(val => val['ownerObj']['username']);
      }
      );
    }

  }
  onItemAdded(event) {
    this.updateJury = this.updateJury.concat(this.listContainer.filter((val) => {
      if (event.username === val.username && this.updateJury.indexOf(val.guid) == -1) {
        return val.guid;
      }
    }).map(val => val.guid));
  }
  onSubmit() {
    console.log('submitted')
    console.warn(this.campaignForm.valid);

    var startTime = this.convertDateToMillis(this.campaignForm.value.enrollStartDate, this.campaignForm.value.enrollStartTime)
    var endTime = this.convertDateToMillis(this.campaignForm.value.enrollEndDate, this.campaignForm.value.enrollEndTime)
    if (this.campaignForm.valid) {
      let reqBody = {};
      reqBody = {
        title: this.campaignForm.value.campaignTitle,
        description: this.campaignForm.value.campaignDesc,
        event_type: 'Premium',
        location: this.campaignForm.value.campaignLoc,
        start_time_date: startTime.getTime(),
        end_time_date: endTime.getTime(),
        attachment_guid: this.cards.map(guid => guid.guid),
        enrollment_fees: this.campaignForm.value.price,
        juries: this.updateJury,
        brevarges: this.campaignForm.value.refreshmentMaterials,
        allowed_gender: this.campaignForm.value.gender,
        access_id: 2,
        published: 1,
        attachment_license: '',
        cover_attachment_guid: this.campaignForm.value.enrollCoverImage ? this.bannerGuid : '',
        organiser_name: this.campaignForm.value.orgName,
        organiser_about: this.campaignForm.value.orgAbout,
        organiser_attachment_guid: this.campaignForm.value.orgPic ? this.campaignForm.value.orgPic : '',
      };
      console.log(reqBody)
      this.client.post('api/v3/event', reqBody)
        .then((resp: any) => {
          if (resp && resp.activity && resp.activity['guid'] != '') {
            // this.router.navigate(['/campaign/' + resp.activity['entity_guid']]);
            console.log(resp);
          }
          this.attachment.reset();
        })
        .catch((e) => {
          // alert(e.message);
        });
    }
  }
  convertDateToMillis(inputDate, inputTime) {
    if (inputTime) {
      var timeString = this.formatTime(inputTime)
      const d = moment(inputDate.split('-').reverse().join('-')).format('L'); // d = "12/12/2017" 
      var myDate = new Date(d);
      var timeReg = /(\d+)\:(\d+)(\w+)/;
      if (timeString) {
        var parts = timeString.match(timeReg);
      }
      var hours = /am/i.test(parts[3]) ?
        function (am) { return am < 12 ? am : 0 }(parseInt(parts[1], 10)) :
        function (pm) { return pm < 12 ? pm + 12 : 12 }(parseInt(parts[1], 10));
      var minutes = parseInt(parts[2], 10);
      var date = new Date(myDate.getTime());
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    }
  }
  formatTime(inputTime) {
    var timeString = inputTime;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    return timeString = h + timeString.substr(2, 3) + ampm;
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
          // this.coverGuids.push(guid);
          console.log(this.campaignForm)
        }
      })
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
  removeAttachment() {
    const array: string[] = [];
    array.push(this.bannerGuid)
    this.attachment.remove(this.bannerGuid, this.coverFile.nativeElement, array).then(guid => {
      array.length = 0;
      this.previewCover = false;
      this.coverFile.nativeElement.value = "";
      this.imgSrc = "";
      this.campaignForm.get('enrollCoverImage').setValue(null);
      console.log(this.campaignForm)
    }).catch(e => {
      console.error(e);      
     });
  }
  removeGalleryAttachment(obj: any, card:any[]) {
    const arr : Array<any> = card.map(e => e.guid)
    this.attachment.remove(obj.guid, this.fileGallery.nativeElement, arr)
      .then(guid => {
        this.cards = card.filter((element) => element.guid != guid)
        if (this.cards.length == 0) {
          this.fileGallery.nativeElement.value = ""; //to empty the input placeholder
          this.campaignForm.get('gallery').setValue(null);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }
  removeOrgAttachment() {
    this.attachment.remove(this.orgImgGuid, this.organizationPic.nativeElement).then(guid => {
      this.organizationPic.nativeElement.value = "";
      this.orgImgSrc = "";
      this.campaignForm.get('orgPic').setValue(null);
    }).catch(e => { console.error(e);
    });
  }
}

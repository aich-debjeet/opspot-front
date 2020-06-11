import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../helpers/form.validator';
import { OpspotTitle } from '../../../services/ux/title';
import { AttachmentService } from '../../../services/attachment';
import { remove as _remove, findIndex as _findIndex } from 'lodash';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  campaignForm : FormGroup;
  imgSrc: '';
  orgImgSrc: '';
  previewCover: boolean = false;
  cards = [];
  bannerGuid: string;
  orgImgGuid: string;

  @ViewChild('file') coverFile: ElementRef;
  @ViewChild('fileGallery') fileGallery: ElementRef;
  @ViewChild('organizationPic') organizationPic: ElementRef;
  
  constructor(private fb: FormBuilder, private title: OpspotTitle, private attachment: AttachmentService) {
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
      // allowContact: ['', [Validators.required]],
      price: ['', [Validators.required]],
      duration: ['', [Validators.required]]
  });
  }
  uploadAttachment(event){
    console.log('firing',this.coverFile, event, this.coverFile.nativeElement);
    this.attachment.upload(this.coverFile.nativeElement)
    .then(guid => {
      console.log(guid);
      if(guid){
        this.bannerGuid = guid;
        this.previewCover = true;
        this.imgSrc = this.attachment.getPreview();
        console.log(this.campaignForm)
      }
    })

  }

  uploadOrgAttachment(event){
    console.log('firing',this.organizationPic, event, this.organizationPic.nativeElement);
    this.attachment.upload(this.organizationPic.nativeElement)
    .then(guid => {
      console.log(guid);
      if(guid){
        this.orgImgGuid = guid;
        this.orgImgSrc = this.attachment.getPreview();
      }
    })
  }
  removeOrgAttachment(){
    this.attachment.remove(this.orgImgGuid,this.organizationPic.nativeElement).then(guid => {
      this.organizationPic.nativeElement.value = "";
      this.orgImgSrc = "";
    }).catch(e =>{});
  }

  removeAttachment() {
    // console.log(this.coverFile)
    // console.log(this.campaignForm)
    this.attachment.remove(this.bannerGuid,this.coverFile.nativeElement).then(guid => {
      this.previewCover = false;
      this.coverFile.nativeElement.value = "";
      this.imgSrc = "";
      this.campaignForm.get('enrollCoverImage').setValue(null);
    }).catch(e =>{});
  }

  uploadGalleryAttachment(event){
    console.log(event);
    this.attachment.upload(this.fileGallery.nativeElement)
    .then(guid => {
      console.log(guid);
      console.log(this.fileGallery);
      if(guid){
        let guidObj = {};
        guidObj['guid'] = guid;
        guidObj['src'] = this.attachment.getPreview();
        this.cards.push(guidObj);
        console.log(this.campaignForm)
      }
    })
  }

  removeGalleryAttachment(obj: any){
    this.attachment.remove(obj.guid, this.fileGallery.nativeElement)
      .then(guid => {
        this.cards = _remove(this.cards, function (n) {
          return n.guid != guid;
        });
        if(this.cards.length == 0){
          this.fileGallery.nativeElement.value = ""; //to empty the input placeholder
          this.campaignForm.get('gallery').setValue(null);
        }
      })
      .catch(e => {
      });
  }
}

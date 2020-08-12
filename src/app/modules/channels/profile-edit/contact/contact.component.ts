import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Client } from '../../../../services/api/client';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  activeUser = window.Opspot.user;
  wrongWebsite: boolean = false;
  inProgress: boolean = false;
  @Output() updatePercentage: EventEmitter<any> = new EventEmitter();

  constructor(
    private client: Client,
    private router: Router,
    private toastr: ToastrService
  ) { }

  privacy = {
    location: 'Following',
    email: 'Following',
    phone: 'Following',
    website: 'Following',
    secondary_phone: 'Following'
  };
  toggleLocation;
  toggleEmail;
  togglePhone;
  toggleWebsite;
  toggleSecondaryphone;
  phoneNumber;

  model: any = {
    secondary_phone: []
  };

  showSecMobNumber = false;

  // secondaryMobileNumbers: any[] = [{
  //   secMobileNumber: '',
  // }];

  ngOnInit() {
    this.load();
  }

  changePrivacy(e, arg) {
    switch (arg) {
      case 'location':
        this.privacy.location = e;
        this.toggleLocation = !this.toggleLocation;
        break;

      case 'email':
        this.privacy.email = e;
        this.toggleEmail = !this.toggleEmail;
        break;

      case 'phone':
        this.privacy.phone = e;
        this.togglePhone = !this.togglePhone;
        break;

      case 'website':
        this.privacy.website = e;
        this.toggleWebsite = !this.toggleWebsite;
        break;

      case 'secondary_phone':
        this.privacy.secondary_phone = e;
        this.toggleSecondaryphone = !this.toggleSecondaryphone;
        break;
    }
  }

  async load() {
    let res = await this.client.get('api/v1/channel/me');
    let response: any = res['channel'];
    if (response['secondary_phone'] && response['secondary_phone'].length > 0) {
      this.showSecMobNumber = true;
    }

    
    this.model.phoneNumber = response['phone'];
    this.model.email = response['email'];
    this.model.location = response['location'];
    this.model.website = response['website'];
    this.model.secondary_phone = response['secondary_phone'][0];

    this.privacy.email = response['email_visibility'] ? `${response['email_visibility'].charAt(0).toUpperCase()}${response['email_visibility'].slice(1)}` : this.privacy.email;
    this.privacy.location = response['location_visibility'] ? `${response['location_visibility'].charAt(0).toUpperCase()}${response['location_visibility'].slice(1)}` : this.privacy.location;
    this.privacy.website = response['website_visibility'] ? `${response['website_visibility'].charAt(0).toUpperCase()}${response['website_visibility'].slice(1)}` : this.privacy.website;
    this.privacy.phone = response['phone_number_visibility'] ? `${response['phone_number_visibility'].charAt(0).toUpperCase()}${response['phone_number_visibility'].slice(1)}` : this.privacy.phone;
    this.privacy.secondary_phone = response['secondary_phone_visibility'] ? `${response['secondary_phone_visibility'].charAt(0).toUpperCase()}${response['secondary_phone_visibility'].slice(1)}` : this.privacy.secondary_phone;

  }

  onSubmit() {
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (this.model.website.length > 0) {
      if (!regex.test(this.model.website)) {
        this.wrongWebsite = true;
        return
      } else this.wrongWebsite = false;
    }

    let mobileArray = [];
    if(this.model.secondary_phone)
    mobileArray.push(this.model.secondary_phone)

    this.inProgress = true;
    const contact = {
      contact_details: {
        email: this.model.email,
        location: this.model.location ? this.model.location : '',
        phone: this.model.phoneNumber,
        website: this.model.website ? this.model.website : '',
        secondary_phone: mobileArray,
        location_visibility: this.privacy.location.toLowerCase().split(' ').join(''),
        phone_visibility: this.privacy.phone.toLowerCase().split(' ').join(''),
        email_visibility: this.privacy.email.toLowerCase().split(' ').join(''),
        website_visibility: this.privacy.website.toLowerCase().split(' ').join(''),
        secondary_phone_visibility: this.privacy.secondary_phone.toLowerCase().split(' ').join('')
      }
    };
    this.client.post('api/v1/entities/contact_details', contact).then((res: any) => {
      if (res.status === 'success' && res.entities == true) {
        this.client.get('api/v2/onboarding/progress').then((response: any) => {
          this.showSuccess();
          this.inProgress = false;
          this.updatePercentage.emit(response.rating);
        });
      }
      // this.router.navigate(['/profile/work']);
    }).catch((e) => {
      if (e.status === 'error') {
        this.inProgress = false;
        this.showFailure();
      }
    });
  }
  showSuccess() {
    this.toastr.success('You have successfully updated your profile', '', {
      timeOut: 3000
    });
  }
  showFailure() {
    this.toastr.error('Profile could not be updated', '', {
      timeOut: 3000
    });
  }

  addMobileNumbers() {
    this.showSecMobNumber = true;
    // this.secondaryMobileNumbers.push({
    //   secMobileNumber: '',    
    // });
  }
}

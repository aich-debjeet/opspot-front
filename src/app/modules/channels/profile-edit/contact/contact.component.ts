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
  inProgress:boolean = false;
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
    website: 'Following'
  };
  toggleLocation;
  toggleEmail;
  togglePhone;
  toggleWebsite;
  phoneNumber;

  model: any = {};

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
    }
  }

  async load() {
    let res = {};
    res = await this.client.get('api/v1/channel/me');
    res = res['channel'];
    this.model.phoneNumber = res['phone'];
    this.model.email = res['email'];
    this.model.location = res['location'];
    this.model.website = res['website'];

    this.privacy.email = res['email_visibility'] ? res['email_visibility'].charAt(0).toUpperCase() + res['email_visibility'].slice(1) : this.privacy.email;
    this.privacy.location = res['location_visibility'] ? res['location_visibility'].charAt(0).toUpperCase() + res['location_visibility'].slice(1) : this.privacy.location;
    this.privacy.website = res['website_visibility'] ? res['website_visibility'].charAt(0).toUpperCase() + res['website_visibility'].slice(1) : this.privacy.website;
    this.privacy.phone = res['phone_number_visibility'] ? res['phone_number_visibility'].charAt(0).toUpperCase() + res['phone_number_visibility'].slice(1) : this.privacy.phone;

  }

  onSubmit() {
    this.inProgress = true;
    const contact = {
      contact_details: {
        email: this.model.email,
        location: this.model.location ? this.model.location : '',
        phone: this.model.phoneNumber,
        website: this.model.website ? this.model.website : '',
        location_visibility: this.privacy.location.toLowerCase().split(' ').join(''),
        phone_visibility: this.privacy.phone.toLowerCase().split(' ').join(''),
        email_visibility: this.privacy.email.toLowerCase().split(' ').join(''),
        website_visibility: this.privacy.website.toLowerCase().split(' ').join('')
      }
    };
    this.client.post('api/v1/entities/contact_details', contact).then((res:any) => {
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
  showFailure(){
    this.toastr.error('Profile could not be updated', '', {
      timeOut: 3000
    });
  }
}

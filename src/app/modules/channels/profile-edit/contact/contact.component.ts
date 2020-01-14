import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../services/api/client';
import { Router } from '@angular/router';
// import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  activeUser = window.Opspot.user;
  constructor(
    private client: Client,
    private router: Router
  ) { }

  privacy = {
    location: 'Visible to Everyone',
    email: 'Visible to Everyone',
    phone: 'Visible to Everyone',
    website: 'Visible to Everyone'
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

    this.privacy.email = res['email_visibility'] ? res['email_visibility'] : this.privacy.email;
    this.privacy.location = res['location_visibility'] ? res['location_visibility'] : this.privacy.location;
    this.privacy.website = res['website_visibility'] ? res['website_visibility'] : this.privacy.website;
    this.privacy.phone = res['phone_number_visibility'] ? res['phone_number_visibility'] : this.privacy.phone;

  }

  onSubmit() {
    const contact = {
      contact_details: {
        email: this.model.email,
        location: this.model.location ? this.model.location : '',
        phone: this.model.phoneNumber,
        website: this.model.website ? this.model.website : '',
        location_visibility: this.privacy.location,
        phone_visibility: this.privacy.phone,
        email_visibility: this.privacy.email,
        website_visibility: this.privacy.website
      }
    };
    this.client.post('api/v1/entities/contact_details', contact).then(res => {
      this.router.navigate(['/profile/work']);
    });
  }
}

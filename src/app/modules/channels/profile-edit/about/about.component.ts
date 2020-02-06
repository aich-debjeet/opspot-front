import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Client } from '../../../../services/api/client';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  activeUser = window.Opspot.user;
  @Output() updatePercentage: EventEmitter<any> = new EventEmitter();

  constructor(private client: Client, public router: Router, private toastr: ToastrService) {
    this.load();
    this.data = JSON.parse(localStorage.getItem('opspot:languages'));
  }
  date;
  model: any = {};
  // languages: any[];
  data;
  bsConfig = {
    containerClass: 'theme-dark-blue',
    adaptivePosition: true,
    dateInputFormat: 'DD-MM-YYYY'
  };
  privacy = { dob: 'Everyone', height: 'Everyone' };
  toggleHeight;
  toggleDob;
  aboutError = { dob: false, dobInvalid: false, gender: false };
  submitted = false;
  invalidForm: boolean = false;
  inProgress: boolean = false;

  ngOnInit() {
    //set privacy
  }

  // changePrivacy(e, arg) {
  //   if (arg === 'dob') {
  //     this.privacy.dob = e;
  //     this.toggleDob = !this.toggleDob;
  //   } else if (arg === 'height') {
  //     this.privacy.height = e;
  //     this.toggleHeight = !this.toggleHeight;
  //   }
  // }

  async load() {
    // TODO @shashi: create model for type about
    let res = await this.client.get('api/v1/channel/me');
    let dob = res['channel'].dob;
    let response: any = res['channel'];
    this.model.dob = new Date(dob);
    this.model.description = response.about.description;
    this.model.gender = response.about.gender;
    // this.model.dob_visibility = response.about.dob_visibility;
    // this.privacy.dob = response.about.dob_visibility;
    // this.privacy.height = response.about.height_and_weight_visibility;
    // this.model.height_and_weight_visibility = response.about.height_and_weight_visibility;
    this.model.dob_visibility = 'everyone';
    this.privacy.dob = 'everyone';
    this.privacy.height = 'everyone';
    this.model.height = response.height;
    this.model.weight = response.weight;
    const languages = [];
    if (response.about.languages && response.about.languages.length > 0) {
      response.about.languages.map(el => {
        languages.push({ display: el, value: el });
      });
      this.model.languages = languages;
    }
  }

  onSubmit(e) {
    this.submitted = true;
    let dob = {};
    if (new Date(this.model.dob).getTime()) {
      dob['year'] = new Date(this.model.dob).getFullYear();
      dob['month'] = this.month[new Date(this.model.dob).getMonth()];
      dob['date'] = new Date(this.model.dob).getDate();
      dob = dob['year'] + '-' + dob['month'] + '-' + dob['date'];
      if(this.aboutError.dobInvalid){
        this.aboutError.dobInvalid = false;
      }
    } else {
      this.aboutError.dobInvalid = true;
      return;
    }
    if (new Date().getFullYear() - new Date(this.model.dob).getFullYear() < 10) {
      this.aboutError.dob = true;
      return;
    }

    let language;

    if (e.languages) {
      language = this.model.languages.map(el => el.value);
    }

    // if (e.valid) {
    this.inProgress = true;
    let about = {
      about: {
        description: this.model.description,
        dob: dob,
        gender: this.model.gender,
        languages: language,
        height: this.model.height,
        weight: this.model.weight,
        dob_visibility: this.privacy.dob,
        height_and_weight_visibility: this.privacy.height
      }
    };

    this.client.post('api/v1/entities/about', about).then((res: any) => {
      if (res.status === 'success' && res.entities == true) {
        this.client.get('api/v2/onboarding/progress').then((response: any) => {
          this.showSuccess();
          this.inProgress = false;
          this.updatePercentage.emit(response.rating)
        });
      }
      // this.router.navigate(['/profile/contact']);
    }).catch((e) => {
      if (e.status === 'error') {
        this.invalidForm = true;
      } else this.invalidForm = false;
    });
    // }
  }

  showSuccess() {
    this.toastr.success('You have successfully updated your profile', '', {
      timeOut: 3000
    });
  }
}

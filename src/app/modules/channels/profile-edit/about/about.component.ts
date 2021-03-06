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
  privacy = { dob: 'Following', height: 'Following' };
  toggleHeight;
  toggleDob;
  aboutError = { dob: false, dobInvalid: false, gender: false };
  submitted = false;
  invalidForm: boolean = false;
  inProgress: boolean = false;

  ngOnInit() {
    //set privacy
  }

  changePrivacy(e, arg) {
    if (arg === 'dob') {
      this.privacy.dob = e;
      this.toggleDob = !this.toggleDob;
    }
    if (arg === 'height') {
      this.privacy.height = e;
      this.toggleHeight = !this.toggleHeight;
    }
  }

  async load() {
    // TODO @shashi: create model for type about
    let res = await this.client.get('api/v1/channel/me');
    let response: any = res['channel'];
    let dob = response.dob;
    this.model.dob = new Date(dob);
    this.model.description = response.about.description;
    this.model.gender = response.about.gender;  
    this.privacy.dob = response['date_of_birth_visibility'] ? `${response['date_of_birth_visibility'].charAt(0).toUpperCase()}${response['date_of_birth_visibility'].slice(1)}` : this.privacy.dob;
    this.privacy.height = response['height_and_weight_visibility'] ? `${response['height_and_weight_visibility'].charAt(0).toUpperCase()}${response['height_and_weight_visibility'].slice(1)}` : this.privacy.height;
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
    console.log(e);
    this.submitted = true;
    let dob = {};
    if (new Date(this.model.dob).getTime()) {
      dob['year'] = new Date(this.model.dob).getFullYear();
      dob['month'] = this.month[new Date(this.model.dob).getMonth()];
      dob['date'] = new Date(this.model.dob).getDate();
      dob = dob['year'] + '-' + dob['month'] + '-' + dob['date'];
      if(this.aboutError.dobInvalid || this.aboutError.dob){
        this.aboutError.dobInvalid = false;
        this.aboutError.dob = false;
      }
    } else {
      this.aboutError.dobInvalid = true;
      return;
    }
    if ((new Date().getFullYear() - new Date(this.model.dob).getFullYear() <= 16) &&
        (new Date().getMonth() <= new Date(this.model.dob).getMonth()) &&
        (new Date().getDate() < new Date(this.model.dob).getDate())) {
      this.aboutError.dob = true;
      return;
    }
    console.log(this.aboutError);
    let language;

    if (e.controls.languages.value) {
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
        date_of_birth_visibility: this.privacy.dob.toLowerCase().split(' ').join(''),
        height_and_weight_visibility: this.privacy.height.toLowerCase().split(' ').join('')
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
        this.inProgress = false;
        this.showFailure();
      } else this.invalidForm = false;
    });
    // }
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

  keyPressAlphaNumeric(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z ]*$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}

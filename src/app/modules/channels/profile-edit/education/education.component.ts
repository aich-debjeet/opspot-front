import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Client } from '../../../../services/api/client';
import dob from '../../../../utils/dateHandler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  toggleEnd = false;
  model: any = {};
  submitted = false;
  dateOfBirth;

  addWork;
  errWork = false;
  errEndDate = true;

  work: any = { education: [] };
  activeUser = window.Opspot.user;
  @Output() updatePercentage: EventEmitter<any> = new EventEmitter();
  inProgress: boolean = false;

  constructor(private client: Client, private toastr: ToastrService) { }

  ngOnInit() {
    this.dateOfBirth = dob();
    // this.model.privacy = false; // setting default value of privacy
    this.load();
  }

  toggleEndDate() {
    this.errEndDate = !this.errEndDate;
    this.toggleEnd = !this.toggleEnd;
  }

  onSubmit(e) {
    this.submitted = true;
    if (this.model.endYear - this.model.strtYear < 0) {
      this.errWork = true;
    } else {
      this.errWork = false;
    }

    if (!this.toggleEnd) {
      if (
        (e.controls.endMonth.value ? true : false) && e.controls.endYear.value
          ? true
          : false
      ) {
        this.errEndDate = false;
      }
    } else {
      this.errEndDate = false;
    }

    if (!this.errWork) {
      this.inProgress = true;
      let work = {
        field_of_study: this.model.field,
        location: this.model.location,
        university: this.model.university,
        privacy: this.model.privacy,
        start_date: this.model.strtYear
          ? this.model.strtMonth + '-' + this.model.strtYear
          : '',
        end_date: this.model.endYear
          ? this.model.endMonth + '-' + this.model.endYear
          : ''
      };
      if (isNaN(this.model.index)) {
        this.work.education.push(work);
      } else {
        this.work.education[this.model.index] = work;
      }
      this.client
        .post('api/v1/entities/education', this.work)
        .then((res: any) => {
          this.addWork = false;
          if (res.status === 'success' && res.entities == true) {
            this.client.get('api/v2/onboarding/progress').then((response: any) => {
              this.showSuccess();
              this.inProgress = false;
              this.updatePercentage.emit(response.rating);
            });
          }
        });
    }
  }

  async load() {
    let res = await this.client.get('api/v1/channel/me');
    res = res['channel'];
    if (res['education']) {
      this.work.education = res['education'];
    }
  }

  update(index) {
    this.addWork = true;
    this.model.index = index;
    let data = this.work.education[index];
    this.model.field = data.field_of_study;
    this.model.location = data.location;
    this.model.university = data.university;
    this.model.strtYear = data.start_date.split('-')[1];
    this.model.strtMonth = data.start_date.split('-')[0];
    // this.model.privacy = data.privacy ? data.privacy : false;
    if (data.end_date) {
      this.toggleEnd = false;
      this.model.endYear = data.end_date.split('-')[1];
      this.model.endMonth = data.end_date.split('-')[0];
    } else {
      this.toggleEnd = true;
      this.errEndDate = false;
      this.model.present = true;
    }
    if(!data.privacy){
      this.model.privacy = false;
    } else this.model.privacy = true;
  }

  goBack() {
    this.model = {};
    this.addWork = false;
  }

  addWorkMove() {
    this.model = {}; //render empty form after update/create
    this.model.privacy = false; // setting default value of privacy
    this.submitted = false;
    this.toggleEnd = false; //render form with default value for currently studying field
  }
  showSuccess() {
    this.toastr.success('You have successfully updated your profile', '', {
      timeOut: 3000
    });
  }
}

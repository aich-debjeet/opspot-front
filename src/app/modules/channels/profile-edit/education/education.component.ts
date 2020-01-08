import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../services/api/client';
import dob from '../../../../utils/dateHandler';

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
  constructor(private client: Client) {}

  ngOnInit() {
    this.dateOfBirth = dob();
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

    if (e.valid && !this.errWork && !this.errEndDate) {
      let work = {
        field_of_study: this.model.field,
        location: this.model.location,
        university: this.model.university,
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
        .then(() => (this.addWork = false));
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
    if (data.end_date) {
      this.toggleEnd = false;
      this.model.endYear = data.end_date.split('-')[1];
      this.model.endMonth = data.end_date.split('-')[0];
    } else {
      this.toggleEnd = true;
      this.errEndDate = false;
      this.model.present = true;
    }
  }

  goBack() {
    this.model = {};
    this.addWork = false;
  }

  addWorkMove() {
    this.model = {}; //render empty form after update/create
    this.submitted = false;
    this.toggleEnd = false; //render form with default value for currently studying field
  }
}

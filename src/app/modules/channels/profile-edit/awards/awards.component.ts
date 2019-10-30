import { Component, OnInit } from '@angular/core';
import dob from '../../../../utils/dateHandler';
import { Client } from '../../../../services/api/client';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  activeUser = window.Opspot.user;
  toggleEnd = false;
  model: any = {};
  submitted = false;
  dateOfBirth;

  addWork;
  errWork = false;
  errEndDate = true;

  work: any = { awards: [] };

  constructor(public client: Client) {}

  ngOnInit() {
    this.dateOfBirth = dob();
    this.load();
  }

  // toggleEndDate() {
  //   this.errEndDate = !this.errEndDate;
  //   this.toggleEnd = !this.toggleEnd;
  // }

  onSubmit(e) {
    this.submitted = true;
    // if (this.model.endYear - this.model.strtYear < 0) {
    //   this.errWork = true;
    // } else {
    //   this.errWork = false;
    // }

    // if (!this.toggleEnd) {
    //   if ((e.controls.endMonth.value ? true : false) && e.controls.endYear.value ? true : false) {
    //     this.errEndDate = false;
    //   }
    // } else {
    //   this.errEndDate = false;
    // }

    if (e.valid) {
      let work = {
        title: this.model.title,
        location: this.model.location,
        issuer: this.model.issuer,
        issue_period: this.model.strtYear
          ? this.model.strtMonth + '-' + this.model.strtYear
          : ''
        // 'end_date':this.model.endYear?this.model.endMonth+'-'+this.model.endYear:''
      };
      if (isNaN(this.model.index)) {
        this.work.awards.push(work);
      } else {
        this.work.awards[this.model.index] = work;
      }
      this.client
        .post('api/v1/entities/awards', this.work)
        .then(() => (this.addWork = false));
    }
  }

  async load() {
    let res = await this.client.get('api/v1/channel/me');
    res = res['channel'];
    if (res['awards']) {
      this.work.awards = res['awards'];
    }
  }

  update(index) {
    this.addWork = true;
    this.model.index = index;
    let data = this.work.awards[index];
    this.model.title = data.title;
    this.model.location = data.location;
    this.model.issuer = data.issuer;
    this.model.strtYear = data.issue_period.split('-')[1];
    this.model.strtMonth = data.issue_period.split('-')[0];
    // if(data.end_date){
    //   this.model.endYear=data.end_date.split('-')[1]
    //   this.model.endMonth=data.end_date.split('-')[0]
    // } else{
    //   this.toggleEnd=true;
    //   this.errEndDate=false;
    //   this.model.present=true;
    // }
  }

  goBack() {
    this.model = {};
    this.addWork = false;
  }

  addWorkMove() {
    this.submitted = false;
  }
}

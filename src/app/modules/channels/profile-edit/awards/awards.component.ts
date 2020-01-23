import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import dob from '../../../../utils/dateHandler';
import { Client } from '../../../../services/api/client';
import { ToastrService } from 'ngx-toastr';

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
  inProgress: boolean = false;

  work: any = { awards: [] };
  @Output() updatePercentage: EventEmitter<any> = new EventEmitter();

  constructor(public client: Client, private toastr: ToastrService) { }

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
    if(!e.valid){
      this.errWork = true;
      return;
    }
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

    // if (e.valid) {
      this.inProgress = true;
      this.errWork = false;
      let work = {
        title: this.model.title,
        location: this.model.location,
        issuer: this.model.issuer,
        privacy: this.model.privacy,
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
    // }
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
  }
  showSuccess() {
    this.toastr.success('You have successfully updated your profile', '', {
      timeOut: 3000
    });
  }
}

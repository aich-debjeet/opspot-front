import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import dob from '../../../../utils/dateHandler';
import { Client } from '../../../../services/api/client';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  toggleEnd = false;
  CharCount:number =0;
  desiCharCount:number=0;
  locCount:number=0;
  model: any = {};
  submitted = false;
  dateOfBirth;

  addWork;
  errWork = false;
  errEndDate = true;
  errEdu = false;

  monthArray = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  work: any = { work_experience: [] };
  activeUser = window.Opspot.user;
  inProgress: boolean = false;
  startMonthIndex;
  endMonthIndex;
  @Output() updatePercentage: EventEmitter<any> = new EventEmitter();

  constructor(public client: Client, private toastr: ToastrService) { }

  ngOnInit() {
    this.dateOfBirth = dob();
    this.load();
  }

  toggleEndDate() {
    this.toggleEnd = !this.toggleEnd;
  }

  onSubmit(e) {
    this.submitted = true;
    if (!e.valid) {
      this.errEdu = true;
      return;
    }
    this.errEdu = false;
    if(!this.toggleEnd){
      if(!this.model.endMonth || !this.model.endYear){
        this.errWork = true;
        return;
      }
      if (this.model.strtMonth && this.model.endMonth) {
        this.startMonthIndex = this.monthArray.indexOf(this.model.strtMonth.toLowerCase());
        this.endMonthIndex = this.monthArray.indexOf(this.model.endMonth.toLowerCase());
      }
      if ((this.model.endYear - this.model.strtYear < 0)) {
        this.errWork = true;
      } else {
        if((this.model.endYear === this.model.strtYear) && (this.endMonthIndex - this.startMonthIndex < 0)){
          this.errWork = true;
        } else
        this.errWork = false;
      }
    } else {
      if(this.errWork) {
        this.errWork = false;
      }
    }

    if (!this.errWork) {
      // this.errEdu = false
      this.inProgress = true;
      let work = {
        designation: this.model.designation,
        location: this.model.location,
        company_name: this.model.company,
        access: this.model.access,
        start_date: this.model.strtYear
          ? this.model.strtMonth + '-' + this.model.strtYear
          : '',
        end_date: this.model.endYear
          ? this.model.endMonth + '-' + this.model.endYear
          : ''
      };
      if (isNaN(this.model.index)) {
        this.work.work_experience.push(work);
      } else {
        this.work.work_experience[this.model.index] = work;
      }
      this.client
        .post('api/v1/entities/work_experience', this.work)
        .then((res: any) => {
          this.addWork = false;
          if (res.status === 'success' && res.entities == true) {
            this.client.get('api/v2/onboarding/progress').then((response: any) => {
              this.showSuccess();
              this.inProgress = false;
              this.updatePercentage.emit(response.rating);
            });
          }
        }).catch((e) => {
          if (e.status === 'error') {
            this.inProgress = false;
            this.showFailure();
          }
        });
    }
  }


  async load() {
    let res = await this.client.get('api/v1/channel/me');
    res = res['channel'];
    if (res['work_experience']) {
      this.work.work_experience = res['work_experience'];
    }
  }

  update(index) {
    this.addWork = true;
    this.model.index = index;
    let data = this.work.work_experience[index];
    this.model.designation = data.designation;
    this.model.location = data.location;
    this.model.company = data.company_name;
    this.model.strtYear = data.start_date.split('-')[1];
    this.model.strtMonth = data.start_date.split('-')[0];
    this.CharCount=data.company_name.length;
    this.desiCharCount =data.designation.length;
    this.locCount=data.location.length;
    if (data.end_date) {
      this.toggleEnd = false;
      this.model.endYear = data.end_date.split('-')[1];
      this.model.endMonth = data.end_date.split('-')[0];
    } else {
      this.toggleEnd = true;
      this.errEndDate = false;
      this.model.present = true;
    }
    if (!data.access) {
      this.model.access = false;
    } else this.model.access = true;
  }

  remove(index) {
    let deletedWork = _.pullAt(this.work.work_experience, [index]);
    this.client
      .post('api/v1/entities/work_experience', this.work)
      .then((res: any) => {
        if (res.status === 'success' && res.entities == true) {
          this.client.get('api/v2/onboarding/progress').then((response: any) => {
            this.showDelete();
            this.updatePercentage.emit(response.rating);
          });
        }
      });
  }

  showDelete() {
    this.toastr.success('You have successfully deleted your profile', '', {
      timeOut: 3000
      
    });
  }

  goBack() {
    this.model = {};
    this.addWork = false;
  }

  addWorkMove() {
    this.model = {}; //render empty form after update/create
    this.model.access = false; // setting default value of access
    this.toggleEnd = false; //set default value of current working status
    this.submitted = false;
  }

  showSuccess() {
    this.toastr.success('You have successfully updated your profile.', '', {
      timeOut: 3000
    });
  }
  showFailure(){
    this.toastr.error('Profile could not be updated', '', {
      timeOut: 3000
    });
  }
  countChar(data) {
    if(data.target.name === "designation"){
      this.desiCharCount = data.target.value.length;
    }else if(data.target.name === "company"){
      this.CharCount = data.target.value.length;
    }else if(data.target.name === "location"){
      this.locCount = data.target.value.length;
    }

  }
  
}


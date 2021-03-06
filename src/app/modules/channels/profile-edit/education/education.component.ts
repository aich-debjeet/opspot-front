import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Client } from '../../../../services/api/client';
import dob from '../../../../utils/dateHandler';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  FieldCharCount:number=0;
  UniversityCharCount:number=0;
  locationCharCount:number=0;
  toggleEnd = false;
  model: any = {};
  submitted = false;
  dateOfBirth;
  addWork;
  errWork = false;
  errEndDate = true;
  errEdu = false;
  monthArray = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  work: any = { education: [] };
  activeUser = window.Opspot.user;
  @Output() updatePercentage: EventEmitter<any> = new EventEmitter();
  inProgress: boolean = false;
  startMonthIndex;
  endMonthIndex;

  constructor(private client: Client, private toastr: ToastrService) { }

  ngOnInit() {
    this.dateOfBirth = dob();
    // this.model.access = false; // setting default value of access
    this.load();
  }

  toggleEndDate() {
    this.errEndDate = !this.errEndDate;
    this.toggleEnd = !this.toggleEnd;
  }

  onSubmit(e) {
    this.submitted = true;
    if(!e.valid){
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
      this.inProgress = true;
      this.errEdu = false;
      let work = {
        field_of_study: this.model.field,
        location: this.model.location,
        university: this.model.university,
        access: this.model.access,
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
    this.FieldCharCount=data.field_of_study.length;
    this.UniversityCharCount =data.university.length;
    this.locationCharCount=data.location.length;
    // this.model.access = data.access ? data.access : false;
    if (data.end_date) {
      this.toggleEnd = false;
      this.model.endYear = data.end_date.split('-')[1];
      this.model.endMonth = data.end_date.split('-')[0];
    } else {
      this.toggleEnd = true;
      this.errEndDate = false;
      this.model.present = true;
    }
    if(!data.access){
      this.model.access = false;
    } else this.model.access = true;
  }
  remove(index) {
    let deletedWork = _.pullAt(this.work.education, [index]);
    this.client
      .post('api/v1/entities/education', this.work)
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
    this.submitted = false;
    this.toggleEnd = false; //render form with default value for currently studying field
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

  countChar(data) {
    if(data.target.name === "field"){
      this.FieldCharCount = data.target.value.length;
    }else if(data.target.name === "university"){
      this.UniversityCharCount = data.target.value.length;
    }
    else if(data.target.name === "location"){
      this.locationCharCount = data.target.value.length;
    }

  }

}

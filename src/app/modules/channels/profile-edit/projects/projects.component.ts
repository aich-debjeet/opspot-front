import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import dob from '../../../../utils/dateHandler';
import { Client } from '../../../../services/api/client';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

interface ModalVal {
  title: string;
  desc: string;
  link: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  activeUser = window.Opspot.user;
  titleCharCount:number =0;
  descCharCount:number=0;
  toggleEnd = false;
  model: any = {};
  modalVal = {
    title: '',
    desc: '',
    link: '',
  };
  
  submitted = false;
  dateOfBirth;

  addWork;
  errWork = false;
  errEndDate = true;
  inProgress: boolean = false;
  popupToggle: boolean = false;

  work: any = { projects: [] };
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
    if (!e.valid) {
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
      Project_Title: this.model.Project_Title,
      Project_Description: this.model.Project_Description,
      Project_link: this.model.Project_link,
      access: this.model.access
      // issue_period: this.model.strtYear
      //   ? this.model.strtMonth + '-' + this.model.strtYear
      //   : ''
      // 'end_date':this.model.endYear?this.model.endMonth+'-'+this.model.endYear:''
    };
    if (isNaN(this.model.index)) {


      console.log(work);
      this.work.projects.push(work);
    } else {
      this.work.projects[this.model.index] = work;
    }
    this.client
      .post('api/v4/entities/projects', this.work)
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
    // }
  }

  async load() {
    let res = await this.client.get('api/v1/channel/me');
    console.log(res);
    res = res['channel'];
    if (res['projects']) {

      this.work.projects = res['projects'];
    }
  }

  update(index) {
    this.addWork = true;
    this.model.index = index;
    let data = this.work.projects[index];
    this.model.Project_Title = data.Project_Title;
    this.model.Project_Description = data.Project_Description;
    this.model.Project_link = data.Project_link;
    this.titleCharCount=data.Project_Title.length;
    this.descCharCount =data.Project_Description.length;
    // this.model.issuer = data.issuer;
    // this.model.strtYear = data.issue_period.split('-')[1];
    // this.model.strtMonth = data.issue_period.split('-')[0];
    // if(data.end_date){
    //   this.model.endYear=data.end_date.split('-')[1]
    //   this.model.endMonth=data.end_date.split('-')[0]
    // } else{
    //   this.toggleEnd=true;
    //   this.errEndDate=false;
    //   this.model.present=true;
    // }
    if (!data.access) {
      this.model.access = false;
    } else this.model.access = true;
  }
  remove(index) {
    let deletedAwards = _.pullAt(this.work.projects, [index]);
    this.client
      .post('api/v4/entities/projects', this.work)
      .then((res: any) => {
        if (res.status === 'success' && res.entities == true) {
          this.client.get('api/v2/onboarding/progress').then((response: any) => {
            this.showSuccess();
            this.updatePercentage.emit(response.rating);
          });
        }
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
  }
  showSuccess() {
    this.toastr.success('You have successfully updated your profile', '', {
      timeOut: 3000
    });
  }
  showFailure() {
    this.toastr.error('Profile could not be updated', '', {
      timeOut: 3000
    });
  }

  public handleSeeMore(item) {
    this.popupToggle = !this.popupToggle;
    console.log(item);
    this.modalVal.title = item.Project_Title;
    this.modalVal.desc = item.Project_Description;
    this.modalVal.link = item.Project_link;
    console.log(this.modalVal);
  }

  countChar(data) {
    if(data.target.name === "title"){
      this.titleCharCount = data.target.value.length;
    }else if(data.target.name === "description"){
      this.descCharCount = data.target.value.length;
    }

  }

}

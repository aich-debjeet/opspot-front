import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import dob from '../../../../utils/dateHandler';
import { Client } from '../../../../services/api/client';
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  toggleEnd = false;
  model: any = {};
  submitted = false;
  dateOfBirth;

  addWork;
  errWork = false;
  errEndDate = true;

  work: any = { work_experience: [] };
  activeUser = window.Opspot.user;
  @Output() updatePercentage: EventEmitter<any> = new EventEmitter();

  constructor(public client: Client) {}

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
        designation: this.model.designation,
        location: this.model.location,
        company_name: this.model.company,
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
              this.updatePercentage.emit(response.rating);
            });
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
    this.model.location = data.designation;
    this.model.company = data.company_name;
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
  }
}

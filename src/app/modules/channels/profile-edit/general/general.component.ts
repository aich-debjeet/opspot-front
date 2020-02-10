import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { TopbarHashtagsService } from '../../../hashtags/service/topbar.service';
import { Client } from '../../../../services/api/client';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  activeUser = window.Opspot.user;
  items;
  data = [];
  model = {
    fullName: '',
    skills: []
  };
  inProgress:boolean = false;
  
  @Output() updatePercentage: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: TopbarHashtagsService,
    private client: Client,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.load();
  }

  onSubmit() {
    this.inProgress = true;
    const skills = this.model.skills.map(el => el.value);
    const info = {
      general_info: {
        full_name: this.model.fullName,
        skills: skills ? skills : []
      }
    };
    this.client.post('api/v1/entities/general_info', info).then((res:any) => {
      // this.router.navigate(['/profile/about']);
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

  async load() {
    const res = await this.service.load(50);
    res.map(a => {
      this.data.push(a.value);
    });
  }

  async getInfo() {
    let res = await this.client.get('api/v1/channel/me');
    res = res['channel'];
    if (res['general_info']) {
      if (res['general_info']['full_name']) {
        this.model.fullName = res['general_info']['full_name'];
      } else {
        this.model.fullName = res['name'];
      }
      if (res['general_info']['skills']) {
        let skills = res['general_info']['skills'];
        skills = skills.filter(el => !!el);
        this.skillsAlter(skills);
      }
    }
  }

  skillsAlter(skills: any[]) {
    for (let i = skills.length; i--;) {
      this.model.skills.push({ display: skills[i], value: skills[i] });
    }
  }

  ngOnInit() {
    this.getInfo();
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
}

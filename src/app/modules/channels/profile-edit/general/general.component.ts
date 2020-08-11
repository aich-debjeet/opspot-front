import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TopbarHashtagsService } from '../../../hashtags/service/topbar.service';
import { Client } from '../../../../services/api/client';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Session } from '../../../../services/session';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  activeUser = window.Opspot.user;
  items;
  data = [];
  allProfessions = [];
  model = {
    fullName: '',
    skills: [],
  };
  professionsModel = {
    professions: []
  }
  inProgress: boolean = false;
  reqName: boolean = false;

  @Output() updatePercentage: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: TopbarHashtagsService,
    private client: Client,
    private router: Router,
    private toastr: ToastrService,
    public session: Session,
  ) {
    this.load();
    this.loadProfessions();
  }

  onSubmit(e) {
    if (!e.valid) {
      this.reqName = true;
      return;
    }
    this.reqName = false;
    const professions = this.professionsModel.professions.map(el => el.value);
    if(professions.length == 0) {
      this.toastr.error("Please add ateast one profession");
      return;
    }
    if(professions.length > 3){
      this.toastr.error("You can add maximum three professions");
      return;
    }
    const skills = this.model.skills.map(el => el.value);

    this.inProgress = true;
    
    const info = {
      general_info: {
        full_name: this.model.fullName,
        skills: skills ? skills : [],
        professions: professions ? professions : []
      }
    };
    this.client.post('api/v1/entities/general_info', info).then((res: any) => {
      // this.router.navigate(['/profile/about']);
      if (res.status === 'success' && res.entities == true) {
        this.client.get('api/v2/onboarding/progress').then((response: any) => {
          this.showSuccess();
          this.inProgress = false;
          this.updatePercentage.emit(response.rating);
          const user = { ...window.Opspot.user, name: info.general_info.full_name }
          this.session.login(user);
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

  async loadProfessions() {
    this.client.get('api/v4/professions/suggested', {
      limit: 50
    }).then((response: any) => {
      if (response.professions)
        this.allProfessions = response.professions;
    })
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
      if (res['general_info']['professions']) {
        let professions = res['general_info']['professions'];
        professions = professions.filter(el => !!el);
        this.professionsAlter(professions);
      }

    }
  }

  skillsAlter(skills: any[]) {
    for (let i = skills.length; i--;) {
      this.model.skills.push({ display: skills[i], value: skills[i] });
    }
  }

  professionsAlter(professions: any[]) {
    for (let i = professions.length; i--;) {
      this.professionsModel.professions.push({ display: professions[i], value: professions[i] });
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
  showFailure() {
    this.toastr.error('Profile could not be updated', '', {
      timeOut: 3000
    });
  }
}

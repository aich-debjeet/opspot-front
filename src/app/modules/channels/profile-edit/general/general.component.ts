import { Component, OnInit } from '@angular/core';
import { TopbarHashtagsService } from '../../../hashtags/service/topbar.service';
import { Client } from '../../../../services/api/client';
import { Router } from '@angular/router';

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

  constructor(
    private service: TopbarHashtagsService,
    private client: Client,
    private router: Router
  ) {
    this.load();
  }

  onSubmit() {
    const skills = this.model.skills.map(el => el.value);
    const info = {
      general_info: {
        full_name: this.model.fullName,
        skills: skills ? skills : []
      }
    };
    this.client.post('api/v1/entities/general_info', info).then(res => {
      this.router.navigate(['/profile/about']);
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
}

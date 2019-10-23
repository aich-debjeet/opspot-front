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

  items;
  data = [];
  constructor(
    private service: TopbarHashtagsService,
    private client: Client,
    private router: Router
  ) {
    this.load();
  }

  model: any = {};

  onSubmit() {
    const skills = this.model.skills.map(el => el.value);
    const info = {
      fullName: this.model.fullName,
      skills
    };
    this.sendInfo(info);
  }

  sendInfo(data) {
    const info = {
      general_info: {
        full_name: data.fullName,
        skills: data.skills
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
    const res = await this.client.get('api/v1/channel/me');
    console.log(res);
  }

  ngOnInit() {
    this.getInfo();
  }
}

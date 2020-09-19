import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../services/api';

@Component({
  selector: 'opspot-talent-preview',
  templateUrl: './talent-preview.component.html',
  styleUrls: ['./talent-preview.component.scss'],
  inputs: ['_organization : organization'],
})
export class TalentPreviewComponent implements OnInit {

  organization: any;
  inProgress = false;
  talents: Array<any> = [];
  talentToggele = false;

  constructor(
    private client: Client
  ) { }

  ngOnInit() {
  }

  set _organization(value: any) {
    this.organization = value;
    this.load();
  }

  async load() {
    this.inProgress = true;
    try {
      let response: any = await this.client.get(`api/v3/organizations/organization/talent/${this.organization.guid}/all`, { offset: '', limit: 12 });
      if (response) {
        this.talents = response.talents;
      }
      this.inProgress = false;
    } catch {
      this.inProgress = false;
    }
  }

  showTalents() {
    this.talentToggele = !this.talentToggele;
  }

  remove(talent) {
    let i: any;
    for (i in this.talents) {
      if (this.talents[i] === talent) {
        this.talents.splice(i, 1);
        break;
      }
    }
  }

}

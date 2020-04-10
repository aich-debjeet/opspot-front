import { Component, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../../services/api';
import { Session } from '../../../../services/session';

@Component({
  selector: 'opspot-organization--member-previews',
  templateUrl: 'member-previews.component.html',
  inputs: ['_organization : organization'],
  styleUrls: ['member-previews.component.scss']
})

export class OrganizationMemberPreviews {

  members: Array<any> = [];
  count: Number = 0;
  inProgress: boolean = false;
  opspot = window.Opspot;
  organization: any;
  memberToggle: boolean = false;
  @Output() totalOrganization: EventEmitter<any> = new EventEmitter()


  constructor(private client: Client,
    public session: Session,
    private router: Router,
  ) {

  }

  ngOnInit() {
  }

  set _organization(value: any) {
    this.organization = value;
    this.load();
  }

  async load() {
    this.inProgress = true;
    try {
      let response: any = await this.client.get(`api/v3/organizations/membership/${this.organization.guid}`, { limit: 12 });
      if (response.total) {
        this.totalOrganization.emit(response.total)
      }
      if (!response.members) {
        return false;
      }
      this.members = response.members;
      if (response.total - this.members.length > 0) {
        this.count = response.total - this.members.length;
      }
      this.inProgress = false;
    } catch {
      this.inProgress = false;
    }
  }

  showMembers() {
    if (window.innerWidth > 785) {
      this.memberToggle = !this.memberToggle;
    } else {
      this.router.navigate([`/organizations/${this.organization.guid}/members`])
    }
  }

  remove(member) {
    let i: any;
    for (i in this.members) {
      if (this.members[i] === member) {
        this.members.splice(i, 1);
        break;
      }
    }
  }

}

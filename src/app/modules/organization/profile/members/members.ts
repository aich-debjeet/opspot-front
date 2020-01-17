import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { OrganizationService } from '../../organization-service';
import { OpspotHttpClient } from '../../../../common/api/client.service';
import { map } from 'rxjs/operators';
import { Session } from '../../../../services/session';

@Component({
  moduleId: module.id,
  selector: 'opspot-organization-profile-members',

  inputs: ['_organization : organization'],
  templateUrl: 'members.html'
})

export class OrganizationProfileMembers {

opspot = window.Opspot;
@ViewChild('el') el;

  organization: any;
  $organization;
  @Input()frmGroup;
  @Output()totalOrganization:EventEmitter<any>=new EventEmitter()

  invitees: any = [];
  members: Array<any> = [];
  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  canInvite: boolean = false;

  q: string = '';

  private lastQuery;
  private searchDelayTimer;

  httpSubscription;

  constructor(public session: Session, public client: OpspotHttpClient, public service: OrganizationService) {

  }

  set _organization(value: any) {
    this.organization = value;
    this.load(true);
  }

  ngOnInit() {
    // this.$organization = this.service.$group.subscribe((organization) => {
    //   this.organization = organization;
    //   this.load(true);
    //   this.el.nativeElement.scrollIntoView();
    // });
  }

  ngOnDestroy() {
    if (this.searchDelayTimer) {
      clearTimeout(this.searchDelayTimer);
    }
    //this.$organization.unsubscribe();
  }

  load(refresh: boolean = false, query = null) {
    if (this.httpSubscription)
      this.httpSubscription.unsubscribe();

    if (refresh) {
      this.offset = '';
      this.moreData = true;
      this.members = [];
    }

    // TODO: [emi] Send this via API
    this.canInvite = false;    
    if(this.organization){
    if (this.organization['is:owner']) {
      this.canInvite = true;
    } else if (this.organization.membership === 2 && this.organization['is:member']) {
      this.canInvite = true;
    }

    let endpoint = `api/v1/groups/membership/${this.organization.guid}`,
      params: { limit, offset, q?: string } = { limit: 12, offset: this.offset };

    if (this.q) {
      endpoint = `${endpoint}/search`;
      params.q = this.q; 
    }

    this.inProgress = true;
    this.httpSubscription = this.client.get(endpoint, params)
      .subscribe((response: any) => {
        if(response.total){
          this.totalOrganization.emit(response.members.length)
        }
        if (!response.members) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }

        if (refresh) {
          this.members = response.members;
        } else {
          this.members = this.members.concat(response.members);
        }

        if (response['load-next']) {
          this.offset = response['load-next'];
        } else {
          this.moreData = false;
        }

        this.inProgress = false;

        }, (err) => {
            this.inProgress = false;
        });
  }
}

  invite(user: any) {
    for (let i of this.invitees) {
      if (i.guid === user.guid)
        return;
    }
    this.invitees.push(user);
  }

  search(q) {
    if (this.searchDelayTimer) {
      clearTimeout(this.searchDelayTimer);
    }

    this.q = q;
    this.searchDelayTimer = setTimeout(() => {
      this.load(true);
    }, 300);
  }

}

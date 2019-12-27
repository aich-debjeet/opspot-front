import { Component, OnInit, ViewChild } from '@angular/core';
import { Session } from '../../../../../services/session';
import { GroupsService } from '../../../../groups/groups-service';
import { OpspotHttpClient } from '../../../../../common/api/client.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-organization-mobile-members',
  templateUrl: './organization-mobile-members.html',
})
export class OrganizationMobileMembers implements OnInit {

  constructor(
    public session: Session,
    public client: OpspotHttpClient,
    public service: GroupsService,
    private route: ActivatedRoute,
    private _location: Location) {
    this.route.params.subscribe(params => {
      if (params['guid']) {
        this.loadGroup(params['guid'])
      }
    })
  }


  opspot = window.Opspot;
  @ViewChild('el') el;

  invitees: any = [];
  organization: any;
  $group;
  members: Array<any> = [];
  offset: string = '';
  q: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  canInvite: boolean = false;
  private searchDelayTimer;

  httpSubscription;



  ngOnInit() {
    // console.log(this.members)
  }

  ngOnDestroy() {
    if (this.searchDelayTimer) {
      clearTimeout(this.searchDelayTimer);
    }
    this.$group.unsubscribe();
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

  async loadGroup(guid) {
    try {
      let organization = await this.service.load(guid)
      this.organization = organization
      this.$group = this.service.$group.subscribe((organization) => {
        this.organization = organization;
        this.load(true);
        this.el.nativeElement.scrollIntoView();
      });
    }
    catch (e) {
      console.log(e)
    }
  }

  goBack() {
    this._location.back()
  }
}

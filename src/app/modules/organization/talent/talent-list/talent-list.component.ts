import { Component, OnInit } from '@angular/core';
import { OpspotHttpClient } from '../../../../common/api/client.service';
import { OrganizationService } from '../../organization-service';
import { Session } from '../../../../services/session';

@Component({
  selector: 'opspot-talent-list',
  templateUrl: './talent-list.component.html',
  styleUrls: ['./talent-list.component.scss'],
  inputs: ['_organization : organization'],
})
export class TalentListComponent implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }

  opspot = window.Opspot;
  organization: any;

  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  talents: Array<any> = [];
  q: string = '';



  private lastQuery;
  private searchDelayTimer;

  httpSubscription;

  constructor(
    public session: Session,
    public client: OpspotHttpClient,
    public service: OrganizationService) {

  }

  set _organization(value: any) {
    this.organization = value;
    this.load(true);
  }

  ngOnInit() {
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
      this.talents = [];
    }

    let endpoint = `api/v3/organizations/organization/talent/${this.organization.guid}/all`,
      params: { limit, offset, q?: string } = { limit: 12, offset: this.offset };

    if (this.q) {
      endpoint = `${endpoint}/search`;
      params.q = this.q;
    }

    this.inProgress = true;
    this.httpSubscription = this.client.get(endpoint, params)
      .subscribe((response: any) => {
        console.log("vmfdngkjfg: ", response);

        if (!response.talents) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }

        if (refresh) {
          this.talents = response.talents;
        } else {
          this.talents = this.talents.concat(response.talents);
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

  // invite(user: any) {
  //   for (let i of this.invitees) {
  //     if (i.guid === user.guid)
  //       return;
  //   }
  //   this.invitees.push(user);
  // }

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

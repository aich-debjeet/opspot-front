import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { OrganizationService } from '../organization-service';
import { OpspotHttpClient } from '../../../common/api/client.service';
import { map } from 'rxjs/operators';
import { Session } from '../../../services/session';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { async } from 'q';

@Component({
  moduleId: module.id,
  selector: 'opspot-organization-all-members',

  templateUrl: 'list-subscribers.html'
})

export class OrganizationAllMembers {

  opspot = window.Opspot;
  @ViewChild('el') el;

  organization: any;
  $organization;
  @Input() frmGroup;
  @Output() totalOrganization: EventEmitter<any> = new EventEmitter()

  invitees: any = [];
  members: Array<any> = [];
  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  canInvite: boolean = false;
  paramsSubscription: Subscription;
  guid = '';
  q: string = '';
  private lastQuery;
  private searchDelayTimer;
  httpSubscription;

  constructor(
    public session: Session,
    public client: OpspotHttpClient,
    public service: OrganizationService,
    public route: ActivatedRoute
  ) {

  }

  // set _organization(value: any) {
  //   this.organization = value;
  //   this.load(true);
  // }

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid')) {
        this.guid = params.get('guid');
        // this.load();
        // Load organization
        if(this.guid)
        this.getOrganization(this.guid);

      }
    });
  }

  async getOrganization(guid) {
    try {
    let organization = await this.service.load(guid);
    this.organization = organization;
      if (this.organization) {
        this.load();
      }
    } catch (e) {
      // this.error = e.message;
      return;
    }
  }
  // this.$organization = this.service.$group.subscribe((organization) => {
  //   this.organization = organization;
  //   if (this.organization) {
  //     console.log("this: ", this.organization);

  //     this.load();
  //     this.el.nativeElement.scrollIntoView();
  //   }
  // });


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
    if (this.organization) {
      // if (this.organization['is:owner'] || this.organization['is:editor']) {
      //   this.canInvite = true;
      // } else if (this.organization.membership === 2 && this.organization['is:member']) {
      //   this.canInvite = true;
      // }

      let endpoint = `api/v3/organizations/membership/${this.organization.guid}`,
        params: { limit, offset, q?: string } = { limit: 12, offset: this.offset };

      if (this.q) {
        endpoint = `${endpoint}/search`;
        params.q = this.q;
      }

      this.inProgress = true;
      this.httpSubscription = this.client.get(endpoint, params)
        .subscribe((response: any) => {
          if (response.total) {
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

  


  //   invite(user: any) {
  //     for (let i of this.invitees) {
  //       if (i.guid === user.guid)
  //         return;
  //     }
  //     this.invitees.push(user);
  //   }

  //   search(q) {
  //     if (this.searchDelayTimer) {
  //       clearTimeout(this.searchDelayTimer);
  //     }

  //     this.q = q;
  //     this.searchDelayTimer = setTimeout(() => {
  //       this.load(true);
  //     }, 300);
  //   }

}

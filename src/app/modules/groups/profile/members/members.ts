import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { GroupsService } from '../../groups-service';

import { OpspotHttpClient } from '../../../../common/api/client.service';
import { map } from 'rxjs/operators';
import { Session } from '../../../../services/session';

@Component({
  moduleId: module.id,
  selector: 'opspot-groups-profile-members',

  inputs: ['_group : group'],
  templateUrl: 'members.html'
})

export class GroupsProfileMembers {

  opspot = window.Opspot;
  // @ViewChild('el') el;

  group: any;
  // $group;
  @Input() frmGroup;
  @Output() totalGroup: EventEmitter<any> = new EventEmitter()

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

  set _group(value: any) {
    this.group = value;
    this.load(true);
  }

  constructor(public session: Session, public client: OpspotHttpClient, public service: GroupsService) {

  }

  ngOnInit() {
    // this.$group = this.service.$group.subscribe((group) => {
    //   this.group = group;
    //   // console.log("This group: ", this.group);

    //   // this.load(true);
    // });

    // this.el.nativeElement.scrollIntoView();

  }

  ngOnDestroy() {
    if (this.searchDelayTimer) {
      clearTimeout(this.searchDelayTimer);
    }
    // this.$group.unsubscribe();
  }

  load(refresh: boolean = false, query = null) {
    // console.log('members load()');
    if (this.httpSubscription)
      this.httpSubscription.unsubscribe();

    if (refresh) {
      this.offset = '';
      this.moreData = true;
      this.members = [];
    }

    // TODO: [emi] Send this via API
    this.canInvite = false;

    // console.log("GROUP: ", this.group);

    if (this.group) {
      if (this.group['is:owner']) {
        this.canInvite = true;
      } else if (this.group.membership === 2 && this.group['is:member']) {
        this.canInvite = true;
      }


      let endpoint = `api/v1/groups/membership/${this.group.guid}`,
        params: { limit, offset, q?: string } = { limit: 12, offset: this.offset };


      // console.log("endpoint: ", endpoint);

      if (this.q) {
        endpoint = `${endpoint}/search`;
        params.q = this.q;
      }

      this.inProgress = true;
      this.httpSubscription = this.client.get(endpoint, params)
        .subscribe((response: any) => {
          // console.log("response: ", response.members.length);
          if (response.members) {
            // console.log("response: ", response.members);
            // @gayatri total count should come from backend since it is not coming it handle on frontend which needs to be checked
            this.totalGroup.emit(response.members.length)
          }
          if (!response.members) {
            this.moreData = false;
            this.inProgress = false;
            return false;
          }

          if (refresh) {
            this.members = response.members;
            // console.log("Response members: ", response.members);

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

import { Component, EventEmitter } from '@angular/core';

import { Client } from '../../../../../services/api';

import { OrganizationService } from '../../../organization-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  moduleId: module.id,
  selector: 'opspot-organization-profile-members-invite',
  inputs: ['_organization : organization'],
  outputs: ['invited'],
  templateUrl: 'invite.html',
  styleUrls: [ './invite.scss']
})

export class OrganizationProfileMembersInvite {

  opspot = window.Opspot;

  organization: any;
  invited: EventEmitter<any> = new EventEmitter();
  mobileView;
  users: Array<any> = [];
  searching: boolean = false;
  q: string = '';

  inviteInProgress: boolean = false;
  inviteLastUser: string = '';
  inviteError: string = '';

  destination: any; // @todo: ??

  timeout;
  filter = 'followers';

  colapse: boolean[] = [false];
  emails: any[];
  inviteArrray: Array<any> = [];

  constructor(
    public client: Client, 
    public service: OrganizationService,
    private toastr: ToastrService,
    ) {
   if(window.innerWidth<775){this.mobileView=true;}
  }

  set _organization(value: any) {
    this.organization = value;
  }

  invite(user) {

    if (!user.subscriber) {
      return alert('You can only invite users who are subscribed to you');
    }

    this.invited.next(user);

    this.q = '';
    this.users = [];
    if (!this.organization) {
      return;
    }
    this.inviteInProgress = true;
    this.inviteLastUser = '';
    this.inviteError = '';

    this.service.invite(this.organization, user)
      .then(() => {
        this.inviteInProgress = false;
      })
      .catch(e => {
        this.inviteInProgress = false;
        this.inviteError = e;
      });
  }

  search(q) {
    if (this.timeout)
      clearTimeout(this.timeout);

    this.searching = true;
    if (this.q.charAt(0) !== '@') {
      this.q = '@' + this.q;
    }

    var query = this.q;
    if (query.charAt(0) === '@') {
      query = query.substr(1);
    }

    this.timeout = setTimeout(() => {
      this.client.get(`api/v2/search/suggest/user`, {
        q: query,
        limit: 5,
        hydrate: 1
      })
        .then((success: any) => {
          if (success.entities) {
            this.users = success.entities;
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 600);
  }

  switchTabs(filter) {
    this.filter = filter;
    console.log("fdfdsgfg: ", this.filter);
    
  }

  isActive(filter: string) {
    if (this.filter === filter) {
      return true;
    }
    return false;
  }

  toggle(id, user) {
    if (!this.colapse[id]) {
      this.colapse[id] = true;
      if (!(this.inviteArrray.includes(user.guid)))
        this.inviteArrray.push(user.guid)
    }
    else {
      this.colapse[id] = !this.colapse[id];
      var index = this.inviteArrray.indexOf(user.guid);
      if (index > -1) {
        this.inviteArrray.splice(index, 1);
      }
    }
  }

  sendInvite() {
    if (!this.emails) {
      this.toastr.error('Please enter your friends email ids');
      return;
    }
    const emails = this.emails.map(el => el.value);
    // this.inProgress = true;
    // this.client.post(`api/v1/groups/invitations/viaemail/${this.group.guid}`, emails)
    //   .subscribe((response: any) => {
    //     this.inProgress = false;
    //     if (response.status === 'success') {
    //       this.toastr.success('Invitations sent');
    //       this.emails = [];
    //     } else {
    //       this.toastr.error('Something went wrong');
    //     }
    //   });
  }

}

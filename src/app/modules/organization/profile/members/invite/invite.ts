import { Component, EventEmitter } from '@angular/core';

import { Client } from '../../../../../services/api';

import { OrganizationService } from '../../../organization-service';


@Component({
  moduleId: module.id,
  selector: 'opspot-organization-profile-members-invite',
  inputs: ['_organization : organization'],
  outputs: ['invited'],
  templateUrl: 'invite.html'
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
 
  constructor(public client: Client, public service: OrganizationService) {
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

}

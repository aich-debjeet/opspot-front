import { Component, EventEmitter } from '@angular/core';

import { Client } from '../../../../../services/api';
import { GroupsService } from '../../../groups-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  moduleId: module.id,
  selector: 'opspot-groups-profile-members-invite',
  inputs: ['_group : group'],
  outputs: ['invited'],
  templateUrl: 'invite.html'
})

export class GroupsProfileMembersInvite {

  opspot = window.Opspot;

  group: any;
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

  constructor(
    public client: Client,
    public service: GroupsService,
    private toastr: ToastrService) {
    if (window.innerWidth < 775) { this.mobileView = true; }
  }

  set _group(value: any) {
    this.group = value;
  }

  invite(user) {
    if (!user.subscriber) {
      this.toastr.error('You can only invite users who are subscribed to you');
      //  alert('You can only invite users who are subscribed to you');
      return;
    }

    this.invited.next(user);

    this.q = '';
    this.users = [];
    if (!this.group) {
      return;
    }
    this.inviteInProgress = true;
    this.inviteLastUser = '';
    this.inviteError = '';

    this.service.invite(this.group, user)
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

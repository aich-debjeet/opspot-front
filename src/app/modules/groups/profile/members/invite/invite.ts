import { Component, EventEmitter, OnInit } from '@angular/core';

import { Client } from '../../../../../services/api';
import { GroupsService } from '../../../groups-service';
import { ToastrService } from 'ngx-toastr';
import { OpspotHttpClient } from '../../../../../common/api/client.service';
import { Session } from '../../../../../services/session';



@Component({
  moduleId: module.id,
  selector: 'opspot-groups-profile-members-invite',
  inputs: ['_group : group'],
  outputs: ['invited'],
  templateUrl: 'invite.html'
})

export class GroupsProfileMembersInvite implements OnInit {

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

  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;

  httpSubscription;

  filter: any = "followers";

  inviteArrray: Array<any> = [];

  colapse: boolean[] = [false];
  emails: any[];




  constructor(
    public client: OpspotHttpClient,
    public service: GroupsService,
    private toastr: ToastrService,
    public session: Session,
  ) {
    if (window.innerWidth < 775) { this.mobileView = true; }
  }

  set _group(value: any) {
    this.group = value;
  }

  ngOnInit() {
    this.load(true);
  }
  invite() {
    // if (!user.subscriber) {
    //   this.toastr.error('You can only invite users who are subscribed to you');
    //   //  alert('You can only invite users who are subscribed to you');
    //   return;
    // }

    // this.invited.next(user);

    this.q = '';
    this.users = [];
    if (!this.group) {
      return;
    }
    this.inviteInProgress = true;
    this.inviteLastUser = '';
    this.inviteError = '';

    this.service.invite(this.group, this.inviteArrray)
      .then(() => {
        this.inviteInProgress = false;
        // this.toastr.success('Invitations sent');
        this.inviteArrray = [];
      })
      .catch(e => {
        this.inviteInProgress = false;
        this.inviteError = e;
        this.inviteArrray = [];

        // this.toastr.error('Something went wrong');
      });
  }

  search(q) {
    this.colapse = [false];
    if (this.timeout)
      clearTimeout(this.timeout);

    // this.searching = true;
    // if (this.q.charAt(0) !== '@') {
    //   this.q = '@' + this.q;
    // }

    var query = this.q;
    // if (query.charAt(0) === '@') {
    //   query = query.substr(1);
    // }

    this.timeout = setTimeout(() => {
      // this.client.get(`api/v2/search/suggest/user`, {
      //   q: query,
      //   limit: 5,
      //   hydrate: 1
      // })
      //   .then((success: any) => {
      //     if (success.entities) {
      //       this.users = success.entities;

      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      this.load(true, query)
    }, 600);
  }

  load(refresh: boolean = false, query = null) {
    // this.colapse = [false];

    if (this.httpSubscription)
      this.httpSubscription.unsubscribe();

    if (refresh) {
      this.offset = '';
      this.moreData = true;
      this.users = [];
    }

    var key = "users";
    let endpoint = `api/v1/groups/suggestion/subscribers/${this.group.guid}`,
      params: { limit, offset, q?: string } = { limit: 12, offset: this.offset };

    if (this.q) {
      endpoint = `api/v1/groups/suggestion/search/${this.group.guid}`;
      params.q = this.q;
      key = "entities"
    }

    this.inProgress = true;
    this.httpSubscription = this.client.get(endpoint, params)
      .subscribe((response: any) => {

        if (!response[key]) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }

        if (refresh) {
          this.users = response[key];
        } else {
          this.users = this.users.concat(response[key]);
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

  switchTabs(filter) {
    this.filter = filter;
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
    this.inProgress = true;
    this.client.post(`api/v1/groups/invitations/viaemail/${this.group.guid}`, emails)
      .subscribe((response: any) => {
        this.inProgress = false;
        if (response.status === 'success') {
          this.toastr.success('Invitations sent');
          this.emails = [];
        } else {
          this.toastr.error('Something went wrong');
        }
      });
  }
}


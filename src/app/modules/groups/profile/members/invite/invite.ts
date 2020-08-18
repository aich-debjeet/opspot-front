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

export class GroupsProfileMembersInvite implements OnInit{

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

  httpSubscription

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

  ngOnInit(){
    this.load(true);
  }
  invite(user) {
    // if (!user.subscriber) {
    //   this.toastr.error('You can only invite users who are subscribed to you');
    //   //  alert('You can only invite users who are subscribed to you');
    //   return;
    // }

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
    if (this.httpSubscription)
      this.httpSubscription.unsubscribe();

    if (refresh) {
      this.offset = '';
      this.moreData = true;
      this.users = [];
    }

    var key = "users";
    let endpoint = `api/v1/subscribe/subscriptions/${this.session.getLoggedInUser().guid}`,
      params: { limit, offset, q?: string } = { limit: 12, offset: this.offset };

    if (this.q) {
      endpoint = `api/v2/search/suggest/user`;
      params.q = query;
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

}


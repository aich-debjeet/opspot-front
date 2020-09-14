import { Component, EventEmitter } from '@angular/core';


import { OrganizationService } from '../../../organization-service';
import { ToastrService } from 'ngx-toastr';
import { OpspotHttpClient } from '../../../../../common/api/client.service';


@Component({
  moduleId: module.id,
  selector: 'opspot-organization-profile-members-invite',
  inputs: ['_organization : organization'],
  outputs: ['invited'],
  templateUrl: 'invite.html',
  styleUrls: ['./invite.scss']
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
  inProgress: boolean = false;
  moreData: boolean = true;
  httpSubscription;
  offset: string = '';


  constructor(
    public client: OpspotHttpClient,
    public service: OrganizationService,
    private toastr: ToastrService,
  ) {
    if (window.innerWidth < 775) { this.mobileView = true; }
  }

  set _organization(value: any) {
    this.organization = value;
  }

  ngOnInit() {
    this.load(true);
  }

  invite() {

    // if (!user.subscriber) {
    //   return alert('You can only invite users who are subscribed to you');
    // }

    // this.invited.next(user);

    this.q = '';
    this.users = this.users.filter((item) => {
      return !this.inviteArrray.includes(item.guid);
    });

    if (!this.organization) {
      return;
    }

    this.inviteInProgress = true;
    this.inviteLastUser = '';
    this.inviteError = '';

    this.service.invite(this.organization, this.inviteArrray)
      .then(() => {
        this.inviteInProgress = false;
        // this.toastr.success('Invitations sent');
        this.inviteArrray = [];
        this.colapse = [false];
      })
      .catch(e => {
        this.inviteInProgress = false;
        this.inviteError = e;
        this.inviteArrray = [];
        this.colapse = [false];
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
    let endpoint = `api/v3/organizations/suggestion/subscribers/${this.organization.guid}`,
      params: { limit, offset, q?: string, hydrate } = { limit: 12, offset: this.offset, hydrate: 1 };

    if (this.q) {
      endpoint = `api/v3/organizations/suggestion/search/${this.organization.guid}`;
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
    this.client.post(`api/v3/organizations/invitations/viaemail/${this.organization.guid}`, emails)
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

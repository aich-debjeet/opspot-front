import { Component, OnInit, ViewChild } from '@angular/core';
import { Session } from '../../../../../services/session';
import { GroupsService } from '../../../groups-service';
import { OpspotHttpClient } from '../../../../../common/api/client.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-mobile-members',
  templateUrl: './mobile-members.component.html',
  styleUrls: ['./mobile-members.component.scss']
})
export class MobileMembersComponent implements OnInit {

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
  group: any;
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

    if (this.group['is:owner']) {
      this.canInvite = true;
    } else if (this.group.membership === 2 && this.group['is:member']) {
      this.canInvite = true;
    }

    let endpoint = `api/v1/groups/membership/${this.group.guid}`,
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
      let group = await this.service.load(guid)
      this.group = group
      this.$group = this.service.$group.subscribe((group) => {
        this.group = group;
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

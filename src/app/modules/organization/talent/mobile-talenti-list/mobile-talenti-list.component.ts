import { Component, OnInit, ViewChild } from '@angular/core';
import { Session } from '../../../../services/session';
import { OpspotHttpClient } from '../../../../common/api/client.service';
import { OrganizationService } from '../../organization-service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mobile-talenti-list',
  templateUrl: './mobile-talenti-list.component.html',
  styleUrls: ['./mobile-talenti-list.component.scss']
})
export class MobileTalentiListComponent implements OnInit {

  opspot = window.Opspot;
  organization: any;

  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  talents: Array<any> = [];
  q: string = '';

  private searchDelayTimer;

  httpSubscription;
  $organization;
  @ViewChild('el') el;

  constructor(
    public session: Session,
    public client: OpspotHttpClient,
    public service: OrganizationService,
    private route: ActivatedRoute,
    private _location: Location) {
    this.route.params.subscribe(params => {
      if (params['guid']) {
        this.loadOrganization(params['guid'])
      }
    })
  }



  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.searchDelayTimer) {
      clearTimeout(this.searchDelayTimer);
    }
    //this.$organization.unsubscribe();
  }

  async loadOrganization(guid) {
    try {
      let organization = await this.service.load(guid)
      this.organization = organization
      this.$organization = this.service.$group.subscribe((organization) => {
        this.organization = organization;
        this.load(true);
        this.el.nativeElement.scrollIntoView();
      });
    }
    catch (e) {
      // console.log(e)
    }
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
      endpoint = `api/v3/organizations/organization/talent/${this.organization.guid}/search`;
      params.q = this.q;
    }

    this.inProgress = true;
    this.httpSubscription = this.client.get(endpoint, params)
      .subscribe((response: any) => {
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

  search(q) {
    if (this.searchDelayTimer) {
      clearTimeout(this.searchDelayTimer);
    }
    this.q = q;
    this.searchDelayTimer = setTimeout(() => {
      this.load(true);
    }, 300);
  }

  remove(talent) {
    let i: any;
    for (i in this.talents) {
      if (this.talents[i] === talent) {
        this.talents.splice(i, 1);
        break;
      }
    }
  }

  goBack() {
    this._location.back()
  }



}

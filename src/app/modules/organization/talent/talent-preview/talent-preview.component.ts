import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../services/api';
import { Subscription } from 'rxjs';
import { CommonEventsService } from '../../../../services/common-events.service';
import { OverlayModalService } from '../../../../services/ux/overlay-modal';
import { TalentListComponent } from '../talent-list/talent-list.component';

@Component({
  selector: 'opspot-talent-preview',
  templateUrl: './talent-preview.component.html',
  styleUrls: ['./talent-preview.component.scss'],
  inputs: ['_organization : organization'],
})
export class TalentPreviewComponent implements OnInit {

  organization: any;
  inProgress = false;
  talents: Array<any> = [];
  talentToggele = false;
  commService$: Subscription;


  constructor(
    private client: Client,
    private commService: CommonEventsService,

    private overlayModal: OverlayModalService
  ) { }

  ngOnInit() {
    this.commService$ = this.commService.listen().subscribe((e: any) => {
      if (e.component && e.action) {
        if (e.component === 'OrganizationMemberPreviews') {
          if (e.action === 'appendTalentList') {
            this.load();
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.commService$.unsubscribe();
  }

  set _organization(value: any) {
    this.organization = value;
    this.load();
  }




  async load() {
    this.inProgress = true;
    try {
      let response: any = await this.client.get(`api/v3/organizations/organization/talent/${this.organization.guid}/all`, { offset: '', limit: 12 });
      if (response) {
        this.talents = response.talents;
      }
      this.inProgress = false;
    } catch {
      this.inProgress = false;
    }
  }

  showTalents() {
    // this.talentToggele = !this.talentToggele;
    this.overlayModal.create(TalentListComponent, this.organization, {
      class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium-talentlist',
    }).present();
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

}

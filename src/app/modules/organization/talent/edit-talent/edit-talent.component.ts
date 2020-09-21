import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../../services/api';
import { Subscription } from 'rxjs';
import { Session } from '../../../../services/session';

@Component({
  selector: 'app-edit-talent',
  templateUrl: './edit-talent.component.html',
  styleUrls: ['./edit-talent.component.scss']
})
export class EditTalentComponent implements OnInit {

  paramsSubscription: Subscription;
  inProgress: boolean = true;
  talent: any;
  opspot = window.Opspot;
  coverImage;

  constructor(
    private route: ActivatedRoute,
    public session: Session,
    public client: Client,
    private cd: ChangeDetectorRef
  ) { }

  orgGuid: any;
  talentGuid: any;

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('guid') && params.get('talentGuid')) {
        this.orgGuid = params.get('guid');
        this.talentGuid = params.get('talentGuid');
        this.load();
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  load() {
    this.client.get('api/v1/newsfeed/single/' + this.talentGuid)
      .then((data: any) => {
        if (data.activity) {
          this.talent = data.activity;
        }
        this.inProgress = false;
        this.detectChanges();
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

  private detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }


}

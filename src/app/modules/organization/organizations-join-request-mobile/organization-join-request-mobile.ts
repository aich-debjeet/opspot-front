import { Component, OnInit, Input } from '@angular/core';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../organization-service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-organization-join-request-mobile',
  templateUrl: './organization-join-request-mobile.html',
  styleUrls: ['./organization-join-request-mobile.scss']
})
export class OrganizationJoinRequestMobile implements OnInit {

  constructor(
    private overlayModal: OverlayModalService,
    private route: ActivatedRoute,
    private service: OrganizationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['guid']) {
        this.load(params['guid'])
      }
    })
  }
  entity: any;
  opspot = window.Opspot;
  memberCount;


  async load(guid) {
    this.entity = await this.service.load(guid);
  }

  backClicked() {
    this.router.navigate(['organization', 'all']);
  }

}

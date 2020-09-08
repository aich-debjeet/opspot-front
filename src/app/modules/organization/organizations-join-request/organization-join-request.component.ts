import { Component, OnInit, Input } from '@angular/core';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-join-request',
  templateUrl: './organization-join-request.component.html',
  styleUrls: ['./organization-join-request.component.scss']
})
export class OrganizationJoinRequestComponent implements OnInit {

  constructor(
    private overlayModal: OverlayModalService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  entity: any;
  opspot = window.Opspot;
  memberCount;

  @Input('object') set data(object) {
    this.entity = object;
    if (this.entity && this.entity['members:count']) {
      this.memberCount = this.entity['members:count'];
    }
    // console.log("this enetity " , this.entity);

  }

  dismiss() {
    if (window.innerWidth > 785) {
      this.overlayModal.dismiss();
    } else {
      this.router.navigate(['organization', 'all']);
    }
  }

}

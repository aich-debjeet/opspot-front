import { Component, OnInit } from '@angular/core';
import { OverlayModalService } from '../../../../services/ux/overlay-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'opspot-talent-card',
  templateUrl: './talent-card.component.html',
  styleUrls: ['./talent-card.component.scss'],
  inputs: ['_talent : talent'],
})
export class TalentCardComponent implements OnInit {

  constructor(
    private overlayModal: OverlayModalService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  talent: any;
  opspot = window.Opspot;

  set _talent(value: any) {
    this.talent = value;
  }

  closeModal() {
    this.overlayModal.dismiss();
    this.router.navigate(['/organization', this.talent.container_obj.guid, 'talent', 'view', this.talent.activity_guid]);
  }

}

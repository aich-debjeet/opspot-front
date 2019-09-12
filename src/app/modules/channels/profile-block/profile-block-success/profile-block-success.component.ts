import { Component, OnInit } from '@angular/core';
import { OverlayModalService } from '../../../../services/ux/overlay-modal';

@Component({
  selector: 'app-profile-block-success',
  template: `
  <div class="o-toast-popup">
  <!-- <div class="close">
      <i class="icon-x"></i>
  </div> -->
  <div class="o-toast-popup-body">
      <div class="text-h4 f500 o-toast-mob-border">
          Blocked
      </div>
      <div class="text-lg mt-toast">
          You have successfully blocked this user. We're sorry that 
          you've had this experience.
      </div>
      <button type="button" class="btn btn-primary" (click)="closeModal()">Okay!</button>
  </div><!--body ends-->
  </div>`,
  styleUrls: ['./profile-block-success.component.scss']
})
export class ProfileBlockSuccessComponent implements OnInit {

  constructor(   
    private overlayModal: OverlayModalService,
    ) {}

  ngOnInit() {
  }

  closeModal(){
    this.overlayModal.dismiss()
  }

}

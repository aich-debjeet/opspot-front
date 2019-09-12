import { Component, OnInit, Input } from '@angular/core';
import { OverlayModalService } from '../../../../services/ux/overlay-modal';

@Component({
  selector: 'app-creator-success',
  template: `
  <div class="o-toast-popup">
    <div class="close">
     <i class="icon-x"></i>
    </div>
    <div class="o-toast-popup-body">
    <div class="text-h4 f500 o-toast-mob-border">
        Reported
    </div>
    <div class="text-lg mt-toast">
        Thank you for letting us know. You will no longer be able to see the post.
    </div>
    <button type="button" class="btn btn-primary" (click)="closeModal()">Okay!</button>
  </div>
 </div>
 `,
  styleUrls: ['./creator-success.component.scss']
})
export class CreatorSuccessComponent implements OnInit {

  constructor(   
    private overlayModal: OverlayModalService,
    ) {}


  ngOnInit() {}
  

  closeModal(){
    this.overlayModal.dismiss()
  }
}

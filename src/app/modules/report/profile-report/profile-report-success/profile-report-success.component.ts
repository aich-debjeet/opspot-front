import { Component, OnInit } from '@angular/core';
import { OverlayModalService } from '../../../../services/ux/overlay-modal';

@Component({
  selector: 'app-profile-report-success',
  template: `
  <div class="o-toast-popup">
        <!-- <div class="close">
          <i class="icon-x"></i>
        </div> -->
        <div class="o-toast-popup-body">
            <div class="text-h4 f500 o-toast-mob-border">
                Reported
            </div>
            <div class="text-lg mt-toast">
                Report successfull.  We will review your report and take necessary action.
            </div>
            <button type="button" class="btn btn-primary" (click)="closeModal()">Okay!</button>
        </div><!--body ends-->
  </div>
 `,
  styleUrls: ['./profile-report-success.component.scss']
})
export class ProfileReportSuccessComponent implements OnInit {

  constructor(   
    private overlayModal: OverlayModalService,
    ) {}

  ngOnInit() {
  }

  closeModal(){
    this.overlayModal.dismiss()
  }
}

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { SignupModalService } from '../../modals/signup/service';
import { WireCreatorComponent } from '../creator/creator.component';
import { Session } from '../../../services/session';

@Component({
  selector: 'm-wire-button',
  template: `
   <a class="o-actions__link o-actions__link--coin" (click)="wire()">
      <i class="icon-coins f-15"></i>
      <span class='o-action-count text-sm grey'>
      <span>{{object.wire_totals?object.wire_totals.tokens:0|token:18 | number}}</span>
     </span>
    </a>
  `
})
export class WireButtonComponent {
  @Input() object: any;
  @Output('done') doneEmitter: EventEmitter<any> = new EventEmitter();

  constructor(public session: Session, private overlayModal: OverlayModalService, private modal: SignupModalService) { }

  wire() {
    if (!this.session.isLoggedIn()) {
      this.modal.open();

      return;
    }

    const creator = this.overlayModal.create(WireCreatorComponent, this.object, {
      default: this.object && this.object.wire_threshold,
      onComplete: (wire) => {
        if (this.object.wire_totals) {
          this.object.wire_totals[wire.currency] = wire.amount;
        }

        this.doneEmitter.emit(wire);
      }
    });
    creator.present();
  }
}

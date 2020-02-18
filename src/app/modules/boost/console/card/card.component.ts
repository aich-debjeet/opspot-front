import { Component, Input } from '@angular/core';

import { BoostService } from '../../boost.service';
import { Reason, rejectionReasons } from '../../../../controllers/admin/boosts/rejection-reasons';
import { Session } from '../../../../services/session';

@Component({
  moduleId: module.id,
  providers: [BoostService],
  selector: 'm-boost-console-card',
  templateUrl: 'card.component.html',
  styleUrls:['card.component.scss']
})
export class BoostConsoleCard {

  opspot = window.Opspot;
  boost: any;
  type: string;

  reasons: Array<Reason> = rejectionReasons;
  routerLink1;

  constructor(public service: BoostService,public session: Session) {
  }

  @Input('boost')
  set _boost(boost: any) {
    this.boost = boost;

    // if (this.boost.entity_type === "event") {
    //   // this.showTimez = true;
    //   if (this.boost.entity.end_time_date) {
    //     this.routerLink1 = "/event"
    //   } else {
    //     this.routerLink1 = "/showtimez"
    //   }
    // }
    // console.log("this.boost: ", this.boost)
    this.type = this.service.getBoostType(this.boost) || '';
  }

  accept() {
    let agreed = true;

    if (this.boost.bidType === 'usd' && this.boost.postToFacebook) {
      agreed = confirm(`I accept a 5% transaction fee and agree not to delete this content from Facebook`);
    } else if (this.boost.bidType === 'usd') {
      agreed = confirm(`I accept a 5% transaction fee`);
    } else if (this.boost.postToFacebook) {
      agreed = confirm(`I agree not to delete this content from Facebook`);
    }

    if (!agreed) {
      return Promise.resolve(false);
    }

    return this.service.accept(this.boost);
  }

  canAccept() {
    return this.service.canAccept(this.boost);
  }

  reject() {
    return this.service.reject(this.boost);
  }

  canReject() {
    return this.service.canReject(this.boost);
  }

  revoke() {
    return this.service.revoke(this.boost);
  }

  canRevoke() {
    return this.service.canRevoke(this.boost);
  }

  isIncoming() {
    return this.service.isIncoming(this.boost);
  }

  findReason(code: number): Reason {
    return rejectionReasons.find((item: Reason) => {
      return item.code == code;
    });
  }
  getOwnerIconTime() {
    let session = this.session.getLoggedInUser();
    if (session && session.guid === this.boost.owner.guid) {
      return session.icontime;
    } else {
      return this.boost.owner.icontime;
    }
  }

}

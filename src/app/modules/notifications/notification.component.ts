import { Component, Input } from '@angular/core';
import { Session } from '../../services/session';
import { Reason, rejectionReasons } from '../../controllers/admin/boosts/rejection-reasons';

@Component({
  moduleId: module.id,
  selector: 'opspot-notification',
  inputs: ['_notification: notification'],
  templateUrl: 'notification.component.html',
  styleUrls:['notification.component.scss']
})
export class NotificationComponent {

  notification: any;
  opspot = window.Opspot;

  constructor(public session: Session) { }

  set _notification(value: any) {
    console.log(value)
    this.notification = value;
    // console.log(this.notification)
  }

  openMessengerWindow(event) {
    if (event) {
      event.preventDefault();
    }

    (<any>window).openMessengerWindow();
  }

  findReason(code: number): Reason {
    return rejectionReasons.find((item: Reason) => {
      return item.code === code;
    });
  }

  getClasses(){
    if(this.notification.status === 'unread')
      return {'o-noti-block--unread': true}
  }

}

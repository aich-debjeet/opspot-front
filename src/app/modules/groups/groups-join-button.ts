import { Component, Inject, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GroupsService } from './groups-service';
import { Session } from '../../services/session';
import { LoginReferrerService } from '../../services/login-referrer.service';
import { OverlayModalService } from '../../services/ux/overlay-modal';

@Component({
  selector: 'opspot-groups-join-button',
  inputs: ['_group: group'],
  outputs: ['membership'],
  template: `
    <button class="btn btn-primary btn-sm" id="group-join"
      *ngIf="!group['is:banned'] && !group['is:awaiting']
        && !group['is:invited'] && !group['is:member']"
        (click)="join()" i18n="@@GROUPS__JOIN_BUTTON__JOIN_ACTION">
      <ng-container *ngIf="!inProgress && group.membership === 2">Join</ng-container>
      <ng-container *ngIf="!inProgress && group.membership !== 2">Send Request</ng-container>
      <ng-container *ngIf="inProgress">Joining</ng-container>
    </button>
    <span *ngIf="group['is:invited'] &amp;&amp; !group['is:member']">
      <button class="btn btn-primary btn-sm mr-rt" id="group-accept" (click)="accept()" i18n="@@M__ACTION__ACCEPT">Accept</button>
      <button class="btn btn-primary btn-sm" id="group-decline" (click)="decline()" i18n="@@GROUPS__JOIN_BUTTON__DECLINE_ACTION">Decline</button>
    </span>
    <button class="btn btn-primary btn-sm" id="group-leave" *ngIf="group['is:member']" (click)="leave()" i18n="@@GROUPS__JOIN_BUTTON__LEAVE_ACTION">Leave</button>
    <button class="btn btn-primary btn-sm" id="group-cancel" *ngIf="group['is:awaiting']" (click)="cancelRequest()" i18n="@@GROUPS__JOIN_BUTTON__CANCEL_REQ_ACTION">Cancel Request</button>
    <m-modal-signup-on-action
      [open]="showModal"
      (closed)="join(); showModal = false;"
      action="join a group"
      i18n-action="@@GROUPS__JOIN_BUTTON__JOIN_A_GROUP_TITLE"
      [overrideOnboarding]="true"
      *ngIf="!session.isLoggedIn()">
    </m-modal-signup-on-action>

    <style>
    .mr-rt {
      margin-right: 5px;
    }
    </style>
  `
})

export class GroupsJoinButton {

  opspot;
  showModal: boolean = false;
  group: any;
  membership: EventEmitter<any> = new EventEmitter();
  inProgress: boolean = false;
  @Input() small: boolean = false;


  constructor(
    public session: Session,
    public service: GroupsService,
    private router: Router,
    private loginReferrer: LoginReferrerService,
    private overlayModal: OverlayModalService
  ) {
    this.opspot = window.Opspot;
  }

  set _group(value: any) {
    this.group = value;
  }

  /**
   * Check if is a member
   */
  isMember() {
    if (this.group['is:member'])
      return true;
    return false;
  }

  /**
   * Check if the group is closed
   */
  isPublic() {
    if (this.group.membership !== 2)
      return false;
    return true;
  }

  /**
   * Join a group
   */
  join() {
    if (!this.session.isLoggedIn()) {
      //this.showModal = true;
      this.loginReferrer.register(`/groups/${this.group.name}/profile/${this.group.guid}/feed?join=true`);
      this.router.navigate(['/login']);
      return;
    }
    this.inProgress = true;
    this.service.join(this.group)
      .then(() => {
        this.inProgress = false;
        if (this.isPublic()) {
          this.group['is:member'] = true;
          this.membership.next({
            member: true
          });
          return;
        }
        this.membership.next({});
        this.group['is:awaiting'] = true;
        this.overlayModal.dismiss();
      })
      .catch(e => {
        let error = e.error;
        switch (e.error) {
          case 'You are banned from this group':
            error = 'banned';
            break;
          case 'User is already a member':
            error = 'already_a_member';
            break;
          default:
            error = e.error;
            console.log("error: ", error);

            break;
        }
        this.group['is:member'] = false;
        this.group['is:awaiting'] = false;
        this.membership.next({ error: error });
        this.inProgress = false;
      });
  }

  /**
   * Leave a group
   */
  leave() {
    this.service.leave(this.group)
      .then(() => {
        this.group['is:member'] = false;
        this.membership.next({
          member: false
        });
        this.router.navigate(['/groups/members']);
      })
      .catch(e => {
        this.group['is:member'] = true;
      });
  }

  /**
   * Accept joining a group
   */
  accept() {
    this.group['is:member'] = true;
    this.group['is:invited'] = false;

    this.service.acceptInvitation(this.group)
      .then((done: boolean) => {
        this.group['is:member'] = done;
        this.group['is:invited'] = !done;

        if (done) {
          this.membership.next({
            member: true
          });
        }
      });
  }

  /**
   * Cancel a group joining request
   */
  cancelRequest() {
    this.group['is:awaiting'] = false;

    this.service.cancelRequest(this.group)
      .then((done: boolean) => {
        this.group['is:awaiting'] = !done;
      });
  }

  /**
   * Decline joining a group
   */
  decline() {
    this.group['is:member'] = false;
    this.group['is:invited'] = false;

    this.service.declineInvitation(this.group)
      .then((done: boolean) => {
        this.group['is:member'] = false;
        this.group['is:invited'] = !done;
      });

    this.router.navigate(['/groups/members']);
  }

}

import { Component, Input } from '@angular/core';
import { Session } from '../../../services/session';
import { OrganizationService } from '../organization-service';
import { Router } from '@angular/router';

@Component({
  selector: 'm-organization--tile',
  templateUrl: 'tile.component.html',
  // inputs: ['object']
})

export class OrganizationTileComponent {

  opspot = window.Opspot;
  @Input() entity;
  organization1: any;
  members: any;



  constructor(
    public session: Session,
    public service: OrganizationService,
    private router: Router
  ) { }

  ngOnInit() { }

  @Input('object') set object(value: any) {
    if (!value) return;
    this.organization1 = value;
  }

  // @Input('subscribers') set subscribers(value: any) {
  //   if (!value) return;
  //   this.members = value;
  // }

  trigger(entity) {
    this.router.navigate(['organization', 'profile', entity.guid]);
    // if (entity && (entity.membership !== 2)) {
    //   if (entity['is:member']) {
    //     this.router.navigateByUrl('/groups/profile/' + entity.guid);
    //   } else {
    //     this.overlayModal.create(GroupJoinRequestComponent, this.entity, {
    //       class: 'm-overlay-modal--report m-overlay-modal--medium-groupjoin',
    //     }
    //     ).present();
    //   }
    // } else {
    //   this.router.navigateByUrl('/groups/profile/' + entity.guid);
    // }
  }

  cancelRequest() {
    this.entity['is:awaiting'] = false;

    this.service.cancelRequest(this.entity)
      .then((done: boolean) => {
        this.entity['is:awaiting'] = !done;
      });
  }

  // remove(member) {
  //   console.log("in delete: ");
  //   let i: any;
  //   for (i in this.members) {
  //     if (this.members[i] === member) {
  //       this.members.splice(i, 1);
  //       break;
  //     }
  //   }
  // }

}

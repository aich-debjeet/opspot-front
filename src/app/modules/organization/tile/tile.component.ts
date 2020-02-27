import { Component, Input } from '@angular/core';
import { Session } from '../../../services/session';
import { OrganizationService } from '../organization-service';
import { Router } from '@angular/router';

@Component({
  selector: 'm-organization--tile',
  templateUrl: 'tile.component.html',
})

export class OrganizationTileComponent {

  opspot = window.Opspot;
  @Input() entity;

  constructor(
    public session: Session,
    public service: OrganizationService,
    private router: Router
  ) { }

  ngOnInit() { }

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

}

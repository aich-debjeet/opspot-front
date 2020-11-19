import { Component, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { Session } from '../../../services/session';
import { UpdateMarkersService } from '../../../common/services/update-markers.service';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { GroupJoinRequestComponent } from '../group-join-request/group-join-request.component';
import { Router } from '@angular/router';
import { GroupsService } from '../groups-service';

@Component({
  selector: 'm-groups--tile',
  templateUrl: 'tile.component.html',
})

export class GroupsTileComponent {

  opspot = window.Opspot;
  @Input() entity;
  $updateMarker;
  hasMarker: boolean = false;

  constructor(
    public session: Session,
    private updateMarkers: UpdateMarkersService,
    private overlayModal: OverlayModalService,
    private router: Router,
    public service: GroupsService,
  ) { }

  ngOnInit() {
    this.$updateMarker = this.updateMarkers.markers.subscribe(markers => {
      if (!markers)
        return;
      this.hasMarker = markers
        .filter(marker =>
          (marker.read_timestamp < marker.updated_timestamp)
          && (marker.entity_guid == this.entity.guid)
        )
        .length;
    });
  }

  trigger(entity) {
    if (entity && (entity.membership !== 2)) {
      if (entity['is:member']) {
        // this.router.navigateByUrl(`/groups/${entity.name}/profile/${entity.guid}`);
        this.router.navigate(['groups', entity.name,'profile', entity.guid]);
      } else {
        this.overlayModal.create(GroupJoinRequestComponent, this.entity, {
          class: 'm-overlay-modal--report m-overlay-modal--medium-groupjoin',
        }
        ).present();
      }
    } else {
      this.router.navigate(['groups', entity.name,'profile', entity.guid]);
    }
  }

  cancelRequest() {
    this.entity['is:awaiting'] = false;

    this.service.cancelRequest(this.entity)
      .then((done: boolean) => {
        this.entity['is:awaiting'] = !done;
      });
  }

  ngOnDestroy() {
    this.$updateMarker.unsubscribe()
  }

}

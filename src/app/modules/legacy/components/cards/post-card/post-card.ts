import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../../../services/session';
import { Router } from '@angular/router';
import { OverlayModalService } from '../../../../../services/ux/overlay-modal';
import { GroupJoinRequestComponent } from '../../../../groups/group-join-request/group-join-request.component';

@Component({
  selector: 'opspot-post-card',
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.scss'],
  inputs: ['_entity: entity'],
})
export class PostCard implements OnInit {

  entity: any;
  opspot = window.Opspot;
  commentsCount;
  routerlink: any;

  set _entity(value) {
    this.entity = value;
    this.commentsCount = this.entity['comments:count'];

    if (this.entity) {
      if (this.entity.entity_type === 'event') {
        if (this.entity.end_time_date) {
          this.routerlink = '/event/view/' + this.entity.guid;
        } else {
          this.routerlink = '/showtimez/' + this.entity.guid;
        }
      } else if (this.entity.entity_type === 'opportunity') {
        this.routerlink = '/opportunity/' + this.entity.guid;
      } else if (this.entity.entity_type === 'item') {
        this.routerlink = '/item/' + this.entity.guid;
      } else if (this.entity.entity_type === 'blog') {
        this.routerlink = this.entity.perma_url;
      } else {
        this.routerlink = '/media/' + this.entity.guid;
      }
    }
  }

  trigger(entity) {
    console.log(entity)
    if (entity['entity_type'] == 'organization') {
      this.router.navigate(['organization', 'profile', entity.guid]);
    }
    else if (entity['entity_type'] == 'community') {
      if (entity && (entity.membership !== 2)) {
        if (entity['is:member']) {
          this.router.navigateByUrl(`/groups/${entity.name}/profile/${entity.guid}`);
        } else {
          this.overlayModal.create(GroupJoinRequestComponent, this.entity, {
            class: 'm-overlay-modal--report m-overlay-modal--medium-groupjoin',
          }
          ).present();
        }
      } else {
        this.router.navigateByUrl(`/groups/${entity.name}/profile/${entity.guid}`);
      }
    }
  }


  constructor(
    public session: Session,
    private router: Router,
    private overlayModal: OverlayModalService,
  ) { }

  ngOnInit() {
    // console.log(this.entity)
  }

}

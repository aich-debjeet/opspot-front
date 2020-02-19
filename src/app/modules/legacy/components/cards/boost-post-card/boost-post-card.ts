import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../../../services/session';

@Component({
  selector: 'opspot-boost-post-card',
  templateUrl: './boost-post-card.html',
  styleUrls: ['./boost-post-card.scss'],
  inputs: ['_entity: entity'],
})
export class BoostPostCard implements OnInit {

  entity: any;
  routerlink;

  tempUrl = 'https://ops.doesntexist.com/icon/'
  constructor(
    public session: Session,
  ) { }

  ngOnInit() {
    // console.log(this.entity)
  }

  set _entity(value) {
    this.entity = value;

    if (this.entity) {
      if (this.entity.entity_type === 'event') {
        this.routerlink = '/event/' + this.entity.guid;
      } else if (this.entity.entity_type === 'opportunity') {
        this.routerlink = '/opportunity/' + this.entity.guid;
      } else if (this.entity.entity_type === 'item') {
        this.routerlink = '/item/' + this.entity.guid;
      } else {
        this.routerlink = '/media/' + this.entity.guid;
      }
    }
  }
}

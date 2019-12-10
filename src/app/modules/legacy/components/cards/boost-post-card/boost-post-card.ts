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

  tempUrl = 'https://ops.doesntexist.com/icon/'
  constructor(
    public session: Session,
  ) { }

  ngOnInit() {
    // console.log(this.entity)
  }

  routerlink;

  set _entity(value) {
    this.entity = value;

    if(this.entity){
      if(this.entity.entity_type === 'event'){
        this.routerlink = '/event/view/' + this.entity.guid;
      }else if(this.entity.entity_type === 'opportunity'){
        this.routerlink = '/opportunity/view/' + this.entity.guid;
      }else if(this.entity.entity_type === 'item'){
        this.routerlink = '/item/view/' + this.entity.guid;
      }else{
        this.routerlink = '/media/' + this.entity.guid;
      }
    }
}
}

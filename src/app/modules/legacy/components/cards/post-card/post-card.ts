import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../../../services/session';

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
  routerlink:any;

  set _entity(value) {
    this.entity = value;
    this.commentsCount = this.entity['comments:count'];
    
    if(this.entity){
      console.log(this.entity)
      if(this.entity.entity_type === 'event'){
        this.routerlink = '/event/' + this.entity.guid;
      }else if(this.entity.entity_type === 'opportunity'){
        this.routerlink = '/opportunity/' + this.entity.guid;
      }else if(this.entity.entity_type === 'item'){
        this.routerlink = '/item/' + this.entity.guid;
      }else if(this.entity.entity_type === 'blog'){
        this.routerlink =  this.entity.perma_url;
      }else{
        this.routerlink = '/media/' + this.entity.guid;
      }
    }
  }


  constructor(
    public session: Session,
  ) { }

  ngOnInit() {
    // console.log(this.entity)
  }

}

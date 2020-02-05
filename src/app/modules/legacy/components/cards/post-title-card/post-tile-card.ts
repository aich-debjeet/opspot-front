import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../../../services/session';
import getEntityType from '../../../../../helpers/post-title';

@Component({
  selector: 'opspot-post-title-card',
  templateUrl: './post-title-card.html',
  inputs: ['_entity: entity'],
  styleUrls: ['./post-title-card.scss']
})
export class PostCardTitle implements OnInit {

  entity: any;
  opspot = window.Opspot;
  title = '';
  hashtag = '';
  postType = '';

  constructor(
    public session: Session,
  ) { }

  set _entity(value) {
    this.entity = value;
    // console.log("Entity: ", this.entity);

    if (this.entity) {
      this.postType = getEntityType(this.entity);
    }
    // console.log("This entity: ", this.postType);
    if (this.postType === 'opportunity') {
      this.title = 'created an';
      this.hashtag = '#Opportunity';
    } else if (this.postType === 'bigevent') {
      this.title = 'created an';
      this.hashtag = '#Event';
    } else if (this.postType === 'showtimez') {
      this.title = 'created a';
      this.hashtag = '#Showtimez';
    } else if (this.postType === 'myjourney') {
      this.title = 'created a';
      this.hashtag = '#Myjourney';
    } else if (this.postType === 'bluestore') {
      this.title = 'created a';
      this.hashtag = '#MarketPlace';
    } else if (this.postType === 'portfolio') {
      this.title = 'created a';
      this.hashtag = '#Portfolio';
    } else if (this.postType === 'repost') {
      // var name = this.entity.ownerObj.name + "'s"
      this.title = 'shared ' + this.entity.remind_object.ownerObj.name + "'s";
      this.hashtag = 'post ' + "(Repost)";
    } else {
      this.title = 'created a';
      this.hashtag = 'post';
    }
  }

  ngOnInit() {
    // console.log(this.entity)
  }


}

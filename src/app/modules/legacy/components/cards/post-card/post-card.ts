import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../../../services/session';

@Component({
  selector: 'opspot-post-card',
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.scss']
})
export class PostCard implements OnInit {

  @Input() entity: any;

  tempUrl = 'https://ops.doesntexist.com/icon/'
  constructor(
    public session: Session,
  ) { }

  ngOnInit() {
    console.log(this.entity)
  }

}

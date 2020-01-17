import { Component, OnInit } from '@angular/core';
import { OpspotTitle } from '../../../services/ux/title';


@Component({
  selector: 'app-big-event-create',
  templateUrl: './big-event-create.html',
  styleUrls: ['./big-event-create.scss']
})
export class BigEventCreate implements OnInit {

  constructor(
    public title: OpspotTitle,
  ) { }

  ngOnInit() {
    this.title.setTitle('Create Event');
  }

}

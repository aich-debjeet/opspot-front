import { Component, OnInit } from '@angular/core';
import { OpspotTitle } from '../../../services/ux/title';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-big-event-create',
  templateUrl: './big-event-create.html',
  styleUrls: ['./big-event-create.scss']
})
export class BigEventCreate implements OnInit {

  constructor(
    public title: OpspotTitle,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title.setTitle('Create Event');
    this.route.params.subscribe(params => {
      if (params['type']) {
        console.log(params['type']);
      }
    });
  }

}

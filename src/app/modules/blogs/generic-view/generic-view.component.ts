import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../../../services/session';

@Component({
  selector: 'app-generic-view',
  templateUrl: './generic-view.component.html',
  styleUrls: ['./generic-view.component.scss']
})
export class GenericViewComponent implements OnInit {

  constructor(public session: Session, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
  }

}

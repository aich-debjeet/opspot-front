import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'opspot-card-user2',
  templateUrl: 'user2.html',
  styleUrls: ['./user2.scss']
})
export class UserCard2 implements OnInit {

  @Input() user: any;
  opspot: Opspot = window.Opspot;

  constructor() {}

  ngOnInit() {}

}

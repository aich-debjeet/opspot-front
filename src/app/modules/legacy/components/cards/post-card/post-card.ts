import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'opspot-post-card',
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.scss']
})
export class PostCard implements OnInit {

  @Input() entity: any;

  constructor() { }

  ngOnInit() {
  }

}

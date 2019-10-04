import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'opspot-masonry-container',
  templateUrl: './masonry-container.component.html',
  styleUrls: ['./masonry-container.component.scss']
})
export class MasonryContainerComponent implements OnInit {

  @Input() entities: any[];

  constructor() { }

  ngOnInit() {
  }

}

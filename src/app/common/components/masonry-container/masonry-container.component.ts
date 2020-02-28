import { Component, OnInit, Input } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'opspot-masonry-container',
  templateUrl: './masonry-container.component.html',
  styleUrls: ['./masonry-container.component.scss']
})
export class MasonryContainerComponent implements OnInit {

  @Input() entities: any[];
  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0s',		
  };

  constructor() { }

  ngOnInit() {
    // console.log(this.entities)
  }

}

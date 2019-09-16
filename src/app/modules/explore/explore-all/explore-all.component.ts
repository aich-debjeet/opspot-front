import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../services/session';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-explore-all',
  templateUrl: './explore-all.component.html',
  styleUrls: ['./explore-all.component.scss']
})
export class ExploreAllComponent implements OnInit {
  @Input() response;
  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0s',		
  };
  tempUrl = 'https://ops.doesntexist.com/icon/'
  constructor(
    public session: Session,
  ) { }

  ngOnInit() {
    console.log(this.response)

  }

}

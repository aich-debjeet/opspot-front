import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../services/session';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-explore-video',
  templateUrl: './explore-video.component.html',
  styleUrls: ['./explore-video.component.scss']
})
export class ExploreVideoComponent implements OnInit {

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

import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../services/session';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-explore-blogs',
  templateUrl: './explore-blogs.component.html',
  styleUrls: ['./explore-blogs.component.scss']
})
export class ExploreBlogsComponent implements OnInit {

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

import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../services/session';

@Component({
  selector: 'app-explore-blogs',
  templateUrl: './explore-blogs.component.html',
  styleUrls: ['./explore-blogs.component.scss']
})
export class ExploreBlogsComponent implements OnInit {

  @Input() response;
  constructor(
    public session: Session
    ) { }

  ngOnInit() {
    console.log(this.response)
  }

}

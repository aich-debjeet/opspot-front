import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../services/session';

@Component({
  selector: 'app-explore-image',
  templateUrl: './explore-image.component.html',
  styleUrls: ['./explore-image.component.scss']
})
export class ExploreImageComponent implements OnInit {
@Input() response;
tempUrl = 'https://ops.doesntexist.com/icon/'
  constructor(
    public session: Session,
  ) { }

  ngOnInit() {
    console.log(this.response)
  }

}

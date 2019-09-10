import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../services/session';

@Component({
  selector: 'app-explore-video',
  templateUrl: './explore-video.component.html',
  styleUrls: ['./explore-video.component.scss']
})
export class ExploreVideoComponent implements OnInit {

  @Input() response;
  tempUrl = 'https://ops.doesntexist.com/icon/'
  constructor(
    public seesion: Session,
  ) { }

  ngOnInit() {
    console.log(this.response)
  }

}

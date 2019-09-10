import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../services/session';

@Component({
  selector: 'app-explore-audio',
  templateUrl: './explore-audio.component.html',
  styleUrls: ['./explore-audio.component.scss']
})
export class ExploreAudioComponent implements OnInit {

  @Input() response;
  tempUrl = 'https://ops.doesntexist.com/icon/'
  constructor(
    public session: Session,
  ) { }

  ngOnInit() {
    console.log(this.response)
  }

}

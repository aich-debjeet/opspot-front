import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-join-request',
  templateUrl: './group-join-request.component.html',
  styleUrls: ['./group-join-request.component.scss']
})
export class GroupJoinRequestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  entity: any;
  opspot = window.Opspot;
  memberCount;

  @Input('object') set data(object) {
    this.entity = object;
    if (this.entity && this.entity['members:count']) {
      this.memberCount = this.entity['members:count'];
    }
    // console.log("this enetity " , this.entity);

  }

}

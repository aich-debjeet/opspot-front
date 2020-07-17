import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../../../services/api';
import { Session } from '../../../../services/session';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  activityGuid: string;
  offset: number = 0;
  likeList: any = [];
  totalLikes: number = 0;
  moreData: boolean = true;
  opspot = window.Opspot;

  @Input('object') set data(object) {
    console.log(object);
    this.activityGuid = object ? object : null;
  }

  constructor(
    private client: Client,
    public session: Session,
  ) { }

  ngOnInit() {
    this.load()
  }
  load() {
    this.offset = this.likeList.length ? this.offset + 10 : 0;
    this.client.get('api/v1/votes/' + this.activityGuid + '/list', { limit: 10, offset: this.offset })
      .then((response:any) => {
        this.totalLikes = response['count'];
        if (response['list'].length > 0) {
          for (let activity of response.list) {
            this.likeList.push(activity);
          }
          // this.likeList.push(response['list']);
          // this.likeList = response['list'];
        } else {
          this.moreData = false;
        }
      })
  }
}

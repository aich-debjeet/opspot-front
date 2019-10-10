import { Component, OnInit } from '@angular/core';
import { OpspotActivityObject, OpspotUser } from '../../../../app/interfaces/entities';
import { Session } from '../../../../app/services/session';
import { Client } from '../../../../app/services/api';

@Component({
  inputs: ['user'],
  selector: 'app-myjourney-widget',
  templateUrl: './myjourney-widget.component.html',
  styleUrls: ['./myjourney-widget.component.scss']
})
export class MyjourneyWidgetComponent implements OnInit {

  opspot = window.Opspot;
  // filter: any = 'feed';


  username: string;
  user: OpspotUser;
  feed: Array<Object> = [];
  pinned: Array<Object> = [];
  offset: string = '';
  moreData: boolean = true;
  inProgress: boolean = false;

  hashMatchString = '#myjourney' + this.session.getLoggedInUser().username;

  constructor(
    public session: Session,
    public client: Client,
  ) { }

  ngOnInit() {
    this.loadFeed();
  }


  loadFeed() {

    if (this.inProgress) {
      return false;
    }

    // if (refresh) {
    //   this.feed = [];
    //   this.offset = '';
    // }

    let params: any = {
      limit: 12,
      offset: ''
    }

    // if (!this.offset && this.user.pinned_posts.length > 0) {
    //   params.pinned = this.user.pinned_posts;
    // }

    this.inProgress = true;

    params.offset = this.offset;

    this.client.get('api/v1/newsfeed/personal/' + this.user.guid, params, { cache: true })
      .then((data: OpspotActivityObject) => {
        if (!data.activity) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }
        if (this.feed) {
          for (let activity of data.activity) {
            console.log("activity.tags[0]: ", activity.tags[0]);
            if (activity.tags.length && activity.tags[0] === this.hashMatchString) {
              this.feed.push(activity);
            }
          }
        } else {
          this.feed = this.filterPinned(data.activity);
          this.pinned = data.pinned;
        }
        this.offset = data['load-next'];
        this.inProgress = false;
      })
      .catch(function (e) {
        this.inProgress = false;
      });
  }

  filterPinned(activities) {
    return activities.filter((activity) => {
      if (this.user.pinned_posts.indexOf(activity.guid) >= 0) {
        activity.pinned = true;
      } else {
        return activity;
      }
    }).filter(x => !!x);
  }


}

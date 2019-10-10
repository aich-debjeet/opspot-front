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
  // myjourneyVideos = [];
  multiVIdeos = [];
  singleVideo = [];

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
        for (let activity of data.activity) {
          if (activity.tags.length && activity.tags[0] === this.hashMatchString) {
          
            console.log("myjourneyVideos", activity.custom_data.length);
            if (activity.custom_data.length) {
              for (var i = 0; i < activity.custom_data.length; i++) {
                this.multiVIdeos.push(activity.custom_data[i]);
              }
            } else {
              this.singleVideo.push(activity.custom_data);
            }
          }
        }
        console.log("this multivideos: ", this.multiVIdeos);
        console.log("this singlevideos: ", this.singleVideo);

        this.feed = this.multiVIdeos.concat(this.singleVideo);
        console.log("All my journey videos: ", this.feed);

        // } else {
        //   this.feed = this.filterPinned(data.activity);
        //   this.pinned = data.pinned;
        // }
        this.offset = data['load-next'];
        this.inProgress = false;
      })
      .catch(function (e) {
        this.inProgress = false;
      });
  }
}

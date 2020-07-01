import { Component, ViewChild, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Client, Upload } from '../../../services/api';
import { Session } from '../../../services/session';
import { ScrollService } from '../../../services/ux/scroll';

import { OpspotActivityObject } from '../../../interfaces/entities';
import { OpspotUser } from '../../../interfaces/entities';
import { OpspotChannelResponse } from '../../../interfaces/responses';
import { PosterComponent } from '../../../modules/newsfeed/poster/poster.component';
import { WireChannelComponent } from '../../../modules/wire/channel/channel.component';

@Component({
  moduleId: module.id,
  selector: 'm-channel--filter',
  inputs: ['user', 'openWireModal'],
  templateUrl: 'filter.html'
})
export class ChannelFilterComponent {
  opspot = window.Opspot;
  isLocked: boolean = false;
  @Input() filter: any;
  @Input() user: OpspotUser;

  username: string;
  feed: Array<Object> = [];
  pinned: Array<Object> = [];
  offset: string = '';
  moreData: boolean = true;
  inProgress: boolean = false;
  editing: boolean = false;
  error: string = '';
  openWireModal: boolean = false;

  showOnboarding: boolean = false;
  paramsSubscription: Subscription;

  @ViewChild('poster') private poster: PosterComponent;
  @ViewChild('wire') private wire: WireChannelComponent;

  constructor(
    public session: Session,
    public client: Client,
    public upload: Upload,
    public scroll: ScrollService
  ) {}

  ngOnInit() {
    // console.log('FILTER: ', this.filter);
    this.loadFeed(true);
    this.onScroll();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('FILTER UPDATED: ', this.filter);
    this.loadFeed(true);
    this.onScroll();
  }

  loadFeed(refresh: boolean = false) {
    if (this.openWireModal) {
      setTimeout(() => {
        this.wire.sendWire();
      });
    }

    if (this.inProgress) {
      return false;
    }

    if (refresh) {
      this.feed = [];
      this.offset = '';
    }

    let params: any = {
      limit: 12,
      offset: '',
      sync: 1,
      as_activities: 0,
      container_guid: this.user.guid
    };

    if (!this.offset && this.user.pinned_posts.length > 0) {
      params.pinned = this.user.pinned_posts;
    }

    this.inProgress = true;

    params.offset = this.offset;
    if (this.filter == 'blogs') {
      this.filter = this.filter + '/published';
    }
    this.client
      .get(`api/v2/feeds/container/${this.user.guid}/${this.filter}`, params)
      .then((data: OpspotActivityObject) => {
        if (!data.entities) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }
        if (this.feed && !refresh) {
          for (let activity of data.entities) {
            this.feed.push(activity);
          }
        } else {
          this.feed = this.filterPinned(data.entities);
          this.pinned = data.pinned;
        }
        this.offset = data['load-next'];
        this.inProgress = false;
      })
      .catch(function(e) {
        this.inProgress = false;
      });
  }

  isOwner() {
    return this.session.getLoggedInUser().guid === this.user.guid;
  }

  filterPinned(activities) {
    return activities
      .filter(activity => {
        if (this.user.pinned_posts.indexOf(activity.guid) >= 0) {
          activity.pinned = true;
        } else {
          return activity;
        }
      })
      .filter(x => !!x);
  }

  onScroll() {
    var listen = this.scroll.listen(view => {
      if (view.top > 250) this.isLocked = true;
      if (view.top < 250) this.isLocked = false;
    });
  }

  delete(activity) {
    let i: any;
    for (i in this.feed) {
      if (this.feed[i] === activity) {
        this.feed.splice(i, 1);
        break;
      }
    }
  }

  prepend(activity: any) {
    activity.boostToggle = true;
    this.feed.unshift(activity);
  }

  canDeactivate() {
    if (!this.poster || !this.poster.attachment) return true;
    const progress = this.poster.attachment.getUploadProgress();
    if (progress > 0 && progress < 100) {
      return confirm('Your file is still uploading. Are you sure?');
    }

    return true;
  }
}

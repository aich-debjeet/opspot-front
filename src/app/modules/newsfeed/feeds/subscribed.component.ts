import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

import { Client, Upload } from '../../../services/api';
import { OpspotTitle } from '../../../services/ux/title';
import { Navigation as NavigationService } from '../../../services/navigation';
import { OpspotActivityObject } from '../../../interfaces/entities';
import { Session } from '../../../services/session';
import { Storage } from '../../../services/storage';
import { ContextService } from '../../../services/context.service';
import { PosterComponent } from '../poster/poster.component';
import { OverlayModalService } from '../../../services/ux/overlay-modal';

@Component({
  selector: 'm-newsfeed--subscribed',
  templateUrl: 'subscribed.component.html',
  styleUrls: ['subscribed.component.scss']
})

export class NewsfeedSubscribedComponent {

  newsfeed: Array<Object> = [];
  enroll: any;
  prepended: Array<any> = [];
  offset: string = '';
  showBoostRotator: boolean = true;
  inProgress: boolean = false;
  moreData: boolean = true;
  opspot;
  globalIndex = 3;
  advtOffset: string = '';
  advertizementsArray: Array<object> = [];

  attachment_preview;

  message: string = '';
  newUserPromo: boolean = false;
  postMeta: any = {
    title: '',
    description: '',
    thumbnail: '',
    url: '',
    active: false,
    attachment_guid: null
  };

  paramsSubscription: Subscription;

  filter: any = '';

  @ViewChild('poster') private poster: PosterComponent;

  constructor(
    public client: Client,
    public upload: Upload,
    public navigation: NavigationService,
    public router: Router,
    public route: ActivatedRoute,
    public title: OpspotTitle,
    private storage: Storage,
    private context: ContextService,
    private session: Session,
    private overlayModal: OverlayModalService,
  ) {
    this.title.setTitle('Newsfeed');
  }

  ngOnInit() {
    this.load(true, 'all');
    // this.loadAdvertizes();
    this.opspot = window.Opspot;

    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params['message']) {
        this.message = params['message'];
      }

      this.newUserPromo = !!params['newUser'];

      if (params['ts']) {
        this.showBoostRotator = false;
        this.load(true);
        setTimeout(() => {
          this.showBoostRotator = true;
        }, 300);
      }
    });

    this.context.set('activity');
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  /**
   * Load newsfeed
   */
  load(refresh: boolean = false, filter?: string) {
    this.filter = filter
    if (this.inProgress)
      return false;

    if (refresh) {
      this.offset = '';
      this.moreData = true;
      this.newsfeed = [];
      this.prepended = [];
    }

    this.inProgress = true;

    this.client.get('api/v4/newsfeed', { activity_type: this.filter, limit: 12, offset: this.offset })
      .then((data: OpspotActivityObject) => {
        if (!data.activity) {

          this.moreData = false;
          this.inProgress = false;
          // this.newsfeed = [];
          return false;
        }
        if (this.newsfeed && !refresh) {
          this.newsfeed = this.newsfeed.concat(data.activity);

          if (!this.enroll) { }
          this.enroll = this.newsfeed.find(data => data['event_type'] == 'Premium');

        } else {

          this.newsfeed = data.activity;

          if (!this.enroll) {
            this.enroll = this.newsfeed.find(data => data['event_type'] == 'Premium');
          }
        }
        this.offset = data['load-next'];

        this.inProgress = false;
        this.filter = filter
      }).then(() => {
        this.loadAdvertizes()
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

  async loadAdvertizes() {
    try {
      const response: any = await this.client.get('api/v3/marketing/advertise', { limit: 3, offset: this.advtOffset });
      if (response['advertises'] && response['advertises'].length) {
        this.advtOffset = response['load-next'];
        this.advertizementsArray = this.advertizementsArray.concat(response['advertises'])
        console.log('printin',this.advertizementsArray)
        for (let i = this.globalIndex; i <= this.newsfeed.length; i += 4) {
          let j = 0;
          if (j < this.advertizementsArray.length)
            this.newsfeed.splice(i, 0, this.advertizementsArray.shift())
          // j = j + 1;
          this.globalIndex = i;
        }

      }

    }
    catch (e) {
      console.log(e);

    }
  }

  prepend(activity: any) {
    if (this.newUserPromo) {
      this.autoBoost(activity);
      activity.boostToggle = false;
      activity.boosted = true;
    }
    this.prepended.unshift(activity);

    this.newUserPromo = false;
  }

  autoBoost(activity: any) {
    this.client.post('api/v2/boost/activity/' + activity.guid + '/' + activity.owner_guid,
      {
        newUserPromo: true,
        impressions: 200,
        destination: 'Newsfeed'
      });
  }

  delete(activity) {
    let i: any;
    for (i in this.prepended) {
      if (this.prepended[i] === activity) {
        this.prepended.splice(i, 1);
        return;
      }
    }
    for (i in this.newsfeed) {
      if (this.newsfeed[i] === activity) {
        this.newsfeed.splice(i, 1);
        return;
      }
    }
  }

  canDeactivate() {
    if (!this.poster || !this.poster.attachment)
      return true;
    const progress = this.poster.attachment.getUploadProgress();
    if (progress > 0 && progress < 100) {
      return confirm('Your file is still uploading. Are you sure?');
    }

    return true;
  }

  isActive(filter: string) {
    if (this.filter === filter) {
      return true;
    }
    return false;
  }


}


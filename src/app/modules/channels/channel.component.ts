import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Client, Upload } from '../../services/api';
import { OpspotTitle } from '../../services/ux/title';
import { Session } from '../../services/session';
import { ScrollService } from '../../services/ux/scroll';
import { RecentService } from '../../services/ux/recent';

// import { OpspotActivityObject } from '../../interfaces/entities';
import { OpspotUser } from '../../interfaces/entities';
import { OpspotChannelResponse } from '../../interfaces/responses';
// import { WireChannelComponent } from '../../modules/wire/channel/channel.component';
import { ChannelFeedComponent } from './feed/feed';
import { ContextService } from '../../services/context.service';
// import { PosterComponent } from '../newsfeed/poster/poster.component';

@Component({
  moduleId: module.id,
  selector: 'm-channel',
  templateUrl: 'channel.component.html'
})
export class ChannelComponent {
  opspot = window.Opspot;
  filter: any = 'feed';
  isLocked: boolean = false;

  emailVerificationSuccess = false;
  emailVerificationFail = '';
  emailVerificationModal = false;
  username: string;
  user: OpspotUser;
  offset: string = '';
  moreData: boolean = true;
  inProgress: boolean = false;
  editing: boolean = false;
  error: string = '';
  openWireModal: boolean = false;
  changed: boolean = false;
  showOnboarding: boolean = false;
  paramsSubscription: Subscription;
  displayBookmark= false;

  @ViewChild('feed') private feed: ChannelFeedComponent;

  constructor(
    public session: Session,
    public client: Client,
    public upload: Upload,
    private route: ActivatedRoute,
    public title: OpspotTitle,
    public scroll: ScrollService,
    private recent: RecentService,
    private context: ContextService
  ) {}

  ngOnInit() {
    this.title.setTitle('Channel');
    this.context.set('activity');
    this.onScroll();

    this.paramsSubscription = this.route.params.subscribe(params => {
      this.changed = false;
      this.editing = false;

      if (params['username']) {
        this.changed = this.username !== params['username'];
        this.username = params['username'];
      }

      if (params['filter']) {
        if (params['filter'] === 'wire') {
          this.openWireModal = true;
        } else {
          this.filter = params['filter'];
        }
      }

      if (params['editToggle']) {
        this.editing = true;
      }

      if (this.changed) {
        this.load();
      }
    });
    this.route.queryParams.subscribe(pa => {
      if (pa.code) {
        let data = { username: this.username, code: pa.code };
        this.emailVerify(data);
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  emailVerify(data) {
    this.client.post('api/v3/verification/email/confirm', data).then(res => {
      this.emailVerificationModal = true;
      if (res['status'] === 'error') {
        this.emailVerificationFail = res['message'];
      } else {
        res['status'] === 'success';
        this.emailVerificationSuccess = true;
      }
    });
  }

  statusFollowing(payload: string){
    if(payload === 'follow' && this.isOwner()){
      this.user = { ...this.user, subscriptions_count: this.user.subscriptions_count+1 };
    } else if(payload === 'unFollow' && this.isOwner()) {
      this.user = { ...this.user, subscriptions_count: this.user.subscriptions_count-1 };
    }
  }

  load() {
    this.error = '';

    this.user = null;
    this.title.setTitle(this.username);

    this.client
      .get('api/v1/channel/' + this.username, {})
      .then((data: OpspotChannelResponse) => {
        if (data.status !== 'success') {
          this.error = data.message;
          return false;
        }
        this.user = data.channel;
        if (
          !(
            this.session.getLoggedInUser() &&
            this.session.getLoggedInUser().guid === this.user.guid
          )
        ) {
          this.editing = false;
        }
        this.title.setTitle(this.user.username);

        this.context.set('activity', {
          label: `@${this.user.username} posts`,
          nameLabel: `@${this.user.username}`,
          id: this.user.guid
        });
        if (this.session.getLoggedInUser()) {
          this.addRecent();
        }
      })
      .catch(e => {
        if (e.status === 0) {
          this.error = 'Sorry, there was a timeout error.';
        } else {
          this.error = 'Sorry, the user couldn\'t be found';
        }
      });
  }

  isOwner() {
    return this.session.getLoggedInUser().guid === this.user.guid;
  }

  toggleEditing() {
    if (this.editing) {
      this.update();
    }
    this.editing = !this.editing;
  }

  onScroll() {
    var listen = this.scroll.listen(view => {
      if (view.top > 250) this.isLocked = true;
      if (view.top < 250) this.isLocked = false;
    });
  }

  updateCarousels(value: any) {
    if (!value.length) return;
    for (var banner of value) {
      var options: any = { top: banner.top };
      if (banner.guid) options.guid = banner.guid;
      this.upload
        .post('api/v1/channel/carousel', [banner.file], options)
        .then((response: any) => {
          console.log('banners', response);
          response.index = banner.index;
          if (!this.user.carousels) {
            this.user.carousels = [];
          }
          this.user.carousels[banner.index] = response.carousel;
        });
    }
  }

  removeCarousel(value: any) {
    if (value.guid) this.client.delete('api/v1/channel/carousel/' + value.guid);
  }

  async update() {
    await this.client.post('api/v1/channel/info', this.user);

    this.editing = false;
  }

  unBlock() {
    this.user.blocked = false;
    this.client
      .delete('api/v1/block/' + this.user.guid, {})
      .then((response: any) => {
        this.user.blocked = false;
      })
      .catch(e => {
        this.user.blocked = true;
      });
  }

  addRecent() {
    if (!this.user) {
      return;
    }

    this.recent
      .store('recent', this.user, entry => entry.guid == this.user.guid)
      .splice('recent', 50);
  }

  isActive(filter: string) {
    if (this.filter === filter) {
      return true;
    }
    return false;
  }
}

export { ChannelSubscribers } from './subscribers/subscribers';
export { ChannelSubscriptions } from './subscriptions/subscriptions';

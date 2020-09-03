import { Component, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { ActivatedRoute, ChildActivationEnd, NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { OrganizationService } from '../organization-service';

import { RecentService } from '../../../services/ux/recent';
import { OpspotTitle } from '../../../services/ux/title';
import { Session } from '../../../services/session';
import { SocketsService } from '../../../services/sockets';

import { OrganizationProfileFeed } from './feed/feed';
import { ContextService } from '../../../services/context.service';
import { Client } from '../../../services/api';
import { HashtagsSelectorComponent } from '../../hashtags/selector/selector.component';
import { VideoChatService } from '../../videochat/videochat.service';
import { UpdateMarkersService } from '../../../common/services/update-markers.service';
import { filter } from "rxjs/operators";
import { Location } from '@angular/common';

@Component({
  selector: 'm-organization--profile',
  templateUrl: 'profile.html',
  styleUrls: [ './profile.scss' ]
})

export class OrganizationProfile {


  // dev: boolean = false;
  guid;
  filter = 'activity';
  organization;
  postMeta: any = {
    message: '',
    container_guid: 0
  };
  editing: boolean = false;
  editDone: boolean = false;
  opspot = window.Opspot;

  showRight: boolean = true;
  activity: Array<any> = [];
  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  error: string;
  paramsSubscription: Subscription;
  childParamsSubscription: Subscription;
  queryParamsSubscripton: Subscription;
  totalMembers;

  socketRoomName: string;
  newConversationMessages: boolean = false;

  inviteToggle: boolean = false;
  memberToggle: boolean = false;
  membersMobile;
  memberSrc = `${this.opspot.cdn_url}icon/`
  @ViewChild('feed') private feed: OrganizationProfileFeed;
  @ViewChild('hashtagsSelector') hashtagsSelector: HashtagsSelectorComponent;

  private reviewCountInterval: any;
  private socketSubscription: any;
  private videoChatActiveSubscription;
  private updateMarkersSubscription;
  // showGathering = false;


  constructor(
    public session: Session,
    public service: OrganizationService,
    public route: ActivatedRoute,
    private router: Router,
    public title: OpspotTitle,
    private sockets: SocketsService,
    private context: ContextService,
    private recent: RecentService,
    private client: Client,
    public videochat: VideoChatService,
    private cd: ChangeDetectorRef,
    private updateMarkers: UpdateMarkersService,
    private _location: Location

    // private _location: Location
  ) { }

  ngOnInit() {
    this.context.set('activity');
    this.listenForNewMessages();
    this.detectWidth();
    this.detectConversationsState();
    this.paramsSubscription = this.route.params.subscribe(params => {
      if (params['guid']) {
        this.loadMembers(params['guid'])

        let changed = params['guid'] !== this.guid;

        this.guid = params['guid'];
        this.postMeta.container_guid = this.guid;

        if (changed) {
          this.organization = void 0;

          this.load()
            .then(async () => {
              this.filterToDefaultView();
              if (this.route.snapshot.queryParamMap.has('join') && confirm('Are you sure you want to join this organization')) {
                await this.service.join(this.organization);
                this.organization['is:awaiting'] = true;
                this.detectChanges();
              }
            });
        }
      }

      if (params['filter']) {
        this.filter = params['filter'];

        if (this.filter == 'conversation') {
          this.newConversationMessages = false;
        }
      }
      this.filterToDefaultView();

    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const url = this.router.routerState.snapshot.url;
      this.setFilter(url);
    });

    this.setFilter(this.router.routerState.snapshot.url);

    this.reviewCountInterval = setInterval(() => {
      this.reviewCountLoad();
    }, 120 * 1000);

    this.videoChatActiveSubscription = this.videochat.activate$.subscribe(next => window.scrollTo(0, 0));
  }

  setFilter(url: string) {
    if (url.includes('/feed')) {
      if (url.includes('/image')) {
        this.filter = 'image';
      } else if (url.includes('/video')) {
        this.filter = 'video';
      } else {
        this.filter = 'activity';
      }
    }
  }

  ngOnDestroy() {
    if (this.paramsSubscription)
      this.paramsSubscription.unsubscribe();
    if (this.childParamsSubscription)
      this.childParamsSubscription.unsubscribe();
    if (this.queryParamsSubscripton)
      this.queryParamsSubscripton.unsubscribe();

    if (this.videoChatActiveSubscription)
      this.videoChatActiveSubscription.unsubscribe();

    if (this.updateMarkersSubscription)
      this.updateMarkersSubscription.unsubscribe();

    this.unlistenForNewMessages();
    this.leaveCommentsSocketRoom();

    if (this.reviewCountInterval) {
      clearInterval(this.reviewCountInterval);
    }
  }

  async load() {
    this.resetMarkers();
    this.error = "";
    this.organization = null;

    // Load organization
    try {
      this.organization = await this.service.load(this.guid);

    } catch (e) {
      this.error = e.message;
      return;
    }

    if (this.updateMarkersSubscription)
      this.updateMarkersSubscription.unsubscribe();

    this.updateMarkersSubscription = this.updateMarkers.getByEntityGuid(this.guid).subscribe(marker => {
      if (!marker)
        return;

      let hasMarker =
        (marker.read_timestamp < marker.updated_timestamp)
        && (marker.entity_guid == this.organization.guid)
        && (marker.marker != 'gathering-heartbeat');

      if (hasMarker)
        this.resetMarkers();
    });

    // Check for comment updates
    this.joinCommentsSocketRoom();
    this.title.setTitle(this.organization.name);

    this.context.set('activity', { label: this.organization.name, nameLabel: this.organization.name, id: this.organization.guid });

    if (this.session.getLoggedInUser()) {
      this.addRecent();
    }
  }

  async reviewCountLoad() {
    if (!this.guid || !this.session.isLoggedIn()) {
      return;
    }

    let count = 0;

    try {
      count = await this.service.getReviewCount(this.guid);
    } catch (e) {
    }

    this.organization['adminqueue:count'] = count;
  }

  addRecent() {
    if (!this.organization) {
      return;
    }
    this.recent
      .store('recent', this.organization, (entry) => entry.guid == this.organization.guid)
      .splice('recent', 50);
  }

  filterToDefaultView() {
    if (!this.organization || this.route.snapshot.params.filter && this.route.snapshot.params.filter !== 'gathering') {
      return;
    }

    if (this.filter === 'gathering') {
      this.videochat.activate(this.organization);
    }

    switch (this.organization.default_view) {
      case 1:
        this.filter = 'conversation';
        break;
    }
  }

  save() {
    this.organization.videoChatDisabled = parseInt(this.organization.videoChatDisabled);

    this.service.save(this.organization);

    this.editing = false;
    this.editDone = true;
    this.detectChanges();
  }

  toggleEdit() {
    this.editing = !this.editing;

    if (this.editing) {
      this.editDone = false;
    }
  }

  add_banner(file: any) {
    this.service.upload({
      guid: this.organization.guid,
      banner_position: file.top
    }, { banner: file.file }).then((res: any) => {
      window.location.reload();
    });

    this.organization.banner = true;
  }

  upload_avatar(file: any) {
    this.service.upload({
      guid: this.organization.guid
    }, { avatar: file }).then((res: any) => {
      window.location.reload();
    });
  }

  change_membership(membership: any) {
    if (!membership.error || membership.error === 'already_a_member') {
      this.load();
    } else {
      this.error = membership.error;
    }
  }

  //   canDeactivate() {
  //     if (!this.feed)
  //       return true;
  //     return this.feed.canDeactivate();
  //   }

  joinCommentsSocketRoom(keepAlive: boolean = false) {
    if (!keepAlive && this.socketRoomName) {
      this.leaveCommentsSocketRoom();
    }

    if (!this.organization || !this.organization.guid || !this.organization['is:member']) {
      return;
    }

    // TODO: Only join if a member

    this.socketRoomName = `comments:${this.organization.guid}`;
    this.sockets.join(this.socketRoomName);
  }

  leaveCommentsSocketRoom() {
    if (!this.socketRoomName) {
      return;
    }

    this.sockets.leave(this.socketRoomName);
  }

  listenForNewMessages() {
    this.socketSubscription = this.sockets.subscribe('comment', (data) => {
      const parent_guid = data[0];
      const owner_guid = data[1];
      const guid = data[2];
      if (!this.organization || parent_guid !== this.organization.guid) {
        return;
      }

      this.organization['comments:count']++;

      if (this.filter != 'conversation') {
        this.newConversationMessages = true;
      }
    });
  }

  unlistenForNewMessages() {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  async findTrendingHashtags(searchText: string) {
    const response: any = await this.client.get('api/v2/search/suggest/tags', { q: searchText });
    return response.tags
      .filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
      .slice(0, 5);
  }

  getChoiceLabel(text: string) {
    return `#${text}`;
  }

  onTagsChange(tags) {
  }

  onTagsAdded(tags) {
    if (!this.organization.tags)
      this.organization.tags = [];

    for (let tag of tags) {
      this.organization.tags.push(tag.value);
    }
  }

  onTagsRemoved(tags) {
    for (let tag of tags) {
      for (let i in this.organization.tags) {
        // console.log(this.organization.tags[i]);
        if (this.organization.tags[i] == tag.value) {
          this.organization.tags.splice(i, 1);
        }
      }
    }
  }

  onOptionsChange(options) {
    this.editing = options.editing;
    if (options.editing === false)
      this.save();
  }

  @HostListener('window:resize') detectWidth() {
    this.showRight = window.innerWidth > 900;
  }

  resetMarkers() {
    this.updateMarkers.markAsRead({
      entity_guid: this.guid,
      entity_type: 'organization',
      marker: 'activity'
    });

    this.updateMarkers.markAsRead({
      entity_guid: this.guid,
      entity_type: 'organization',
      marker: 'conversation'
    });
  }

  detectConversationsState() {
    const state = localStorage.getItem('organizations:conversations:minimized');
    this.showRight = !state || state === 'false'; // it's maximized by default
  }

  toggleConversations() {
    this.showRight = !this.showRight;
    localStorage.setItem('organizations:conversations:minimized', (!this.showRight).toString());
  }

  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  organizationCount(e) {
    this.totalMembers = e
  }

  openInvite() {
    if (window.innerWidth > 785) {
      this.inviteToggle = !this.inviteToggle;
    } else {
      this.router.navigate([`/organization/${this.guid}/invite`])
    }
  }

  showMembers() {
    if (window.innerWidth > 785) {
      this.memberToggle = !this.memberToggle;
    } else {
      this.router.navigate([`/organization/${this.guid}/members`])
    }
  }

  async loadMembers(guid) {
    let endpoint = `api/v3/organizations/membership/${guid}`
    let params = { limit: 4, offset: this.offset };
    let members = await this.client.get(endpoint, params)
    //  console.log(members)
    this.membersMobile = members['members']
  }


  groupCount(e) {
    this.totalMembers = e
    //  console.log("total: ", this.totalMembers);

  }

  goBack() {
    this._location.back()
  }


  // showGathering1(){
  //  this.showGathering = true;
  // }

  // backClicked() {
  //   this.showGathering = false;
  // }
}

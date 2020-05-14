import { Component, EventEmitter, Output } from '@angular/core';
import { Client, Upload } from '../../../services/api';
import { Session } from '../../../services/session';
import { OpspotUser } from '../../../interfaces/entities';
import { Tag } from '../../hashtags/types/tag';
import { ChannelOnboardingService } from "../../onboarding/channel/onboarding.service";
import { Storage } from '../../../services/storage';
import { OverlayModalService } from '../../../services/ux/overlay-modal';

@Component({
  moduleId: module.id,
  selector: 'm-channel--sidebar',
  inputs: ['_user: user', 'editing', 'displayBookmark'],
  outputs: ['_deleteBookmark: deleteBookmark'],
  templateUrl: 'sidebar.html',
  styleUrls: ['./sidebar.scss']
})

export class ChannelSidebar {

  opspot = window.Opspot;
  avatarSize: string = 'medium';
  filter: any = 'feed';
  isLocked: boolean = false;
  editing: boolean = false;
  displayBookmark: boolean = false;
  user: OpspotUser;
  searching;
  errorMessage: string = '';
  amountOfTags: number = 0;
  tooManyTags: boolean = false;
  onboardingProgress: number = -1;
  profEdit = true;
  sidebarMsg = true;
  pattern = /^((http|https|ftp):\/\/)/;
  @Output() changeEditing = new EventEmitter<boolean>();
  _deleteBookmark: EventEmitter<any> = new EventEmitter();

  //@todo make a re-usable city selection module to avoid duplication here
  cities: Array<any> = [];

  set _user(value: any) {
    if (!value)
      return;
    this.user = value;
    if (!this.pattern.test(this.user['website']) && this.user['website']) {
      this.user = { ...this.user, website: `https://${this.user['website']}` };
    }
    this.user['contributeType'] = 'contribute';
  }

  constructor(
    public client: Client,
    public upload: Upload,
    public session: Session,
    public onboardingService: ChannelOnboardingService,
    protected storage: Storage,
    private overlayModal: OverlayModalService
  ) {
    if (onboardingService && onboardingService.onClose)
      onboardingService.onClose.subscribe(progress => {
        this.onboardingProgress = -1;
        this.checkProgress();
      });
  }

  ngOnInit() {
    this.checkProgress();
  }

  checkProgress() {
    this.onboardingService.checkProgress().then(() => {
      this.onboardingProgress = this.onboardingService.completedPercentage;
    });
  }

  showOnboarding() {
    this.onboardingService.onOpen.emit();
  }

  shouldShowOnboardingProgress() {
    return this.session.isLoggedIn() &&
      this.session.getLoggedInUser().guid === this.user.guid &&
      !this.storage.get('onboarding_hide') &&
      this.onboardingProgress !== -1 &&
      this.onboardingProgress !== 100;
  }

  hideOnboardingForcefully() {
    this.storage.set('onboarding_hide', '1');
  }

  isOwner() {
    return this.session.getLoggedInUser().guid === this.user.guid;
  }

  toggleEditing() {

    if (this.tooManyTags) {
      return;
    }

    this.changeEditing.next(!this.editing);
  }

  upload_avatar(file) {
    var self = this;
    this.upload.post('api/v1/channel/avatar', [file], { filekey: 'file' })
      .then((response: any) => {
        self.user.icontime = Date.now();
        if (window.Opspot.user)
          window.Opspot.user.icontime = Date.now();
        // temp fix for profile image update (need to implement url route reload)
        window.location.reload();
      });
  }

  findCity(q: string) {
    if (this.searching) {
      clearTimeout(this.searching);
    }
    this.searching = setTimeout(() => {
      this.client.get('api/v1/geolocation/list', { q: q })
        .then((response: any) => {
          this.cities = response.results;
        });
    }, 100);
  }

  setCity(row: any) {
    this.cities = [];
    if (row.address.city) {
      this.user.city = row.address.city;
    }
    if (row.address.town)
      this.user.city = row.address.town;
    if (window.Opspot)
      window.Opspot.user.city = this.user.city;
    this.client.post('api/v1/channel/info', {
      coordinates: row.lat + ',' + row.lon,
      city: window.Opspot.user.city
    });
  }


  onTagsChange(tags: string[]) {
    this.amountOfTags = tags.length;
    if (this.amountOfTags > 5) {
      this.errorMessage = "You can only select up to 5 hashtags";
      this.tooManyTags = true;
    } else {
      this.tooManyTags = false;
      this.user.tags = tags;
      if (this.errorMessage === "You can only select up to 5 hashtags") {
        this.errorMessage = '';
      }
    }
  }

  onTagsAdded(tags: Tag[]) { }

  onTagsRemoved(tags: Tag[]) { }

  setSocialProfile(value: any) {
    this.user.social_profiles = value;
  }
  async togglePin(user: any) {
    // console.log(user);
    this.user.bookmark = !this.user.bookmark;
    const url: string = `api/v3/bookmark/${this.user.guid}/profile`;
    // console.log(url)
    try {
      if (this.user.bookmark) {
        await this.client.post(url);
      } else {
        await this.client.delete(url);
        this._deleteBookmark.next(this.user);
      }
    } catch (e) {
      this.user.bookmark = !this.user.bookmark;
    }
  }

  userPortfolioVisiblity() {
    return !!+this.user['portfolio_visiblity'];
  }

}

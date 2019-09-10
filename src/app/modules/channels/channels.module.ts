import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule as NgFormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../../common/common.module';
import { LegacyModule } from '../legacy/legacy.module';
import { MessengerModule } from '../messenger/messenger.module';
import { WireModule } from '../wire/wire.module';
import { OnboardingModule } from '../onboarding/onboarding.module';

import { ChannelModulesComponent } from './modules/modules';
import { ChannelSupporters } from './supporters/supporters';
import { ChannelSubscribers } from './subscribers/subscribers';
import { ChannelSubscriptions } from './subscriptions/subscriptions';
import { ChannelSidebar } from './sidebar/sidebar';
import { ChannelFeedComponent } from './feed/feed';
import { ChannelSocialProfiles } from './social-profiles/social-profiles';
import { ChannelComponent } from './channel.component';
import { ChannelsListComponent } from './list.component';
import { ChannelsTileComponent } from './tile/tile.component';
import { PosterModule } from '../newsfeed/poster/poster.module';
import { NewsfeedModule } from '../newsfeed/newsfeed.module';
import { ExplicitOverlayComponent } from './explicit-overlay/overlay.component';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { GeneralComponent } from './profile-edit/general/general.component';
import { AboutComponent } from './profile-edit/about/about.component';
import { ContactComponent } from './profile-edit/contact/contact.component';
import { WorkComponent } from './profile-edit/work/work.component';
import { EducationComponent } from './profile-edit/education/education.component';
import { AwardsComponent } from './profile-edit/awards/awards.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { TagInputModule } from 'ngx-chips';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { UserPrivacyComponent } from './profile-edit/user-privacy/user-privacy.component';

const routes: Routes = [
  { path: 'channels/:filter', component: ChannelsListComponent },
  { path: 'channels', redirectTo: '/channels/top', pathMatch: 'full' },
];

@NgModule({
  imports: [
    NgCommonModule,
    NgFormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forChild(routes),
    LegacyModule,
    MessengerModule,
    WireModule,
    OnboardingModule,
    PosterModule,
    NewsfeedModule,
    HashtagsModule,
    NgxUsefulSwiperModule,
    TagInputModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],


  declarations: [
    ChannelModulesComponent,
    ChannelComponent,
    ChannelSupporters,
    ChannelSubscribers,
    ChannelSubscriptions,
    ChannelSocialProfiles,
    ChannelsListComponent,
    ChannelsTileComponent,
    ChannelFeedComponent,
    ChannelSidebar,
    ExplicitOverlayComponent,
    ProfileEditComponent,
    GeneralComponent,
    AboutComponent,
    ContactComponent,
    WorkComponent,
    EducationComponent,
    AwardsComponent,
    UserPrivacyComponent,
  ],
  exports: [
    ChannelModulesComponent,
    ChannelSupporters,
    ChannelSubscribers,
    ChannelSubscriptions,
    ChannelSocialProfiles,
    ChannelFeedComponent,
    ChannelSidebar,
  ],
  entryComponents: [
    ChannelComponent,
    ChannelsListComponent,
  ],
})
export class ChannelsModule {
}

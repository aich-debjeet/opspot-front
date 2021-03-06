
import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../../common/common.module';
import { LegacyModule } from '../legacy/legacy.module';
import { OrganizationCreator } from './create/create';
import { OrganizationJoinButton } from './organization-join-button';
import { OrganizationProfileMembersInvite } from './profile/members/invite/invite';
import { OrganizationCardUserActionsButton } from './profile/card-user-action-button';
import { OrganizationProfileMembers } from './profile/members/members';
import { OrganizationProfileFeed } from './profile/feed/feed';
import { OrganizationTileComponent } from './tile/tile.component';
import { PosterModule } from '../newsfeed/poster/poster.module';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { OrganizationProfile } from './profile/profile';
import { CanDeactivateGroupService } from '../groups/profile/can-deactivate/can-deactivate-group.service';
import { OrganizationSettingButton } from './profile/organization-setting-button';
import { OrganizationMobileInvite } from './profile/members/organizationmobileinvite/organizationmobileinvite.component';
import { OrganizationMobileMembers } from './profile/members/organization-mobile-members/organization-mobile-members';
import { OrganizationListComponent } from './list.component';
import { OrganizationAllMembers } from './profile/list.subscribers';
import { OrganizationMemberPreviews } from './profile/member-previews/member-previews.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TagInputModule } from 'ngx-chips';
import { OrganizationJoinRequestComponent } from './organizations-join-request/organization-join-request.component';
import { OrganizationJoinRequestMobile } from './organizations-join-request-mobile/organization-join-request-mobile';
import { CreateTalent } from './talent/create/create-talent';
import { TalentPreviewComponent } from './talent/talent-preview/talent-preview.component';
import { TalentCardComponent } from './talent/talent-card/talent-card.component';
import { TalentListComponent } from './talent/talent-list/talent-list.component';
import { TalentactionbuttonComponent } from './talent/talent-action-button/talent-action-button.component';
import { EditTalentComponent } from './talent/edit-talent/edit-talent.component';
import { ViewTalentComponent } from './talent/view-talent/view-talent.component';
import { MessengerModule } from '../messenger/messenger.module';
import { ShareMenuModule } from '../../common/components/share-menu/share-menu.module';
import { PostMenuModule } from '../../common/components/post-menu/post-menu.module';
import { VideoModule } from '../media/components/video/video.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { WireModule } from '../wire/wire.module';
import { CommentsModule } from '../comments/comments.module';
import { ModalsModule } from '../modals/modals.module';
import { MobileTalentiListComponent } from './talent/mobile-talenti-list/mobile-talenti-list.component';



// import { CreateTalentMobileComponent } from './talent/create/create-talent-mobile/create-talent-mobile.component';


const routes: Routes = [
  {
    path: 'organization/profile/:guid', component: OrganizationProfile, canDeactivate: [CanDeactivateGroupService], children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: 'feed/:filter', component: OrganizationProfileFeed },
      { path: 'feed', component: OrganizationProfileFeed },
      { path: 'activity', redirectTo: 'feed' },
      { path: 'members', component: OrganizationProfileMembers },
      // { path: 'talent', component: CreateTalent },

    ],
  },
  { path: 'organization/create', component: OrganizationCreator },
  { path: 'organization/edit/:guid', component: OrganizationCreator, canDeactivate: [CanDeactivateGroupService] },
  { path: 'organization/:guid/members', component: OrganizationMobileMembers },
  { path: 'organization/:guid/invite', component: OrganizationMobileInvite },
  { path: 'organization/:filter', component: OrganizationListComponent },
  { path: 'organization', redirectTo: 'organization/all', pathMatch: 'full' },
  { path: 'organization/all-subscribers/:guid', component: OrganizationAllMembers },
  { path: 'organization/card/:guid', component: OrganizationJoinRequestMobile },
  { path: 'organization/:guid/talent', component: CreateTalent },
  { path: 'organization/:guid/talent/edit/:talentGuid', component: EditTalentComponent },
  { path: 'organization/:guid/talent/view/:talentGuid', component: ViewTalentComponent },
  { path: 'organization/:guid/talent/members', component: MobileTalentiListComponent },


]

@NgModule({
  imports: [
    NgCommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LegacyModule,
    PosterModule,
    HashtagsModule,
    InfiniteScrollModule,
    TagInputModule,
    ShareMenuModule,
    MessengerModule,
    PostMenuModule,
    VideoModule,
    SlickCarouselModule,
    WireModule,
    CommentsModule,
    ModalsModule
  ],
  declarations: [
    OrganizationProfile,
    OrganizationCreator,
    OrganizationJoinButton,
    OrganizationProfileMembersInvite,
    OrganizationCardUserActionsButton,
    OrganizationProfileMembers,
    OrganizationProfileFeed,
    OrganizationSettingButton,
    OrganizationMobileInvite,
    OrganizationTileComponent,
    OrganizationMobileMembers,
    OrganizationListComponent,
    OrganizationAllMembers,
    OrganizationMemberPreviews,
    OrganizationJoinRequestComponent,
    OrganizationJoinRequestMobile,
    CreateTalent,
    TalentPreviewComponent,
    TalentCardComponent,
    TalentListComponent,
    TalentactionbuttonComponent,
    EditTalentComponent,
    ViewTalentComponent,
    MobileTalentiListComponent,
  ],
  exports: [
    OrganizationProfile,
    OrganizationCreator,
    OrganizationJoinButton,
    OrganizationProfileMembersInvite,
    OrganizationCardUserActionsButton,
    OrganizationProfileMembers,
    OrganizationProfileFeed,
    OrganizationSettingButton,
    OrganizationTileComponent,
    OrganizationListComponent
  ],
  entryComponents: [
    OrganizationJoinRequestComponent,
    CreateTalent,
    TalentListComponent
  ],
  providers: [
    CanDeactivateGroupService
  ]
})
export class OrganizationModule {
}


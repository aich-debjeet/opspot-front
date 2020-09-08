
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


const routes: Routes = [
  {
    path: 'organization/profile/:guid', component: OrganizationProfile, canDeactivate: [CanDeactivateGroupService], children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: 'feed/:filter', component: OrganizationProfileFeed },
      { path: 'feed', component: OrganizationProfileFeed },
      { path: 'activity', redirectTo: 'feed' },
      { path: 'members', component: OrganizationProfileMembers },
    ],
  },
  { path: 'organization/create', component: OrganizationCreator },
  { path: 'organization/edit/:guid', component: OrganizationCreator, canDeactivate: [CanDeactivateGroupService] },
  { path: 'organization/:guid/members', component: OrganizationMobileMembers },
  { path: 'organization/:guid/invite', component: OrganizationMobileInvite },
  { path: 'organization/:filter', component: OrganizationListComponent },
  { path: 'organization', redirectTo: 'organization/all', pathMatch: 'full' },
  { path: 'organization/all-subscribers/:guid', component: OrganizationAllMembers },
  { path: 'organization/card/:guid', component: OrganizationJoinRequestMobile }
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
    TagInputModule
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
    OrganizationJoinRequestMobile
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
    OrganizationJoinRequestComponent
  ],
  providers: [
    CanDeactivateGroupService
  ]
})
export class OrganizationModule {
}


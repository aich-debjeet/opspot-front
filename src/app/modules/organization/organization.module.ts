

import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../../common/common.module';
import { LegacyModule } from '../legacy/legacy.module';
import { ChannelsModule } from '../channels/channels.module';
import { ModalsModule } from '../modals/modals.module';
import { VideoChatModule } from '../videochat/videochat.module';

import { OrganizationCreator } from './create/create';
import { OrganizationJoinButton } from './organization-join-button';
import { OrganizationProfileMembersInvite } from './profile/members/invite/invite';
// import { GroupsCard } from './card/card';
import { OrganizationCardUserActionsButton } from './profile/card-user-action-button';
import { GroupsSettingsButton } from '../groups/profile/groups-settings-button';
import { OrganizationProfileMembers } from './profile/members/members';
// import { GroupsProfileRequests } from './profile/requests/requests';
import { OrganizationProfileFeed } from './profile/feed/feed';
// import { GroupsProfileConversation } from './profile/conversation/conversation.component';
// import { GroupsProfileFilterSelector } from './profile/filter-selector/filter-selector.component';
// import { GroupsMembersModuleComponent } from './members/members';
import { OrganizationTileComponent } from './tile/tile.component';
// import { GroupsSidebarMarkersComponent } from './sidebar-markers/sidebar-markers.component';
// import { CommentsModule } from '../comments/comments.module';
import { PosterModule } from '../newsfeed/poster/poster.module';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { OrganizationProfile } from './profile/profile';
import { CanDeactivateGroupService } from '../groups/profile/can-deactivate/can-deactivate-group.service';
import { OrganizationSettingButton } from './profile/organization-setting-button';
import { OrganizationMobileInvite } from './profile/members/organizationmobileinvite/organizationmobileinvite.component';
// import { GroupsModule } from '../groups/groups.module';
// import { GroupMemberPreviews } from './profile/member-previews/member-previews.component';
// import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';
// import { CanDeactivateGroupService } from "./profile/can-deactivate/can-deactivate-group.service";
import { OrganizationMobileMembers } from './profile/members/organization-mobile-members/organization-mobile-members';
// import { MobileInviteComponent } from './profile/members/mobile-invite/mobile-invite.component';
// import { VideoChatComponent } from '../videochat/videochat.component';

const routes: Routes = [
  {
    path: 'organization/profile/:guid', component: OrganizationProfile, canDeactivate: [CanDeactivateGroupService], children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: 'feed/:filter', component: OrganizationProfileFeed },
      { path: 'feed', component: OrganizationProfileFeed },
      { path: 'activity', redirectTo: 'feed' },
      { path: 'members', component: OrganizationProfileMembers },
      //   { path: 'requests',  component: GroupsProfileRequests },
      // { path: 'gathering',  component: VideoChatComponent}

    ],
  },
  { path: 'organization/create', component: OrganizationCreator },
  { path: 'organization/edit/:guid', component: OrganizationCreator, canDeactivate: [CanDeactivateGroupService] },
  //   { path: 'groups/:filter', component: GroupsListComponent },
  //   { path: 'groups', redirectTo: '/groups/top', pathMatch: 'full' },
    { path: 'organization/:guid/members' ,component:OrganizationMobileMembers},
    { path: 'organization/:guid/invite' ,component:OrganizationMobileInvite},
  //   { path: 'groups/gathering',  component: VideoChatComponent}
];

@NgModule({
  imports: [
    NgCommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // CommentsModule,
    LegacyModule,
    // ChannelsModule,
    // ModalsModule,
    PosterModule,
    HashtagsModule,
    // GroupsModule
    // TextInputAutocompleteModule,
    // VideoChatModule,
  ],
  declarations: [
    // GroupsListComponent,
    OrganizationProfile,
    OrganizationCreator,
    OrganizationJoinButton,
    OrganizationProfileMembersInvite,
    // GroupsCard,
    OrganizationCardUserActionsButton,
    OrganizationProfileMembers,
    OrganizationProfileFeed,    // GroupsProfileRequests,
    OrganizationSettingButton, OrganizationMobileInvite  ,  // GroupsProfileConversation,
    // GroupsProfileFilterSelector,
    // GroupsMembersModuleComponent,
    OrganizationTileComponent,
    // GroupMemberPreviews,
    // GroupsSidebarMarkersComponent,
    OrganizationMobileMembers,
    // MobileInviteComponent,
  ],
  exports: [
    // GroupsListComponent,
    OrganizationProfile,
    OrganizationCreator,
    OrganizationJoinButton,
    OrganizationProfileMembersInvite,
    // GroupsCard,
    OrganizationCardUserActionsButton,
    OrganizationProfileMembers,
    OrganizationProfileFeed,    // GroupsProfileRequests,
    OrganizationSettingButton,    // GroupsProfileConversation,
    OrganizationTileComponent
    // GroupsProfileFilterSelector,
    // GroupsMembersModuleComponent,
    // GroupsSidebarMarkersComponent,
    
  ],
  entryComponents: [
    // GroupsCard,
    // GroupsSidebarMarkersComponent,
  ],
  providers: [
    CanDeactivateGroupService
  ]
})
export class OrganizationModule {
}


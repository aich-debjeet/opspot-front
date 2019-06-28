"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_module_1 = require("../../common/common.module");
var legacy_module_1 = require("../legacy/legacy.module");
var channels_module_1 = require("../channels/channels.module");
var modals_module_1 = require("../modals/modals.module");
var videochat_module_1 = require("../videochat/videochat.module");
var list_component_1 = require("./list.component");
var groups_join_button_1 = require("./groups-join-button");
var invite_1 = require("./profile/members/invite/invite");
var card_1 = require("./card/card");
var card_user_actions_button_1 = require("./profile/card-user-actions-button");
var groups_settings_button_1 = require("./profile/groups-settings-button");
var members_1 = require("./profile/members/members");
var requests_1 = require("./profile/requests/requests");
var feed_1 = require("./profile/feed/feed");
var conversation_component_1 = require("./profile/conversation/conversation.component");
var filter_selector_component_1 = require("./profile/filter-selector/filter-selector.component");
var members_2 = require("./members/members");
var tile_component_1 = require("./tile/tile.component");
var sidebar_markers_component_1 = require("./sidebar-markers/sidebar-markers.component");
var comments_module_1 = require("../comments/comments.module");
var poster_module_1 = require("../newsfeed/poster/poster.module");
var hashtags_module_1 = require("../hashtags/hashtags.module");
var member_previews_component_1 = require("./profile/member-previews/member-previews.component");
var angular_text_input_autocomplete_1 = require("angular-text-input-autocomplete");
var can_deactivate_group_service_1 = require("./profile/can-deactivate/can-deactivate-group.service");
var routes = [
    { path: 'groups/profile/:guid', component: list_component_1.GroupsProfile, canDeactivate: [can_deactivate_group_service_1.CanDeactivateGroupService], children: [
            { path: '', redirectTo: 'feed', pathMatch: 'full' },
            { path: 'feed/:filter', component: feed_1.GroupsProfileFeed },
            { path: 'feed', component: feed_1.GroupsProfileFeed },
            { path: 'activity', redirectTo: 'feed' },
            { path: 'members', component: members_1.GroupsProfileMembers },
            { path: 'requests', component: requests_1.GroupsProfileRequests },
        ],
    },
    { path: 'groups/create', component: list_component_1.GroupsCreator },
    { path: 'groups/:filter', component: list_component_1.GroupsListComponent },
    { path: 'groups', redirectTo: '/groups/top', pathMatch: 'full' },
];
var GroupsModule = /** @class */ (function () {
    function GroupsModule() {
    }
    GroupsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                comments_module_1.CommentsModule,
                legacy_module_1.LegacyModule,
                channels_module_1.ChannelsModule,
                modals_module_1.ModalsModule,
                poster_module_1.PosterModule,
                hashtags_module_1.HashtagsModule,
                angular_text_input_autocomplete_1.TextInputAutocompleteModule,
                videochat_module_1.VideoChatModule,
            ],
            declarations: [
                list_component_1.GroupsListComponent,
                list_component_1.GroupsProfile,
                list_component_1.GroupsCreator,
                groups_join_button_1.GroupsJoinButton,
                invite_1.GroupsProfileMembersInvite,
                card_1.GroupsCard,
                card_user_actions_button_1.GroupsCardUserActionsButton,
                members_1.GroupsProfileMembers,
                feed_1.GroupsProfileFeed,
                requests_1.GroupsProfileRequests,
                groups_settings_button_1.GroupsSettingsButton,
                conversation_component_1.GroupsProfileConversation,
                filter_selector_component_1.GroupsProfileFilterSelector,
                members_2.GroupsMembersModuleComponent,
                tile_component_1.GroupsTileComponent,
                member_previews_component_1.GroupMemberPreviews,
                sidebar_markers_component_1.GroupsSidebarMarkersComponent,
            ],
            exports: [
                list_component_1.GroupsListComponent,
                list_component_1.GroupsProfile,
                list_component_1.GroupsCreator,
                groups_join_button_1.GroupsJoinButton,
                invite_1.GroupsProfileMembersInvite,
                card_1.GroupsCard,
                card_user_actions_button_1.GroupsCardUserActionsButton,
                members_1.GroupsProfileMembers,
                feed_1.GroupsProfileFeed,
                requests_1.GroupsProfileRequests,
                groups_settings_button_1.GroupsSettingsButton,
                conversation_component_1.GroupsProfileConversation,
                filter_selector_component_1.GroupsProfileFilterSelector,
                members_2.GroupsMembersModuleComponent,
                sidebar_markers_component_1.GroupsSidebarMarkersComponent,
            ],
            entryComponents: [
                card_1.GroupsCard,
                sidebar_markers_component_1.GroupsSidebarMarkersComponent,
            ],
            providers: [
                can_deactivate_group_service_1.CanDeactivateGroupService
            ]
        })
    ], GroupsModule);
    return GroupsModule;
}());
exports.GroupsModule = GroupsModule;
//# sourceMappingURL=groups.module.js.map
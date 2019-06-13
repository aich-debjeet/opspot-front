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
var messenger_module_1 = require("../messenger/messenger.module");
var wire_module_1 = require("../wire/wire.module");
var onboarding_module_1 = require("../onboarding/onboarding.module");
var modules_1 = require("./modules/modules");
var supporters_1 = require("./supporters/supporters");
var subscribers_1 = require("./subscribers/subscribers");
var subscriptions_1 = require("./subscriptions/subscriptions");
var sidebar_1 = require("./sidebar/sidebar");
var feed_1 = require("./feed/feed");
var social_profiles_1 = require("./social-profiles/social-profiles");
var channel_component_1 = require("./channel.component");
var list_component_1 = require("./list.component");
var tile_component_1 = require("./tile/tile.component");
var poster_module_1 = require("../newsfeed/poster/poster.module");
var newsfeed_module_1 = require("../newsfeed/newsfeed.module");
var overlay_component_1 = require("./explicit-overlay/overlay.component");
var hashtags_module_1 = require("../hashtags/hashtags.module");
var routes = [
    { path: 'channels/:filter', component: list_component_1.ChannelsListComponent },
    { path: 'channels', redirectTo: '/channels/top', pathMatch: 'full' },
];
var ChannelsModule = /** @class */ (function () {
    function ChannelsModule() {
    }
    ChannelsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                legacy_module_1.LegacyModule,
                messenger_module_1.MessengerModule,
                wire_module_1.WireModule,
                onboarding_module_1.OnboardingModule,
                poster_module_1.PosterModule,
                newsfeed_module_1.NewsfeedModule,
                hashtags_module_1.HashtagsModule,
            ],
            declarations: [
                modules_1.ChannelModulesComponent,
                channel_component_1.ChannelComponent,
                supporters_1.ChannelSupporters,
                subscribers_1.ChannelSubscribers,
                subscriptions_1.ChannelSubscriptions,
                social_profiles_1.ChannelSocialProfiles,
                list_component_1.ChannelsListComponent,
                tile_component_1.ChannelsTileComponent,
                feed_1.ChannelFeedComponent,
                sidebar_1.ChannelSidebar,
                overlay_component_1.ExplicitOverlayComponent,
            ],
            exports: [
                modules_1.ChannelModulesComponent,
                supporters_1.ChannelSupporters,
                subscribers_1.ChannelSubscribers,
                subscriptions_1.ChannelSubscriptions,
                social_profiles_1.ChannelSocialProfiles,
                feed_1.ChannelFeedComponent,
                sidebar_1.ChannelSidebar,
            ],
            entryComponents: [
                channel_component_1.ChannelComponent,
                list_component_1.ChannelsListComponent,
            ],
        })
    ], ChannelsModule);
    return ChannelsModule;
}());
exports.ChannelsModule = ChannelsModule;
//# sourceMappingURL=channels.module.js.map
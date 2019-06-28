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
var onboarding_module_1 = require("../wallet/tokens/onboarding/onboarding.module");
var messenger_module_1 = require("../messenger/messenger.module");
var card_component_1 = require("./card/card.component");
var feed_component_1 = require("./feed.component");
var onboarding_service_1 = require("./onboarding.service");
var modal_component_1 = require("./modal.component");
var onboarding_service_2 = require("./channel/onboarding.service");
var welcome_component_1 = require("./channel/welcome/welcome.component");
var topics_component_1 = require("./channel/topics/topics.component");
var onboarding_component_1 = require("./channel/onboarding.component");
var subscriptions_component_1 = require("./channel/subscriptions/subscriptions.component");
var tile_component_1 = require("../channels/tile/tile.component");
var groups_component_1 = require("./channel/groups/groups.component");
var tile_component_2 = require("../groups/tile/tile.component");
var channel_component_1 = require("./channel/channel/channel.component");
var rewards_component_1 = require("./channel/rewards/rewards.component");
var client_1 = require("../../services/api/client");
var suggestions_module_1 = require("../suggestions/suggestions.module");
var session_1 = require("../../services/session");
var OnboardingModule = /** @class */ (function () {
    function OnboardingModule() {
    }
    OnboardingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forChild([]),
                common_module_1.CommonModule,
                onboarding_module_1.TokenOnboardingModule,
                messenger_module_1.MessengerModule,
                suggestions_module_1.SuggestionsModule,
            ],
            declarations: [
                card_component_1.OnboardingCardComponent,
                feed_component_1.OnboardingFeedComponent,
                modal_component_1.OnboardingModalComponent,
                onboarding_component_1.ChannelOnboardingComponent,
                welcome_component_1.WelcomeOnboardingComponent,
                topics_component_1.TopicsOnboardingComponent,
                subscriptions_component_1.SubscriptionsOnboardingComponent,
                groups_component_1.GroupsOnboardingComponent,
                channel_component_1.ChannelSetupOnboardingComponent,
                rewards_component_1.TokenRewardsOnboardingComponent,
            ],
            providers: [
                onboarding_service_1.OnboardingService,
                {
                    provide: onboarding_service_2.ChannelOnboardingService,
                    deps: [client_1.Client, session_1.Session],
                    useFactory: onboarding_service_2.ChannelOnboardingService._
                },
            ],
            exports: [
                card_component_1.OnboardingCardComponent,
                feed_component_1.OnboardingFeedComponent,
                onboarding_component_1.ChannelOnboardingComponent,
            ],
            entryComponents: [
                modal_component_1.OnboardingModalComponent,
                welcome_component_1.WelcomeOnboardingComponent,
                topics_component_1.TopicsOnboardingComponent,
                subscriptions_component_1.SubscriptionsOnboardingComponent,
                tile_component_1.ChannelsTileComponent,
                tile_component_2.GroupsTileComponent,
                groups_component_1.GroupsOnboardingComponent,
                channel_component_1.ChannelSetupOnboardingComponent,
                rewards_component_1.TokenRewardsOnboardingComponent,
            ],
        })
    ], OnboardingModule);
    return OnboardingModule;
}());
exports.OnboardingModule = OnboardingModule;
//# sourceMappingURL=onboarding.module.js.map
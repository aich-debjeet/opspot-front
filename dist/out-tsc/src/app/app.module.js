"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var captcha_module_1 = require("./modules/captcha/captcha.module");
var app_component_1 = require("./app.component");
var app_1 = require("./router/app");
var declarations_1 = require("./declarations");
var plugin_declarations_1 = require("./plugin-declarations");
var providers_1 = require("./services/providers");
var plugin_providers_1 = require("./plugin-providers");
var common_module_1 = require("./common/common.module");
var monetization_module_1 = require("./modules/monetization/monetization.module");
var wallet_module_1 = require("./modules/wallet/wallet.module");
var plus_module_1 = require("./modules/plus/plus.module");
var i18n_module_1 = require("./modules/i18n/i18n.module");
var ads_module_1 = require("./modules/ads/ads.module");
var boost_module_1 = require("./modules/boost/boost.module");
var wire_module_1 = require("./modules/wire/wire.module");
var report_module_1 = require("./modules/report/report.module");
var channels_module_1 = require("./modules/channels/channels.module");
var forms_module_1 = require("./modules/forms/forms.module");
var legacy_module_1 = require("./modules/legacy/legacy.module");
var modals_module_1 = require("./modules/modals/modals.module");
var payments_module_1 = require("./modules/payments/payments.module");
var third_party_networks_module_1 = require("./modules/third-party-networks/third-party-networks.module");
var translate_module_1 = require("./modules/translate/translate.module");
var settings_module_1 = require("./modules/settings/settings.module");
var onboarding_module_1 = require("./modules/onboarding/onboarding.module");
var notification_module_1 = require("./modules/notifications/notification.module");
var groups_module_1 = require("./modules/groups/groups.module");
var post_menu_module_1 = require("./common/components/post-menu/post-menu.module");
var ban_module_1 = require("./modules/ban/ban.module");
var blog_module_1 = require("./modules/blogs/blog.module");
var search_module_1 = require("./modules/search/search.module");
var messenger_module_1 = require("./modules/messenger/messenger.module");
var homepage_module_1 = require("./modules/homepage/homepage.module");
var newsfeed_module_1 = require("./modules/newsfeed/newsfeed.module");
var media_module_1 = require("./modules/media/media.module");
var auth_module_1 = require("./modules/auth/auth.module");
var blockchain_module_1 = require("./modules/blockchain/blockchain.module");
var marketing_module_1 = require("./modules/blockchain/marketing/marketing.module");
var branding_module_1 = require("./modules/branding/branding.module");
var comments_module_1 = require("./modules/comments/comments.module");
var nodes_module_1 = require("./modules/nodes/nodes.module");
var jobs_module_1 = require("./modules/jobs/jobs.module");
var helpdesk_module_1 = require("./modules/helpdesk/helpdesk.module");
var mobile_module_1 = require("./modules/mobile/mobile.module");
var canary_module_1 = require("./modules/canary/canary.module");
var http_1 = require("@angular/common/http");
var OpspotModule = /** @class */ (function () {
    function OpspotModule() {
    }
    OpspotModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.Opspot
            ],
            declarations: [
                app_component_1.Opspot,
                app_1.OPSPOT_APP_ROUTING_DECLARATIONS,
                declarations_1.OPSPOT_DECLARATIONS,
                plugin_declarations_1.OPSPOT_PLUGIN_DECLARATIONS,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot(app_1.OpspotAppRoutes),
                captcha_module_1.CaptchaModule,
                common_module_1.CommonModule,
                wallet_module_1.WalletModule,
                //CheckoutModule,
                monetization_module_1.MonetizationModule,
                plus_module_1.PlusModule,
                ads_module_1.AdsModule,
                boost_module_1.BoostModule,
                wire_module_1.WireModule,
                report_module_1.ReportModule,
                i18n_module_1.I18nModule,
                ban_module_1.BanModule,
                third_party_networks_module_1.ThirdPartyNetworksModule,
                legacy_module_1.LegacyModule,
                translate_module_1.TranslateModule,
                settings_module_1.SettingsModule,
                modals_module_1.ModalsModule,
                payments_module_1.PaymentsModule,
                forms_module_1.OpspotFormsModule,
                onboarding_module_1.OnboardingModule,
                notification_module_1.NotificationModule,
                groups_module_1.GroupsModule,
                blog_module_1.BlogModule,
                post_menu_module_1.PostMenuModule,
                search_module_1.SearchModule,
                messenger_module_1.MessengerModule,
                homepage_module_1.HomepageModule,
                newsfeed_module_1.NewsfeedModule,
                media_module_1.MediaModule,
                auth_module_1.AuthModule,
                blockchain_module_1.BlockchainModule,
                marketing_module_1.BlockchainMarketingModule,
                nodes_module_1.NodesMarketingModule,
                branding_module_1.BrandingModule,
                comments_module_1.CommentsModule,
                jobs_module_1.JobsMarketingModule,
                helpdesk_module_1.HelpdeskModule,
                mobile_module_1.MobileModule,
                canary_module_1.CanaryModule,
                //last due to :username route
                channels_module_1.ChannelsModule,
            ],
            providers: [
                app_1.OpspotAppRoutingProviders,
                providers_1.OPSPOT_PROVIDERS,
                plugin_providers_1.OPSPOT_PLUGIN_PROVIDERS,
            ],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA
            ]
        })
    ], OpspotModule);
    return OpspotModule;
}());
exports.OpspotModule = OpspotModule;
//# sourceMappingURL=app.module.js.map
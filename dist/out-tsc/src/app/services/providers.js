"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var scroll_1 = require("./ux/scroll");
var sockets_1 = require("./sockets");
var api_1 = require("./api");
var storage_1 = require("./storage");
var service_1 = require("../modules/modals/signup/service");
var cache_1 = require("./cache");
var hovercard_1 = require("./hovercard");
var translation_1 = require("./translation");
var rich_embed_1 = require("./rich-embed");
var session_1 = require("./session");
var third_party_networks_1 = require("./third-party-networks");
var analytics_1 = require("./analytics");
var navigation_1 = require("./navigation");
var wallet_1 = require("./wallet");
var attachment_1 = require("./attachment");
var sidebar_1 = require("./ui/sidebar");
var embed_1 = require("./embed");
var title_1 = require("./ux/title");
var can_deactivate_guard_1 = require("./can-deactivate-guard");
var overlay_modal_1 = require("./ux/overlay-modal");
var login_referrer_service_1 = require("./login-referrer.service");
var scroll_to_top_service_1 = require("./scroll-to-top.service");
var groups_service_1 = require("../modules/groups/groups-service");
var google_charts_loader_1 = require("./third-party/google-charts-loader");
var recent_1 = require("./ux/recent");
var context_service_1 = require("./context.service");
var features_service_1 = require("./features.service");
var blockchain_service_1 = require("../modules/blockchain/blockchain.service");
var webtorrent_service_1 = require("../modules/webtorrent/webtorrent.service");
var timediff_service_1 = require("./timediff.service");
var update_markers_service_1 = require("../common/services/update-markers.service");
var http_1 = require("@angular/common/http");
exports.OPSPOT_PROVIDERS = [
    {
        provide: scroll_1.ScrollService,
        useFactory: scroll_1.ScrollService._,
        deps: []
    },
    {
        provide: sockets_1.SocketsService,
        useFactory: sockets_1.SocketsService._,
        deps: [session_1.Session, core_1.NgZone]
    },
    {
        provide: api_1.Client,
        useFactory: api_1.Client._,
        deps: [http_1.HttpClient]
    },
    {
        provide: api_1.Upload,
        useFactory: api_1.Upload._,
        deps: [http_1.HttpClient]
    },
    {
        provide: storage_1.Storage,
        useFactory: storage_1.Storage._,
        deps: []
    },
    {
        provide: service_1.SignupModalService,
        useFactory: service_1.SignupModalService._,
        deps: [router_1.Router, scroll_1.ScrollService]
    },
    {
        provide: cache_1.CacheService,
        useFactory: cache_1.CacheService._,
        deps: []
    },
    {
        provide: hovercard_1.HovercardService,
        useFactory: hovercard_1.HovercardService._,
        deps: [api_1.Client, cache_1.CacheService]
    },
    {
        provide: translation_1.TranslationService,
        useFactory: translation_1.TranslationService._,
        deps: [api_1.Client, storage_1.Storage]
    },
    {
        provide: rich_embed_1.RichEmbedService,
        useFactory: rich_embed_1.RichEmbedService._,
        deps: [api_1.Client]
    },
    {
        provide: session_1.Session,
        useFactory: session_1.Session._
    },
    {
        provide: third_party_networks_1.ThirdPartyNetworksService,
        useFactory: third_party_networks_1.ThirdPartyNetworksService._,
        deps: [api_1.Client, core_1.NgZone]
    },
    {
        provide: analytics_1.AnalyticsService,
        useFactory: analytics_1.AnalyticsService._,
        deps: [router_1.Router, api_1.Client]
    },
    {
        provide: navigation_1.Navigation,
        useFactory: navigation_1.Navigation._,
        deps: [common_1.Location]
    },
    {
        provide: wallet_1.WalletService,
        useFactory: wallet_1.WalletService._,
        deps: [session_1.Session, api_1.Client, sockets_1.SocketsService]
    },
    {
        provide: attachment_1.AttachmentService,
        useFactory: attachment_1.AttachmentService._,
        deps: [session_1.Session, api_1.Client, api_1.Upload]
    },
    {
        provide: sidebar_1.Sidebar,
        useFactory: sidebar_1.Sidebar._
    },
    {
        provide: embed_1.EmbedService,
        useFactory: embed_1.EmbedService._
    },
    {
        provide: title_1.OpspotTitle,
        useFactory: title_1.OpspotTitle._,
        deps: [platform_browser_1.Title]
    },
    {
        provide: google_charts_loader_1.GoogleChartsLoader,
        useFactory: google_charts_loader_1.GoogleChartsLoader._,
        deps: [core_1.NgZone]
    },
    {
        provide: can_deactivate_guard_1.CanDeactivateGuardService,
        useFactory: can_deactivate_guard_1.CanDeactivateGuardService._
    },
    {
        provide: overlay_modal_1.OverlayModalService,
        useFactory: overlay_modal_1.OverlayModalService._
    },
    {
        provide: login_referrer_service_1.LoginReferrerService,
        useFactory: login_referrer_service_1.LoginReferrerService._,
        deps: [session_1.Session, router_1.Router]
    },
    {
        provide: scroll_to_top_service_1.ScrollToTopService,
        useFactory: scroll_to_top_service_1.ScrollToTopService._,
        deps: [router_1.Router]
    },
    {
        provide: groups_service_1.GroupsService,
        useFactory: groups_service_1.GroupsService._,
        deps: [api_1.Client, api_1.Upload, update_markers_service_1.UpdateMarkersService]
    },
    {
        provide: recent_1.RecentService,
        useFactory: recent_1.RecentService._,
        deps: [storage_1.Storage]
    },
    {
        provide: context_service_1.ContextService,
        useFactory: context_service_1.ContextService._,
        deps: [router_1.Router, storage_1.Storage, api_1.Client]
    },
    {
        provide: features_service_1.FeaturesService,
        useFactory: features_service_1.FeaturesService._,
        deps: [session_1.Session, router_1.Router]
    },
    {
        provide: blockchain_service_1.BlockchainService,
        useFactory: blockchain_service_1.BlockchainService._,
        deps: [api_1.Client]
    },
    {
        provide: webtorrent_service_1.WebtorrentService,
        useFactory: webtorrent_service_1.WebtorrentService._,
        deps: webtorrent_service_1.WebtorrentService._deps,
    },
    {
        provide: timediff_service_1.TimeDiffService,
        useFactory: timediff_service_1.TimeDiffService._
    }
];
//# sourceMappingURL=providers.js.map
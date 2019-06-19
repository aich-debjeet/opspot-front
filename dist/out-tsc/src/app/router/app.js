"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var capture_1 = require("../controllers/capture/capture");
var discovery_1 = require("../controllers/discovery/discovery");
var admin_1 = require("../controllers/admin/admin");
var pages_1 = require("../controllers/pages/pages");
var channel_component_1 = require("../modules/channels/channel.component");
/**
 * TODO: Load these automagically from gulp
 */
var can_deactivate_guard_1 = require("../services/can-deactivate-guard");
var rewards_1 = require("../controllers/rewards/rewards");
exports.OpspotAppRoutes = [
    { path: 'capture', redirectTo: 'media/images/suggested' },
    // redirectTo: 'media/:type/:filter
    { path: 'discovery/suggested/channels', redirectTo: 'channels/suggested' },
    { path: 'discovery/trending/channels', redirectTo: 'channels/suggested' },
    { path: 'discovery/all/channels', redirectTo: 'channels/suggested' },
    { path: 'discovery/suggested/:type', redirectTo: 'media/:type/suggested' },
    { path: 'discovery/trending/:type', redirectTo: 'media/:type/suggested' },
    { path: 'discovery/all/:type', redirectTo: 'media/:type/suggested' },
    { path: 'discovery/owner/:type', redirectTo: 'media/:type/my' },
    { path: 'discovery/suggested', redirectTo: 'channels/suggested' },
    { path: 'discovery/trending', redirectTo: 'media/images/suggested' },
    { path: 'discovery/featured', redirectTo: 'channels/suggested' },
    /* /Legacy routes */
    { path: 'admin/:filter/:type', component: admin_1.Admin },
    { path: 'admin/:filter', component: admin_1.Admin },
    { path: 'p/:page', component: pages_1.Pages },
    { path: 'claim-rewards/:uuid', component: rewards_1.RewardsComponent },
    { path: ':username/:filter', component: channel_component_1.ChannelComponent },
    { path: ':username', component: channel_component_1.ChannelComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuardService] },
];
exports.OpspotAppRoutingProviders = [{ provide: common_1.APP_BASE_HREF, useValue: '/' }];
exports.OPSPOT_APP_ROUTING_DECLARATIONS = [
    capture_1.Capture,
    discovery_1.Discovery,
    admin_1.Admin,
    pages_1.Pages,
    rewards_1.RewardsComponent,
];
//# sourceMappingURL=app.js.map
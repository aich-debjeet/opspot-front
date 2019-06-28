"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var view_component_1 = require("../modules/media/view/view.component");
exports.OpspotEmbedRoutes = [
    { path: 'api/v1/embed/:guid', component: view_component_1.MediaViewComponent }
];
exports.OpspotEmbedRoutingProviders = [{ provide: common_1.APP_BASE_HREF, useValue: '/' }];
exports.OPSPOT_EMBED_ROUTING_DECLARATIONS = [
    view_component_1.MediaViewComponent,
];
//# sourceMappingURL=embed.js.map
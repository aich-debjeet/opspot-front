"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var common_module_1 = require("../../../common/common.module");
var faq_module_1 = require("../../faq/faq.module");
var video_module_1 = require("../../media/components/video/video.module");
var marketing_module_1 = require("../../marketing/marketing.module");
var blog_module_1 = require("../../blogs/blog.module");
var forms_1 = require("@angular/forms");
var marketing_component_1 = require("./marketing.component");
var purchase_component_1 = require("./purchase.component");
var onboard_component_1 = require("./onboard.component");
var blogs_component_1 = require("./blogs.component");
var countdown_component_1 = require("./countdown.component");
var modals_module_1 = require("../../modals/modals.module");
var routes = [
    {
        path: 'tokens',
        redirectTo: '/token',
    },
    {
        path: 'token',
        component: marketing_component_1.BlockchainMarketingComponent,
    }
];
var BlockchainMarketingModule = /** @class */ (function () {
    function BlockchainMarketingModule() {
    }
    BlockchainMarketingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes),
                common_1.CommonModule,
                common_module_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                faq_module_1.FaqModule,
                marketing_module_1.MarketingModule,
                modals_module_1.ModalsModule,
                blog_module_1.BlogModule,
                video_module_1.VideoModule,
            ],
            declarations: [
                marketing_component_1.BlockchainMarketingComponent,
                onboard_component_1.BlockchainMarketingOnboardComponent,
                purchase_component_1.BlockchainPurchaseComponent,
                blogs_component_1.BlockchainMarketingBlogsComponent,
                countdown_component_1.BlockchainMarketingCountdownComponent,
            ],
            exports: [
                marketing_component_1.BlockchainMarketingComponent,
            ],
            entryComponents: [
                marketing_component_1.BlockchainMarketingComponent,
            ]
        })
    ], BlockchainMarketingModule);
    return BlockchainMarketingModule;
}());
exports.BlockchainMarketingModule = BlockchainMarketingModule;
//# sourceMappingURL=marketing.module.js.map
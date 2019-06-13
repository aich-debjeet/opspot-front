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
var modals_module_1 = require("../modals/modals.module");
var ads_module_1 = require("../ads/ads.module");
var legacy_module_1 = require("../legacy/legacy.module");
var post_menu_module_1 = require("../../common/components/post-menu/post-menu.module");
var list_component_1 = require("./list.component");
var card_1 = require("./card/card");
var view_1 = require("./view/view");
var tile_component_1 = require("./tile/tile.component");
var wire_module_1 = require("../wire/wire.module");
var comments_module_1 = require("../comments/comments.module");
var hashtags_module_1 = require("../hashtags/hashtags.module");
var routes = [
    { path: 'blog/view/:guid/:title', component: list_component_1.BlogViewInfinite },
    { path: 'blog/view/:guid', component: list_component_1.BlogViewInfinite },
    { path: 'blog/edit/:guid', component: list_component_1.BlogEdit },
    { path: 'blog/:filter', component: list_component_1.BlogListComponent },
    { path: 'blog', redirectTo: '/blog/top', pathMatch: 'full' },
    { path: ':username/blog/:slugid', component: list_component_1.BlogViewInfinite },
];
var BlogModule = /** @class */ (function () {
    function BlogModule() {
    }
    BlogModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                modals_module_1.ModalsModule,
                ads_module_1.AdsModule,
                comments_module_1.CommentsModule,
                legacy_module_1.LegacyModule,
                post_menu_module_1.PostMenuModule,
                wire_module_1.WireModule,
                hashtags_module_1.HashtagsModule,
            ],
            declarations: [
                view_1.BlogView,
                card_1.BlogCard,
                list_component_1.BlogViewInfinite,
                list_component_1.BlogEdit,
                list_component_1.BlogListComponent,
                tile_component_1.BlogTileComponent,
            ],
            exports: [
                view_1.BlogView,
                card_1.BlogCard,
                list_component_1.BlogViewInfinite,
                list_component_1.BlogEdit,
                list_component_1.BlogListComponent,
                tile_component_1.BlogTileComponent,
            ],
            entryComponents: [
                card_1.BlogCard
            ]
        })
    ], BlogModule);
    return BlogModule;
}());
exports.BlogModule = BlogModule;
//# sourceMappingURL=blog.module.js.map
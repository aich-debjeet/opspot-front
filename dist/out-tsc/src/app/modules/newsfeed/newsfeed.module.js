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
var modals_module_1 = require("../modals/modals.module");
var forms_module_1 = require("../forms/forms.module");
var can_deactivate_guard_1 = require("../../services/can-deactivate-guard");
var ads_module_1 = require("../ads/ads.module");
var suggestions_module_1 = require("../suggestions/suggestions.module");
var newsfeed_component_1 = require("./newsfeed.component");
var single_component_1 = require("./single/single.component");
var boost_rotator_component_1 = require("./boost-rotator/boost-rotator.component");
var top_component_1 = require("./feeds/top.component");
var subscribed_component_1 = require("./feeds/subscribed.component");
var boost_component_1 = require("./feeds/boost.component");
var newsfeed_service_1 = require("./services/newsfeed.service");
var newsfeed_boost_service_1 = require("./newsfeed-boost.service");
var dropdown_component_1 = require("./dropdown/dropdown.component");
var poster_module_1 = require("./poster/poster.module");
var comments_module_1 = require("../comments/comments.module");
var hashtags_module_1 = require("../hashtags/hashtags.module");
var tags_component_1 = require("./feeds/tags/tags.component");
var routes = [
    {
        path: 'newsfeed', component: newsfeed_component_1.NewsfeedComponent,
        children: [
            { path: '', redirectTo: 'subscribed', pathMatch: 'full' },
            { path: 'suggested', component: top_component_1.NewsfeedTopComponent },
            { path: 'subscribed', component: subscribed_component_1.NewsfeedSubscribedComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuardService] },
            { path: 'boost', component: boost_component_1.NewsfeedBoostComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuardService] },
            { path: 'tag/:tag', component: tags_component_1.NewsfeedTagsComponent },
        ],
    },
    { path: 'newsfeed/:guid', component: single_component_1.NewsfeedSingleComponent },
];
var NewsfeedModule = /** @class */ (function () {
    function NewsfeedModule() {
    }
    NewsfeedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                comments_module_1.CommentsModule,
                legacy_module_1.LegacyModule,
                modals_module_1.ModalsModule,
                forms_module_1.OpspotFormsModule,
                ads_module_1.AdsModule,
                poster_module_1.PosterModule,
                hashtags_module_1.HashtagsModule,
                suggestions_module_1.SuggestionsModule,
            ],
            declarations: [
                dropdown_component_1.NewsfeedDropdownComponent,
                newsfeed_component_1.NewsfeedComponent,
                single_component_1.NewsfeedSingleComponent,
                boost_rotator_component_1.NewsfeedBoostRotatorComponent,
                top_component_1.NewsfeedTopComponent,
                subscribed_component_1.NewsfeedSubscribedComponent,
                boost_component_1.NewsfeedBoostComponent,
                tags_component_1.NewsfeedTagsComponent,
            ],
            providers: [
                newsfeed_service_1.NewsfeedService,
                newsfeed_boost_service_1.NewsfeedBoostService,
            ],
            exports: [
                dropdown_component_1.NewsfeedDropdownComponent,
                boost_rotator_component_1.NewsfeedBoostRotatorComponent,
            ],
            entryComponents: [
                newsfeed_component_1.NewsfeedComponent,
                single_component_1.NewsfeedSingleComponent,
            ]
        })
    ], NewsfeedModule);
    return NewsfeedModule;
}());
exports.NewsfeedModule = NewsfeedModule;
//# sourceMappingURL=newsfeed.module.js.map
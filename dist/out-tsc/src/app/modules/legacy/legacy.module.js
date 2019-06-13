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
var translate_module_1 = require("../translate/translate.module");
var video_module_1 = require("../media/components/video/video.module");
var modals_module_1 = require("../modals/modals.module");
var payments_module_1 = require("../payments/payments.module");
var boost_module_1 = require("../boost/boost.module");
var third_party_networks_module_1 = require("../third-party-networks/third-party-networks.module");
var wire_module_1 = require("../wire/wire.module");
var activity_1 = require("./components/cards/activity/activity");
var album_1 = require("./components/cards/object/album/album");
var image_1 = require("./components/cards/object/image/image");
var video_1 = require("./components/cards/object/video/video");
var remind_1 = require("./components/cards/remind/remind");
var user_1 = require("./components/cards/user/user");
var boost_1 = require("./components/buttons/boost");
var comment_1 = require("./components/buttons/comment");
var feature_1 = require("./components/buttons/feature");
var monetize_1 = require("./components/buttons/monetize");
var remind_2 = require("./components/buttons/remind");
var subscribe_1 = require("./components/buttons/subscribe");
var user_dropdown_1 = require("./components/buttons/user-dropdown");
var banner_1 = require("./components/banner/banner");
var fat_1 = require("./components/banner/fat");
var preview_1 = require("./components/cards/activity/preview");
var social_icons_1 = require("./components/social-icons/social-icons");
var post_menu_module_1 = require("../../common/components/post-menu/post-menu.module");
var hovercard_popup_1 = require("./components/hovercard-popup/hovercard-popup");
var carousel_component_1 = require("./components/carousel.component");
var comments_module_1 = require("../comments/comments.module");
var angular_text_input_autocomplete_1 = require("angular-text-input-autocomplete");
var LegacyModule = /** @class */ (function () {
    function LegacyModule() {
    }
    LegacyModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                router_1.RouterModule.forChild([]),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                translate_module_1.TranslateModule,
                video_module_1.VideoModule,
                payments_module_1.PaymentsModule,
                modals_module_1.ModalsModule,
                boost_module_1.BoostModule,
                third_party_networks_module_1.ThirdPartyNetworksModule,
                wire_module_1.WireModule,
                post_menu_module_1.PostMenuModule,
                comments_module_1.CommentsModule,
                angular_text_input_autocomplete_1.TextInputAutocompleteModule,
            ],
            declarations: [
                activity_1.Activity,
                preview_1.ActivityPreview,
                album_1.AlbumCard,
                image_1.ImageCard,
                video_1.VideoCard,
                remind_1.Remind,
                user_1.UserCard,
                hovercard_popup_1.HovercardPopup,
                boost_1.BoostButton,
                comment_1.CommentButton,
                feature_1.FeatureButton,
                monetize_1.MonetizeButton,
                remind_2.RemindButton,
                subscribe_1.SubscribeButton,
                user_dropdown_1.UserDropdownButton,
                banner_1.OpspotBanner,
                fat_1.OpspotFatBanner,
                social_icons_1.SocialIcons,
                carousel_component_1.CarouselComponent,
            ],
            exports: [
                activity_1.Activity,
                preview_1.ActivityPreview,
                album_1.AlbumCard,
                image_1.ImageCard,
                video_1.VideoCard,
                remind_1.Remind,
                user_1.UserCard,
                boost_1.BoostButton,
                comment_1.CommentButton,
                feature_1.FeatureButton,
                monetize_1.MonetizeButton,
                remind_2.RemindButton,
                subscribe_1.SubscribeButton,
                user_dropdown_1.UserDropdownButton,
                banner_1.OpspotBanner,
                fat_1.OpspotFatBanner,
                social_icons_1.SocialIcons,
                hovercard_popup_1.HovercardPopup,
                carousel_component_1.CarouselComponent,
            ],
            entryComponents: [
                activity_1.Activity,
                preview_1.ActivityPreview,
                album_1.AlbumCard,
                image_1.ImageCard,
                video_1.VideoCard,
                remind_1.Remind,
                user_1.UserCard,
                boost_1.BoostButton,
            ]
        })
    ], LegacyModule);
    return LegacyModule;
}());
exports.LegacyModule = LegacyModule;
//# sourceMappingURL=legacy.module.js.map
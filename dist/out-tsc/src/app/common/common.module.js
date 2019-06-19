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
var pipes_1 = require("./pipes/pipes");
var topbar_component_1 = require("./layout/topbar/topbar.component");
var markers_component_1 = require("./layout/sidebar/markers.component");
var navigation_component_1 = require("./layout/topbar/navigation.component");
var navigation_component_2 = require("./layout/sidebar/navigation.component");
var options_component_1 = require("./layout/topbar/options.component");
var tooltip_component_1 = require("./components/tooltip/tooltip.component");
var footer_component_1 = require("./components/footer/footer.component");
var infinite_scroll_1 = require("./components/infinite-scroll/infinite-scroll");
var country_input_component_1 = require("./components/forms/country-input/country-input.component");
var date_input_component_1 = require("./components/forms/date-input/date-input.component");
var city_finder_component_1 = require("./components/forms/city-finder/city-finder.component");
var state_input_component_1 = require("./components/forms/state-input/state-input.component");
var read_more_directive_1 = require("./read-more/read-more.directive");
var button_component_1 = require("./read-more/button.component");
var badges_component_1 = require("./components/badges/badges.component");
var scheduler_1 = require("./components/scheduler/scheduler");
var modal_component_1 = require("./components/modal/modal.component");
var rich_embed_1 = require("./components/rich-embed/rich-embed");
var material_1 = require("./directives/material");
var autogrow_1 = require("./directives/autogrow");
var inline_autogrow_1 = require("./directives/inline-autogrow");
var emoji_1 = require("./directives/emoji");
var hovercard_1 = require("./directives/hovercard");
var scroll_lock_1 = require("./directives/scroll-lock");
var tags_1 = require("./directives/tags");
var tooltip_1 = require("./directives/tooltip");
var avatar_1 = require("./components/avatar/avatar");
var captcha_component_1 = require("./components/captcha/captcha.component");
var textarea_component_1 = require("./components/editors/textarea.component");
var tagcloud_component_1 = require("./components/tagcloud/tagcloud.component");
var dropdown_component_1 = require("./components/dropdown/dropdown.component");
var dynamic_host_directive_1 = require("./directives/dynamic-host.directive");
var card_component_1 = require("./components/card/card.component");
var button_component_2 = require("./components/button/button.component");
var overlay_modal_component_1 = require("./components/overlay-modal/overlay-modal.component");
var chart_component_1 = require("./components/chart/chart.component");
var date_selector_component_1 = require("./components/date-selector/date-selector.component");
var admin_actions_component_1 = require("./components/button/admin-actions/admin-actions.component");
var inline_editor_component_1 = require("./components/editors/inline-editor.component");
var attachment_1 = require("../services/attachment");
var bound_switch_component_1 = require("./components/material/bound-switch.component");
var if_feature_directive_1 = require("./directives/if-feature.directive");
var emoji_2 = require("./components/emoji/emoji");
var selector_component_1 = require("./components/categories/selector/selector.component");
var selected_component_1 = require("./components/categories/selected/selected.component");
var tree_component_1 = require("./components/tree/tree.component");
var announcement_component_1 = require("./components/announcements/announcement.component");
var token_symbol_component_1 = require("./components/cypto/token-symbol.component");
var phone_input_component_1 = require("./components/phone-input/phone-input.component");
var country_component_1 = require("./components/phone-input/country.component");
var session_1 = require("../services/session");
var api_1 = require("../services/api");
var client_service_1 = require("./api/client.service");
var safe_toggle_component_1 = require("./components/safe-toggle/safe-toggle.component");
var toaster_component_1 = require("../modules/notifications/toaster.component");
var thumbs_up_component_1 = require("./components/thumbs/thumbs-up.component");
var thumbs_down_component_1 = require("./components/thumbs/thumbs-down.component");
var notice_component_1 = require("./components/notice/notice.component");
var impressions_1 = require("./components/analytics/impressions");
var line_graph_1 = require("./components/graphs/line-graph");
var pie_graph_1 = require("./components/graphs/pie-graph");
var svg_1 = require("./components/graphs/svg");
var points_1 = require("./components/graphs/points");
var dynamic_form_component_1 = require("./components/forms/dynamic-form/dynamic-form.component");
var update_markers_service_1 = require("./services/update-markers.service");
var sockets_1 = require("../services/sockets");
var http_1 = require("@angular/common/http");
var button_component_3 = require("./components/android-app-download-button/button.component");
var CommonModule = /** @class */ (function () {
    function CommonModule() {
    }
    CommonModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                pipes_1.OPSPOT_PIPES,
                topbar_component_1.TopbarComponent,
                markers_component_1.SidebarMarkersComponent,
                navigation_component_1.TopbarNavigationComponent,
                navigation_component_2.SidebarNavigationComponent,
                options_component_1.TopbarOptionsComponent,
                tooltip_component_1.TooltipComponent,
                footer_component_1.FooterComponent,
                infinite_scroll_1.InfiniteScroll,
                country_input_component_1.CountryInputComponent,
                date_input_component_1.DateInputComponent,
                state_input_component_1.StateInputComponent,
                city_finder_component_1.CityFinderComponent,
                scheduler_1.Scheduler,
                modal_component_1.Modal,
                read_more_directive_1.ReadMoreDirective,
                button_component_1.ReadMoreButtonComponent,
                badges_component_1.ChannelBadgesComponent,
                rich_embed_1.OpspotRichEmbed,
                tagcloud_component_1.TagcloudComponent,
                dropdown_component_1.DropdownComponent,
                autogrow_1.AutoGrow,
                inline_autogrow_1.InlineAutoGrow,
                emoji_1.Emoji,
                emoji_2.OpspotEmoji,
                hovercard_1.Hovercard,
                scroll_lock_1.ScrollLock,
                tags_1.TagsLinks,
                tooltip_1.Tooltip,
                material_1.MDL_DIRECTIVES,
                date_selector_component_1.DateSelectorComponent,
                avatar_1.OpspotAvatar,
                captcha_component_1.CaptchaComponent,
                textarea_component_1.Textarea,
                inline_editor_component_1.InlineEditorComponent,
                dynamic_host_directive_1.DynamicHostDirective,
                card_component_1.OpspotCard,
                button_component_2.OpspotButton,
                chart_component_1.ChartComponent,
                overlay_modal_component_1.OverlayModalComponent,
                admin_actions_component_1.AdminActionsButtonComponent,
                bound_switch_component_1.MaterialBoundSwitchComponent,
                if_feature_directive_1.IfFeatureDirective,
                selector_component_1.CategoriesSelectorComponent,
                selected_component_1.CategoriesSelectedComponent,
                tree_component_1.TreeComponent,
                announcement_component_1.AnnouncementComponent,
                token_symbol_component_1.OpspotTokenSymbolComponent,
                phone_input_component_1.PhoneInputComponent,
                country_component_1.PhoneInputCountryComponent,
                safe_toggle_component_1.SafeToggleComponent,
                thumbs_up_component_1.ThumbsUpButton,
                thumbs_down_component_1.ThumbsDownButton,
                notice_component_1.DismissableNoticeComponent,
                impressions_1.AnalyticsImpressions,
                line_graph_1.LineGraph,
                pie_graph_1.PieGraph,
                svg_1.GraphSVG,
                points_1.GraphPoints,
                dynamic_form_component_1.DynamicFormComponent,
                button_component_3.AndroidAppDownloadComponent,
            ],
            exports: [
                pipes_1.OPSPOT_PIPES,
                topbar_component_1.TopbarComponent,
                navigation_component_2.SidebarNavigationComponent,
                options_component_1.TopbarOptionsComponent,
                tooltip_component_1.TooltipComponent,
                footer_component_1.FooterComponent,
                infinite_scroll_1.InfiniteScroll,
                country_input_component_1.CountryInputComponent,
                date_input_component_1.DateInputComponent,
                city_finder_component_1.CityFinderComponent,
                state_input_component_1.StateInputComponent,
                scheduler_1.Scheduler,
                modal_component_1.Modal,
                read_more_directive_1.ReadMoreDirective,
                button_component_1.ReadMoreButtonComponent,
                badges_component_1.ChannelBadgesComponent,
                rich_embed_1.OpspotRichEmbed,
                tagcloud_component_1.TagcloudComponent,
                dropdown_component_1.DropdownComponent,
                autogrow_1.AutoGrow,
                inline_autogrow_1.InlineAutoGrow,
                emoji_2.OpspotEmoji,
                emoji_1.Emoji,
                hovercard_1.Hovercard,
                scroll_lock_1.ScrollLock,
                tags_1.TagsLinks,
                tooltip_1.Tooltip,
                material_1.MDL_DIRECTIVES,
                date_selector_component_1.DateSelectorComponent,
                avatar_1.OpspotAvatar,
                captcha_component_1.CaptchaComponent,
                textarea_component_1.Textarea,
                inline_editor_component_1.InlineEditorComponent,
                dynamic_host_directive_1.DynamicHostDirective,
                card_component_1.OpspotCard,
                button_component_2.OpspotButton,
                chart_component_1.ChartComponent,
                overlay_modal_component_1.OverlayModalComponent,
                admin_actions_component_1.AdminActionsButtonComponent,
                bound_switch_component_1.MaterialBoundSwitchComponent,
                if_feature_directive_1.IfFeatureDirective,
                selector_component_1.CategoriesSelectorComponent,
                selected_component_1.CategoriesSelectedComponent,
                tree_component_1.TreeComponent,
                markers_component_1.SidebarMarkersComponent,
                announcement_component_1.AnnouncementComponent,
                token_symbol_component_1.OpspotTokenSymbolComponent,
                phone_input_component_1.PhoneInputComponent,
                safe_toggle_component_1.SafeToggleComponent,
                thumbs_up_component_1.ThumbsUpButton,
                thumbs_down_component_1.ThumbsDownButton,
                notice_component_1.DismissableNoticeComponent,
                impressions_1.AnalyticsImpressions,
                svg_1.GraphSVG,
                points_1.GraphPoints,
                line_graph_1.LineGraph,
                pie_graph_1.PieGraph,
                dynamic_form_component_1.DynamicFormComponent,
                button_component_3.AndroidAppDownloadComponent,
            ],
            providers: [
                {
                    provide: attachment_1.AttachmentService,
                    useFactory: attachment_1.AttachmentService._,
                    deps: [session_1.Session, api_1.Client, api_1.Upload]
                },
                {
                    provide: update_markers_service_1.UpdateMarkersService,
                    useFactory: function (_http, _session, _sockets) { return new update_markers_service_1.UpdateMarkersService(_http, _session, _sockets); },
                    deps: [client_service_1.OpspotHttpClient, session_1.Session, sockets_1.SocketsService],
                },
                {
                    provide: client_service_1.OpspotHttpClient,
                    useFactory: client_service_1.OpspotHttpClient._,
                    deps: [http_1.HttpClient]
                },
            ],
            entryComponents: [
                toaster_component_1.NotificationsToasterComponent
            ]
        })
    ], CommonModule);
    return CommonModule;
}());
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map
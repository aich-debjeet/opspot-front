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
var common_module_1 = require("../../../../common/common.module");
var progress_bar_component_1 = require("./progress-bar/progress-bar.component");
var quality_selector_component_1 = require("./quality-selector/quality-selector.component");
var volume_slider_component_1 = require("./volume-slider/volume-slider.component");
var ads_directive_1 = require("./ads.directive");
var video_component_1 = require("./video.component");
var direct_http_component_1 = require("./players/direct-http.component");
var torrent_component_1 = require("./players/torrent.component");
var VideoModule = /** @class */ (function () {
    function VideoModule() {
    }
    VideoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild([])
            ],
            declarations: [
                ads_directive_1.VideoAdsDirective,
                video_component_1.VideoAds,
                video_component_1.OpspotVideoComponent,
                direct_http_component_1.OpspotVideoDirectHttpPlayer,
                torrent_component_1.OpspotVideoTorrentPlayer,
                progress_bar_component_1.OpspotVideoProgressBar,
                quality_selector_component_1.OpspotVideoQualitySelector,
                volume_slider_component_1.OpspotVideoVolumeSlider,
            ],
            exports: [
                ads_directive_1.VideoAdsDirective,
                video_component_1.VideoAds,
                video_component_1.OpspotVideoComponent,
            ],
        })
    ], VideoModule);
    return VideoModule;
}());
exports.VideoModule = VideoModule;
//# sourceMappingURL=video.module.js.map
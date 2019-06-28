"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ads_service_1 = require("./ads.service");
var VideoAds = /** @class */ (function () {
    function VideoAds(element) {
        this.element = element;
        this.service = new ads_service_1.VideoAdsService();
        this.initialized = false;
        this.google = window.google;
    }
    VideoAds.prototype.ngOnInit = function () {
        //this.setupIMA();
        this.element.nativeElement.style.display = 'none';
    };
    VideoAds.prototype.setupIMA = function () {
        this.adContainer = new this.google.ima.AdDisplayContainer(this.element.nativeElement, this.player.element);
        this.adLoader = new this.google.ima.AdsLoader(this.adContainer);
        // Listen and respond to ads loaded and error events.
        this.adLoader.addEventListener(this.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onLoaded.bind(this), false);
        this.adLoader.addEventListener(this.google.ima.AdErrorEvent.Type.AD_ERROR, this.onError.bind(this), false);
        // Request video ads.
        var adsRequest = new this.google.ima.AdsRequest();
        adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads? '
            + 'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&'
            + 'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&'
            + 'cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=';
        adsRequest.linearAdSlotWidth = this.player.element.clientWidth;
        adsRequest.linearAdSlotHeight = this.player.element.clientHeight;
        adsRequest.nonLinearAdSlotWidth = this.player.element.clientWidth;
        adsRequest.nonLinearAdSlotHeight = 150;
        adsRequest.setAdWillAutoPlay(true);
        this.adLoader.requestAds(adsRequest);
    };
    VideoAds.prototype.onLoaded = function (e) {
        var settings = new this.google.ima.AdsRenderingSettings();
        settings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        // videoContent should be set to the content video element.
        this.adManager = e.getAdsManager(this.player.element, settings);
        // Add listeners to the required events.
        this.adManager.addEventListener(this.google.ima.AdErrorEvent.Type.AD_ERROR, this.onError.bind(this));
        this.adManager.addEventListener(this.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onPause.bind(this));
        this.adManager.addEventListener(this.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onResume.bind(this));
        this.adManager.addEventListener(this.google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.onEvent.bind(this));
        // Listen to any additional events, if necessary.
        this.adManager.addEventListener(this.google.ima.AdEvent.Type.LOADED, this.onEvent.bind(this));
        this.adManager.addEventListener(this.google.ima.AdEvent.Type.STARTED, this.onEvent.bind(this));
        this.adManager.addEventListener(this.google.ima.AdEvent.Type.COMPLETE, this.onEvent.bind(this));
        var initWidth = this.player.element.clientWidth;
        var initHeight = this.player.element.clientHeight;
        //this.adManagerDimensions.width = initWidth;
        //this.adsManagerDimensions.height = initHeight;
        this.adManager.init(initWidth, initHeight, this.google.ima.ViewMode.NORMAL);
        this.adManager.resize(initWidth, initHeight, this.google.ima.ViewMode.NORMAL);
        if (!this.player.muted) {
            this.playAds();
        }
        else {
            this.player.element.addEventListener('volumechange', this.playAds.bind(this));
        }
    };
    VideoAds.prototype.playAds = function () {
        if (this.initialized)
            return;
        this.initialized = true;
        this.element.nativeElement.style.display = 'block';
        this.player.autoplay = true;
        this.adContainer.initialize();
        try {
            // Initialize the ads manager. Ad rules playlist will start at this time.
            this.adManager.init(640, 360, this.google.ima.ViewMode.NORMAL);
            // Call play to start showing the ad. Single video and overlay ads will
            // start at this time; the call will be ignored for ad rules.
            this.adManager.start();
        }
        catch (err) {
            // An error may be thrown if there was a problem with the VAST response.
            //videoContent.play();
            console.log(err);
            this.element.nativeElement.style.display = 'none';
            return false;
        }
        return true;
    };
    VideoAds.prototype.onEvent = function (e) {
        // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
        // don't have ad object associated.
        var ad = e.getAd();
        switch (e.type) {
            case this.google.ima.AdEvent.Type.LOADED:
                if (!ad.isLinear()) {
                    // Position AdDisplayContainer correctly for overlay.
                    // Use ad.width and ad.height.
                    //this.player.nativeElement.play();
                }
                break;
            case this.google.ima.AdEvent.Type.STARTED:
                // This event indicates the ad has started - the video player
                // can adjust the UI, for example display a pause button and
                // remaining time.
                //if (ad.isLinear()) {
                //}
                break;
            case this.google.ima.AdEvent.Type.COMPLETE:
                //if (ad.isLinear()) {
                //}
                this.element.nativeElement.style.display = 'none';
                break;
        }
    };
    VideoAds.prototype.onPause = function (e) {
        this.element.nativeElement.style.display = 'block';
        this.player.element.pause();
    };
    VideoAds.prototype.onResume = function (e) {
        this.player.element.play();
        this.element.nativeElement.style.display = 'none';
    };
    VideoAds.prototype.onError = function (e) {
        console.log(e.getError());
        this.adManager.destroy();
    };
    VideoAds.prototype.ngOnDestroy = function () {
        if (this.adManager)
            this.adManager.destroy();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VideoAds.prototype, "player", void 0);
    VideoAds = __decorate([
        core_1.Component({
            selector: 'video-ads',
            template: "\n  "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], VideoAds);
    return VideoAds;
}());
exports.VideoAds = VideoAds;
//# sourceMappingURL=ads.component.js.map
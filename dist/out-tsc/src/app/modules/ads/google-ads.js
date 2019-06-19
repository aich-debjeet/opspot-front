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
var GoogleAds = /** @class */ (function () {
    function GoogleAds(element) {
        var _this = this;
        this.visible = false;
        this.type = 'square';
        this.location = 'default';
        GoogleAdsService.load().then(function () {
            _this.visible = true;
            console.log('ads ready to show');
        });
    }
    GoogleAds.prototype.ngOnDestroy = function () {
        GoogleAdsService.unload();
    };
    GoogleAds = __decorate([
        core_1.Component({
            selector: 'google-ad',
            inputs: ['type', 'location'],
            template: "\n    <ins\n       *ngIf=\"type == 'square'\"\n       class=\"adsbygoogle\"\n       style=\"display:block;width:336px;height:280px;margin: auto; padding: 8px; background: #EEE;\"\n       data-ad-client=\"ca-pub-9303771378013875\"\n       data-ad-slot=\"5788264423\"></ins>\n   <ins\n       *ngIf=\"type == 'responsive'\"\n       class=\"adsbygoogle\"\n        style=\"display:block; width:100%;\"\n        data-ad-client=\"ca-pub-9303771378013875\"\n        data-ad-slot=\"7588308825\"\n        data-ad-format=\"auto\"\n        ></ins>\n    <script>\n    (adsbygoogle = window.adsbygoogle || []).push({});\n    </script>\n  ",
            host: {
                '[class]': '\'m-ad-block m-ad-block-google \' + type + \' m-ad-block-\' + location'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], GoogleAds);
    return GoogleAds;
}());
exports.GoogleAds = GoogleAds;
var GoogleAdsService = /** @class */ (function () {
    function GoogleAdsService() {
    }
    GoogleAdsService.load = function () {
        return new Promise(function (resolve) {
            if (!GoogleAdsService.script) {
                GoogleAdsService.script = document.createElement('script');
                GoogleAdsService.script.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
                GoogleAdsService.script.async = true;
                document.body.appendChild(GoogleAdsService.script);
                resolve(true);
            }
            else {
                resolve(true);
            }
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
    };
    GoogleAdsService.unload = function () {
        if (GoogleAdsService.script) {
            GoogleAdsService.script.remove();
            GoogleAdsService.script = null;
        }
    };
    return GoogleAdsService;
}());
//# sourceMappingURL=google-ads.js.map
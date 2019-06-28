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
var common_module_1 = require("../../common/common.module");
var boost_1 = require("./boost");
var google_ads_1 = require("./google-ads");
var revcontent_1 = require("./revcontent");
var pd_ads_1 = require("./pd-ads");
var AdsModule = /** @class */ (function () {
    function AdsModule() {
    }
    AdsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule
            ],
            declarations: [
                boost_1.BoostAds,
                google_ads_1.GoogleAds,
                revcontent_1.RevContent,
                pd_ads_1.PDAds
            ],
            exports: [
                boost_1.BoostAds,
                google_ads_1.GoogleAds,
                revcontent_1.RevContent,
                pd_ads_1.PDAds
            ]
        })
    ], AdsModule);
    return AdsModule;
}());
exports.AdsModule = AdsModule;
//# sourceMappingURL=ads.module.js.map
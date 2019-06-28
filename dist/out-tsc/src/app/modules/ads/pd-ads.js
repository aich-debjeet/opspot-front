"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PDAds = /** @class */ (function () {
    function PDAds() {
        this.visible = false;
        this.type = 'square';
        this.location = 'default';
    }
    PDAds.prototype.ngOnInit = function () {
        if (typeof window.twoOhSix !== 'undefined') {
            window.twoOhSix.insertAds();
            //if(this.type == 'context')
            setTimeout(function () {
                window.twoOhSix.insertContextualAds();
            }, 100);
        }
    };
    PDAds = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pd-ad',
            inputs: ['type', 'location'],
            template: "\n    <div class=\"tpd-box\" data-tpd-id=\"dsk-banner-ad-a\" *ngIf=\"type == 'banner'\"></div>\n    <div class=\"tpd-box\" data-tpd-id=\"mob-banner-ad-a\" *ngIf=\"type == 'banner'\"></div>\n    <div class=\"tpd-box\" data-tpd-id=\"dsk-banner-ad-b\" *ngIf=\"type == 'banner-2'\"></div>\n    <div class=\"tpd-box\" data-tpd-id=\"mob-box-ad-b\" *ngIf=\"type == 'banner-2'\"></div>\n    <div class=\"tpd-box\" data-tpd-id=\"dsk-box-ad-a\" *ngIf=\"type == 'square'\"></div>\n    <div class=\"tpd-box\" data-tpd-id=\"mob-box-ad-a\" *ngIf=\"type == 'square'\"></div>\n    <div class=\"tpd-box\" data-tpd-id=\"ad-contextual-a\" *ngIf=\"type == 'context'\"></div>\n    <div class=\"tpd-box\" data-tpd-id=\"ad-contextual-b\" *ngIf=\"type == 'context'\"></div>\n  ",
            host: {
                '[class]': '\'m-ad-block m-ad-block-pd \' + type + \' m-ad-block-\' + location'
            }
        })
    ], PDAds);
    return PDAds;
}());
exports.PDAds = PDAds;
//# sourceMappingURL=pd-ads.js.map
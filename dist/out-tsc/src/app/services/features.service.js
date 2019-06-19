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
var session_1 = require("./session");
var router_1 = require("@angular/router");
var FeaturesService = /** @class */ (function () {
    function FeaturesService(session, router) {
        this.session = session;
        this.router = router;
        this._features = window.Opspot.features || {};
    }
    FeaturesService_1 = FeaturesService;
    FeaturesService._ = function (session, router) {
        return new FeaturesService_1(session, router);
    };
    FeaturesService.prototype.has = function (feature) {
        if (typeof this._features[feature] === 'undefined') {
            if (core_1.isDevMode()) {
                console.warn("[FeaturedService] Feature '" + feature + "' is not declared. Assuming true.");
            }
            return true;
        }
        if (this._features[feature] === 'admin' && this.session.isAdmin()) {
            return true;
        }
        if (this._features[feature] === 'canary' && this.session.getLoggedInUser().canary) {
            return true;
        }
        return this._features[feature] === true;
    };
    FeaturesService.prototype.check = function (feature, _a) {
        var redirectTo = (_a === void 0 ? {} : _a).redirectTo;
        var has = this.has(feature);
        if (!has && redirectTo) {
            this.router.navigate(redirectTo, { replaceUrl: true });
        }
        return has;
    };
    var FeaturesService_1;
    FeaturesService = FeaturesService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [session_1.Session, router_1.Router])
    ], FeaturesService);
    return FeaturesService;
}());
exports.FeaturesService = FeaturesService;
//# sourceMappingURL=features.service.js.map
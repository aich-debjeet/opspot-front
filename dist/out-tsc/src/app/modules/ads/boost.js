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
var api_1 = require("../../services/api");
var session_1 = require("../../services/session");
var storage_1 = require("../../services/storage");
var settings_service_1 = require("../settings/settings.service");
var BoostAds = /** @class */ (function () {
    function BoostAds(client, session, storage, settingsService) {
        this.client = client;
        this.session = session;
        this.storage = storage;
        this.settingsService = settingsService;
        this.handler = 'content';
        this.limit = 2;
        this.offset = '';
        this.boosts = [];
        this.rating = 2;
    }
    BoostAds.prototype.ngOnInit = function () {
        var _this = this;
        this.rating = this.session.getLoggedInUser().boost_rating;
        this.ratingSubscription = this.settingsService.ratingChanged.subscribe(function (rating) {
            _this.onRatingChanged(rating);
        });
        this.fetch();
    };
    BoostAds.prototype.ngOnDestroy = function () {
        this.ratingSubscription.unsubscribe();
    };
    BoostAds.prototype.fetch = function () {
        var _this = this;
        if (this.storage.get('boost:offset:sidebar'))
            this.offset = this.storage.get('boost:offset:sidebar');
        this.client.get('api/v1/boost/fetch/' + this.handler, {
            limit: this.limit,
            offset: this.offset,
            rating: this.rating
        })
            .then(function (response) {
            if (!response.boosts) {
                return;
            }
            _this.boosts = response.boosts;
            if (response['load-next'])
                _this.storage.set('boost:offset:sidebar', response['load-next']);
        });
    };
    BoostAds.prototype.onRatingChanged = function (rating) {
        this.rating = rating;
        this.storage.destroy('boost:offset:sidebar');
        this.offset = '';
        this.fetch();
    };
    BoostAds = __decorate([
        core_1.Component({
            selector: 'm-ads-boost',
            inputs: ['handler', 'limit'],
            template: "\n    <h3 class=\"m-newsfeedSidebar__header\">\n      <ng-container i18n=\"@@ADS__BOOSTED_CONTENT\">Boosted content</ng-container>\n    </h3>\n    <div class=\"m-ad-boost-entity\" *ngFor=\"let entity of boosts\">\n      <opspot-card [object]=\"entity\" hostClass=\"mdl-card m-border\"></opspot-card>\n    </div>\n  ",
            host: {
                'class': 'm-ad-block m-ad-block-boosts'
            }
        }),
        __metadata("design:paramtypes", [api_1.Client, session_1.Session, storage_1.Storage, settings_service_1.SettingsService])
    ], BoostAds);
    return BoostAds;
}());
exports.BoostAds = BoostAds;
//# sourceMappingURL=boost.js.map
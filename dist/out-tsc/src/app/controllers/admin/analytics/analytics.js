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
var api_1 = require("../../../services/api");
var AdminAnalytics = /** @class */ (function () {
    function AdminAnalytics(client) {
        this.client = client;
        this.boost_newsfeed = {
            review: 0,
            approved: 0,
            percent: 50,
            total: 0,
            review_backlog: 0,
            approved_backlog: 0,
            impressions: 0,
            impressions_met: 0
        };
        this.getActives();
        this.getPageviews();
        this.getSignups();
        this.getRetention();
        this.getBoosts();
    }
    /**
     * Return active user analytics
     */
    AdminAnalytics.prototype.getActives = function () {
        var _this = this;
        this.client.get('api/v1/admin/analytics/active')
            .then(function (response) {
            _this.dam = response['daily'];
            _this.dam_list = response['daily'].slice(0).reverse();
            _this.mam = response['monthly'];
            _this.mam_list = response['monthly'].slice(0).reverse();
        });
    };
    /**
     * Return pageviews
     */
    AdminAnalytics.prototype.getPageviews = function () {
        var _this = this;
        this.client.get('api/v1/admin/analytics/pageviews')
            .then(function (response) {
            _this.pageviews = response['pageviews'];
            _this.pageviews_list = response['pageviews'].slice(0).reverse();
        });
    };
    /**
     * Return signups
     */
    AdminAnalytics.prototype.getSignups = function () {
        var _this = this;
        this.client.get('api/v1/admin/analytics/signups')
            .then(function (response) {
            _this.signups = response['daily'];
            _this.signups_list = response['daily'].slice(0).reverse();
        });
    };
    /**
     * Return retention rates
     */
    AdminAnalytics.prototype.getRetention = function () {
        var _this = this;
        this.client.get('api/v1/admin/analytics/retention')
            .then(function (response) {
            _this.retention = response.retention[0];
            console.log(_this.retention);
        });
    };
    /**
     * Return boost analytics
     */
    AdminAnalytics.prototype.getBoosts = function () {
        var _this = this;
        this.client.get('api/v1/admin/analytics/boost')
            .then(function (response) {
            _this.boost_newsfeed = response.newsfeed;
            _this.boost_newsfeed.total = _this.boost_newsfeed.review + _this.boost_newsfeed.approved;
            _this.boost_newsfeed.percent = (_this.boost_newsfeed.approved / _this.boost_newsfeed.total) * 100;
        });
    };
    AdminAnalytics = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-admin-analytics',
            templateUrl: 'analytics.html'
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], AdminAnalytics);
    return AdminAnalytics;
}());
exports.AdminAnalytics = AdminAnalytics;
//# sourceMappingURL=analytics.js.map
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
var client_1 = require("../../../services/api/client");
var session_1 = require("../../../services/session");
var BoostPublisherComponent = /** @class */ (function () {
    function BoostPublisherComponent(session, client) {
        this.session = session;
        this.client = client;
        this.opspot = window.Opspot;
        this.inProgress = false;
        this.payoutRequestInProgress = false;
        this.stats = {
            points_count: 0,
            usd_count: 0,
            token_count: 0,
            points_earnings: 0,
            usd_earnings: 0,
            token_earnings: 0,
            total_count: 0,
            total_earnings: 0,
        };
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        this.startDate = d.toISOString();
    }
    Object.defineProperty(BoostPublisherComponent.prototype, "filter", {
        set: function (value) {
            this._filter = value;
            if (this._filter === 'earnings') {
                this.getStatistics();
            }
        },
        enumerable: true,
        configurable: true
    });
    BoostPublisherComponent.prototype.getStatistics = function () {
        var _this = this;
        this.client.get('api/v2/boost/sums', { start: Date.parse(this.startDate) }).then(function (res) {
            _this.stats.points_count = res.sums.points_count;
            _this.stats.points_earnings = res.sums.points_earnings;
            _this.stats.usd_count = res.sums.usd_count;
            _this.stats.usd_earnings = res.sums.usd_earnings;
            _this.stats.token_count = res.sums.token_count;
            _this.stats.token_earnings = res.sums.token_earnings;
            _this.stats.total_count = res.sums.total_count;
            _this.stats.total_earnings = res.sums.total_earnings;
        });
    };
    BoostPublisherComponent.prototype.submit = function (publisher) {
        var _this = this;
        this.inProgress = true;
        this.opspot.user.show_boosts = true;
        this.client.post("api/v1/settings/" + this.opspot.user.guid, { 'show_boosts': publisher })
            .then(function () {
            _this.inProgress = false;
        })
            .catch(function () {
            _this.opspot.user.show_boosts = false;
            _this.inProgress = false;
        });
    };
    BoostPublisherComponent.prototype.onStartDateChange = function (newDate) {
        this.startDate = newDate;
        this.getStatistics();
    };
    BoostPublisherComponent.prototype.isMerchant = function () {
        var user = this.session.getLoggedInUser();
        return user && user.merchant;
    };
    BoostPublisherComponent.prototype.requestPayout = function () {
        var _this = this;
        this.payoutRequestInProgress = true;
        this.client.post('api/v1/payout').then(function () {
            _this.payoutRequestInProgress = false;
        }).catch(function () {
            _this.payoutRequestInProgress = false;
        });
    };
    __decorate([
        core_1.Input('filter'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BoostPublisherComponent.prototype, "filter", null);
    BoostPublisherComponent = __decorate([
        core_1.Component({
            selector: 'm-boost-publisher',
            templateUrl: 'publisher.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, client_1.Client])
    ], BoostPublisherComponent);
    return BoostPublisherComponent;
}());
exports.BoostPublisherComponent = BoostPublisherComponent;
//# sourceMappingURL=publisher.component.js.map
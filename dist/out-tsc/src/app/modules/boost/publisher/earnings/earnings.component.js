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
var router_1 = require("@angular/router");
var client_1 = require("../../../../services/api/client");
var session_1 = require("../../../../services/session");
var BoostPublisherEarningsComponent = /** @class */ (function () {
    function BoostPublisherEarningsComponent(client, session, router) {
        this.client = client;
        this.session = session;
        this.router = router;
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
        if (!this.session.getLoggedInUser().show_boosts) {
            this.router.navigate(['/boost/console/publisher/settings']);
        }
    }
    Object.defineProperty(BoostPublisherEarningsComponent.prototype, "filter", {
        set: function (value) {
            this._filter = value;
            if (this._filter === 'earnings') {
                this.getStatistics();
            }
        },
        enumerable: true,
        configurable: true
    });
    BoostPublisherEarningsComponent.prototype.getStatistics = function () {
        var _this = this;
        this.client.get('api/v2/boost/sums')
            .then(function (res) {
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
    __decorate([
        core_1.Input('filter'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BoostPublisherEarningsComponent.prototype, "filter", null);
    BoostPublisherEarningsComponent = __decorate([
        core_1.Component({
            selector: 'm-boost-publisher--earnings',
            templateUrl: 'earnings.component.html'
        }),
        __metadata("design:paramtypes", [client_1.Client,
            session_1.Session,
            router_1.Router])
    ], BoostPublisherEarningsComponent);
    return BoostPublisherEarningsComponent;
}());
exports.BoostPublisherEarningsComponent = BoostPublisherEarningsComponent;
//# sourceMappingURL=earnings.component.js.map
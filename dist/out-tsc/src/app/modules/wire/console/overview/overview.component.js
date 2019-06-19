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
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var WireConsoleOverviewComponent = /** @class */ (function () {
    function WireConsoleOverviewComponent(client, session, cd) {
        this.client = client;
        this.session = session;
        this.cd = cd;
        this.ready = true;
        this.stats = {
            count: 0,
            points: 0,
            points_count: 0,
            points_avg: 0,
            money: 0,
            money_count: 0,
            money_avg: 0,
            tokens: 0,
            tokens_count: 0,
            tokens_avg: 0
        };
    }
    WireConsoleOverviewComponent.prototype.ngOnInit = function () {
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        this.startDate = d.toISOString();
        this.getStats();
    };
    WireConsoleOverviewComponent.prototype.getStats = function () {
        var _this = this;
        this.client.get('api/v1/wire/sums/overview/' + this.session.getLoggedInUser().guid, {
            start: Date.parse(this.startDate) / 1000
        })
            .then(function (_a) {
            var _b = _a.count, count = _b === void 0 ? 0 : _b, _c = _a.points, points = _c === void 0 ? 0 : _c, _d = _a.points_count, points_count = _d === void 0 ? 0 : _d, _e = _a.points_avg, points_avg = _e === void 0 ? 0 : _e, _f = _a.money, money = _f === void 0 ? 0 : _f, _g = _a.money_count, money_count = _g === void 0 ? 0 : _g, _h = _a.money_avg, money_avg = _h === void 0 ? 0 : _h, _j = _a.tokens, tokens = _j === void 0 ? 0 : _j, _k = _a.tokens_count, tokens_count = _k === void 0 ? 0 : _k, _l = _a.tokens_avg, tokens_avg = _l === void 0 ? 0 : _l;
            _this.stats = {
                count: count,
                points: points,
                points_count: points_count,
                points_avg: points_avg,
                money: money,
                money_count: money_count,
                money_avg: money_avg,
                tokens: tokens,
                tokens_count: tokens_count,
                tokens_avg: tokens_avg
            };
            _this.detectChanges();
        });
    };
    WireConsoleOverviewComponent.prototype.isMerchant = function () {
        var user = this.session.getLoggedInUser();
        return user && user.merchant;
    };
    WireConsoleOverviewComponent.prototype.hasWallet = function () {
        var user = this.session.getLoggedInUser();
        return user && user.eth_wallet;
    };
    WireConsoleOverviewComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    WireConsoleOverviewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wire-console--overview',
            templateUrl: 'overview.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [api_1.Client, session_1.Session, core_1.ChangeDetectorRef])
    ], WireConsoleOverviewComponent);
    return WireConsoleOverviewComponent;
}());
exports.WireConsoleOverviewComponent = WireConsoleOverviewComponent;
//# sourceMappingURL=overview.component.js.map
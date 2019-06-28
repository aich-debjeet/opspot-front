"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var client_1 = require("../../../../services/api/client");
var WireConsoleRewardsComponent = /** @class */ (function () {
    function WireConsoleRewardsComponent(client) {
        this.client = client;
        this.rewardsSaved = false;
        this.opspot = window.Opspot;
        this.rewards = this.opspot.user.wire_rewards;
    }
    WireConsoleRewardsComponent.prototype.onRewardsChange = function (rewards, type) {
        this.rewards.rewards[type] = rewards;
        this.rewardsSaved = false;
    };
    WireConsoleRewardsComponent.prototype.saveRewards = function () {
        var _this = this;
        this.rewards.rewards.points = this._cleanAndSortRewards(this.rewards.rewards.points);
        this.rewards.rewards.money = this._cleanAndSortRewards(this.rewards.rewards.money);
        this.rewards.rewards.tokens = this._cleanAndSortRewards(this.rewards.rewards.tokens);
        this.client.post('api/v1/wire/rewards', {
            rewards: this.rewards
        })
            .then(function () {
            _this.rewardsSaved = true;
        })
            .catch(function (e) {
            alert((e && e.message) || 'Server error');
        });
    };
    WireConsoleRewardsComponent.prototype._cleanAndSortRewards = function (rewards) {
        if (!rewards) {
            return [];
        }
        return rewards
            .filter(function (reward) { return reward.amount || ("" + reward.description).trim(); })
            .map(function (reward) { return (__assign({}, reward, { amount: Math.abs(Math.floor(reward.amount || 0)) })); })
            .sort(function (a, b) { return a.amount > b.amount ? 1 : -1; });
    };
    WireConsoleRewardsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wire-console--rewards--container',
            templateUrl: 'rewards.component.html'
        }),
        __metadata("design:paramtypes", [client_1.Client])
    ], WireConsoleRewardsComponent);
    return WireConsoleRewardsComponent;
}());
exports.WireConsoleRewardsComponent = WireConsoleRewardsComponent;
//# sourceMappingURL=rewards.component.js.map
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
var WireCreatorRewardsComponent = /** @class */ (function () {
    function WireCreatorRewardsComponent() {
        this.selectAmount = new core_1.EventEmitter(true);
    }
    WireCreatorRewardsComponent.prototype.isRewardAboveThreshold = function (index) {
        if (!this.rewards || !this.type || !this.calcAmount()) {
            return false;
        }
        return this.calcAmount() >= this.rewards.rewards[this.type][index].amount;
    };
    WireCreatorRewardsComponent.prototype.isBestReward = function (index) {
        var _this = this;
        if (!this.rewards || !this.type || !this.calcAmount()) {
            return false;
        }
        var lastEligibleReward = this.rewards.rewards[this.type]
            .map(function (reward, index) { return (__assign({}, reward, { index: index })); })
            .filter(function (reward) { return _this.calcAmount() >= reward.amount; })
            .pop();
        return lastEligibleReward ?
            index === lastEligibleReward.index :
            false;
    };
    WireCreatorRewardsComponent.prototype.calcAmount = function () {
        if (this.sums && this.sums[this.type]) {
            return parseFloat(this.sums[this.type]) + parseFloat(this.amount);
        }
        return this.amount;
    };
    WireCreatorRewardsComponent.prototype.selectReward = function (index) {
        this.selectAmount.next(this.rewards.rewards[this.type][index].amount);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireCreatorRewardsComponent.prototype, "rewards", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WireCreatorRewardsComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireCreatorRewardsComponent.prototype, "amount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireCreatorRewardsComponent.prototype, "channel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireCreatorRewardsComponent.prototype, "sums", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WireCreatorRewardsComponent.prototype, "selectAmount", void 0);
    WireCreatorRewardsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wire--creator-rewards',
            templateUrl: 'rewards.component.html'
        })
    ], WireCreatorRewardsComponent);
    return WireCreatorRewardsComponent;
}());
exports.WireCreatorRewardsComponent = WireCreatorRewardsComponent;
//# sourceMappingURL=rewards.component.js.map
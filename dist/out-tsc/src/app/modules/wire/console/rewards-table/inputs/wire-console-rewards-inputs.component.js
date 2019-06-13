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
var session_1 = require("../../../../../services/session");
var WireConsoleRewardsInputsComponent = /** @class */ (function () {
    function WireConsoleRewardsInputsComponent(session) {
        this.session = session;
        this.rewards = [];
        this.rewardsChangeEmitter = new core_1.EventEmitter();
        this.editing = false;
    }
    Object.defineProperty(WireConsoleRewardsInputsComponent.prototype, "_rewards", {
        set: function (rewards) {
            this.rewards = rewards;
            if (!this.rewards) {
                this.rewards = [];
                this.addTier();
            }
        },
        enumerable: true,
        configurable: true
    });
    WireConsoleRewardsInputsComponent.prototype.addTier = function () {
        this.rewards.push({
            amount: '',
            description: ''
        });
        this.rewardsChangeEmitter.emit(this.rewards);
    };
    WireConsoleRewardsInputsComponent.prototype.setAmount = function (index, value) {
        this.rewards[index].amount = value;
        this.rewardsChangeEmitter.emit(this.rewards);
    };
    WireConsoleRewardsInputsComponent.prototype.setDescription = function (index, value) {
        this.rewards[index].description = value;
        this.rewardsChangeEmitter.emit(this.rewards);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireConsoleRewardsInputsComponent.prototype, "channel", void 0);
    __decorate([
        core_1.Input('rewards'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], WireConsoleRewardsInputsComponent.prototype, "_rewards", null);
    __decorate([
        core_1.Output('rewardsChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireConsoleRewardsInputsComponent.prototype, "rewardsChangeEmitter", void 0);
    WireConsoleRewardsInputsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wire-console--rewards--inputs',
            templateUrl: 'wire-console-rewards-inputs.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session])
    ], WireConsoleRewardsInputsComponent);
    return WireConsoleRewardsInputsComponent;
}());
exports.WireConsoleRewardsInputsComponent = WireConsoleRewardsInputsComponent;
//# sourceMappingURL=wire-console-rewards-inputs.component.js.map
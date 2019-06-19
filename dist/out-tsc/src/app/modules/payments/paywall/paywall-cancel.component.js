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
var PaywallCancelButton = /** @class */ (function () {
    function PaywallCancelButton(client) {
        this.client = client;
        this.completed = new core_1.EventEmitter();
        this.inProgress = false;
    }
    PaywallCancelButton.prototype.action = function () {
        var _this = this;
        if (this.inProgress || !this.target) {
            return;
        }
        this.inProgress = true;
        this.client.delete("api/v1/payments/plans/exclusive/" + this.target)
            .then(function (response) {
            _this.inProgress = false;
            _this.completed.emit();
        })
            .catch(function (e) {
            _this.inProgress = false;
            console.error(e);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PaywallCancelButton.prototype, "target", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PaywallCancelButton.prototype, "completed", void 0);
    PaywallCancelButton = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-paywall-cancel-button',
            templateUrl: 'paywall-cancel.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], PaywallCancelButton);
    return PaywallCancelButton;
}());
exports.PaywallCancelButton = PaywallCancelButton;
//# sourceMappingURL=paywall-cancel.component.js.map
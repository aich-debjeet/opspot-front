"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var common_module_1 = require("../../common/common.module");
var checkout_module_1 = require("../checkout/checkout.module");
var modals_module_1 = require("../modals/modals.module");
var paywall_component_1 = require("./paywall/paywall.component");
var paywall_cancel_component_1 = require("./paywall/paywall-cancel.component");
var PaymentsModule = /** @class */ (function () {
    function PaymentsModule() {
    }
    PaymentsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                checkout_module_1.CheckoutModule,
                modals_module_1.ModalsModule
            ],
            declarations: [
                paywall_component_1.PayWall,
                paywall_cancel_component_1.PaywallCancelButton,
            ],
            exports: [
                paywall_component_1.PayWall,
                paywall_cancel_component_1.PaywallCancelButton,
            ]
        })
    ], PaymentsModule);
    return PaymentsModule;
}());
exports.PaymentsModule = PaymentsModule;
//# sourceMappingURL=payments.module.js.map
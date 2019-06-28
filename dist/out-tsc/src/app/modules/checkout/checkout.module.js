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
var forms_1 = require("@angular/forms");
var common_module_1 = require("../../common/common.module");
var card_1 = require("./card/card");
var stripe_checkout_1 = require("./stripe-checkout");
var blockchain_module_1 = require("../blockchain/blockchain.module");
var blockchain_checkout_component_1 = require("./blockchain-checkout.component");
var CheckoutModule = /** @class */ (function () {
    function CheckoutModule() {
    }
    CheckoutModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                blockchain_module_1.BlockchainModule,
            ],
            declarations: [
                card_1.CardInput,
                stripe_checkout_1.StripeCheckout,
                blockchain_checkout_component_1.BlockchainCheckoutComponent
            ],
            exports: [
                card_1.CardInput,
                stripe_checkout_1.StripeCheckout,
                blockchain_checkout_component_1.BlockchainCheckoutComponent
            ]
        })
    ], CheckoutModule);
    return CheckoutModule;
}());
exports.CheckoutModule = CheckoutModule;
//# sourceMappingURL=checkout.module.js.map
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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_module_1 = require("../../common/common.module");
var checkout_module_1 = require("../checkout/checkout.module");
var faq_module_1 = require("../faq/faq.module");
var marketing_component_1 = require("./marketing.component");
var subscription_component_1 = require("./subscription.component");
var verify_component_1 = require("./verify/verify.component");
var plusRoutes = [
    { path: 'plus', component: marketing_component_1.PlusMarketingComponent }
];
var PlusModule = /** @class */ (function () {
    function PlusModule() {
    }
    PlusModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                checkout_module_1.CheckoutModule,
                faq_module_1.FaqModule,
                router_1.RouterModule.forChild(plusRoutes)
            ],
            declarations: [
                marketing_component_1.PlusMarketingComponent,
                subscription_component_1.PlusSubscriptionComponent,
                verify_component_1.PlusVerifyComponent
            ],
            exports: [
                subscription_component_1.PlusSubscriptionComponent,
                verify_component_1.PlusVerifyComponent
            ],
            entryComponents: [
                marketing_component_1.PlusMarketingComponent,
            ]
        })
    ], PlusModule);
    return PlusModule;
}());
exports.PlusModule = PlusModule;
//# sourceMappingURL=plus.module.js.map
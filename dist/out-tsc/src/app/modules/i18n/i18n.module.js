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
var marketing_component_1 = require("./marketing.component");
var i18nRoutes = [
    { path: 'localization', component: marketing_component_1.I18nMarketingComponent }
];
var I18nModule = /** @class */ (function () {
    function I18nModule() {
    }
    I18nModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                checkout_module_1.CheckoutModule,
                router_1.RouterModule.forChild(i18nRoutes)
            ],
            declarations: [
                marketing_component_1.I18nMarketingComponent,
            ],
            exports: [],
            entryComponents: [
                marketing_component_1.I18nMarketingComponent,
            ]
        })
    ], I18nModule);
    return I18nModule;
}());
exports.I18nModule = I18nModule;
//# sourceMappingURL=i18n.module.js.map
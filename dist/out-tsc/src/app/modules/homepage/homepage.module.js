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
var legacy_module_1 = require("../legacy/legacy.module");
var modals_module_1 = require("../modals/modals.module");
var forms_module_1 = require("../forms/forms.module");
var homepage_component_1 = require("./homepage.component");
var marketing_module_1 = require("../marketing/marketing.module");
var experiments_module_1 = require("../experiments/experiments.module");
var routes = [
    { path: '', component: homepage_component_1.HomepageComponent }
];
var HomepageModule = /** @class */ (function () {
    function HomepageModule() {
    }
    HomepageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                legacy_module_1.LegacyModule,
                modals_module_1.ModalsModule,
                forms_module_1.OpspotFormsModule,
                marketing_module_1.MarketingModule,
                experiments_module_1.ExperimentsModule,
            ],
            declarations: [
                homepage_component_1.HomepageComponent,
            ],
            entryComponents: [
                homepage_component_1.HomepageComponent
            ]
        })
    ], HomepageModule);
    return HomepageModule;
}());
exports.HomepageModule = HomepageModule;
//# sourceMappingURL=homepage.module.js.map
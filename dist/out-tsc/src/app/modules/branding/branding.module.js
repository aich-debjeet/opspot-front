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
var branding_component_1 = require("./branding.component");
var routes = [
    { path: 'branding', component: branding_component_1.BrandingComponent }
];
var BrandingModule = /** @class */ (function () {
    function BrandingModule() {
    }
    BrandingModule = __decorate([
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
            ],
            declarations: [
                branding_component_1.BrandingComponent
            ],
            entryComponents: [
                branding_component_1.BrandingComponent
            ]
        })
    ], BrandingModule);
    return BrandingModule;
}());
exports.BrandingModule = BrandingModule;
//# sourceMappingURL=branding.module.js.map
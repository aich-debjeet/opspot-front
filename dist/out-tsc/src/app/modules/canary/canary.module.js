"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_component_1 = require("./page.component");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var common_module_1 = require("../../common/common.module");
var forms_1 = require("@angular/forms");
var routes = [
    {
        path: 'canary',
        component: page_component_1.CanaryPageComponent,
    }
];
var CanaryModule = /** @class */ (function () {
    function CanaryModule() {
    }
    CanaryModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes),
                common_1.CommonModule,
                common_module_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                page_component_1.CanaryPageComponent
            ],
            exports: [
                page_component_1.CanaryPageComponent
            ],
            entryComponents: [
                page_component_1.CanaryPageComponent,
            ]
        })
    ], CanaryModule);
    return CanaryModule;
}());
exports.CanaryModule = CanaryModule;
//# sourceMappingURL=canary.module.js.map
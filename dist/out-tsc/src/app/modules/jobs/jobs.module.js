"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var marketing_component_1 = require("./marketing/marketing.component");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var common_module_1 = require("../../common/common.module");
var forms_1 = require("@angular/forms");
var routes = [
    {
        path: 'jobs',
        component: marketing_component_1.JobsMarketingComponent,
    }
];
var JobsMarketingModule = /** @class */ (function () {
    function JobsMarketingModule() {
    }
    JobsMarketingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes),
                common_1.CommonModule,
                common_module_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                marketing_component_1.JobsMarketingComponent
            ],
            exports: [
                marketing_component_1.JobsMarketingComponent
            ],
            entryComponents: [
                marketing_component_1.JobsMarketingComponent,
            ]
        })
    ], JobsMarketingModule);
    return JobsMarketingModule;
}());
exports.JobsMarketingModule = JobsMarketingModule;
//# sourceMappingURL=jobs.module.js.map
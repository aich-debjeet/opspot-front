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
var faq_component_1 = require("./faq.component");
var faq_service_1 = require("./faq.service");
var faq_page_1 = require("./faq.page");
var faqRoutes = [
    { path: 'faq/:category', component: faq_page_1.FaqPage },
    { path: 'faq', component: faq_page_1.FaqPage }
];
var FaqModule = /** @class */ (function () {
    function FaqModule() {
    }
    FaqModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                router_1.RouterModule.forChild(faqRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                faq_component_1.FaqComponent,
                faq_page_1.FaqPage,
            ],
            exports: [
                faq_component_1.FaqComponent,
            ],
            entryComponents: [
                faq_page_1.FaqPage,
            ],
            providers: [
                faq_service_1.FaqService,
            ],
        })
    ], FaqModule);
    return FaqModule;
}());
exports.FaqModule = FaqModule;
//# sourceMappingURL=faq.module.js.map
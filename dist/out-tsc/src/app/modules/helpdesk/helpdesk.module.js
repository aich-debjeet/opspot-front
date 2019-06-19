"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var common_module_1 = require("../../common/common.module");
var forms_1 = require("@angular/forms");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var questions_component_1 = require("./questions/questions.component");
var creator_component_1 = require("./creator/question/creator.component");
var creator_component_2 = require("./creator/category/creator.component");
var legacy_module_1 = require("../../modules/legacy/legacy.module");
var related_component_1 = require("./questions/related/related.component");
var search_component_1 = require("./questions/search/search.component");
var suggested_component_1 = require("./questions/suggested/suggested.component");
var all_component_1 = require("./dashboard/all.component");
var routes = [
    { path: 'help', component: dashboard_component_1.HelpdeskDashboardComponent },
    { path: 'help/category/edit/:uuid', component: creator_component_2.CategoryCreatorComponent },
    { path: 'help/question/edit/:uuid', component: creator_component_1.QuestionCreatorComponent },
    { path: 'help/question/:uuid', component: questions_component_1.QuestionsComponent }
];
var HelpdeskModule = /** @class */ (function () {
    function HelpdeskModule() {
    }
    HelpdeskModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                legacy_module_1.LegacyModule
            ],
            exports: [],
            declarations: [
                dashboard_component_1.HelpdeskDashboardComponent,
                questions_component_1.QuestionsComponent,
                creator_component_2.CategoryCreatorComponent,
                creator_component_1.QuestionCreatorComponent,
                related_component_1.RelatedQuestionsComponent,
                search_component_1.SearchQuestionsComponent,
                suggested_component_1.SuggestedQuestionsComponent,
                all_component_1.AllHelpdeskDashboardComponent,
            ],
            providers: [],
        })
    ], HelpdeskModule);
    return HelpdeskModule;
}());
exports.HelpdeskModule = HelpdeskModule;
//# sourceMappingURL=helpdesk.module.js.map
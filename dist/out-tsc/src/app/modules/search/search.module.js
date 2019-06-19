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
var common_module_1 = require("../../common/common.module");
var forms_1 = require("@angular/forms");
var hybrid_component_1 = require("./list/hybrid.component");
var simple_component_1 = require("./list/simple.component");
var suggestions_component_1 = require("./suggestions/suggestions.component");
var bar_component_1 = require("./bar.component");
var search_component_1 = require("./search.component");
var searchRoutes = [
    { path: 'search', component: search_component_1.SearchComponent }
];
var SearchModule = /** @class */ (function () {
    function SearchModule() {
    }
    SearchModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forChild(searchRoutes),
                common_module_1.CommonModule
            ],
            declarations: [
                hybrid_component_1.SearchHybridListComponent,
                simple_component_1.SearchSimpleListComponent,
                suggestions_component_1.SearchBarSuggestionsComponent,
                bar_component_1.SearchBarComponent,
                search_component_1.SearchComponent
            ],
            providers: [],
            exports: [
                hybrid_component_1.SearchHybridListComponent,
                simple_component_1.SearchSimpleListComponent,
                suggestions_component_1.SearchBarSuggestionsComponent,
                bar_component_1.SearchBarComponent,
            ],
            entryComponents: [
                search_component_1.SearchComponent
            ]
        })
    ], SearchModule);
    return SearchModule;
}());
exports.SearchModule = SearchModule;
//# sourceMappingURL=search.module.js.map
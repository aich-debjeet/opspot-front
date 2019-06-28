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
var forms_1 = require("@angular/forms");
var legacy_module_1 = require("../legacy/legacy.module");
var common_module_1 = require("../../common/common.module");
var sidebar_component_1 = require("./channel/sidebar.component");
var sidebar_component_2 = require("./groups/sidebar.component");
var SuggestionsModule = /** @class */ (function () {
    function SuggestionsModule() {
    }
    SuggestionsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_module_1.CommonModule,
                common_1.CommonModule,
                router_1.RouterModule,
                legacy_module_1.LegacyModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                sidebar_component_1.SuggestionsSidebar,
                sidebar_component_2.GroupSuggestionsSidebarComponent,
            ],
            exports: [
                sidebar_component_1.SuggestionsSidebar,
                sidebar_component_2.GroupSuggestionsSidebarComponent,
            ],
        })
    ], SuggestionsModule);
    return SuggestionsModule;
}());
exports.SuggestionsModule = SuggestionsModule;
//# sourceMappingURL=suggestions.module.js.map
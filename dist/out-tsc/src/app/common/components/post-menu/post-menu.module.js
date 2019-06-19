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
var post_menu_component_1 = require("./post-menu.component");
var modals_module_1 = require("../../../modules/modals/modals.module");
var forms_1 = require("@angular/forms");
var common_module_1 = require("../../common.module");
var PostMenuModule = /** @class */ (function () {
    function PostMenuModule() {
    }
    PostMenuModule = __decorate([
        core_1.NgModule({
            imports: [
                common_module_1.CommonModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                modals_module_1.ModalsModule
            ],
            exports: [post_menu_component_1.PostMenuComponent],
            declarations: [post_menu_component_1.PostMenuComponent],
            providers: [],
            entryComponents: [post_menu_component_1.PostMenuComponent]
        })
    ], PostMenuModule);
    return PostMenuModule;
}());
exports.PostMenuModule = PostMenuModule;
//# sourceMappingURL=post-menu.module.js.map
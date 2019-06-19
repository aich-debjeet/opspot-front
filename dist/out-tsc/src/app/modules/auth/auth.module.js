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
var login_component_1 = require("./login.component");
var logout_component_1 = require("./logout.component");
var register_component_1 = require("./register.component");
var forgot_password_component_1 = require("./forgot-password/forgot-password.component");
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'logout/all', component: logout_component_1.LogoutComponent },
    { path: 'logout', component: logout_component_1.LogoutComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'forgot-password', component: forgot_password_component_1.ForgotPasswordComponent }
];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
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
                login_component_1.LoginComponent,
                logout_component_1.LogoutComponent,
                register_component_1.RegisterComponent,
                forgot_password_component_1.ForgotPasswordComponent,
            ],
            entryComponents: [
                login_component_1.LoginComponent,
                logout_component_1.LogoutComponent,
                register_component_1.RegisterComponent,
                forgot_password_component_1.ForgotPasswordComponent,
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
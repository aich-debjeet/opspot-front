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
var login_1 = require("./login/login");
var register_1 = require("./register/register");
var fb_register_1 = require("./fb-register/fb-register");
var onboarding_1 = require("./onboarding/onboarding");
var categories_selector_1 = require("./categories-selector/categories-selector");
var tutorial_1 = require("./tutorial/tutorial");
var captcha_module_1 = require("../captcha/captcha.module");
var experiments_module_1 = require("../experiments/experiments.module");
var OpspotFormsModule = /** @class */ (function () {
    function OpspotFormsModule() {
    }
    OpspotFormsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                router_1.RouterModule.forChild([]),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                captcha_module_1.CaptchaModule,
                experiments_module_1.ExperimentsModule,
            ],
            declarations: [
                login_1.LoginForm,
                register_1.RegisterForm,
                fb_register_1.FbRegisterForm,
                onboarding_1.OnboardingForm,
                categories_selector_1.OnboardingCategoriesSelector,
                tutorial_1.Tutorial
            ],
            exports: [
                login_1.LoginForm,
                register_1.RegisterForm,
                fb_register_1.FbRegisterForm,
                onboarding_1.OnboardingForm,
                categories_selector_1.OnboardingCategoriesSelector,
                tutorial_1.Tutorial
            ]
        })
    ], OpspotFormsModule);
    return OpspotFormsModule;
}());
exports.OpspotFormsModule = OpspotFormsModule;
//# sourceMappingURL=forms.module.js.map
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
var forms_module_1 = require("../forms/forms.module");
var confirm_1 = require("./confirm/confirm");
var invite_1 = require("./invite/invite");
var remind_composer_1 = require("./remind-composer/remind-composer");
var share_1 = require("./share/share");
var signup_on_action_1 = require("./signup/signup-on-action");
var signup_on_scroll_1 = require("./signup/signup-on-scroll");
var modal_component_1 = require("./confirm-password/modal.component");
var signup_1 = require("./signup/signup");
var tos_component_1 = require("./tos-updated/tos.component");
var ModalsModule = /** @class */ (function () {
    function ModalsModule() {
    }
    ModalsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                router_1.RouterModule.forChild([]),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                forms_module_1.OpspotFormsModule
            ],
            declarations: [
                confirm_1.ConfirmModal,
                invite_1.InviteModal,
                remind_composer_1.RemindComposerModal,
                share_1.ShareModal,
                signup_on_action_1.SignupOnActionModal,
                signup_on_scroll_1.SignupOnScrollModal,
                signup_1.SignupModal,
                modal_component_1.ConfirmPasswordModalComponent,
                tos_component_1.TOSUpdatedModal,
            ],
            entryComponents: [
                modal_component_1.ConfirmPasswordModalComponent
            ],
            exports: [
                confirm_1.ConfirmModal,
                invite_1.InviteModal,
                remind_composer_1.RemindComposerModal,
                share_1.ShareModal,
                signup_on_action_1.SignupOnActionModal,
                signup_on_scroll_1.SignupOnScrollModal,
                signup_1.SignupModal,
                tos_component_1.TOSUpdatedModal,
            ]
        })
    ], ModalsModule);
    return ModalsModule;
}());
exports.ModalsModule = ModalsModule;
//# sourceMappingURL=modals.module.js.map
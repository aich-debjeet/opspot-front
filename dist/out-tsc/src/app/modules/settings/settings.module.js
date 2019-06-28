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
var checkout_module_1 = require("../checkout/checkout.module");
var modals_module_1 = require("../modals/modals.module");
var common_module_1 = require("../../common/common.module");
var legacy_module_1 = require("../legacy/legacy.module");
var report_module_1 = require("../report/report.module");
var payments_module_1 = require("../payments/payments.module");
var settings_component_1 = require("./settings.component");
var general_component_1 = require("./general/general.component");
var disable_component_1 = require("./disable/disable.component");
var two_factor_component_1 = require("./two-factor/two-factor.component");
var subscriptions_component_1 = require("./subscriptions/subscriptions.component");
var emails_component_1 = require("./emails/emails.component");
var billing_component_1 = require("./billing/billing.component");
var saved_cards_component_1 = require("./billing/saved-cards/saved-cards.component");
var subscriptions_component_2 = require("./billing/subscriptions/subscriptions.component");
var reported_content_component_1 = require("./reported-content/reported-content.component");
var settings_service_1 = require("./settings.service");
var wire_component_1 = require("./wire/wire.component");
var wire_module_1 = require("../wire/wire.module");
var p2pmedia_component_1 = require("./p2pmedia/p2pmedia.component");
var settingsRoutes = [
    { path: 'settings', component: settings_component_1.SettingsComponent,
        children: [
            { path: '', redirectTo: 'general', pathMatch: 'full' },
            { path: 'general/:card', component: general_component_1.SettingsGeneralComponent },
            { path: 'general', component: general_component_1.SettingsGeneralComponent },
            { path: 'wire', component: wire_component_1.SettingsWireComponent },
            { path: 'disable', component: disable_component_1.SettingsDisableChannelComponent },
            { path: 'twoFactor', component: two_factor_component_1.SettingsTwoFactorComponent },
            { path: 'emails', component: emails_component_1.SettingsEmailsComponent },
            { path: 'billing', component: billing_component_1.SettingsBillingComponent },
            { path: 'reported-content', component: reported_content_component_1.SettingsReportedContentComponent },
            { path: 'p2pmedia', component: p2pmedia_component_1.SettingsP2PMediaComponent },
        ]
    }
];
var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                checkout_module_1.CheckoutModule,
                modals_module_1.ModalsModule,
                legacy_module_1.LegacyModule,
                router_1.RouterModule.forChild(settingsRoutes),
                report_module_1.ReportModule,
                payments_module_1.PaymentsModule,
                wire_module_1.WireModule,
            ],
            declarations: [
                settings_component_1.SettingsComponent,
                general_component_1.SettingsGeneralComponent,
                disable_component_1.SettingsDisableChannelComponent,
                two_factor_component_1.SettingsTwoFactorComponent,
                subscriptions_component_1.SettingsSubscriptionsComponent,
                emails_component_1.SettingsEmailsComponent,
                billing_component_1.SettingsBillingComponent,
                saved_cards_component_1.SettingsBillingSavedCardsComponent,
                subscriptions_component_2.SettingsBillingSubscriptionsComponent,
                reported_content_component_1.SettingsReportedContentComponent,
                wire_component_1.SettingsWireComponent,
                p2pmedia_component_1.SettingsP2PMediaComponent,
            ],
            providers: [
                settings_service_1.SettingsService,
            ],
            exports: [
                saved_cards_component_1.SettingsBillingSavedCardsComponent,
                subscriptions_component_2.SettingsBillingSubscriptionsComponent
            ],
        })
    ], SettingsModule);
    return SettingsModule;
}());
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map
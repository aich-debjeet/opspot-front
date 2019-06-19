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
var wallet_module_1 = require("../wallet/wallet.module");
var faq_module_1 = require("../faq/faq.module");
var monetization_overview_module_1 = require("./monetization.overview.module");
var transactions_component_1 = require("../wallet/transactions/transactions.component");
var marketing_component_1 = require("./marketing.component");
var terms_component_1 = require("./terms.component");
var onboarding_component_1 = require("./onboarding/onboarding.component");
var marketing_component_2 = require("./affiliate/marketing.component");
var link_component_1 = require("./affiliate/link.component");
var terms_component_2 = require("./affiliate/terms.component");
var graph_component_1 = require("./revenue/graph.component");
var ledger_component_1 = require("./revenue/ledger.component");
var options_component_1 = require("./revenue/options.component");
var console_component_1 = require("./revenue/console.component");
// external
var wallet_component_1 = require("../wallet/wallet.component");
var monetizationRoutes = [
    //{ path: 'affiliates',  component: AffiliateMarketingComponent },
    //{ path: 'monetization', component: MonetizationMarketingComponent },
    { path: 'wallet/revenue', component: wallet_component_1.WalletComponent,
        children: [
            { path: '', redirectTo: 'earnings', pathMatch: 'full' },
            { path: 'points', component: transactions_component_1.WalletTransactionsComponent },
            { path: 'points/:stub', component: transactions_component_1.WalletTransactionsComponent },
            { path: 'earnings', component: ledger_component_1.RevenueLedgerComponent },
            { path: 'payouts', component: ledger_component_1.RevenueLedgerComponent },
            { path: 'options', component: options_component_1.RevenueOptionsComponent },
            { path: 'affiliates', component: link_component_1.AffiliateLinkComponent },
        ]
    }
];
var MonetizationModule = /** @class */ (function () {
    function MonetizationModule() {
    }
    MonetizationModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                wallet_module_1.WalletModule,
                faq_module_1.FaqModule,
                monetization_overview_module_1.MonetizationOverviewModule,
                router_1.RouterModule.forChild(monetizationRoutes)
            ],
            declarations: [
                marketing_component_1.MonetizationMarketingComponent,
                terms_component_1.MonetizationTermsComponent,
                onboarding_component_1.MonetizationOnboardingComponent,
                marketing_component_2.AffiliateMarketingComponent,
                link_component_1.AffiliateLinkComponent,
                terms_component_2.AffiliateTermsComponent,
                graph_component_1.RevenueGraphComponent,
                ledger_component_1.RevenueLedgerComponent,
                options_component_1.RevenueOptionsComponent,
                console_component_1.RevenueConsoleComponent,
            ],
            exports: [
                marketing_component_1.MonetizationMarketingComponent,
                terms_component_1.MonetizationTermsComponent,
                onboarding_component_1.MonetizationOnboardingComponent,
                marketing_component_2.AffiliateMarketingComponent,
                terms_component_2.AffiliateTermsComponent,
                graph_component_1.RevenueGraphComponent,
                ledger_component_1.RevenueLedgerComponent,
                options_component_1.RevenueOptionsComponent,
                router_1.RouterModule
            ],
            entryComponents: [
                marketing_component_1.MonetizationMarketingComponent,
                marketing_component_2.AffiliateMarketingComponent,
                link_component_1.AffiliateLinkComponent,
                console_component_1.RevenueConsoleComponent,
            ]
        })
    ], MonetizationModule);
    return MonetizationModule;
}());
exports.MonetizationModule = MonetizationModule;
//# sourceMappingURL=monetization.module.js.map
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
var monetization_overview_module_1 = require("../monetization/monetization.overview.module");
var checkout_module_1 = require("../checkout/checkout.module");
var ads_module_1 = require("../ads/ads.module");
var wire_module_1 = require("../wire/wire.module");
var blockchain_module_1 = require("../blockchain/blockchain.module");
var plus_module_1 = require("../plus/plus.module");
var wallet_component_1 = require("./wallet.component");
var points_overview_component_1 = require("./points-overview.component");
var overview_component_1 = require("./overview/overview.component");
var transactions_component_1 = require("./transactions/transactions.component");
var points_component_1 = require("./transactions/points.component");
var purchase_component_1 = require("./purchase/purchase.component");
var wire_component_1 = require("./wire/wire.component");
var toggle_component_1 = require("./toggle.component");
var flyout_component_1 = require("./flyout/flyout.component");
var tokens_component_1 = require("./tokens/tokens.component");
var points_component_2 = require("./points/points.component");
var animations_1 = require("@angular/platform-browser/animations");
var settings_component_1 = require("./tokens/settings/settings.component");
var transactions_component_2 = require("./tokens/transactions/transactions.component");
var contributions_component_1 = require("./tokens/contributions/contributions.component");
var withdraw_component_1 = require("./tokens/withdraw/withdraw.component");
var join_component_1 = require("./tokens/join/join.component");
var balance_component_1 = require("./balances/usd/balance.component");
var balance_component_2 = require("./balances/tokens/balance.component");
var balance_component_3 = require("./balances/rewards/balance.component");
var usd_component_1 = require("./usd/usd.component");
var earnings_component_1 = require("./usd/earnings.component");
var payouts_component_1 = require("./usd/payouts.component");
var settings_component_2 = require("./usd/settings.component");
var ledger_component_1 = require("./tokens/withdraw/ledger/ledger.component");
var addresses_component_1 = require("./tokens/addresses/addresses.component");
var onboarding_module_1 = require("./tokens/onboarding/onboarding.module");
var overview_component_2 = require("./tokens/contributions/overview.component");
var chart_component_1 = require("./tokens/contributions/chart.component");
var _101_component_1 = require("./tokens/101/101.component");
var modals_module_1 = require("../modals/modals.module");
var testnet_component_1 = require("./tokens/testnet/testnet.component");
var walletRoutes = [
    { path: 'wallet', component: wallet_component_1.WalletComponent,
        children: [
            { path: '', redirectTo: 'tokens', pathMatch: 'full' },
            { path: 'overview', redirectTo: 'tokens', pathMatch: 'full' },
            { path: '101', redirectTo: 'tokens/101', pathMatch: 'full' },
            //{ path: 'overview', component: WalletOverviewComponent },
            //{ path: 'points', component: WalletPointsComponent },
            //{ path: 'points/purchase', component: WalletPurchaseComponent },
            { path: 'tokens', component: tokens_component_1.WalletTokensComponent,
                children: [
                    { path: '', redirectTo: 'contributions', pathMatch: 'full' },
                    { path: 'transactions/:contract', component: transactions_component_2.WalletTokenTransactionsComponent },
                    { path: 'transactions', component: transactions_component_2.WalletTokenTransactionsComponent },
                    { path: 'withdraw', component: withdraw_component_1.WalletTokenWithdrawComponent },
                    { path: 'contributions/join', component: join_component_1.WalletTokenJoinComponent },
                    { path: 'contributions', component: contributions_component_1.WalletTokenContributionsComponent },
                    { path: 'addresses', component: addresses_component_1.WalletTokenAddressesComponent },
                    { path: '101', component: _101_component_1.WalletToken101Component },
                    { path: 'testnet', component: testnet_component_1.WalletTokenTestnetComponent },
                ]
            },
            { path: 'usd', component: usd_component_1.WalletUSDComponent,
                children: [
                    { path: '', redirectTo: 'earnings', pathMatch: 'full' },
                    { path: 'earnings', component: earnings_component_1.WalletUSDEarningsComponent },
                    { path: 'payouts', component: payouts_component_1.WalletUSDPayoutsComponent },
                    { path: 'settings', component: settings_component_2.WalletUSDSettingsComponent },
                ]
            },
            { path: 'wire', component: wire_component_1.WalletWireComponent },
            { path: '**', component: overview_component_1.WalletOverviewComponent },
        ]
    }
];
var WalletModule = /** @class */ (function () {
    function WalletModule() {
    }
    WalletModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                checkout_module_1.CheckoutModule,
                monetization_overview_module_1.MonetizationOverviewModule,
                router_1.RouterModule.forChild(walletRoutes),
                ads_module_1.AdsModule,
                wire_module_1.WireModule,
                blockchain_module_1.BlockchainModule,
                onboarding_module_1.TokenOnboardingModule,
                plus_module_1.PlusModule,
                modals_module_1.ModalsModule,
            ],
            declarations: [
                wallet_component_1.WalletComponent,
                points_overview_component_1.PointsOverviewComponent,
                overview_component_1.WalletOverviewComponent,
                transactions_component_1.WalletTransactionsComponent,
                points_component_1.WalletPointsTransactionsComponent,
                purchase_component_1.WalletPurchaseComponent,
                wire_component_1.WalletWireComponent,
                toggle_component_1.WalletToggleComponent,
                flyout_component_1.WalletFlyoutComponent,
                transactions_component_2.WalletTokenTransactionsComponent,
                contributions_component_1.WalletTokenContributionsComponent,
                settings_component_1.WalletTokenSettingsComponent,
                ledger_component_1.WalletTokenWithdrawLedgerComponent,
                withdraw_component_1.WalletTokenWithdrawComponent,
                join_component_1.WalletTokenJoinComponent,
                tokens_component_1.WalletTokensComponent,
                points_component_2.WalletPointsComponent,
                balance_component_1.WalletBalanceUSDComponent,
                balance_component_2.WalletBalanceTokensComponent,
                balance_component_3.WalletBalanceRewardsComponent,
                usd_component_1.WalletUSDComponent,
                earnings_component_1.WalletUSDEarningsComponent,
                payouts_component_1.WalletUSDPayoutsComponent,
                settings_component_2.WalletUSDSettingsComponent,
                addresses_component_1.WalletTokenAddressesComponent,
                overview_component_2.WalletTokenContributionsOverviewComponent,
                chart_component_1.WalletTokenContributionsChartComponent,
                _101_component_1.WalletToken101Component,
                testnet_component_1.WalletTokenTestnetComponent,
            ],
            exports: [
                wallet_component_1.WalletComponent,
                points_overview_component_1.PointsOverviewComponent,
                transactions_component_1.WalletTransactionsComponent,
                points_component_1.WalletPointsTransactionsComponent,
                purchase_component_1.WalletPurchaseComponent,
                wire_component_1.WalletWireComponent,
                toggle_component_1.WalletToggleComponent,
                flyout_component_1.WalletFlyoutComponent,
                balance_component_1.WalletBalanceUSDComponent,
            ],
            entryComponents: [wallet_component_1.WalletComponent]
        })
    ], WalletModule);
    return WalletModule;
}());
exports.WalletModule = WalletModule;
//# sourceMappingURL=wallet.module.js.map
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
var checkout_module_1 = require("../checkout/checkout.module");
var third_party_networks_module_1 = require("../third-party-networks/third-party-networks.module");
var ads_module_1 = require("../ads/ads.module");
var faq_module_1 = require("../faq/faq.module");
var creator_component_1 = require("./creator/creator.component");
var payment_methods_component_1 = require("./creator/payment-methods/payment-methods.component");
var checkout_component_1 = require("./creator/checkout/checkout.component");
var p2p_search_component_1 = require("./creator/p2p-search/p2p-search.component");
var categories_component_1 = require("./creator/categories/categories.component");
var console_component_1 = require("./console/console.component");
var types_component_1 = require("./console/types.component");
var history_component_1 = require("./console/history.component");
var network_component_1 = require("./console/list/network.component");
var p2p_component_1 = require("./console/list/p2p.component");
var card_component_1 = require("./console/card/card.component");
var booster_component_1 = require("./console/booster/booster.component");
var marketing_component_1 = require("./marketing.component");
var publisher_component_1 = require("./publisher/publisher.component");
var earnings_component_1 = require("./publisher/earnings/earnings.component");
var payouts_component_1 = require("./publisher/payouts/payouts.component");
var settings_component_1 = require("./publisher/settings/settings.component");
var ledger_component_1 = require("./publisher/ledger/ledger.component");
var boostRoutes = [
    { path: 'boost/console', component: console_component_1.BoostConsoleComponent,
        children: [
            { path: '', redirectTo: 'newsfeed/history', pathMatch: 'full' },
            { path: 'publisher', component: publisher_component_1.BoostPublisherComponent,
                children: [
                    { path: '', redirectTo: 'earnings', pathMatch: 'full' },
                    { path: 'earnings', component: earnings_component_1.BoostPublisherEarningsComponent },
                    { path: 'payouts', component: payouts_component_1.BoostPublisherPayoutsComponent },
                    { path: 'settings', component: settings_component_1.BoostPublisherSettingsComponent },
                ]
            },
            { path: 'publisher/:filter', component: publisher_component_1.BoostPublisherComponent },
            { path: ':type', component: types_component_1.BoostConsoleTypesComponent,
                children: [
                    { path: '', redirectTo: 'history', pathMatch: 'full' },
                    { path: 'create', component: booster_component_1.BoostConsoleBooster },
                    { path: 'history', component: history_component_1.BoostConsoleHistoryComponent },
                    { path: 'history/:filter', component: history_component_1.BoostConsoleHistoryComponent },
                ]
            },
        ]
    },
    { path: 'boost', component: marketing_component_1.BoostMarketingComponent }
];
var BoostModule = /** @class */ (function () {
    function BoostModule() {
    }
    BoostModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forChild(boostRoutes),
                common_module_1.CommonModule,
                checkout_module_1.CheckoutModule,
                third_party_networks_module_1.ThirdPartyNetworksModule,
                ads_module_1.AdsModule,
                faq_module_1.FaqModule
            ],
            declarations: [
                creator_component_1.BoostCreatorComponent,
                publisher_component_1.BoostPublisherComponent,
                console_component_1.BoostConsoleComponent,
                network_component_1.BoostConsoleNetworkListComponent,
                p2p_component_1.BoostConsoleP2PListComponent,
                card_component_1.BoostConsoleCard,
                booster_component_1.BoostConsoleBooster,
                marketing_component_1.BoostMarketingComponent,
                payment_methods_component_1.BoostCreatorPaymentMethodsComponent,
                checkout_component_1.BoostCreatorCheckoutComponent,
                p2p_search_component_1.BoostCreatorP2PSearchComponent,
                categories_component_1.BoostCreatorCategoriesComponent,
                types_component_1.BoostConsoleTypesComponent,
                history_component_1.BoostConsoleHistoryComponent,
                earnings_component_1.BoostPublisherEarningsComponent,
                payouts_component_1.BoostPublisherPayoutsComponent,
                settings_component_1.BoostPublisherSettingsComponent,
                ledger_component_1.BoostPublisherLedgerComponent,
            ],
            exports: [
                network_component_1.BoostConsoleNetworkListComponent,
                p2p_component_1.BoostConsoleP2PListComponent,
                card_component_1.BoostConsoleCard,
                booster_component_1.BoostConsoleBooster
            ],
            entryComponents: [
                creator_component_1.BoostCreatorComponent,
                console_component_1.BoostConsoleComponent,
                marketing_component_1.BoostMarketingComponent,
            ]
        })
    ], BoostModule);
    return BoostModule;
}());
exports.BoostModule = BoostModule;
//# sourceMappingURL=boost.module.js.map
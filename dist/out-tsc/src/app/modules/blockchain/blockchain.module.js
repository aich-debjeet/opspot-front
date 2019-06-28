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
var common_module_1 = require("../../common/common.module");
var faq_module_1 = require("../faq/faq.module");
var wallet_component_1 = require("../wallet/wallet.component");
var console_component_1 = require("./console/console.component");
var forms_1 = require("@angular/forms");
var wallet_selector_component_1 = require("./wallet-selector/wallet-selector.component");
var wallet_address_notice_component_1 = require("./wallet-address-notice/wallet-address-notice.component");
var transaction_overlay_component_1 = require("./transaction-overlay/transaction-overlay.component");
var transaction_overlay_service_1 = require("./transaction-overlay/transaction-overlay.service");
var tde_buy_component_1 = require("./tde-buy/tde-buy.component");
var web3_wallet_service_1 = require("./web3-wallet.service");
var token_contract_service_1 = require("./contracts/token-contract.service");
var boost_contract_service_1 = require("./contracts/boost-contract.service");
var wire_contract_service_1 = require("./contracts/wire-contract.service");
var withdraw_contract_service_1 = require("./contracts/withdraw-contract.service");
var token_distribution_event_service_1 = require("./contracts/token-distribution-event.service");
var local_wallet_service_1 = require("./local-wallet.service");
var offchain_payment_service_1 = require("./offchain-payment.service");
var client_1 = require("../../services/api/client");
var cryptoRoutes = [
    {
        path: 'wallet/crypto',
        component: wallet_component_1.WalletComponent,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: console_component_1.BlockchainConsoleComponent }
        ]
    },
];
var BlockchainModule = /** @class */ (function () {
    function BlockchainModule() {
    }
    BlockchainModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(cryptoRoutes),
                common_1.CommonModule,
                common_module_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                faq_module_1.FaqModule,
            ],
            declarations: [
                console_component_1.BlockchainConsoleComponent,
                wallet_selector_component_1.BlockchainWalletSelector,
                wallet_address_notice_component_1.BlockchainWalletAddressNoticeComponent,
                transaction_overlay_component_1.TransactionOverlayComponent,
                tde_buy_component_1.BlockchainTdeBuyComponent,
            ],
            providers: [
                transaction_overlay_service_1.TransactionOverlayService,
                {
                    provide: local_wallet_service_1.LocalWalletService,
                    useFactory: local_wallet_service_1.LocalWalletService._,
                    deps: [transaction_overlay_service_1.TransactionOverlayService]
                },
                {
                    provide: web3_wallet_service_1.Web3WalletService,
                    useFactory: web3_wallet_service_1.Web3WalletService._,
                    deps: [local_wallet_service_1.LocalWalletService, transaction_overlay_service_1.TransactionOverlayService]
                },
                {
                    provide: token_contract_service_1.TokenContractService,
                    useFactory: token_contract_service_1.TokenContractService._,
                    deps: [web3_wallet_service_1.Web3WalletService, transaction_overlay_service_1.TransactionOverlayService]
                },
                {
                    provide: wire_contract_service_1.WireContractService,
                    useFactory: wire_contract_service_1.WireContractService._,
                    deps: [web3_wallet_service_1.Web3WalletService, token_contract_service_1.TokenContractService]
                },
                {
                    provide: withdraw_contract_service_1.WithdrawContractService,
                    useFactory: withdraw_contract_service_1.WithdrawContractService._,
                    deps: [web3_wallet_service_1.Web3WalletService]
                },
                {
                    provide: boost_contract_service_1.BoostContractService,
                    useFactory: boost_contract_service_1.BoostContractService._,
                    deps: [web3_wallet_service_1.Web3WalletService, token_contract_service_1.TokenContractService]
                },
                {
                    provide: token_distribution_event_service_1.TokenDistributionEventService,
                    useFactory: token_distribution_event_service_1.TokenDistributionEventService._,
                    deps: [web3_wallet_service_1.Web3WalletService]
                },
                {
                    provide: offchain_payment_service_1.OffchainPaymentService,
                    useFactory: offchain_payment_service_1.OffchainPaymentService._,
                    deps: [client_1.Client]
                }
            ],
            exports: [
                wallet_selector_component_1.BlockchainWalletSelector,
                wallet_address_notice_component_1.BlockchainWalletAddressNoticeComponent,
                transaction_overlay_component_1.TransactionOverlayComponent,
                tde_buy_component_1.BlockchainTdeBuyComponent
            ],
            entryComponents: [
                tde_buy_component_1.BlockchainTdeBuyComponent,
            ]
        })
    ], BlockchainModule);
    return BlockchainModule;
}());
exports.BlockchainModule = BlockchainModule;
//# sourceMappingURL=blockchain.module.js.map
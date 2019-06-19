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
var common_module_1 = require("../../../../common/common.module");
var blockchain_module_1 = require("../../../blockchain/blockchain.module");
var plus_module_1 = require("../../../plus/plus.module");
var onboarding_component_1 = require("./onboarding.component");
var introduction_component_1 = require("./introduction/introduction.component");
var rewards_component_1 = require("./rewards/rewards.component");
var onchain_component_1 = require("./onchain/onchain.component");
var completed_component_1 = require("./completed/completed.component");
var video_component_1 = require("./video.component");
var onboarding_service_1 = require("./onboarding.service");
var TokenOnboardingModule = /** @class */ (function () {
    function TokenOnboardingModule() {
    }
    TokenOnboardingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonModule,
                blockchain_module_1.BlockchainModule,
                router_1.RouterModule,
                plus_module_1.PlusModule,
            ],
            declarations: [
                onboarding_component_1.TokenOnboardingComponent,
                introduction_component_1.TokenIntroductionOnboardingComponent,
                rewards_component_1.TokenRewardsOnboardingComponent,
                onchain_component_1.TokenOnChainOnboardingComponent,
                completed_component_1.TokenCompletedOnboardingComponent,
                video_component_1.TokenOnboardingVideoComponent,
            ],
            exports: [
                onboarding_component_1.TokenOnboardingComponent,
                rewards_component_1.TokenRewardsOnboardingComponent,
                onchain_component_1.TokenOnChainOnboardingComponent,
            ],
            entryComponents: [
                introduction_component_1.TokenIntroductionOnboardingComponent,
                introduction_component_1.TokenIntroductionOnboardingComponent,
                rewards_component_1.TokenRewardsOnboardingComponent,
                onchain_component_1.TokenOnChainOnboardingComponent,
                onboarding_component_1.TokenOnboardingComponent,
            ],
            providers: [
                {
                    provide: onboarding_service_1.TokenOnboardingService,
                    useClass: onboarding_service_1.TokenOnboardingService,
                },
            ]
        })
    ], TokenOnboardingModule);
    return TokenOnboardingModule;
}());
exports.TokenOnboardingModule = TokenOnboardingModule;
//# sourceMappingURL=onboarding.module.js.map
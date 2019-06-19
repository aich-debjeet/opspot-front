"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var introduction_component_1 = require("./introduction/introduction.component");
var rewards_component_1 = require("./rewards/rewards.component");
var onchain_component_1 = require("./onchain/onchain.component");
var completed_component_1 = require("./completed/completed.component");
var TokenOnboardingService = /** @class */ (function () {
    function TokenOnboardingService() {
        this.slides = [
            introduction_component_1.TokenIntroductionOnboardingComponent,
            rewards_component_1.TokenRewardsOnboardingComponent,
            onchain_component_1.TokenOnChainOnboardingComponent,
            completed_component_1.TokenCompletedOnboardingComponent
        ];
        this.currentSlide = 0;
        this.completed = false;
    }
    TokenOnboardingService.prototype.next = function () {
        if (this.currentSlide > this.slides.length) {
            this.completed = true;
            return;
        }
        this.currentSlide++;
    };
    Object.defineProperty(TokenOnboardingService.prototype, "slide", {
        get: function () {
            return this.slides[this.currentSlide];
        },
        enumerable: true,
        configurable: true
    });
    return TokenOnboardingService;
}());
exports.TokenOnboardingService = TokenOnboardingService;
//# sourceMappingURL=onboarding.service.js.map
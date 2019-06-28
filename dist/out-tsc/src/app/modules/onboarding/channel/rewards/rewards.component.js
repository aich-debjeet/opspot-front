"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var client_1 = require("../../../../services/api/client");
var session_1 = require("../../../../services/session");
var router_1 = require("@angular/router");
var TokenRewardsOnboardingComponent = /** @class */ (function () {
    function TokenRewardsOnboardingComponent(client, cd, session, router) {
        this.client = client;
        this.cd = cd;
        this.session = session;
        this.router = router;
        this.onClose = new core_1.EventEmitter();
    }
    TokenRewardsOnboardingComponent.prototype.verify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        this.error = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.post('api/v2/blockchain/rewards/verify', {
                                number: this.number,
                            })];
                    case 2:
                        response = _a.sent();
                        this.secret = response.secret;
                        this.confirming = true;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.error = e_1.message;
                        return [3 /*break*/, 4];
                    case 4:
                        this.inProgress = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    TokenRewardsOnboardingComponent.prototype.cancel = function () {
        this.confirming = false;
        this.code = null;
        this.secret = null;
        this.inProgress = false;
        this.error = null;
    };
    TokenRewardsOnboardingComponent.prototype.confirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inProgress = true;
                        this.error = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.post('api/v2/blockchain/rewards/confirm', {
                                number: this.number,
                                code: this.code,
                                secret: this.secret,
                            })];
                    case 2:
                        response = _a.sent();
                        window.Opspot.user.rewards = true;
                        this.join();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.error = e_2.message;
                        return [3 /*break*/, 4];
                    case 4:
                        this.inProgress = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    TokenRewardsOnboardingComponent.prototype.join = function () {
        this.onClose.emit();
    };
    TokenRewardsOnboardingComponent.items = ['tokens_verification'];
    TokenRewardsOnboardingComponent.canSkip = true;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TokenRewardsOnboardingComponent.prototype, "pendingItems", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TokenRewardsOnboardingComponent.prototype, "onClose", void 0);
    TokenRewardsOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-channel--onboarding--rewards',
            template: "\n    <div class=\"m-channelOnboarding__slide\">\n      <h2>Earn tokens for your activity</h2>\n      <p>\n        Tokens can be used to support other channels or boost your content for additional views (1 token = 1,000 views).\n      </p>\n\n      <p>\n        In order to earn tokens, we will need a phone number to verify that your channel is unique.\n      </p>\n\n      <!-- add phone input -->\n      <div class=\"m-channelOnboardingSlideRewards__input\" *ngIf=\"!confirming; else confirmBlock\">\n        <m-phone-input [(ngModel)]=\"number\" ngDefaultControl></m-phone-input>\n        <button class=\"m-btn m-btn--slim m-btn--action\" (click)=\"verify()\" [disabled]=\"inProgress\"\n                i18n=\"@@WALLET__TOKENS__ONBOARDING__REWARDS__JOIN_ACTION\">Join\n        </button>\n        <div *ngIf=\"inProgress\" class=\"mdl-spinner mdl-js-spinner is-active\" [mdl]></div>\n      </div>\n\n      <ng-template #confirmBlock>\n        <div class=\"m-channelOnboardingSlideRewards__input\">\n          <p class=\"m-channelOnboardingSlide__subtext m-channelOnboardingSlide__prompt\"\n             i18n=\"@@WALLET__TOKENS__ONBOARDING__REWARDS__ENTER_CODE_DESC\">\n            Please enter the code we just sent to <b>+{{number}}</b>, to verify your number.\n          </p>\n          <div class=\"m-channelOnboardingSlideForm__input\">\n            <input\n              type=\"number\"\n              [(ngModel)]=\"code\"\n              placeholder=\"eg. 198349\"\n              i18n-placeholder=\"@@WALLET__TOKENS__REWARDS__CODE_EXAMPLE_PH\"\n              class=\"m-border\"\n            />\n            <m-tooltip icon=\"help\" i18n=\"@@WALLET__TOKENS__ONBOARDING__REWARDS__ENTER_CODE_TOOLTIP\">\n              Please enter the code we just sent you, to verify that your number is correct\n            </m-tooltip>\n          </div>\n\n          <div class=\"m-channelOnboardingSlideForm__buttons\">\n            <button class=\"m-btn m-btn--slim m-btn--action\" (click)=\"confirm()\" [disabled]=\"inProgress\"\n                    i18n=\"@@WALLET__TOKENS__ONBOARDING__REWARDS__CONFIRM_ACTION\">Confirm\n            </button>\n            <button class=\"m-btn m-btn--slim\" (click)=\"cancel()\"\n                    i18n=\"@@WALLET__TOKENS__ONBOARDING__REWARDS__GO_BACK_ACTION\">Go Back\n            </button>\n          </div>\n          <div *ngIf=\"inProgress\" class=\"mdl-spinner mdl-js-spinner is-active\" [mdl]></div>\n        </div>\n      </ng-template>\n\n      <p class=\"m-channelOnboardingSlideRewards__error\" *ngIf=\"error\">\n        {{error}}\n      </p>\n\n\n      <p class=\"m-channelOnboardingSlide__info\">\n        <i class=\"material-icons\">info</i>\n        We do not store your phone number in our servers.\n      </p>\n\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef,
            session_1.Session,
            router_1.Router])
    ], TokenRewardsOnboardingComponent);
    return TokenRewardsOnboardingComponent;
}());
exports.TokenRewardsOnboardingComponent = TokenRewardsOnboardingComponent;
//# sourceMappingURL=rewards.component.js.map
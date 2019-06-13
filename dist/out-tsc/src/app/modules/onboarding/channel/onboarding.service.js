"use strict";
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
var welcome_component_1 = require("./welcome/welcome.component");
var topics_component_1 = require("./topics/topics.component");
var subscriptions_component_1 = require("./subscriptions/subscriptions.component");
var channel_component_1 = require("./channel/channel.component");
var rewards_component_1 = require("./rewards/rewards.component");
var core_1 = require("@angular/core");
var ChannelOnboardingService = /** @class */ (function () {
    function ChannelOnboardingService(client, session) {
        var _this = this;
        this.client = client;
        this.session = session;
        this.slides = [
            welcome_component_1.WelcomeOnboardingComponent,
            topics_component_1.TopicsOnboardingComponent,
            subscriptions_component_1.SubscriptionsOnboardingComponent,
            // GroupsOnboardingComponent,
            channel_component_1.ChannelSetupOnboardingComponent,
            rewards_component_1.TokenRewardsOnboardingComponent,
        ];
        this.currentSlide = 0;
        this.completed = false;
        this.onOpen = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        this.onSlideChanged = new core_1.EventEmitter();
        this.completedPercentage = -1;
        this.showOnboarding = false;
        this.session.userEmitter.subscribe(function (v) {
            if (!v) {
                _this.reset();
            }
        });
    }
    ChannelOnboardingService._ = function (client, session) {
        return new ChannelOnboardingService(client, session);
    };
    ChannelOnboardingService.prototype.checkProgress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.session.isLoggedIn())
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.get('api/v2/onboarding/progress')];
                    case 2:
                        response = _a.sent();
                        this.completedPercentage = response.completed_items.length * 100 / response.all_items.length;
                        this.completedItems = response.completed_items;
                        this.showOnboarding = response.show_onboarding;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChannelOnboardingService.prototype.showModal = function (force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var status_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!force) {
                            status_1 = localStorage.getItem('already_onboarded');
                            if (status_1 !== null) {
                                return [2 /*return*/, false];
                            }
                        }
                        if (!(this.completedPercentage === -1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkProgress()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.completedItems.length > 1) {
                            this.next();
                        }
                        if (force) {
                            localStorage.setItem('already_onboarded', '1');
                            return [2 /*return*/, true];
                        }
                        else if (this.showOnboarding) {
                            localStorage.setItem('already_onboarded', '1');
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    ChannelOnboardingService.prototype.previous = function () {
        if (this.currentSlide === 0) {
            return;
        }
        this.currentSlide--;
        this.onSlideChanged.emit(this.currentSlide);
    };
    ChannelOnboardingService.prototype.next = function () {
        if (this.currentSlide + 1 >= this.slides.length) {
            this.completed = true;
            this.currentSlide = 0;
            this.onClose.next(true);
            return;
        }
        // first time onboarding
        if (this.completedItems.length === 1) { // empty is 1 because username is always there from the beginning
            this.currentSlide++;
        }
        else {
            //here we just go to the next slide with incomplete stuff
            var i = this.currentSlide + 1;
            this.pendingItems = [];
            var items = this.slides[i].items;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                if (!this.completedItems.includes(item)) {
                    this.pendingItems.push(item);
                }
            }
            if (this.pendingItems.length > 0) {
                this.currentSlide = i;
            }
            else {
                this.currentSlide++;
                this.next();
            }
        }
        this.onSlideChanged.emit(this.currentSlide);
    };
    Object.defineProperty(ChannelOnboardingService.prototype, "slide", {
        get: function () {
            return this.slides[this.currentSlide];
        },
        enumerable: true,
        configurable: true
    });
    ChannelOnboardingService.prototype.reset = function () {
        this.completedPercentage = -1;
        this.completedItems = [];
        this.showOnboarding = false;
        this.pendingItems = [];
        this.currentSlide = 0;
        this.completed = false;
    };
    return ChannelOnboardingService;
}());
exports.ChannelOnboardingService = ChannelOnboardingService;
//# sourceMappingURL=onboarding.service.js.map
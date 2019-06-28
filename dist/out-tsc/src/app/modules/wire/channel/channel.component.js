"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var session_1 = require("../../../services/session");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var creator_component_1 = require("../creator/creator.component");
var api_1 = require("../../../services/api");
var wire_1 = require("../wire");
var service_1 = require("../../modals/signup/service");
var WireChannelComponent = /** @class */ (function () {
    function WireChannelComponent(session, overlayModal, client, signupModal) {
        this.session = session;
        this.overlayModal = overlayModal;
        this.client = client;
        this.signupModal = signupModal;
        this.rewardsChangeEmitter = new core_1.EventEmitter();
        this.typeLabels = wire_1.WireTypeLabels;
    }
    Object.defineProperty(WireChannelComponent.prototype, "_rewards", {
        set: function (rewards) {
            if (rewards) {
                this.rewards = rewards;
            }
            else {
                this.reset();
            }
        },
        enumerable: true,
        configurable: true
    });
    WireChannelComponent.prototype.ngOnInit = function () {
        if (!this.rewards) {
            this.reset();
        }
        this.setDefaultDisplay();
    };
    // TODO: Smart default display, based on current user
    WireChannelComponent.prototype.setDefaultDisplay = function () {
        this.display = 'points';
        if (this.shouldShow('money')) {
            this.display = 'money';
        }
        else if (this.shouldShow('tokens')) {
            this.display = 'tokens';
        }
    };
    WireChannelComponent.prototype.toggleEditing = function () {
        this.editing = !this.editing;
        if (!this.editing) {
            this.save();
        }
    };
    WireChannelComponent.prototype.reset = function () {
        this.rewards = {
            description: '',
            rewards: {
                points: [],
                money: [],
                tokens: []
            }
        };
    };
    WireChannelComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.rewards.rewards.points = this._cleanAndSortRewards(this.rewards.rewards.points);
                        this.rewards.rewards.money = this._cleanAndSortRewards(this.rewards.rewards.money);
                        this.rewards.rewards.tokens = this._cleanAndSortRewards(this.rewards.rewards.tokens);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.post('api/v1/wire/rewards', {
                                rewards: this.rewards
                            })];
                    case 2:
                        _a.sent();
                        this.rewardsChangeEmitter.emit(this.rewards);
                        this.session.getLoggedInUser().wire_rewards = this.rewards;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.editing = true;
                        alert((e_1 && e_1.message) || 'Server error');
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    WireChannelComponent.prototype.sendWire = function () {
        if (!this.session.isLoggedIn()) {
            this.signupModal.open();
            return;
        }
        var creator = this.overlayModal.create(creator_component_1.WireCreatorComponent, this.channel);
        creator.present();
    };
    WireChannelComponent.prototype.isOwner = function () {
        return this.session.getLoggedInUser() && (this.session.getLoggedInUser().guid === this.channel.guid);
    };
    WireChannelComponent.prototype.shouldShow = function (type) {
        var isOwner = this.isOwner();
        if (!type) {
            return isOwner || (this.rewards.description ||
                (this.rewards.rewards.points && this.rewards.rewards.points.length) ||
                (this.rewards.rewards.money && this.rewards.rewards.money.length) ||
                (this.rewards.rewards.tokens && this.rewards.rewards.tokens.length));
        }
        var canShow = (type === 'points') ||
            (type === 'money' && this.channel.merchant) ||
            (type === 'tokens' && this.channel.eth_wallet);
        return canShow && (isOwner || (this.rewards.rewards[type] && this.rewards.rewards[type].length));
    };
    WireChannelComponent.prototype.getCurrentTypeLabel = function () {
        var _this = this;
        return this.typeLabels.find(function (typeLabel) { return typeLabel.type === _this.display; });
    };
    // Internal
    WireChannelComponent.prototype._cleanAndSortRewards = function (rewards) {
        if (!rewards) {
            return [];
        }
        return rewards
            .filter(function (reward) { return reward.amount || ("" + reward.description).trim(); })
            .map(function (reward) { return (__assign({}, reward, { amount: Math.abs(Math.floor(reward.amount || 0)) })); })
            .sort(function (a, b) { return a.amount > b.amount ? 1 : -1; });
    };
    __decorate([
        core_1.Input('rewards'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WireChannelComponent.prototype, "_rewards", null);
    __decorate([
        core_1.Output('rewardsChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireChannelComponent.prototype, "rewardsChangeEmitter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireChannelComponent.prototype, "channel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WireChannelComponent.prototype, "editing", void 0);
    WireChannelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wire-channel',
            templateUrl: 'channel.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, overlay_modal_1.OverlayModalService, api_1.Client, service_1.SignupModalService])
    ], WireChannelComponent);
    return WireChannelComponent;
}());
exports.WireChannelComponent = WireChannelComponent;
//# sourceMappingURL=channel.component.js.map
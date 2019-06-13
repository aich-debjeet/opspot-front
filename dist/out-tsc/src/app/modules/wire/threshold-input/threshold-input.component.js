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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wire_1 = require("../wire");
var session_1 = require("../../../services/session");
var WireThresholdInputComponent = /** @class */ (function () {
    function WireThresholdInputComponent(session) {
        this.session = session;
        this.disabled = false;
        this.thresholdChangeEmitter = new core_1.EventEmitter();
        this.validThresholdEmitter = new core_1.EventEmitter();
        //REMOVE SOON.. this doesn't do anything
        this.legacyEnabled = false;
        this.enabledChangeEmitter = new core_1.EventEmitter();
        this.typeLabels = wire_1.WireTypeLabels;
    }
    Object.defineProperty(WireThresholdInputComponent.prototype, "_threshold", {
        set: function (threshold) {
            this.threshold = threshold;
            if (!this.threshold) {
                this.threshold = {
                    type: 'tokens',
                    min: 0
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    WireThresholdInputComponent.prototype.ngOnInit = function () {
        this.validThresholdEmitter.emit(this.validate());
    };
    Object.defineProperty(WireThresholdInputComponent.prototype, "enabled", {
        get: function () {
            return this.threshold.min > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WireThresholdInputComponent.prototype, "rewards", {
        get: function () {
            var user = this.session.getLoggedInUser();
            if (!user)
                return [];
            if (user.wire_rewards && user.wire_rewards.rewards && user.wire_rewards.rewards.tokens)
                return user.wire_rewards.rewards.tokens;
            return [];
        },
        enumerable: true,
        configurable: true
    });
    WireThresholdInputComponent.prototype.setType = function (type) {
        this.threshold.type = type;
        this._emitChange();
        this.focusInput();
    };
    WireThresholdInputComponent.prototype.setMinAmount = function (value) {
        var cleanValue = parseFloat(value.replace(/,/g, '.'));
        if (cleanValue) {
            // allow 3 decimals only
            cleanValue = Math.round(cleanValue * 1000) / 1000;
        }
        else {
            cleanValue = 0;
        }
        this.threshold.min = cleanValue;
        this._emitChange();
    };
    WireThresholdInputComponent.prototype.validate = function () {
        if (!this.enabled || this.disabled) {
            return true;
        }
        return !!(this.threshold.type && (this.threshold.min > 0));
    };
    WireThresholdInputComponent.prototype.focusInput = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.minAmountInput.nativeElement) {
                _this.minAmountInput.nativeElement.focus();
            }
        }, 0);
    };
    WireThresholdInputComponent.prototype.selectTier = function (tier) {
        this.threshold.min = parseInt(tier.amount);
        this._emitChange();
    };
    // Internal
    WireThresholdInputComponent.prototype._emitChange = function () {
        this.thresholdChangeEmitter.emit(this.enabled ? this.threshold : null);
        this.enabledChangeEmitter.emit(this.enabled);
        this.validThresholdEmitter.emit(this.validate());
    };
    __decorate([
        core_1.Input('threshold'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WireThresholdInputComponent.prototype, "_threshold", null);
    __decorate([
        core_1.Input('disabled'),
        __metadata("design:type", Boolean)
    ], WireThresholdInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Output('thresholdChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireThresholdInputComponent.prototype, "thresholdChangeEmitter", void 0);
    __decorate([
        core_1.Output('validThreshold'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireThresholdInputComponent.prototype, "validThresholdEmitter", void 0);
    __decorate([
        core_1.Input('enabled'),
        __metadata("design:type", Boolean)
    ], WireThresholdInputComponent.prototype, "legacyEnabled", void 0);
    __decorate([
        core_1.Output('enabledChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireThresholdInputComponent.prototype, "enabledChangeEmitter", void 0);
    __decorate([
        core_1.ViewChild('minAmountInput'),
        __metadata("design:type", core_1.ElementRef)
    ], WireThresholdInputComponent.prototype, "minAmountInput", void 0);
    WireThresholdInputComponent = __decorate([
        core_1.Component({
            selector: 'm-wire-threshold-input',
            templateUrl: 'threshold-input.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session])
    ], WireThresholdInputComponent);
    return WireThresholdInputComponent;
}());
exports.WireThresholdInputComponent = WireThresholdInputComponent;
//# sourceMappingURL=threshold-input.component.js.map
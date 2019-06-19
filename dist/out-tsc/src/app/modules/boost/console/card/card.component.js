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
var boost_service_1 = require("../../boost.service");
var rejection_reasons_1 = require("../../../../controllers/admin/boosts/rejection-reasons");
var BoostConsoleCard = /** @class */ (function () {
    function BoostConsoleCard(service) {
        this.service = service;
        this.reasons = rejection_reasons_1.rejectionReasons;
    }
    Object.defineProperty(BoostConsoleCard.prototype, "_boost", {
        set: function (boost) {
            this.boost = boost;
            this.type = this.service.getBoostType(this.boost) || '';
        },
        enumerable: true,
        configurable: true
    });
    BoostConsoleCard.prototype.accept = function () {
        var agreed = true;
        if (this.boost.bidType === 'usd' && this.boost.postToFacebook) {
            agreed = confirm("I accept a 5% transaction fee and agree not to delete this content from Facebook");
        }
        else if (this.boost.bidType === 'usd') {
            agreed = confirm("I accept a 5% transaction fee");
        }
        else if (this.boost.postToFacebook) {
            agreed = confirm("I agree not to delete this content from Facebook");
        }
        if (!agreed) {
            return Promise.resolve(false);
        }
        return this.service.accept(this.boost);
    };
    BoostConsoleCard.prototype.canAccept = function () {
        return this.service.canAccept(this.boost);
    };
    BoostConsoleCard.prototype.reject = function () {
        return this.service.reject(this.boost);
    };
    BoostConsoleCard.prototype.canReject = function () {
        return this.service.canReject(this.boost);
    };
    BoostConsoleCard.prototype.revoke = function () {
        return this.service.revoke(this.boost);
    };
    BoostConsoleCard.prototype.canRevoke = function () {
        return this.service.canRevoke(this.boost);
    };
    BoostConsoleCard.prototype.isIncoming = function () {
        return this.service.isIncoming(this.boost);
    };
    BoostConsoleCard.prototype.findReason = function (code) {
        return rejection_reasons_1.rejectionReasons.find(function (item) {
            return item.code == code;
        });
    };
    __decorate([
        core_1.Input('boost'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BoostConsoleCard.prototype, "_boost", null);
    BoostConsoleCard = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [boost_service_1.BoostService],
            selector: 'm-boost-console-card',
            templateUrl: 'card.component.html'
        }),
        __metadata("design:paramtypes", [boost_service_1.BoostService])
    ], BoostConsoleCard);
    return BoostConsoleCard;
}());
exports.BoostConsoleCard = BoostConsoleCard;
//# sourceMappingURL=card.component.js.map
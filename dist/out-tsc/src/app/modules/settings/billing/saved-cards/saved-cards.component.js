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
var client_service_1 = require("../../../../common/api/client.service");
var SettingsBillingSavedCardsComponent = /** @class */ (function () {
    function SettingsBillingSavedCardsComponent(client, cd) {
        this.client = client;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.inProgress = false;
        this.addNewCard = false;
        this.cards = [];
    }
    SettingsBillingSavedCardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadSavedCards();
        this.setupStripe();
        setTimeout(function () {
            _this.setupStripe();
        }, 1000); //sometimes stripe can take a while to download
    };
    SettingsBillingSavedCardsComponent.prototype.setupStripe = function () {
        if (window.Stripe) {
            window.Stripe.setPublishableKey(this.opspot.stripe_key);
        }
    };
    SettingsBillingSavedCardsComponent.prototype.loadSavedCards = function () {
        var _this = this;
        this.inProgress = true;
        this.cards = [];
        return this.client.get("api/v1/payments/stripe/cards")
            .then(function (_a) {
            var cards = _a.cards;
            _this.inProgress = false;
            if (cards && cards.length) {
                _this.cards = cards;
                _this.detectChanges();
            }
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.detectChanges();
        });
    };
    SettingsBillingSavedCardsComponent.prototype.removeCard = function (index) {
        var _this = this;
        this.inProgress = true;
        this.client.delete('api/v1/payments/stripe/card/' + this.cards[index].id)
            .then(function () {
            _this.cards.splice(index, 1);
            _this.inProgress = false;
            _this.detectChanges();
        })
            .catch(function () {
            _this.inProgress = false;
            _this.detectChanges();
        });
    };
    SettingsBillingSavedCardsComponent.prototype.setCard = function (card) {
        var _this = this;
        this.inProgress = true;
        this.detectChanges();
        this.getCardNonce(card)
            .then(function (token) {
            _this.saveCard(token)
                .then(function () {
                _this.inProgress = false;
                _this.addNewCard = false;
                _this.detectChanges();
                _this.loadSavedCards();
            })
                .catch(function (e) {
                _this.inProgress = false;
                _this.detectChanges();
                alert((e && e.message) || 'There was an error saving your card.');
            });
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.detectChanges();
            alert((e && e.message) || 'There was an error with your card information.');
        });
    };
    SettingsBillingSavedCardsComponent.prototype.saveCard = function (token) {
        return this.client.put('api/v1/payments/stripe/card/' + token);
    };
    SettingsBillingSavedCardsComponent.prototype.getCardNonce = function (card) {
        return new Promise(function (resolve, reject) {
            window.Stripe.card.createToken({
                number: card.number,
                cvc: card.sec,
                exp_month: card.month,
                exp_year: card.year
            }, function (status, response) {
                if (response.error) {
                    return reject(response.error.message);
                }
                return resolve(response.id);
            });
        });
    };
    SettingsBillingSavedCardsComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    SettingsBillingSavedCardsComponent = __decorate([
        core_1.Component({
            selector: 'm-settings--billing-saved-cards',
            templateUrl: 'saved-cards.component.html'
        }),
        __metadata("design:paramtypes", [client_service_1.Client, core_1.ChangeDetectorRef])
    ], SettingsBillingSavedCardsComponent);
    return SettingsBillingSavedCardsComponent;
}());
exports.SettingsBillingSavedCardsComponent = SettingsBillingSavedCardsComponent;
//# sourceMappingURL=saved-cards.component.js.map
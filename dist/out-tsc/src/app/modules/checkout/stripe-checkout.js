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
var api_1 = require("../../services/api");
var StripeCheckout = /** @class */ (function () {
    function StripeCheckout(client, cd) {
        this.client = client;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.loading = false;
        this.inProgress = false;
        this.confirmation = false;
        this.error = '';
        this.inputed = new core_1.EventEmitter;
        this.done = new core_1.EventEmitter;
        this.amount = 0;
        this.gateway = 'merchants';
        this.useMDLStyling = true;
        this.nonce = '';
        this.cards = [];
        this.useCreditCard = true;
        this.useBitcoin = false;
    }
    StripeCheckout.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.setupStripe();
        }, 1000); //sometimes stripe can take a while to download
        this.loadSavedCards();
    };
    StripeCheckout.prototype.setupStripe = function () {
        if (window.Stripe) {
            window.Stripe.setPublishableKey(this.opspot.stripe_key);
        }
    };
    StripeCheckout.prototype.loadSavedCards = function () {
        var _this = this;
        this.loading = true;
        this.cards = [];
        return this.client.get("api/v1/payments/stripe/cards")
            .then(function (_a) {
            var cards = _a.cards;
            _this.loading = false;
            if (cards && cards.length) {
                /*this.cards = (<any[]>cards).map(card => ({
                  id: card.id,
                  label: `${card.brand} ${card.exp_month}/${('' + card.exp_year).substr(2)} **** ${card.last4}`
                }));*/
                _this.cards = cards;
                _this.detectChanges();
            }
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.loading = false;
            _this.detectChanges();
        });
    };
    StripeCheckout.prototype.setSavedCard = function (id) {
        this.inProgress = true;
        this.nonce = id;
        this.inputed.next(this.nonce);
        this.inProgress = false;
        this.detectChanges();
    };
    StripeCheckout.prototype.setCard = function (card) {
        // console.log(card);
        this.card = card;
        this.getCardNonce();
        this.detectChanges();
    };
    StripeCheckout.prototype.getCardNonce = function () {
        var _this = this;
        this.inProgress = true;
        window.Stripe.card.createToken({
            number: this.card.number,
            cvc: this.card.sec,
            exp_month: this.card.month,
            exp_year: this.card.year
        }, function (status, response) {
            if (response.error) {
                _this.error = response.error.message;
                _this.inProgress = false;
                _this.detectChanges();
                return false;
            }
            _this.nonce = response.id;
            _this.inputed.next(_this.nonce);
            _this.inProgress = false;
            _this.detectChanges();
        });
    };
    StripeCheckout.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], StripeCheckout.prototype, "amount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], StripeCheckout.prototype, "merchant_guid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], StripeCheckout.prototype, "gateway", void 0);
    __decorate([
        core_1.Input('useMDLStyling'),
        __metadata("design:type", Boolean)
    ], StripeCheckout.prototype, "useMDLStyling", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], StripeCheckout.prototype, "useCreditCard", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], StripeCheckout.prototype, "useBitcoin", void 0);
    StripeCheckout = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-payments-stripe-checkout',
            outputs: ['inputed', 'done'],
            template: "\n    <div class=\"m-error mdl-color--red mdl-color-text--white\" *ngIf=\"error\">\n        {{error}}\n    </div>\n\n    <div class=\"m-payments-options\" style=\"margin-bottom:8px;\" *ngIf=\"useBitcoin\"\n      [class.mdl-card]=\"useMDLStyling\"\n    >\n      <div id=\"coinbase-btn\" *ngIf=\"useBitcoin\"></div>\n    </div>\n\n    <div [hidden]=\"!loading\" class=\"m-checkout-loading\">\n      <div class=\"mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active\"\n      style=\"margin:auto; display:block;\" [mdl]>\n      </div>\n      <p i18n=\"@@CHECKOUT__WAITING_LABEL\">One moment please...</p>\n    </div>\n\n    <div class=\"m-payments--saved-cards\" *ngIf=\"cards.length\">\n      <div class=\"m-payments-saved--title\" i18n=\"@@CHECKOUT__SAVED_CARDS_TITLE\">Select a card to use</div>\n      <ul>\n        <li *ngFor=\"let card of cards\"\n          class=\"m-payments--saved-card-item\"\n          (click)=\"setSavedCard(card.id)\"\n        >\n          <span class=\"m-payments--saved-card-item-type\">{{card.brand}}</span>\n          <span class=\"m-payments--saved-card-item-number\">**** {{card.last4}}</span>\n          <span class=\"m-payments--saved-card-item-expiry\">{{card.exp_month}} / {{card.exp_year}}</span>\n          <span class=\"m-payments--saved-card-item-select\" i18n=\"@@M__ACTION__SELECT\">Select</span>\n        </li>\n        <li class=\"m-payments--saved-card-item m-payments-saved--item-new\" (click)=\"cards = []\">\n          <span class=\"m-payments--saved-card-item-type\" i18n=\"@@CHECKOUT__USE_NEW_CARD\">Use a new card</span>\n          <span class=\"m-payments--saved-card-item-select\" i18n=\"@@M__ACTION__SELECT\">Select</span>\n        </li>\n      </ul>\n    </div>\n\n    <opspot-checkout-card-input\n      (confirm)=\"setCard($event)\"\n      [hidden]=\"inProgress || confirmation || loading\"\n      [useMDLStyling]=\"useMDLStyling\"\n      *ngIf=\"useCreditCard && !cards.length\">\n    </opspot-checkout-card-input>\n    <div [hidden]=\"!inProgress\" class=\"m-checkout-loading\">\n      <div class=\"mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active\" style=\"margin:auto; display:block;\" [mdl]></div>\n      <p i18n=\"@@CHECKOUT__CAPTURING_DETAILS\">Capturing card details...</p>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [api_1.Client, core_1.ChangeDetectorRef])
    ], StripeCheckout);
    return StripeCheckout;
}());
exports.StripeCheckout = StripeCheckout;
//# sourceMappingURL=stripe-checkout.js.map
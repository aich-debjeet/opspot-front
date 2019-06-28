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
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var PayWall = /** @class */ (function () {
    function PayWall(session, client, cd) {
        this.session = session;
        this.client = client;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.inProgress = false;
        this.showCheckout = false;
        this.nonce = '';
        this.showSignupModal = false;
        this.update = new core_1.EventEmitter;
    }
    PayWall.prototype.checkout = function () {
        var _this = this;
        if (!this.session.isLoggedIn()) {
            this.showSignupModal = true;
            this.detectChanges();
            return;
        }
        this.inProgress = true;
        this.detectChanges();
        this.client.get('api/v1/payments/plans/exclusive/' + this.entity.guid)
            .then(function (response) {
            _this.inProgress = false;
            if (response.subscribed) {
                _this.update.next(response.entity);
                _this.detectChanges();
                return;
            }
            _this.showCheckout = true;
            _this.amount = response.amount;
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.error = 'Sorry, there was an error.';
            _this.detectChanges();
        });
    };
    PayWall.prototype.subscribe = function (nonce) {
        var _this = this;
        this.showCheckout = false;
        this.inProgress = true;
        this.detectChanges();
        console.log('nonce: ' + nonce);
        this.client.post('api/v1/payments/plans/subscribe/' + this.entity.owner_guid + '/exclusive', {
            nonce: nonce
        })
            .then(function (response) { return setTimeout(function () { return _this.checkout(); }, 0); })
            .catch(function (e) {
            _this.inProgress = false;
            _this.error = 'Sorry, we couldn\'t complete the transaction.';
            _this.detectChanges();
        });
    };
    PayWall.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Output('entityChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], PayWall.prototype, "update", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PayWall.prototype, "entity", void 0);
    PayWall = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-paywall',
            templateUrl: 'paywall.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, core_1.ChangeDetectorRef])
    ], PayWall);
    return PayWall;
}());
exports.PayWall = PayWall;
//# sourceMappingURL=paywall.component.js.map
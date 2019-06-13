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
var session_1 = require("../../../../services/session");
var api_1 = require("../../../../services/api");
var service_1 = require("../../../../modules/modals/signup/service");
var SubscribeButton = /** @class */ (function () {
    function SubscribeButton(session, client, modal) {
        this.session = session;
        this.client = client;
        this.modal = modal;
        this._user = {
            subscribed: false
        };
        this._inprogress = false;
        this.showModal = false;
        this.onSubscribed = new core_1.EventEmitter();
    }
    Object.defineProperty(SubscribeButton.prototype, "user", {
        set: function (value) {
            if (value !== null) {
                this._user = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    SubscribeButton.prototype.subscribe = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        if (!this.session.isLoggedIn()) {
            this.modal.setSubtitle('You need to have a channel in order to subscribe').open();
            return false;
        }
        this._user.subscribed = true;
        this.onSubscribed.next();
        this.client.post('api/v1/subscribe/' + this._user.guid, {})
            .then(function (response) {
            if (response && response.error) {
                throw 'error';
            }
            _this._user.subscribed = true;
        })
            .catch(function (e) {
            _this._user.subscribed = false;
            alert('You can\'t subscribe to this user.');
        });
    };
    SubscribeButton.prototype.unSubscribe = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        this._user.subscribed = false;
        this.client.delete('api/v1/subscribe/' + this._user.guid, {})
            .then(function (response) {
            _this._user.subscribed = false;
        })
            .catch(function (e) {
            _this._user.subscribed = true;
        });
    };
    __decorate([
        core_1.Output('subscribed'),
        __metadata("design:type", core_1.EventEmitter)
    ], SubscribeButton.prototype, "onSubscribed", void 0);
    __decorate([
        core_1.Input('user'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], SubscribeButton.prototype, "user", null);
    SubscribeButton = __decorate([
        core_1.Component({
            selector: 'opspot-button-subscribe',
            template: "\n    <button class=\"m-btn m-btn--with-icon m-btn--subscribe\" *ngIf=\"!_user.subscribed\" (click)=\"subscribe($event)\">\n      <i class=\"material-icons\">person_add</i>\n      <span>\n        <ng-container i18n=\"@@M__ACTION__SUBSCRIBE\">Subscribe</ng-container>\n      </span>\n    </button>\n    <button class=\"m-btn m-btn--with-icon m-btn--subscribe subscribed\" *ngIf=\"_user.subscribed\" (click)=\"unSubscribe($event)\">\n      <i class=\"material-icons\">close</i>\n      <span>\n        <ng-container i18n=\"@@OPSPOT__BUTTONS__UNSUBSCRIBE__SUBSCRIBED_LABEL\">Unsubscribe</ng-container>\n      </span>\n    </button>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, service_1.SignupModalService])
    ], SubscribeButton);
    return SubscribeButton;
}());
exports.SubscribeButton = SubscribeButton;
//# sourceMappingURL=subscribe.js.map
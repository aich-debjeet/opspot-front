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
var ThirdPartyNetworksFacebook = /** @class */ (function () {
    function ThirdPartyNetworksFacebook(client, cd) {
        this.client = client;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.done = new core_1.EventEmitter(true);
        this.accounts = [];
        this.inProgress = false;
        this.getPage();
    }
    ThirdPartyNetworksFacebook.prototype.getPage = function () {
        var _this = this;
        this.inProgress = true;
        this.client.get('api/v1/thirdpartynetworks/facebook/page')
            .then(function (response) {
            _this.inProgress = false;
            if (!response.page) {
                _this.page = null;
                return true;
            }
            _this.page = response.page;
        });
    };
    ThirdPartyNetworksFacebook.prototype.connect = function () {
        var _this = this;
        this.inProgress = true;
        window.onSuccessCallback = function () {
            _this.getAccounts();
        };
        window.open(this.opspot.site_url + 'api/v1/thirdpartynetworks/facebook/link');
    };
    ThirdPartyNetworksFacebook.prototype.getAccounts = function () {
        var _this = this;
        this.inProgress = true;
        this.client.get('api/v1/thirdpartynetworks/facebook/accounts')
            .then(function (response) {
            _this.inProgress = false;
            _this.accounts = response.accounts;
            _this.cd.detectChanges();
        });
    };
    ThirdPartyNetworksFacebook.prototype.selectAccount = function (account) {
        var _this = this;
        this.inProgress = true;
        this.client.post('api/v1/thirdpartynetworks/facebook/select-page', {
            id: account.id,
            name: account.name,
            accessToken: account.access_token
        })
            .then(function (response) {
            _this.inProgress = false;
            _this.page = account;
        });
    };
    ThirdPartyNetworksFacebook.prototype.drop = function () {
        var _this = this;
        this.inProgress = true;
        this.client.delete('api/v1/thirdpartynetworks/facebook')
            .then(function () {
            _this.inProgress = false;
            _this.page = null;
        });
    };
    ThirdPartyNetworksFacebook = __decorate([
        core_1.Component({
            selector: 'm-third-party-networks-facebook',
            outputs: ['done'],
            template: "\n\n    <div class=\"mdl-spinner mdl-js-spinner is-active\" [mdl] [hidden]=\"!inProgress\"></div>\n\n    <div class=\"m-third-party-networks-facebook-card mdl-card mdl-shadow--2dp\" *ngIf=\"page && !inProgress\">\n      <div class=\"mdl-card__supporting-text m-block\">\n        <div class=\"m-avatar\">\n          <a [href]=\"page.link\">\n            <img [src]=\"'https://graph.facebook.com/' + page.id + '/picture'\" />\n          </a>\n        </div>\n        <div class=\"m-body\">\n          <a [href]=\"page.link\">\n            <b>{{page.name}}</b><br/>\n          </a>\n          <svg width=\"24\" height=\"24\" viewBox=\"-2 -2 32 32\" class=\"m-facebook-icon\">\n            <path d=\"M17.9 14h-3v8H12v-8h-2v-2.9h2V8.7C12 6.8 13.1 5 16 5c1.2 0 2 .1 2 .1v3h-1.8c-1 0-1.2.5-1.2 1.3v1.8h3l-.1 2.8z\"></path>\n          </svg>\n          <a class=\"mdl-color-text--red\" (click)=\"drop()\" i18n=\"@@THIRD_PARTY_NETWORKS__FACEBOOK__DETACH_PAGE_ACTION\">Detach page</a>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"setup\" *ngIf=\"!page && !inProgress\">\n      <div class=\"m-third-party-networks-facebook-button\" (click)=\"connect()\" *ngIf=\"accounts.length == 0\">\n        <svg width=\"40\" height=\"40\" viewBox=\"-2 -2 32 32\" class=\"m-facebook-icon\">\n          <path d=\"M17.9 14h-3v8H12v-8h-2v-2.9h2V8.7C12 6.8 13.1 5 16 5c1.2 0 2 .1 2 .1v3h-1.8c-1 0-1.2.5-1.2 1.3v1.8h3l-.1 2.8z\"></path>\n        </svg>\n        <b i18n=\"@@THIRD_PARTY_NETWORKS__FACEBOOK__LINK_BOOST\">Link your boosts to facebook</b>\n      </div>\n\n      <b *ngIf=\"accounts.length > 0\"\n        class=\"mdl-color-text--blue-grey-400\"\n        style=\"text-align: center; margin: 0; display:block;\" i18n=\"@@THIRD_PARTY_NETWORKS__FACEBOOK__SELECT_PAGE_LABEL\">Select a page to link below\n      </b>\n      <div class=\"m-third-party-networks-facebook-pages-list\">\n        <div class=\"m-block mdl-card mdl-shadow--2dp\" *ngFor=\"let account of accounts\" (click)=\"selectAccount(account)\">\n          <div class=\"m-avatar\">\n            <img [src]=\"'https://graph.facebook.com/' + account.id + '/picture'\" />\n          </div>\n          <div class=\"m-body\">\n            <b class=\"mdl-color-text--blue-grey-400\">{{account.name}}</b>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [api_1.Client, core_1.ChangeDetectorRef])
    ], ThirdPartyNetworksFacebook);
    return ThirdPartyNetworksFacebook;
}());
exports.ThirdPartyNetworksFacebook = ThirdPartyNetworksFacebook;
//# sourceMappingURL=facebook.js.map
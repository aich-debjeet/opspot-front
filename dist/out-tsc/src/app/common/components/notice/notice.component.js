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
var client_1 = require("../../../services/api/client");
var storage_1 = require("../../../services/storage");
var DismissableNoticeComponent = /** @class */ (function () {
    function DismissableNoticeComponent(client, storage) {
        this.client = client;
        this.storage = storage;
        this.hidden = false;
        this.buttonClick = new core_1.EventEmitter();
        this.cookiesEnabled = true;
        if (this.storage.get('cookies-notice-dismissed')) {
            this.hidden = true;
        }
        this.checkCookies();
    }
    DismissableNoticeComponent.prototype.checkCookies = function () {
        this.cookiesEnabled = document.cookie.indexOf('disable_cookies') === -1;
    };
    DismissableNoticeComponent.prototype.dismiss = function () {
        this.storage.set('cookies-notice-dismissed', 'true');
        this.hidden = true;
    };
    DismissableNoticeComponent.prototype.toggleCookies = function (value) {
        if (value || (!value && confirm('Are you sure you want to disable cookies?'))) {
            this.cookiesEnabled = value;
        }
        var url = 'api/v2/cookies';
        if (this.cookiesEnabled) {
            this.client.post(url);
        }
        else {
            this.client.delete(url);
        }
    };
    __decorate([
        core_1.Input(), core_1.HostBinding('hidden'),
        __metadata("design:type", Boolean)
    ], DismissableNoticeComponent.prototype, "hidden", void 0);
    __decorate([
        core_1.Output('buttonClick'),
        __metadata("design:type", core_1.EventEmitter)
    ], DismissableNoticeComponent.prototype, "buttonClick", void 0);
    DismissableNoticeComponent = __decorate([
        core_1.Component({
            selector: 'm-cookies-notice',
            templateUrl: 'notice.component.html'
        }),
        __metadata("design:paramtypes", [client_1.Client,
            storage_1.Storage])
    ], DismissableNoticeComponent);
    return DismissableNoticeComponent;
}());
exports.DismissableNoticeComponent = DismissableNoticeComponent;
//# sourceMappingURL=notice.component.js.map
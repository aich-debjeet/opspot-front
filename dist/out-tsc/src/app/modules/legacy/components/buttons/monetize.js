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
var MonetizeButton = /** @class */ (function () {
    function MonetizeButton(session, client) {
        this.session = session;
        this.client = client;
        this.isMonetized = false;
    }
    Object.defineProperty(MonetizeButton.prototype, "_object", {
        set: function (value) {
            if (!value)
                return;
            this.object = value;
            this.isMonetized = value.monetized;
        },
        enumerable: true,
        configurable: true
    });
    MonetizeButton.prototype.monetize = function () {
        var _this = this;
        if (this.isMonetized)
            return this.unMonetize();
        this.isMonetized = true;
        this.client.put('api/v1/monetize/' + this.object.guid, {})
            .catch(function (e) {
            _this.isMonetized = false;
        });
    };
    MonetizeButton.prototype.unMonetize = function () {
        var _this = this;
        this.isMonetized = false;
        this.object.monetized = false;
        this.client.delete('api/v1/monetize/' + this.object.guid, {})
            .catch(function (e) {
            _this.isMonetized = true;
        });
    };
    MonetizeButton = __decorate([
        core_1.Component({
            selector: 'opspot-button-monetize',
            inputs: ['_object: object'],
            host: {
                '(click)': 'monetize()',
                'class': 'm-button'
            },
            template: "\n    <button class=\"m-btn m-btn--with-icon\" [ngClass]=\"{'selected': isMonetized }\">\n      <i class=\"material-icons\">attach_money</i>\n    </button>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client])
    ], MonetizeButton);
    return MonetizeButton;
}());
exports.MonetizeButton = MonetizeButton;
//# sourceMappingURL=monetize.js.map
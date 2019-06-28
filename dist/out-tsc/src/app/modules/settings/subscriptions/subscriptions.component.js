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
var SettingsSubscriptionsComponent = /** @class */ (function () {
    function SettingsSubscriptionsComponent(client) {
        this.client = client;
        this.subscriptions = [];
        this.inProgress = false;
        this.moreData = true;
        this.offset = '';
        this.opspot = window.Opspot;
    }
    SettingsSubscriptionsComponent.prototype.ngOnInit = function () {
        this.load(true);
    };
    SettingsSubscriptionsComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress) {
            return;
        }
        this.inProgress = true;
        if (refresh) {
            this.subscriptions = [];
        }
        this.client.get('api/v1/payments/subscriptions/exclusive', { offset: this.offset })
            .then(function (response) {
            if (!response.subscriptions) {
                _this.inProgress = false;
                _this.moreData = false;
                return;
            }
            _this.subscriptions = _this.subscriptions.concat(response.subscriptions);
            _this.offset = response['load-next'];
            _this.inProgress = false;
            if (!_this.offset) {
                _this.moreData = false;
            }
        })
            .catch(function (e) {
            _this.inProgress = false;
            console.error(e);
        });
    };
    SettingsSubscriptionsComponent.prototype.deleteRow = function (index) {
        this.subscriptions.splice(index, 1);
    };
    SettingsSubscriptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-settings--subscriptions',
            templateUrl: 'subscriptions.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], SettingsSubscriptionsComponent);
    return SettingsSubscriptionsComponent;
}());
exports.SettingsSubscriptionsComponent = SettingsSubscriptionsComponent;
//# sourceMappingURL=subscriptions.component.js.map
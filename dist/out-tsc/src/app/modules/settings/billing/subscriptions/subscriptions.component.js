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
var SettingsBillingSubscriptionsComponent = /** @class */ (function () {
    function SettingsBillingSubscriptionsComponent(client, cd) {
        this.client = client;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.inProgress = false;
        this.subscriptions = [];
    }
    SettingsBillingSubscriptionsComponent.prototype.ngOnInit = function () {
        this.loadList();
    };
    SettingsBillingSubscriptionsComponent.prototype.loadList = function () {
        var _this = this;
        this.inProgress = true;
        this.subscriptions = [];
        this.cd.detectChanges();
        return this.client.get("api/v1/payments/subscriptions")
            .then(function (_a) {
            var subscriptions = _a.subscriptions;
            _this.inProgress = false;
            if (subscriptions && subscriptions.length) {
                _this.subscriptions = subscriptions;
                _this.detectChanges();
            }
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.detectChanges();
        });
    };
    SettingsBillingSubscriptionsComponent.prototype.cancel = function (i) {
        var _this = this;
        if (!confirm('Are you sure you want to cancel this subscription?')) {
            return;
        }
        this.inProgress = true;
        this.cd.detectChanges();
        var subscription = this.subscriptions[i];
        this.client.delete("api/v1/payments/subscriptions/" + subscription.id)
            .then(function () {
            _this.subscriptions.splice(i, 1);
            _this.inProgress = false;
            _this.cd.detectChanges();
        })
            .catch(function (e) {
            alert('Sorry, there was an error');
            _this.inProgress = false;
            _this.cd.detectChanges();
        });
    };
    SettingsBillingSubscriptionsComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    SettingsBillingSubscriptionsComponent = __decorate([
        core_1.Component({
            selector: 'm-settings--billing-subscriptions',
            templateUrl: 'subscriptions.component.html'
        }),
        __metadata("design:paramtypes", [client_service_1.Client, core_1.ChangeDetectorRef])
    ], SettingsBillingSubscriptionsComponent);
    return SettingsBillingSubscriptionsComponent;
}());
exports.SettingsBillingSubscriptionsComponent = SettingsBillingSubscriptionsComponent;
//# sourceMappingURL=subscriptions.component.js.map
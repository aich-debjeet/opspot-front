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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var api_1 = require("../../../services/api");
var RevenueOptionsComponent = /** @class */ (function () {
    function RevenueOptionsComponent(client, cd, fb, router) {
        this.client = client;
        this.cd = cd;
        this.fb = fb;
        this.router = router;
        this.inProgress = true;
        this.editing = false;
        this.payoutMethod = {
            account: null,
            country: 'US'
        };
        this.error = '';
        this.leaving = false;
        this.leaveError = '';
    }
    RevenueOptionsComponent.prototype.ngOnInit = function () {
        this.getSettings();
        this.form = this.fb.group({
            accountNumber: ['', forms_1.Validators.required],
            routingNumber: [''],
            country: ['US']
        });
    };
    RevenueOptionsComponent.prototype.getSettings = function () {
        var _this = this;
        this.inProgress = true;
        this.client.get('api/v1/monetization/settings')
            .then(function (_a) {
            var bank = _a.bank, country = _a.country;
            _this.inProgress = false;
            _this.payoutMethod.country = country;
            _this.form.controls.country.setValue(country);
            if (bank.last4) {
                _this.payoutMethod.account = bank;
            }
            _this.detectChanges();
        });
    };
    RevenueOptionsComponent.prototype.addBankAccount = function () {
        var _this = this;
        this.inProgress = true;
        this.error = '';
        this.editing = false;
        this.detectChanges();
        this.client.post('api/v1/monetization/settings', this.form.value)
            .then(function (response) {
            _this.inProgress = false;
            _this.getSettings();
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.error = e.message;
            _this.detectChanges();
        });
    };
    RevenueOptionsComponent.prototype.leave = function () {
        var _this = this;
        this.leaving = true;
        this.detectChanges();
        this.client.delete('api/v1/monetization/settings/account')
            .then(function (response) {
            window.Opspot.user.merchant = [];
            _this.router.navigate(['/newsfeed']);
        })
            .catch(function (e) {
            _this.leaving = false;
            _this.leaveError = e.message;
            _this.detectChanges();
        });
    };
    RevenueOptionsComponent.prototype.edit = function () {
        this.editing = true;
        this.detectChanges();
    };
    RevenueOptionsComponent.prototype.cancelEditing = function () {
        this.editing = false;
        this.detectChanges();
    };
    RevenueOptionsComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    RevenueOptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-revenue--options',
            templateUrl: 'options.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client, core_1.ChangeDetectorRef, forms_1.FormBuilder, router_1.Router])
    ], RevenueOptionsComponent);
    return RevenueOptionsComponent;
}());
exports.RevenueOptionsComponent = RevenueOptionsComponent;
//# sourceMappingURL=options.component.js.map
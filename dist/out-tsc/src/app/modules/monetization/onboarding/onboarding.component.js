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
var forms_1 = require("@angular/forms");
var api_1 = require("../../../services/api");
var onboarding_validators_1 = require("./onboarding.validators");
var MonetizationOnboardingComponent = /** @class */ (function () {
    function MonetizationOnboardingComponent(fb, client, cd) {
        this.fb = fb;
        this.client = client;
        this.cd = cd;
        this.inProgress = false;
        this.restrictAsVerified = false;
        this.opspot = window.Opspot;
        this.edit = false;
        this.completed = new core_1.EventEmitter();
    }
    MonetizationOnboardingComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            country: ['', forms_1.Validators.required],
            ssn: ['', onboarding_validators_1.requiredFor(['US'], { ignore: this.edit })],
            personalIdNumber: ['', onboarding_validators_1.requiredFor(['CA', 'HK', 'SG'], { ignore: this.edit })],
            firstName: ['', onboarding_validators_1.optionalFor(['JP'])],
            lastName: ['', onboarding_validators_1.optionalFor(['JP'])],
            gender: ['', onboarding_validators_1.requiredFor(['JP'])],
            dob: ['', forms_1.Validators.required],
            street: ['', onboarding_validators_1.optionalFor(['JP'])],
            city: ['', onboarding_validators_1.optionalFor(['JP', 'SG'])],
            state: ['', onboarding_validators_1.requiredFor(['AU', 'CA', 'IE', 'US'])],
            postCode: ['', onboarding_validators_1.optionalFor(['HK', 'IE', 'JP'])],
            phoneNumber: ['', onboarding_validators_1.requiredFor(['JP'])],
            stripeAgree: ['', forms_1.Validators.required]
        });
        this.restrictAsVerified = false;
        if (this.merchant) {
            if (this.edit) {
                this.merchant.stripeAgree = true;
                this.restrictAsVerified = this.merchant.verified;
            }
            this.form.patchValue(this.merchant);
        }
        this.disableRestrictedFields();
    };
    Object.defineProperty(MonetizationOnboardingComponent.prototype, "_merchant", {
        set: function (value) {
            if (!value) {
                return;
            }
            this.restrictAsVerified = false;
            if (this.form) {
                if (this.edit) {
                    value.stripeAgree = true;
                }
                this.form.patchValue(value);
            }
            this.merchant = value;
            this.restrictAsVerified = this.merchant.verified;
            this.disableRestrictedFields();
        },
        enumerable: true,
        configurable: true
    });
    MonetizationOnboardingComponent.prototype.submit = function () {
        if (!this.edit) {
            this.onboard();
        }
        else {
            this.update();
        }
    };
    MonetizationOnboardingComponent.prototype.onboard = function () {
        var _this = this;
        if (this.inProgress) {
            return;
        }
        this.inProgress = true;
        this.error = '';
        this.client.post('api/v1/merchant/onboard', this.form.value)
            .then(function (response) {
            _this.inProgress = false;
            if (!_this.opspot.user.programs)
                _this.opspot.user.programs = [];
            _this.opspot.user.programs.push('affiliate');
            _this.completed.emit(response);
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.error = e.message;
            _this.detectChanges();
        });
    };
    MonetizationOnboardingComponent.prototype.update = function () {
        var _this = this;
        if (this.inProgress) {
            return;
        }
        this.inProgress = true;
        this.error = '';
        this.client.post('api/v1/merchant/update', this.form.value)
            .then(function (response) {
            _this.inProgress = false;
            _this.completed.emit(response);
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.error = e.message;
            _this.detectChanges();
        });
    };
    MonetizationOnboardingComponent.prototype.disableRestrictedFields = function () {
        if (!this.form) {
            return;
        }
        var action = this.restrictAsVerified ? 'disable' : 'enable';
        this.form.controls.firstName[action]();
        this.form.controls.lastName[action]();
        this.form.controls.gender[action]();
        this.form.controls.dob[action]();
        this.form.controls.street[action]();
        this.form.controls.city[action]();
        this.form.controls.state[action]();
        this.form.controls.postCode[action]();
        this.form.controls.phoneNumber[action]();
    };
    MonetizationOnboardingComponent.prototype.isCountry = function (countries) {
        var currentCountry = this.form.controls.country.value;
        return countries.indexOf(currentCountry) > -1;
    };
    MonetizationOnboardingComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MonetizationOnboardingComponent.prototype, "edit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MonetizationOnboardingComponent.prototype, "completed", void 0);
    __decorate([
        core_1.Input('merchant'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MonetizationOnboardingComponent.prototype, "_merchant", null);
    MonetizationOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-monetization--onboarding',
            templateUrl: 'onboarding.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, api_1.Client, core_1.ChangeDetectorRef])
    ], MonetizationOnboardingComponent);
    return MonetizationOnboardingComponent;
}());
exports.MonetizationOnboardingComponent = MonetizationOnboardingComponent;
//# sourceMappingURL=onboarding.component.js.map
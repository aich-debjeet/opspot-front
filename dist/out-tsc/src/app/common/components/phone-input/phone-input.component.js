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
var forms_2 = require("@angular/forms");
exports.PHONE_INPUT_VALUE_ACCESSOR = {
    provide: forms_2.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return PhoneInputComponent; }),
    multi: true
};
var PhoneInputComponent = /** @class */ (function () {
    function PhoneInputComponent(fb) {
        this.fb = fb;
        this.phoneNumber = '';
        this.allowedKeyCodes = [8, 33, 34, 35, 36, 37, 39, 46];
        this.propagateChange = function (_) {
        };
    }
    PhoneInputComponent.prototype.ngOnInit = function () {
    };
    PhoneInputComponent.prototype.onPhoneNumberChange = function () {
        this.propagateChange(this.number);
    };
    PhoneInputComponent.prototype.onInputKeyPress = function (event) {
        var pattern = /[0-9\+\-\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar) && this.allowedKeyCodes.indexOf(event.keyCode) === -1) {
            event.preventDefault();
        }
    };
    Object.defineProperty(PhoneInputComponent.prototype, "number", {
        get: function () {
            return this.selectedCountry.dialCode + this.phoneNumber;
        },
        enumerable: true,
        configurable: true
    });
    PhoneInputComponent.prototype.ngOnChanges = function (changes) {
        this.propagateChange(changes);
        console.log(this.number);
    };
    PhoneInputComponent.prototype.writeValue = function (value) {
        if (value && value.length > 10) {
            this.phoneNumber = value.substring(value.length - 11, value.length - 1);
        }
    };
    PhoneInputComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    PhoneInputComponent.prototype.registerOnTouched = function (fn) {
    };
    __decorate([
        core_1.ViewChild('input'),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneInputComponent.prototype, "input", void 0);
    PhoneInputComponent = __decorate([
        core_1.Component({
            selector: 'm-phone-input',
            templateUrl: 'phone-input.component.html',
            providers: [exports.PHONE_INPUT_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], PhoneInputComponent);
    return PhoneInputComponent;
}());
exports.PhoneInputComponent = PhoneInputComponent;
//# sourceMappingURL=phone-input.component.js.map
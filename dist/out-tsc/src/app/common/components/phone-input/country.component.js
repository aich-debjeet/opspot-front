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
var country_1 = require("./country");
var countries_1 = require("./countries");
var PhoneInputCountryComponent = /** @class */ (function () {
    function PhoneInputCountryComponent(fb) {
        this.fb = fb;
        this.selectedCountryEvt = new core_1.EventEmitter();
        this.countries = [];
        this.selectedCountry = new country_1.Country();
        this.countryCodeData = new countries_1.CountryCode();
        this.showDropdownMenu = false;
        this.allowedKeyCodes = [8, 33, 34, 35, 36, 37, 39, 46];
    }
    PhoneInputCountryComponent.prototype.ngOnInit = function () {
        this.fetchCountryData();
        this.selectedCountry = this.countries[0];
        this.selectedCountryEvt.next(this.selectedCountry);
    };
    PhoneInputCountryComponent.prototype.searchList = function (event) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var uppercaseKey = event.key.toUpperCase();
        if (this.showDropdownMenu && chars.indexOf(uppercaseKey)) {
            var items = this.dropdownMenu.nativeElement.querySelectorAll('.country');
            for (var i = 0; i < items.length; ++i) {
                if (items[i].children[1].innerText.trim()[0].toUpperCase() === uppercaseKey) {
                    this.dropdownMenu.nativeElement.scrollTop = items[i].offsetTop;
                    break;
                }
            }
        }
    };
    PhoneInputCountryComponent.prototype.onCountrySelect = function (country) {
        this.selectedCountry = country;
        this.toggleDropdown();
        this.selectedCountryEvt.next(country);
    };
    PhoneInputCountryComponent.prototype.toggleDropdown = function () {
        this.showDropdownMenu = !this.showDropdownMenu;
    };
    PhoneInputCountryComponent.prototype.fetchCountryData = function () {
        var _this = this;
        this.countryCodeData.countries.forEach(function (c) {
            var country = new country_1.Country();
            country.name = c[0].toString();
            country.iso2 = c[1].toString();
            country.dialCode = c[2].toString();
            country.priority = +c[3] || 0;
            country.areaCode = +c[4] || null;
            country.flagClass = country.iso2.toLocaleLowerCase();
            // country.placeHolder = this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
            _this.countries.push(country);
        });
    };
    __decorate([
        core_1.Output('country'),
        __metadata("design:type", Object)
    ], PhoneInputCountryComponent.prototype, "selectedCountryEvt", void 0);
    __decorate([
        core_1.ViewChild('input'),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneInputCountryComponent.prototype, "input", void 0);
    __decorate([
        core_1.ViewChild('dropdownMenu'),
        __metadata("design:type", core_1.ElementRef)
    ], PhoneInputCountryComponent.prototype, "dropdownMenu", void 0);
    PhoneInputCountryComponent = __decorate([
        core_1.Component({
            selector: 'm-phone-input--country',
            templateUrl: 'country.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], PhoneInputCountryComponent);
    return PhoneInputCountryComponent;
}());
exports.PhoneInputCountryComponent = PhoneInputCountryComponent;
//# sourceMappingURL=country.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var country_component_1 = require("./country.component");
var platform_browser_1 = require("@angular/platform-browser");
describe('PhoneInputCountryComponent', function () {
    var comp;
    var fixture;
    function getSelectedFlagButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-phone-input--selected-flag'));
    }
    function getFlagDropdown() {
        return fixture.debugElement.query(platform_browser_1.By.css('ul.m-phone-input--country-list.dropdown-menu'));
    }
    function getFlagItem(i) {
        if (i === void 0) { i = 0; }
        return fixture.debugElement.query(platform_browser_1.By.css("ul.m-phone-input--country-list > li:nth-child(" + i + ")"));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_mock_spec_1.MaterialMock, country_component_1.PhoneInputCountryComponent],
            imports: [forms_1.ReactiveFormsModule, forms_1.FormsModule],
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(country_component_1.PhoneInputCountryComponent);
        comp = fixture.componentInstance; // LoginForm test instance
        fixture.detectChanges();
    });
    it('should have a flag button', testing_1.fakeAsync(function () {
        expect(getSelectedFlagButton()).not.toBeNull();
    }));
    it('flag button should have a flag and an arrow', testing_1.fakeAsync(function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-phone-input--selected-flag > .m-phone-input--flag'))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-phone-input--selected-flag > .m-phone-input--arrow'))).not.toBeNull();
    }));
    it('should have a flag button', testing_1.fakeAsync(function () {
        expect(getSelectedFlagButton()).not.toBeNull();
    }));
    it('should have a hidden dropdown list', testing_1.fakeAsync(function () {
        expect(getFlagDropdown()).not.toBeNull();
    }));
    it('dropdown list should have a list of countries', testing_1.fakeAsync(function () {
        var selector = 'ul.m-phone-input--country-list > .m-phone-input--country';
        var flag = fixture.debugElement.query(platform_browser_1.By.css(selector + ' > .m-phone-input--flag-box'));
        var countryName = fixture.debugElement.query(platform_browser_1.By.css(selector + ' > .m-phone-input--country-name'));
        var dialCode = fixture.debugElement.query(platform_browser_1.By.css(selector + ' > .m-phone-input--dial-code'));
        expect(flag).not.toBeNull();
        expect(countryName).not.toBeNull();
        expect(dialCode).not.toBeNull();
    }));
    it('clicking on flag button should open the dropdown list', testing_1.fakeAsync(function () {
        getSelectedFlagButton().nativeElement.click();
        fixture.detectChanges();
        expect(getFlagDropdown().nativeElement.hidden).toBeFalsy();
    }));
    it('clicking on a country should close the dropdown', testing_1.fakeAsync(function () {
        getSelectedFlagButton().nativeElement.click();
        fixture.detectChanges();
        getFlagItem(1).nativeElement.click();
        fixture.detectChanges();
        expect(getFlagDropdown().nativeElement.hidden).toBeTruthy();
        expect(comp.selectedCountry).not.toBeNull();
    }));
});
//# sourceMappingURL=country.component.spec.js.map
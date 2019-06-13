"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var phone_input_component_1 = require("./phone-input.component");
var country_component_1 = require("./country.component");
var platform_browser_1 = require("@angular/platform-browser");
describe('PhoneInputComponent', function () {
    var comp;
    var fixture;
    function getInput() {
        return fixture.debugElement.query(platform_browser_1.By.css('input'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_mock_spec_1.MaterialMock, phone_input_component_1.PhoneInputComponent, country_component_1.PhoneInputCountryComponent],
            imports: [forms_1.ReactiveFormsModule, forms_1.FormsModule],
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(phone_input_component_1.PhoneInputComponent);
        comp = fixture.componentInstance; // LoginForm test instance
        fixture.detectChanges();
    });
    it('should have a phone input', testing_1.fakeAsync(function () {
        expect(getInput()).not.toBeNull();
    }));
    it('should set a phone number', function () {
        getInput().nativeElement.value = '0123456789';
        getInput().nativeElement.dispatchEvent(new Event('input'));
        expect(comp.number).toEqual('10123456789');
    });
});
//# sourceMappingURL=phone-input.component.spec.js.map
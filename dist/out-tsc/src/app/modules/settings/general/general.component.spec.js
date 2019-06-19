"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var general_component_1 = require("./general.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../services/session");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var common_1 = require("@angular/common");
var text_field_mock_spec_1 = require("../../../mocks/common/directives/material/text-field-mock.spec");
var third_party_networks_mock_spec_1 = require("../../../mocks/services/third-party-networks-mock.spec");
var third_party_networks_1 = require("../../../services/third-party-networks");
var of_1 = require("rxjs/internal/observable/of");
var router_1 = require("@angular/router");
var routerMock = new function () {
    this.navigate = jasmine.createSpy('navigate');
};
describe('SettingsGeneralComponent', function () {
    var comp;
    var fixture;
    function getSaveButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-settings--action > button.m-btn.m-btn--slim.m-btn--action'));
    }
    function getSavedButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-settings--action > button.m-btn.m-btn--slim:not(.m-btn--action)'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_mock_spec_1.MaterialMock, text_field_mock_spec_1.MaterialTextfieldMock, general_component_1.SettingsGeneralComponent],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule, common_1.CommonModule, forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: third_party_networks_1.ThirdPartyNetworksService, useValue: third_party_networks_mock_spec_1.thirdPartyNetworksServiceMock },
                { provide: router_1.ActivatedRoute, useValue: { params: of_1.of({ 'guid': '1000' }) } },
                { provide: router_1.Router, useValue: routerMock },
            ]
        })
            .compileComponents();
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(general_component_1.SettingsGeneralComponent);
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v1/settings/'] = {
            status: 'success',
            channel: {
                guid: '1000',
                name: '',
                email: 'test@ops.doesntexist.com',
                mature: 0,
                disabled_emails: 0,
                selectedCategories: ['art', 'comedy'],
                open_sessions: 1,
            },
            thirdpartynetworks: []
        };
        window.Opspot.user = {
            "guid": "1000",
            "type": "user",
            "signup_method": false,
        };
        window.Opspot.categories = {
            art: 'Art',
            animals: 'Animals'
        };
        fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable()
                .then(function () { return done(); });
        }
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should have an action bar', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-settings--action'))).not.toBeNull();
    });
    it('should have a save button in the action bar', function () {
        var saveButton = getSaveButton();
        expect(saveButton).not.toBeNull();
        expect(saveButton.nativeElement.textContent).toContain('Save');
        expect(saveButton.nativeElement.hidden).toBeFalsy();
    });
    it('should have a saved button in the action bar when settings have already been saved', function () {
        comp.saved = true;
        fixture.detectChanges();
        var saveButton = getSaveButton();
        expect(saveButton.nativeElement.hidden).toBeTruthy();
        var savedButton = getSavedButton();
        expect(savedButton).not.toBeNull();
        expect(savedButton.nativeElement.textContent).toContain('Saved');
        expect(savedButton.nativeElement.hidden).toBeFalsy();
    });
    it('should display an error (if any) in the action bar', function () {
        comp.error = 'error';
        fixture.detectChanges();
        var error = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--action > .opspot-error'));
        expect(error).not.toBeNull();
        expect(error.nativeElement.textContent).toContain(comp.error);
    });
    it('should display a progress bar in the action bar', function () {
        var spinner = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--action > .mdl-spinner'));
        expect(spinner).not.toBeNull();
        expect(spinner.nativeElement.hidden).toBeTruthy();
        comp.inProgress = true;
        fixture.detectChanges();
        expect(spinner.nativeElement.hidden).toBeFalsy();
    });
    it('should have a display name section', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-settings--name'))).not.toBeNull();
        var h4 = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--name > h4'));
        expect(h4).not.toBeNull();
        expect(h4.nativeElement.textContent).toContain('Display Name');
        var input = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--name input'));
        expect(input).not.toBeNull();
    });
    it('should change the display name when the input changes', function () {
        spyOn(comp, 'change').and.callThrough();
        var input = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--name input'));
        input.nativeElement.value = 'test';
        input.nativeElement.dispatchEvent(new Event('input'));
        input.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();
        expect(comp.name).toBe('test');
        expect(comp.change).toHaveBeenCalled();
        expect(comp.changed).toBeTruthy();
        expect(comp.saved).toBeFalsy();
    });
    it('should have a password section', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password'))).not.toBeNull();
        var h4 = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password > h4'));
        expect(h4).not.toBeNull();
        expect(h4.nativeElement.textContent).toContain('Account Password');
        var currentPassword = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password input#password'));
        expect(currentPassword).not.toBeNull();
        var currentPasswordLabel = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password label[for=password]'));
        expect(currentPasswordLabel).not.toBeNull();
        expect(currentPasswordLabel.nativeElement.textContent).toContain('Current password');
        var newPassword = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password input#password1'));
        expect(newPassword).not.toBeNull();
        var newPasswordLabel = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password label[for=password1]'));
        expect(newPasswordLabel).not.toBeNull();
        expect(newPasswordLabel.nativeElement.textContent).toContain('Your new password');
        var repeatPassword = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password input#password2'));
        expect(repeatPassword).not.toBeNull();
        var repeatPasswordLabel = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password label[for=password2]'));
        expect(repeatPasswordLabel).not.toBeNull();
        expect(repeatPasswordLabel.nativeElement.textContent).toContain('Your new password again');
    });
    it('should change the password when the input changes', testing_1.fakeAsync(function () {
        spyOn(comp, 'change').and.callThrough();
        var currentPassword = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password input#password'));
        var newPassword = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password input#password1'));
        var repeatPassword = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--password input#password2'));
        expect(newPassword.nativeElement.disabled).toBeTruthy();
        expect(repeatPassword.nativeElement.disabled).toBeTruthy();
        currentPassword.nativeElement.value = 'test';
        currentPassword.nativeElement.dispatchEvent(new Event('input'));
        currentPassword.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.password).toBe('test');
        expect(newPassword.nativeElement.disabled).toBeFalsy();
        expect(repeatPassword.nativeElement.disabled).toBeFalsy();
        newPassword.nativeElement.value = 'test2';
        newPassword.nativeElement.dispatchEvent(new Event('input'));
        newPassword.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();
        expect(comp.password1).toBe('test2');
        expect(comp.canSubmit()).toBeFalsy(); // passwords do not yet match
        repeatPassword.nativeElement.value = 'test2';
        repeatPassword.nativeElement.dispatchEvent(new Event('input'));
        repeatPassword.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();
        expect(comp.password2).toBe('test2');
        expect(comp.change).toHaveBeenCalledTimes(3);
        expect(comp.canSubmit()).toBeTruthy();
    }));
    it('should have a mature content section', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-settings--mature'))).not.toBeNull();
        var h4 = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--mature > h4'));
        expect(h4).not.toBeNull();
        expect(h4.nativeElement.textContent).toContain('Mature Content');
        var input = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--mature input'));
        expect(input).not.toBeNull();
        var label = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--mature label'));
        expect(label).not.toBeNull();
        expect(label.nativeElement.textContent).toContain('Always show mature content (18+)');
    });
    it('should change the mature  property when the input changes', function () {
        spyOn(comp, 'change').and.callThrough();
        var input = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--mature input'));
        expect(input).not.toBeNull();
        expect(input.nativeElement.checked).toBeFalsy();
        input.nativeElement.click();
        fixture.detectChanges();
        expect(comp.mature).toBeTruthy();
        expect(comp.change).toHaveBeenCalled();
    });
    it('should have a sessions section', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-settings--close-all-sessions'))).not.toBeNull();
        var h4 = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--close-all-sessions > h4'));
        expect(h4).not.toBeNull();
        expect(h4.nativeElement.textContent).toContain('Sessions');
        var p = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--close-all-sessions > p'));
        expect(p).not.toBeNull();
        expect(p.nativeElement.textContent).toContain('You currently have 1 opened session');
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--close-all-sessions button'));
        expect(button).not.toBeNull();
        expect(button.nativeElement.textContent).toContain('Close All Sessions');
    });
    it('should close all sessions', function () {
        spyOn(comp, 'closeAllSessions').and.callThrough();
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--close-all-sessions button'));
        button.nativeElement.click();
        expect(comp.closeAllSessions).toHaveBeenCalled();
        expect(routerMock.navigate).toHaveBeenCalled();
        expect(routerMock.navigate.calls.mostRecent().args[0]).toEqual(['/logout/all']);
    });
});
//# sourceMappingURL=general.component.spec.js.map
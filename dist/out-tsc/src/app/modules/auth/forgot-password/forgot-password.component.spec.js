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
var testing_1 = require("@angular/core/testing");
var forgot_password_component_1 = require("./forgot-password.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var opspot_title_service_mock_spec_1 = require("../../../mocks/services/ux/opspot-title.service.mock.spec");
var title_1 = require("../../../services/ux/title");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var session_1 = require("../../../services/session");
var client_1 = require("../../../services/api/client");
var mock_1 = require("../../../utils/mock");
var BlankComponent = /** @class */ (function () {
    function BlankComponent() {
        this.done = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BlankComponent.prototype, "referrer", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], BlankComponent.prototype, "done", void 0);
    BlankComponent = __decorate([
        core_1.Component({
            selector: '',
            template: ''
        })
    ], BlankComponent);
    return BlankComponent;
}());
describe('ForgotPasswordComponent', function () {
    var comp;
    var fixture;
    function getUsernameInput() {
        return fixture.debugElement.query(platform_browser_1.By.css('input#username'));
    }
    function getContinueButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-forgot-password--step-1 button'));
    }
    function getResetButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-forgot-password--step-3 button'));
    }
    function getPassword1Input() {
        return fixture.debugElement.query(platform_browser_1.By.css('input#password'));
    }
    function getPassword2Input() {
        return fixture.debugElement.query(platform_browser_1.By.css('input#password2'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }), BlankComponent, forgot_password_component_1.ForgotPasswordComponent],
            imports: [testing_2.RouterTestingModule.withRoutes([{ path: 'newsfeed', component: BlankComponent }]), forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: title_1.OpspotTitle, useValue: opspot_title_service_mock_spec_1.opspotTitleMock },
            ]
        })
            .compileComponents();
    }));
    // synchronous beforeEach
    beforeEach(function () {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        fixture = testing_1.TestBed.createComponent(forgot_password_component_1.ForgotPasswordComponent);
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        fixture.detectChanges();
    });
    it('should have a prompt to enter your username', function () {
        var prompt = fixture.debugElement.query(platform_browser_1.By.css('.m-forgot-password--step-1 .mdl-card__supporting-text'));
        expect(prompt).not.toBeNull();
        expect(prompt.nativeElement.textContent).toContain('To request a new password, enter your username');
    });
    it('should have a username input and a continue button', function () {
        expect(getUsernameInput()).not.toBeNull();
        var button = getContinueButton();
        expect(button).not.toBeNull();
        expect(button.nativeElement.textContent).toContain('Continue');
    });
    it('should move to step 2 after clicking on continue', testing_1.fakeAsync(function () {
        spyOn(comp, 'request').and.callThrough();
        var url = 'api/v1/forgotpassword/request';
        client_mock_spec_1.clientMock.response[url] = { status: 'success' };
        var input = getUsernameInput();
        input.nativeElement.value = 'test';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        getContinueButton().nativeElement.click();
        jasmine.clock().tick(10);
        testing_1.tick();
        fixture.detectChanges();
        expect(comp.request).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe(url);
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({ username: 'test' });
        expect(comp.step).toBe(2);
    }));
    it('should prompt the user that an email with the code has been sent on step 2', function () {
        comp.step = 2;
        fixture.detectChanges();
        var prompt = fixture.debugElement.query(platform_browser_1.By.css('.m-forgot-password--step-2 .mdl-card__supporting-text'));
        expect(prompt).not.toBeNull();
        expect(prompt.nativeElement.textContent).toContain('We have sent an unlock code to your registered email address.');
    });
    it('should allow the user to change its password in step 3', testing_1.fakeAsync(function () {
        comp.step = 3;
        comp.username = 'test';
        comp.code = 'code';
        fixture.detectChanges();
        var prompt = fixture.debugElement.query(platform_browser_1.By.css('.m-forgot-password--step-3 .mdl-card__supporting-text'));
        expect(prompt).not.toBeNull();
        expect(prompt.nativeElement.textContent).toContain('Please enter your new password');
        var input1 = getPassword1Input();
        expect(input1).not.toBeNull();
        var input2 = getPassword2Input();
        expect(input2).not.toBeNull();
        input1.nativeElement.value = '123456';
        input1.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        input2.nativeElement.value = '123456';
        input2.nativeElement.dispatchEvent(new Event('input'));
        input2.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();
        client_mock_spec_1.clientMock.post.calls.reset();
        var url = 'api/v1/forgotpassword/reset';
        client_mock_spec_1.clientMock.post[url] = { 'status': 'success' };
        getResetButton().nativeElement.click();
        jasmine.clock().tick(10);
        testing_1.tick();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        var args = client_mock_spec_1.clientMock.post.calls.mostRecent().args;
        expect(args[0]).toBe(url);
        expect(args[1]).toEqual({ password: '123456', code: 'code', username: 'test' });
        expect(session_mock_spec_1.sessionMock.login).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=forgot-password.component.spec.js.map
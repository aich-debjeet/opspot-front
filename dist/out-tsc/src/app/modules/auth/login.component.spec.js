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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var login_component_1 = require("./login.component");
var material_mock_spec_1 = require("../../../tests/material-mock.spec");
var session_1 = require("../../services/session");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var client_1 = require("../../services/api/client");
var login_referrer_service_1 = require("../../services/login-referrer.service");
var login_referrer_service_mock_spec_1 = require("../../mocks/services/login-referrer-service-mock.spec");
var onboarding_service_mock_spec_1 = require("../../mocks/modules/onboarding/onboarding.service.mock.spec");
var onboarding_service_1 = require("../onboarding/onboarding.service");
var title_1 = require("../../services/ux/title");
var opspot_title_service_mock_spec_1 = require("../../mocks/services/ux/opspot-title.service.mock.spec");
var signup_modal_service_mock_1 = require("../../mocks/modules/modals/signup/signup-modal-service.mock");
var service_1 = require("../modals/signup/service");
var platform_browser_1 = require("@angular/platform-browser");
var OpspotFormLoginMock = /** @class */ (function () {
    function OpspotFormLoginMock() {
        this.done = new core_1.EventEmitter();
        this.doneRegistered = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotFormLoginMock.prototype, "done", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotFormLoginMock.prototype, "doneRegistered", void 0);
    OpspotFormLoginMock = __decorate([
        core_1.Component({
            selector: 'opspot-form-login',
            template: ''
        })
    ], OpspotFormLoginMock);
    return OpspotFormLoginMock;
}());
var OpspotFormRegisterMock = /** @class */ (function () {
    function OpspotFormRegisterMock() {
        this.done = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotFormRegisterMock.prototype, "referrer", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotFormRegisterMock.prototype, "done", void 0);
    OpspotFormRegisterMock = __decorate([
        core_1.Component({
            selector: 'opspot-form-register',
            template: ''
        })
    ], OpspotFormRegisterMock);
    return OpspotFormRegisterMock;
}());
describe('LoginComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_mock_spec_1.MaterialMock, OpspotFormLoginMock, OpspotFormRegisterMock, login_component_1.LoginComponent],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule, common_1.CommonModule, forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: login_referrer_service_1.LoginReferrerService, useValue: login_referrer_service_mock_spec_1.loginReferrerServiceMock },
                { provide: onboarding_service_1.OnboardingService, useValue: onboarding_service_mock_spec_1.onboardingServiceMock },
                { provide: title_1.OpspotTitle, useValue: opspot_title_service_mock_spec_1.opspotTitleMock },
                { provide: service_1.SignupModalService, useValue: signup_modal_service_mock_1.signupModalServiceMock },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
        comp = fixture.componentInstance;
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
    it('should have a login form', function () {
        var h3 = fixture.debugElement.query(platform_browser_1.By.css('.m-login div:first-child h3'));
        expect(h3).not.toBeNull();
        expect(h3.nativeElement.textContent).toContain('Login to Opspot');
        expect(fixture.debugElement.query(platform_browser_1.By.css('opspot-form-login'))).not.toBeNull();
    });
    it('should have a register form', function () {
        var h3 = fixture.debugElement.query(platform_browser_1.By.css('.m-login div:last-child h3'));
        expect(h3).not.toBeNull();
        expect(h3.nativeElement.textContent).toContain('Not on Opspot? Start a channel');
        expect(fixture.debugElement.query(platform_browser_1.By.css('opspot-form-register'))).not.toBeNull();
    });
    it('should redirect after logging in', function () {
        expect(login_referrer_service_mock_spec_1.loginReferrerServiceMock.navigate).toHaveBeenCalled();
    });
    it('should redirect after registering', function () {
        comp.registered();
        expect(signup_modal_service_mock_1.signupModalServiceMock.setDisplay).toHaveBeenCalled();
        expect(signup_modal_service_mock_1.signupModalServiceMock.setDisplay.calls.mostRecent().args[0]).toBe('categories');
        expect(signup_modal_service_mock_1.signupModalServiceMock.open).toHaveBeenCalled();
        expect(login_referrer_service_mock_spec_1.loginReferrerServiceMock.navigate).toHaveBeenCalled();
        expect(login_referrer_service_mock_spec_1.loginReferrerServiceMock.navigate.calls.mostRecent().args[0]).toEqual({ defaultUrl: '/test' });
    });
});
//# sourceMappingURL=login.component.spec.js.map
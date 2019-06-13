"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var register_component_1 = require("./register.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var session_1 = require("../../services/session");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var client_1 = require("../../services/api/client");
var signup_modal_service_mock_1 = require("../../mocks/modules/modals/signup/signup-modal-service.mock");
var service_1 = require("../modals/signup/service");
var login_referrer_service_mock_spec_1 = require("../../mocks/services/login-referrer-service-mock.spec");
var login_referrer_service_1 = require("../../services/login-referrer.service");
var onboarding_service_1 = require("../onboarding/onboarding.service");
var onboarding_service_mock_spec_1 = require("../../mocks/modules/onboarding/onboarding.service.mock.spec");
var platform_browser_1 = require("@angular/platform-browser");
var mock_1 = require("../../utils/mock");
describe('RegisterComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [mock_1.MockComponent(({
                    selector: 'opspot-form-register',
                    template: '',
                    inputs: ['referrer'],
                    outputs: ['done']
                })), register_component_1.RegisterComponent],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: service_1.SignupModalService, useValue: signup_modal_service_mock_1.signupModalServiceMock },
                { provide: login_referrer_service_1.LoginReferrerService, useValue: login_referrer_service_mock_spec_1.loginReferrerServiceMock },
                { provide: onboarding_service_1.OnboardingService, useValue: onboarding_service_mock_spec_1.onboardingServiceMock },
            ]
        })
            .compileComponents();
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(register_component_1.RegisterComponent);
        comp = fixture.componentInstance;
        window.Opspot.cdn_assets_url = 'http://dev.opspot.io/';
        comp.flags.canPlayInlineVideos = true;
        fixture.detectChanges();
    });
    it('should have a video with webm and mp4 sources', function () {
        var video = fixture.debugElement.query(platform_browser_1.By.css('.m-video-banner video'));
        expect(video).not.toBeNull();
        expect(video.nativeElement.poster).toBe('http://dev.opspot.io/assets/videos/earth-1/earth-1.png');
        var webmSource = fixture.debugElement.query(platform_browser_1.By.css('video source:first-child'));
        var mp4Source = fixture.debugElement.query(platform_browser_1.By.css('video source:last-child'));
        expect(webmSource).not.toBeNull();
        expect(webmSource.nativeElement.src).toBe('http://dev.opspot.io/assets/videos/earth-1/earth-1.webm');
        expect(mp4Source).not.toBeNull();
        expect(mp4Source.nativeElement.src).toBe('http://dev.opspot.io/assets/videos/earth-1/earth-1.mp4');
    });
    it('should have a register prompt and the form', function () {
        var h3 = fixture.debugElement.query(platform_browser_1.By.css('h3'));
        expect(h3).not.toBeNull();
        expect(h3.nativeElement.textContent).toBe('Not on Opspot? Start a channel');
        expect(fixture.debugElement.query(platform_browser_1.By.css('opspot-form-register'))).not.toBeNull();
    });
    it('should redirect when registered', function () {
        comp.registered();
        expect(login_referrer_service_mock_spec_1.loginReferrerServiceMock.navigate).toHaveBeenCalled();
        expect(login_referrer_service_mock_spec_1.loginReferrerServiceMock.navigate.calls.mostRecent().args[0]).toEqual({ defaultUrl: '/test' });
    });
});
//# sourceMappingURL=register.component.spec.js.map
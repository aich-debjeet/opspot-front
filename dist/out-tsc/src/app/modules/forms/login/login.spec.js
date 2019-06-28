"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var login_1 = require("./login");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../services/session");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var mock_1 = require("../../../utils/mock");
describe('LoginForm', function () {
    var comp;
    var fixture;
    var de;
    var el;
    var loginForm;
    var username;
    var password;
    var loginButton;
    var errorMessage;
    var twoFactorForm;
    var twoFactorCode;
    var twoFactorLoginButton;
    var session;
    function login(response) {
        username.nativeElement.value = 'username';
        username.nativeElement.dispatchEvent(new Event('input'));
        password.nativeElement.value = 'password';
        password.nativeElement.dispatchEvent(new Event('input'));
        client_mock_spec_1.clientMock.post.calls.reset();
        client_mock_spec_1.clientMock.response['api/v1/authenticate'] = response;
        testing_1.tick();
        fixture.detectChanges();
        loginButton.nativeElement.click();
        testing_1.tick();
        fixture.detectChanges();
    }
    function twoFactorLogin(response) {
        twoFactorCode.nativeElement.value = '123123';
        twoFactorCode.nativeElement.dispatchEvent(new Event('input'));
        client_mock_spec_1.clientMock.post.calls.reset();
        client_mock_spec_1.clientMock.response['api/v1/twofactor/authenticate'] = response;
        testing_1.tick();
        fixture.detectChanges();
        twoFactorLoginButton.nativeElement.click();
        testing_1.tick();
        fixture.detectChanges();
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }), login_1.LoginForm],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(login_1.LoginForm);
        comp = fixture.componentInstance; // LoginForm test instance
        fixture.detectChanges();
        loginForm = fixture.debugElement.query(platform_browser_1.By.css('form.m-login-box'));
        username = fixture.debugElement.query(platform_browser_1.By.css('#username'));
        password = fixture.debugElement.query(platform_browser_1.By.css('#password'));
        loginButton = fixture.debugElement.query(platform_browser_1.By.css('.m-btn--login'));
        errorMessage = fixture.debugElement.query(platform_browser_1.By.css('.m-error-box'));
        twoFactorForm = fixture.debugElement.query(platform_browser_1.By.css('.opspot-login-box:last-of-type'));
        twoFactorCode = fixture.debugElement.query(platform_browser_1.By.css('#code'));
        twoFactorLoginButton = fixture.debugElement.query(platform_browser_1.By.css('.mdl-card > button'));
        session = comp.session;
        client_mock_spec_1.clientMock.response = [];
    });
    it('should have username input field', function () {
        expect(username).toBeDefined();
    });
    it('should have password input field', function () {
        expect(password).toBeDefined();
    });
    it('should have login button', function () {
        expect(loginButton).toBeDefined();
    });
    it('should have \'forgot password\' link', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-reset-password-link'))).toBeDefined();
    });
    it('should have \'migrate from facebook\' button', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-fb-login-button'))).toBeDefined();
    });
    it('error message should be hidden by default', function () {
        expect(errorMessage.nativeElement.hidden).toBeTruthy();
    });
    it('should spawn error message on incorrect credentials', testing_1.fakeAsync(function () {
        login({ 'status': 'failed' });
        testing_1.tick();
        fixture.detectChanges();
        expect(errorMessage.nativeElement.hidden).toBeFalsy();
    }));
    it('should authenticate on correct credentials', testing_1.fakeAsync(function () {
        spyOn(comp, 'login').and.callThrough();
        login({
            'status': 'success',
            'user': {
                'guid': '714452562123689992',
                'type': 'user',
                'subtype': false,
                'time_created': '1495714764',
                'time_updated': false,
                'container_guid': '0',
                'owner_guid': '0',
                'site_guid': false,
                'access_id': '2',
                'name': 'opspot',
                'username': 'opspot',
                'language': 'en',
                'icontime': '1496687850',
                'legacy_guid': false,
                'featured_id': false,
                'banned': 'no',
                'website': false,
                'briefdescription': false,
                'dob': false,
                'gender': false,
                'city': false,
                'merchant': false,
                'boostProPlus': false,
                'fb': false,
                'mature': 0,
                'monetized': false,
                'signup_method': false,
                'social_profiles': [],
                'feature_flags': false,
                'chat': true,
                'subscribed': false,
                'subscriber': false,
                'subscriptions_count': 1,
                'impressions': 0,
                'boost_rating': '2'
            }
        });
        expect(comp.login).toHaveBeenCalled();
    }));
    it('should\'ve called api/v1/authenticate with correct arguments', testing_1.fakeAsync(function () {
        login({
            'status': 'success',
            'user': {
                'guid': '714452562123689992',
                'type': 'user',
                'subtype': false,
                'time_created': '1495714764',
                'time_updated': false,
                'container_guid': '0',
                'owner_guid': '0',
                'site_guid': false,
                'access_id': '2',
                'name': 'opspot',
                'username': 'opspot',
                'language': 'en',
                'icontime': '1496687850',
                'legacy_guid': false,
                'featured_id': false,
                'banned': 'no',
                'website': false,
                'briefdescription': false,
                'dob': false,
                'gender': false,
                'city': false,
                'merchant': false,
                'boostProPlus': false,
                'fb': false,
                'mature': 0,
                'monetized': false,
                'signup_method': false,
                'social_profiles': [],
                'feature_flags': false,
                'chat': true,
                'subscribed': false,
                'subscriber': false,
                'subscriptions_count': 1,
                'impressions': 0,
                'boost_rating': '2'
            }
        });
        var calls = client_mock_spec_1.clientMock.post['calls'];
        expect(calls.count()).toEqual(1);
        expect(calls.mostRecent().args[0]).toEqual('api/v1/authenticate');
        expect(calls.mostRecent().args[1]).toEqual({ 'username': 'username', 'password': 'password' });
    }));
    it('login form should hide and two-factor form should appear', testing_1.fakeAsync(function () {
        login({ 'status': 'error', 'code': '403', 'message': 'imaprettymessage' });
        expect(loginForm.nativeElement.hidden).toBeTruthy();
        expect(twoFactorForm.nativeElement.hidden).toBeFalsy();
    }));
    it('should spawn error message when incorrect code is written', testing_1.fakeAsync(function () {
        login({ 'status': 'error', 'code': '403', 'message': 'imaprettymessage' });
        twoFactorLogin({ 'status': 'error', 'message': 'Could not verify.' });
        expect(errorMessage.nativeElement.hidden).toBeFalsy();
    }));
    it('should login successfully', testing_1.fakeAsync(function () {
        login({ 'status': 'error', 'code': '403', 'message': 'imaprettymessage' });
        session.login['calls'].reset();
        twoFactorLogin({
            'status': 'success',
            'user': {
                'guid': '726889378877546822',
                'type': 'user',
                'subtype': false,
                'time_created': '1498679876',
                'time_updated': false,
                'container_guid': '0',
                'owner_guid': '0',
                'site_guid': false,
                'access_id': '2',
                'name': 'name',
                'username': 'username',
                'language': 'en',
                'icontime': false,
                'legacy_guid': false,
                'featured_id': false,
                'banned': 'no',
                'website': false,
                'briefdescription': false,
                'dob': false,
                'gender': false,
                'city': false,
                'merchant': false,
                'boostProPlus': false,
                'fb': false,
                'mature': 0,
                'monetized': false,
                'signup_method': false,
                'social_profiles': [],
                'feature_flags': false,
                'subscribed': false,
                'subscriber': false,
                'subscribers_count': 3,
                'subscriptions_count': 1,
                'impressions': 0,
                'boost_rating': '2'
            }
        });
        expect(session.login).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=login.spec.js.map
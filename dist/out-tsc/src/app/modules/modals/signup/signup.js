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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var service_1 = require("./service");
var session_1 = require("../../../services/session");
var analytics_1 = require("../../../services/analytics");
var login_referrer_service_1 = require("../../../services/login-referrer.service");
var SignupModal = /** @class */ (function () {
    function SignupModal(session, router, location, service, cd, zone, applicationRef, loginReferrer, analyticsService) {
        var _this = this;
        this.session = session;
        this.router = router;
        this.location = location;
        this.service = service;
        this.cd = cd;
        this.zone = zone;
        this.applicationRef = applicationRef;
        this.loginReferrer = loginReferrer;
        this.analyticsService = analyticsService;
        this.open = false;
        this.route = '';
        this.opspot = window.Opspot;
        this.subtitle = 'Signup to comment, upload, vote and receive 100 free views on your content.';
        this.display = 'initial';
        this.overrideOnboarding = false;
        this.listen();
        this.service.isOpen.subscribe({
            next: function (open) {
                _this.open = open;
                //hack: nasty ios work around
                _this.applicationRef.tick();
                _this.listen();
            }
        });
        this.service.display.subscribe({ next: function (display) { return _this.display = display; } });
    }
    SignupModal.prototype.listen = function () {
        this.route = this.location.path();
    };
    SignupModal.prototype.close = function () {
        switch (this.display) {
            case 'login':
                this.display = 'initial';
                break;
            case 'register':
                this.display = 'initial';
                break;
            default:
                this.service.close();
        }
    };
    SignupModal.prototype.do = function (display) {
        var _this = this;
        var op = this.route.indexOf('?') > -1 ? '&' : '?';
        switch (display) {
            case 'login':
                //hack to provide login page in history
                window.history.pushState(null, 'Login', this.route + (op + "modal=login"));
                this.analyticsService.send('pageview', { url: this.route + (op + "modal=login") });
                this.display = 'login';
                break;
            case 'register':
                window.history.pushState(null, 'Register', this.route + (op + "modal=register"));
                this.analyticsService.send('pageview', { url: this.route + (op + "modal=register") });
                this.display = 'register';
                break;
            case 'fb':
                window.onSuccessCallback = function (user) {
                    _this.zone.run(function () {
                        _this.session.login(user);
                        if (user['new']) {
                            _this.display = 'fb-complete';
                        }
                        if (!user['new']) {
                            _this.done('login');
                        }
                    });
                };
                window.onErrorCallback = function (reason) {
                    if (reason) {
                        alert(reason);
                    }
                };
                window.open(this.opspot.site_url + 'api/v1/thirdpartynetworks/facebook/login', 'Login with Facebook', 'toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, width=600, height=400, top=100, left=100');
                break;
            case 'categories':
                this.display = 'tutorial';
                break;
        }
    };
    SignupModal.prototype.done = function (display) {
        if (this.overrideOnboarding) {
            this.display = 'initial';
            this.close();
            return;
        }
        switch (display) {
            case 'login':
                this.loginReferrer.navigate({
                    extraParams: "ref=signup&ts=" + Date.now()
                });
                this.display = 'initial'; //stop listening for modal now.
                this.close();
                break;
            case 'register':
                this.loginReferrer.navigate({
                    extraParams: "ref=signup-modal&ts=" + Date.now()
                });
                this.display = 'initial';
                this.close();
                break;
            case 'fb':
                this.loginReferrer.navigate({
                    extraParams: "ref=signup-modal&ts=" + Date.now()
                });
                this.display = 'fb-username';
                break;
            case 'categories':
                this.display = 'initial';
                this.close();
                break;
            case 'tutorial':
                this.display = 'initial';
                this.close();
                break;
        }
    };
    SignupModal.prototype.onClose = function (e) {
        var _this = this;
        this.service.close();
        if (this.display === 'login' || this.display === 'register' || this.display === 'fb-complete') {
            this.display = 'initial';
            setTimeout(function () { _this.service.open(); });
            this.router.navigateByUrl(this.route);
        }
    };
    SignupModal = __decorate([
        core_1.Component({
            selector: 'm-modal-signup',
            inputs: ['open', 'subtitle', 'display', 'overrideOnboarding'],
            templateUrl: 'signup.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            router_1.Router,
            common_1.Location,
            service_1.SignupModalService,
            core_1.ChangeDetectorRef,
            core_1.NgZone,
            core_1.ApplicationRef,
            login_referrer_service_1.LoginReferrerService,
            analytics_1.AnalyticsService])
    ], SignupModal);
    return SignupModal;
}());
exports.SignupModal = SignupModal;
//# sourceMappingURL=signup.js.map
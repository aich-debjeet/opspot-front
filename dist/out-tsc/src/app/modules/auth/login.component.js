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
var router_1 = require("@angular/router");
var service_1 = require("../modals/signup/service");
var title_1 = require("../../services/ux/title");
var api_1 = require("../../services/api");
var session_1 = require("../../services/session");
var login_referrer_service_1 = require("../../services/login-referrer.service");
var onboarding_service_1 = require("../onboarding/onboarding.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(client, router, route, title, modal, loginReferrer, session, onboarding) {
        this.client = client;
        this.router = router;
        this.route = route;
        this.title = title;
        this.modal = modal;
        this.loginReferrer = loginReferrer;
        this.session = session;
        this.onboarding = onboarding;
        this.errorMessage = '';
        this.twofactorToken = '';
        this.hideLogin = false;
        this.inProgress = false;
        this.opspot = window.Opspot;
        this.flags = {
            canPlayInlineVideos: true
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.session.isLoggedIn()) {
            this.loginReferrer.register('/newsfeed');
            // this.loginReferrer.navigate();
        }
        this.title.setTitle('Login');
        this.redirectTo = localStorage.getItem('redirect');
        this.paramsSubscription = this.route.queryParams.subscribe(function (params) {
            if (params['referrer']) {
                _this.referrer = params['referrer'];
            }
        });
        if (/iP(hone|od)/.test(window.navigator.userAgent)) {
            this.flags.canPlayInlineVideos = false;
        }
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    LoginComponent.prototype.loggedin = function () {
        if (this.referrer)
            this.router.navigateByUrl(this.referrer);
        else if (this.redirectTo)
            this.router.navigate([this.redirectTo]);
        else
            this.loginReferrer.navigate();
    };
    LoginComponent.prototype.registered = function () {
        if (this.redirectTo)
            this.router.navigate([this.redirectTo]);
        else {
            this.modal.setDisplay('categories').open();
            this.loginReferrer.navigate({
                defaultUrl: '/' + this.session.getLoggedInUser().username
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'm-login',
            templateUrl: 'login.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            router_1.Router,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            service_1.SignupModalService,
            login_referrer_service_1.LoginReferrerService,
            session_1.Session,
            onboarding_service_1.OnboardingService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
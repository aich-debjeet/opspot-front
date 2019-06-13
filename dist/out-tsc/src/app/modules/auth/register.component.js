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
var api_1 = require("../../services/api");
var session_1 = require("../../services/session");
var service_1 = require("../modals/signup/service");
var login_referrer_service_1 = require("../../services/login-referrer.service");
var onboarding_service_1 = require("../onboarding/onboarding.service");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(client, router, route, modal, loginReferrer, session, onboarding) {
        this.client = client;
        this.router = router;
        this.route = route;
        this.modal = modal;
        this.loginReferrer = loginReferrer;
        this.session = session;
        this.onboarding = onboarding;
        this.opspot = window.Opspot;
        this.errorMessage = '';
        this.twofactorToken = '';
        this.hideLogin = false;
        this.inProgress = false;
        this.flags = {
            canPlayInlineVideos: true
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSubscription = this.route.queryParams.subscribe(function (params) {
            if (params['referrer']) {
                _this.referrer = params['referrer'];
            }
            if (_this.session.isLoggedIn() && _this.referrer) {
                _this.loginReferrer.navigate({ defaultUrl: '/' + _this.referrer });
            }
            else if (_this.session.isLoggedIn()) {
                _this.loginReferrer.navigate();
            }
        });
        if (/iP(hone|od)/.test(window.navigator.userAgent)) {
            this.flags.canPlayInlineVideos = false;
        }
    };
    RegisterComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    RegisterComponent.prototype.registered = function () {
        this.loginReferrer.navigate({
            defaultUrl: '/' + this.session.getLoggedInUser().username
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'm-register',
            templateUrl: 'register.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            router_1.Router,
            router_1.ActivatedRoute,
            service_1.SignupModalService,
            login_referrer_service_1.LoginReferrerService,
            session_1.Session,
            onboarding_service_1.OnboardingService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map
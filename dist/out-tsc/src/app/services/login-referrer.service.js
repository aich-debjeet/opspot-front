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
var session_1 = require("./session");
var LoginReferrerService = /** @class */ (function () {
    function LoginReferrerService(session, router) {
        this.session = session;
        this.router = router;
        this.exceptions = [];
    }
    LoginReferrerService_1 = LoginReferrerService;
    LoginReferrerService._ = function (session, router) {
        return new LoginReferrerService_1(session, router);
    };
    LoginReferrerService.prototype.listen = function () {
        var _this = this;
        this._routerListener = this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.register(event.urlAfterRedirects || event.url);
            }
        });
        this.session.isLoggedIn(function (loggedIn) {
            if (!loggedIn) {
                _this.unregister();
            }
        });
        return this;
    };
    LoginReferrerService.prototype.unlisten = function () {
        this._routerListener.unsubscribe();
        return this;
    };
    LoginReferrerService.prototype.register = function (url) {
        if (!url || this.shouldBeAvoided(url)) {
            return this;
        }
        this.url = this._trim(url);
        return this;
    };
    LoginReferrerService.prototype.unregister = function () {
        this.url = void 0;
        return this;
    };
    LoginReferrerService.prototype.navigate = function (options) {
        if (options === void 0) { options = {}; }
        var url = this.url || options.defaultUrl || LoginReferrerService_1.DEFAULT_URL;
        if (options.extraParams) {
            url += "" + (~url.indexOf('?') ? '&' : '?') + options.extraParams;
        }
        return this.router.navigateByUrl(url, { replaceUrl: true });
    };
    LoginReferrerService.prototype.avoid = function (urls) {
        var _this = this;
        this.exceptions = urls.map(function (url) { return _this._trim(url); });
        return this;
    };
    LoginReferrerService.prototype.shouldBeAvoided = function (url) {
        var cleanUrl = this._trim(url);
        if (~cleanUrl.indexOf(';')) {
            cleanUrl = cleanUrl.split(';')[0];
        }
        return !!~this.exceptions.indexOf(cleanUrl);
    };
    // based on: https://stackoverflow.com/a/36391166
    LoginReferrerService.prototype._trim = function (s) {
        var mask = ' /';
        while (~mask.indexOf(s[0])) {
            s = s.slice(1);
        }
        while (~mask.indexOf(s[s.length - 1])) {
            s = s.slice(0, -1);
        }
        return s;
    };
    var LoginReferrerService_1;
    LoginReferrerService.DEFAULT_URL = '/newsfeed';
    LoginReferrerService = LoginReferrerService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [session_1.Session, router_1.Router])
    ], LoginReferrerService);
    return LoginReferrerService;
}());
exports.LoginReferrerService = LoginReferrerService;
//# sourceMappingURL=login-referrer.service.js.map
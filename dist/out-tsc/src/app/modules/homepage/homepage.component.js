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
var navigation_1 = require("../../services/navigation");
var session_1 = require("../../services/session");
var title_1 = require("../../services/ux/title");
var api_1 = require("../../services/api");
var login_referrer_service_1 = require("../../services/login-referrer.service");
var HomepageComponent = /** @class */ (function () {
    function HomepageComponent(client, title, router, navigation, loginReferrer, session) {
        this.client = client;
        this.title = title;
        this.router = router;
        this.navigation = navigation;
        this.loginReferrer = loginReferrer;
        this.session = session;
        this.videos = [];
        this.blogs = [];
        this.channels = [];
        this.stream = {
            1: [],
            2: [],
            3: []
        };
        this.offset = '';
        this.inProgress = false;
        this.videoError = false;
        this.opspot = window.Opspot;
        this.flags = {
            canPlayInlineVideos: true
        };
        this.title.setTitle('Home');
        this.loadStream();
        if (this.session.isLoggedIn()) {
            this.router.navigate(['/newsfeed']);
            return;
        }
        if (/iP(hone|od)/.test(window.navigator.userAgent)) {
            this.flags.canPlayInlineVideos = false;
        }
    }
    HomepageComponent.prototype.loadStream = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        this.inProgress = true;
        this.client.get('api/v1/newsfeed/featured', { limit: 24, offset: this.offset })
            .then(function (response) {
            var col = 0;
            for (var _i = 0, _a = response.activity; _i < _a.length; _i++) {
                var activity = _a[_i];
                //split stream into 3 columns
                if (col++ >= 3)
                    col = 1;
                _this.stream[col].push(activity);
            }
            _this.offset = response['load-next'];
            _this.inProgress = false;
        })
            .catch(function () {
            _this.inProgress = false;
        });
    };
    HomepageComponent.prototype.loadVideos = function () {
        var _this = this;
        this.client.get('api/v1/entities/featured/videos', { limit: 4 })
            .then(function (response) {
            _this.videos = response.entities;
        });
    };
    HomepageComponent.prototype.loadBlogs = function () {
        var _this = this;
        this.client.get('api/v1/blog/featured', { limit: 4 })
            .then(function (response) {
            _this.blogs = response.blogs;
        });
    };
    HomepageComponent.prototype.registered = function () {
        this.loginReferrer.navigate({
            defaultUrl: '/' + this.session.getLoggedInUser().username + ';onboarding=1'
        });
    };
    HomepageComponent = __decorate([
        core_1.Component({
            selector: 'm-homepage',
            templateUrl: 'homepage.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            title_1.OpspotTitle,
            router_1.Router,
            navigation_1.Navigation,
            login_referrer_service_1.LoginReferrerService,
            session_1.Session])
    ], HomepageComponent);
    return HomepageComponent;
}());
exports.HomepageComponent = HomepageComponent;
//# sourceMappingURL=homepage.component.js.map
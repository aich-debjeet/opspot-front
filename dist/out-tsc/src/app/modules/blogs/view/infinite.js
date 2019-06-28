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
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var title_1 = require("../../../services/ux/title");
var analytics_1 = require("../../../services/analytics");
var BlogViewInfinite = /** @class */ (function () {
    function BlogViewInfinite(session, client, route, router, title, applicationRef, cd, analytics) {
        this.session = session;
        this.client = client;
        this.route = route;
        this.router = router;
        this.title = title;
        this.applicationRef = applicationRef;
        this.cd = cd;
        this.analytics = analytics;
        this.opspot = window.Opspot;
        this.blogs = [];
        this.sharetoggle = false;
        this.inProgress = false;
        this.moreData = true;
        this.error = '';
    }
    BlogViewInfinite.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            var load = false;
            if (params['guid']) {
                _this.guid = params['guid'];
                load = true;
            }
            else if (params['slugid']) {
                var slugParts = params['slugid'].split('-');
                _this.guid = slugParts[slugParts.length - 1];
                if (_this.guid) {
                    load = true;
                }
            }
            if (load) {
                _this.load();
            }
        });
    };
    BlogViewInfinite.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    BlogViewInfinite.prototype.ngAfterViewInit = function () {
        if (this.guid) {
            this.load();
        }
    };
    BlogViewInfinite.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress) {
            return false;
        }
        this.inProgress = true;
        this.analytics.preventDefault();
        //console.log('grabbing ' + this.guid);
        this.client.get('api/v1/blog/' + this.guid, {})
            .then(function (response) {
            if (response.blog) {
                _this.blogs = [response.blog];
                _this.title.setTitle(response.blog.title);
                _this.analytics.send('pageview', {
                    'url': '/blog/view/' + response.blog.guid,
                    'referrer': document.referrer,
                    'dimension1': response.blog.ownerObj.guid
                }, response.blog.guid);
            }
            else if (_this.blogs.length === 0) {
                _this.error = 'Sorry, we couldn\'t load the blog';
            }
            //hack: ios rerun on low memory
            _this.cd.markForCheck();
            _this.applicationRef.tick();
            _this.inProgress = false;
        })
            .catch(function (e) {
            if (_this.blogs.length === 0) {
                _this.error = 'Sorry, there was a problem loading the blog';
            }
            _this.inProgress = false;
        });
    };
    BlogViewInfinite = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-blog-view-infinite',
            templateUrl: 'infinite.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, router_1.ActivatedRoute, router_1.Router, title_1.OpspotTitle,
            core_1.ApplicationRef, core_1.ChangeDetectorRef, analytics_1.AnalyticsService])
    ], BlogViewInfinite);
    return BlogViewInfinite;
}());
exports.BlogViewInfinite = BlogViewInfinite;
//# sourceMappingURL=infinite.js.map
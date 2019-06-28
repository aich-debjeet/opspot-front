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
var scroll_1 = require("../../../services/ux/scroll");
var analytics_1 = require("../../../services/analytics");
var attachment_1 = require("../../../services/attachment");
var context_service_1 = require("../../../services/context.service");
var optimized_resize_1 = require("../../../utils/optimized-resize");
var BlogView = /** @class */ (function () {
    function BlogView(session, client, router, _element, scroll, title, attachment, context, analytics, analyticsService) {
        this.session = session;
        this.client = client;
        this.router = router;
        this.scroll = scroll;
        this.title = title;
        this.attachment = attachment;
        this.context = context;
        this.analytics = analytics;
        this.analyticsService = analyticsService;
        this.sharetoggle = false;
        this.deleteToggle = false;
        this.inProgress = false;
        this.moreData = true;
        this.activeBlog = 0;
        this.visible = false;
        this.index = 0;
        this.menuOptions = ['edit', 'follow', 'feature', 'delete', 'report', 'subscribe', 'set-explicit', 'remove-explicit', 'rating'];
        this.opspot = window.Opspot;
        this.element = _element.nativeElement;
        optimized_resize_1.optimizedResize.add(this.onResize.bind(this));
    }
    BlogView.prototype.ngOnInit = function () {
        this.isVisible();
        this.context.set('object:blog');
    };
    BlogView.prototype.isVisible = function () {
        var _this = this;
        //listens every 0.6 seconds
        this.scroll_listener = this.scroll.listen(function (e) {
            var bounds = _this.element.getBoundingClientRect();
            if (bounds.top < _this.scroll.view.clientHeight && bounds.top + bounds.height > _this.scroll.view.clientHeight) {
                var url = _this.opspot.site_url + "blog/view/" + _this.blog.guid;
                if (_this.blog.route) {
                    url = "" + _this.opspot.site_url + _this.blog.route;
                }
                if (!_this.visible) {
                    window.history.pushState(null, _this.blog.title, url);
                    _this.title.setTitle(_this.blog.title);
                    _this.analyticsService.send('pageview', { url: "/blog/view/" + _this.blog.guid });
                }
                _this.visible = true;
            }
            else {
                _this.visible = false;
            }
        }, 0, 300);
    };
    Object.defineProperty(BlogView.prototype, "_blog", {
        set: function (value) {
            var _this = this;
            this.blog = value;
            setTimeout(function () {
                _this.calculateLockScreenHeight();
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlogView.prototype, "_index", {
        set: function (value) {
            this.index = value;
            if (this.index === 0) {
                this.visible = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    BlogView.prototype.delete = function () {
        var _this = this;
        this.client.delete('api/v1/blog/' + this.blog.guid)
            .then(function (response) {
            _this.router.navigate(['/blog/owner']);
        });
    };
    BlogView.prototype.ngOnDestroy = function () {
        if (this.scroll_listener)
            this.scroll.unListen(this.scroll_listener);
    };
    BlogView.prototype.menuOptionSelected = function (option) {
        switch (option) {
            case 'edit':
                this.router.navigate(['/blog/edit', this.blog.guid]);
                break;
            case 'delete':
                this.delete();
                break;
            case 'set-explicit':
                this.setExplicit(true);
                break;
            case 'remove-explicit':
                this.setExplicit(false);
                break;
        }
    };
    BlogView.prototype.setExplicit = function (value) {
        var _this = this;
        this.blog.mature = value;
        this.client.post("api/v1/entities/explicit/" + this.blog.guid, { value: value ? '1' : '0' })
            .catch(function (e) {
            _this.blog.mature = _this.blog.mature;
        });
    };
    BlogView.prototype.calculateLockScreenHeight = function () {
        if (!this.lockScreen)
            return;
        var lockScreenOverlay = this.lockScreen.nativeElement.querySelector('.m-wire--lock-screen');
        if (lockScreenOverlay) {
            var rect = lockScreenOverlay.getBoundingClientRect();
            lockScreenOverlay.style.height = "calc(100vh - " + rect.top + "px)";
        }
    };
    /**
     * called when the window resizes
     * @param {Event} event
     */
    BlogView.prototype.onResize = function (event) {
        this.calculateLockScreenHeight();
    };
    __decorate([
        core_1.ViewChild('lockScreen', { read: core_1.ElementRef }),
        __metadata("design:type", Object)
    ], BlogView.prototype, "lockScreen", void 0);
    BlogView = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-blog-view',
            inputs: ['_blog: blog', '_index: index'],
            host: {
                'class': 'm-blog'
            },
            templateUrl: 'view.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            router_1.Router,
            core_1.ElementRef,
            scroll_1.ScrollService,
            title_1.OpspotTitle,
            attachment_1.AttachmentService,
            context_service_1.ContextService,
            analytics_1.AnalyticsService,
            analytics_1.AnalyticsService])
    ], BlogView);
    return BlogView;
}());
exports.BlogView = BlogView;
//# sourceMappingURL=view.js.map
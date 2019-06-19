"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var SignupModalService = /** @class */ (function () {
    function SignupModalService(router, scroll) {
        this.router = router;
        this.scroll = scroll;
        this.defaultSubtitle = 'Signup to comment, upload, vote and earn 100+ free views on your content daily.';
        this.subtitle = this.defaultSubtitle;
        this.isOpen = new core_1.EventEmitter();
        this.display = new core_1.EventEmitter();
        console.log('modal service constructed');
        this.initOnScroll();
    }
    SignupModalService._ = function (router, scroll) {
        return new SignupModalService(router, scroll);
    };
    SignupModalService.prototype.open = function () {
        this.isOpen.next(true);
        return this;
    };
    SignupModalService.prototype.close = function () {
        this.isOpen.next(false);
        this.display.next('initial');
        this.subtitle = this.defaultSubtitle;
        return this;
    };
    SignupModalService.prototype.setSubtitle = function (text) {
        this.subtitle = text;
        return this;
    };
    SignupModalService.prototype.setDisplay = function (display) {
        this.display.next(display);
        return this;
    };
    SignupModalService.prototype.initOnScroll = function () {
        var _this = this;
        this.routerSubscription = this.router.events.subscribe(function (navigationEvent) {
            try {
                if (navigationEvent instanceof router_1.NavigationEnd) {
                    if (!navigationEvent.urlAfterRedirects) {
                        return;
                    }
                    var url = navigationEvent.urlAfterRedirects;
                    if (url.indexOf('/') === 0) {
                        url = url.substr(1);
                    }
                    var fragments = url.replace(/\//g, ';').split(';');
                    _this.route = navigationEvent.urlAfterRedirects;
                    switch (fragments[0]) {
                        case 'register':
                        case 'login':
                        case 'forgot-password':
                        case 'plus':
                        case 'monetization':
                        case 'affiliates':
                        case '':
                            _this.close();
                            break;
                        default:
                            if (_this.scroll_listener)
                                return;
                            _this.scroll_listener = _this.scroll.listen(function (e) {
                                if (_this.scroll.view.scrollTop > 100) {
                                    if (window.localStorage.getItem('hideSignupModal'))
                                        _this.close();
                                    else
                                        _this.open();
                                    _this.scroll.unListen(_this.scroll_listener);
                                }
                            }, 100);
                    }
                }
            }
            catch (e) {
                console.error('Opspot: router hook(SignupModalService)', e);
            }
        });
    };
    return SignupModalService;
}());
exports.SignupModalService = SignupModalService;
//# sourceMappingURL=service.js.map
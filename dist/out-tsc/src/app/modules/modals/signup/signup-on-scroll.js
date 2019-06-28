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
var session_1 = require("../../../services/session");
var scroll_1 = require("../../../services/ux/scroll");
var SignupOnScrollModal = /** @class */ (function () {
    function SignupOnScrollModal(session, router, scroll) {
        this.session = session;
        this.router = router;
        this.scroll = scroll;
        this.open = false;
        this.route = '';
        this.opspot = window.Opspot;
        this.display = 'initial';
    }
    SignupOnScrollModal.prototype.ngOnInit = function () {
        this.listen();
    };
    SignupOnScrollModal.prototype.ngOnDestroy = function () {
        this.unListen();
        if (this.scroll_listener) {
            this.scroll.unListen(this.scroll_listener);
        }
    };
    SignupOnScrollModal.prototype.listen = function () {
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
                        case '':
                            _this.open = false;
                            break;
                        default:
                            _this.scroll_listener = _this.scroll.listen(function (e) {
                                if (_this.scroll.view.scrollTop > 20) {
                                    if (window.localStorage.getItem('hideSignupModal'))
                                        _this.open = false;
                                    else
                                        _this.open = true;
                                    _this.scroll.unListen(_this.scroll_listener);
                                }
                            }, 100);
                    }
                }
            }
            catch (e) {
                console.error('Opspot: router hook(SignupOnScrollModal)', e);
            }
        });
    };
    SignupOnScrollModal.prototype.unListen = function () {
        this.routerSubscription.unsubscribe();
    };
    SignupOnScrollModal = __decorate([
        core_1.Component({
            selector: 'm-modal-signup-on-scroll',
            template: "\n    <m-modal-signup open=\"true\" *ngIf=\"open\"></m-modal-signup>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session, router_1.Router, scroll_1.ScrollService])
    ], SignupOnScrollModal);
    return SignupOnScrollModal;
}());
exports.SignupOnScrollModal = SignupOnScrollModal;
//# sourceMappingURL=signup-on-scroll.js.map
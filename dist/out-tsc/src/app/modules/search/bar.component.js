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
var context_service_1 = require("../../services/context.service");
var session_1 = require("../../services/session");
var SearchBarComponent = /** @class */ (function () {
    function SearchBarComponent(router, context, session) {
        this.router = router;
        this.context = context;
        this.session = session;
        this.suggestionsDisabled = false;
        this.hasSearchContext = false;
        this.searchContext = '';
    }
    SearchBarComponent.prototype.ngOnInit = function () {
        this.listen();
    };
    SearchBarComponent.prototype.ngOnDestroy = function () {
        this.unListen();
    };
    SearchBarComponent.prototype.listen = function () {
        var _this = this;
        this.routerSubscription = this.router.events.subscribe(function (navigationEvent) {
            try {
                if (navigationEvent instanceof router_1.NavigationEnd) {
                    if (!navigationEvent.urlAfterRedirects) {
                        return;
                    }
                    _this.handleUrl(navigationEvent.urlAfterRedirects);
                }
            }
            catch (e) {
                console.error('Opspot: router hook(SearchBar)', e);
            }
        });
    };
    SearchBarComponent.prototype.unListen = function () {
        this.routerSubscription.unsubscribe();
    };
    SearchBarComponent.prototype.handleUrl = function (url) {
        var _this = this;
        if (url.indexOf('/') === 0) {
            url = url.substr(1);
        }
        var fragments = url.replace(/\//g, ';').split(';');
        if (fragments[0] === 'search') {
            this.hasSearchContext = true;
            this.suggestionsDisabled = true;
            setTimeout(function () { return _this.getActiveSearchContext(fragments); }, 5);
        }
        else {
            this.q = '';
            this.id = '';
            this.hasSearchContext = false;
            this.suggestionsDisabled = false;
        }
    };
    SearchBarComponent.prototype.focus = function () {
        this.active = true;
    };
    SearchBarComponent.prototype.blur = function () {
        var _this = this;
        setTimeout(function () { return _this.active = false; }, 100);
    };
    SearchBarComponent.prototype.search = function () {
        var qs = { q: this.q, ref: 'top' };
        if (this.id) {
            qs.id = this.id;
        }
        this.router.navigate(['search', qs]);
    };
    SearchBarComponent.prototype.keyup = function (e) {
        if (e.keyCode === 13 && this.session.isLoggedIn()) {
            this.search();
            this.unsetFocus();
        }
    };
    SearchBarComponent.prototype.setFocus = function () {
        if (this.searchInput.nativeElement) {
            this.searchInput.nativeElement.focus();
        }
    };
    SearchBarComponent.prototype.unsetFocus = function () {
        if (this.searchInput.nativeElement) {
            this.searchInput.nativeElement.blur();
        }
    };
    SearchBarComponent.prototype.getActiveSearchContext = function (fragments) {
        var _this = this;
        this.searchContext = '';
        this.id = '';
        fragments.forEach(function (fragment) {
            var param = fragment.split('=');
            if (param[0] === 'q') {
                _this.q = decodeURIComponent(param[1]);
            }
            if (param[0] === 'id') {
                _this.id = param[1];
                _this.searchContext = _this.context.resolveLabel(decodeURIComponent(param[1]));
            }
            if (param[0] == 'type' && !_this.searchContext) {
                _this.searchContext = _this.context.resolveStaticLabel(decodeURIComponent(param[1]));
            }
        });
    };
    __decorate([
        core_1.ViewChild('searchInput'),
        __metadata("design:type", core_1.ElementRef)
    ], SearchBarComponent.prototype, "searchInput", void 0);
    SearchBarComponent = __decorate([
        core_1.Component({
            selector: 'm-search--bar',
            host: {
                '(keyup)': 'keyup($event)'
            },
            templateUrl: 'bar.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            context_service_1.ContextService,
            session_1.Session])
    ], SearchBarComponent);
    return SearchBarComponent;
}());
exports.SearchBarComponent = SearchBarComponent;
//# sourceMappingURL=bar.component.js.map
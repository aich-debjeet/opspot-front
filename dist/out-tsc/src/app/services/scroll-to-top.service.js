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
var ScrollToTopService = /** @class */ (function () {
    function ScrollToTopService(router) {
        this.router = router;
    }
    ScrollToTopService_1 = ScrollToTopService;
    ScrollToTopService._ = function (router) {
        return new ScrollToTopService_1(router);
    };
    ScrollToTopService.prototype.listen = function () {
        this._routerListener = this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });
        return this;
    };
    ScrollToTopService.prototype.unlisten = function () {
        this._routerListener.unsubscribe();
        return this;
    };
    var ScrollToTopService_1;
    ScrollToTopService = ScrollToTopService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], ScrollToTopService);
    return ScrollToTopService;
}());
exports.ScrollToTopService = ScrollToTopService;
//# sourceMappingURL=scroll-to-top.service.js.map
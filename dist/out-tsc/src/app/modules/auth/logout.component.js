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
var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(client, router, route, session) {
        var _this = this;
        this.client = client;
        this.router = router;
        this.route = route;
        this.session = session;
        this.route.url.subscribe(function (segments) {
            _this.logout(segments && segments.length > 1 && segments[1].toString() === 'all');
        });
    }
    LogoutComponent.prototype.logout = function (closeAllSessions) {
        if (closeAllSessions === void 0) { closeAllSessions = false; }
        var url = 'api/v1/authenticate';
        if (closeAllSessions)
            url += '/all';
        this.client.delete(url);
        this.session.logout();
        this.router.navigate(['/login']);
    };
    LogoutComponent = __decorate([
        core_1.Component({
            template: ""
        }),
        __metadata("design:paramtypes", [api_1.Client,
            router_1.Router,
            router_1.ActivatedRoute,
            session_1.Session])
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map
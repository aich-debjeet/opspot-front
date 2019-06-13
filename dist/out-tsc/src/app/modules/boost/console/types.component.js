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
var BoostConsoleTypesComponent = /** @class */ (function () {
    function BoostConsoleTypesComponent(session, router, route) {
        this.session = session;
        this.router = router;
        this.route = route;
        this.opspot = window.Opspot;
    }
    BoostConsoleTypesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.url.subscribe(function (segments) {
            _this.type = segments[0].path;
        });
    };
    BoostConsoleTypesComponent = __decorate([
        core_1.Component({
            selector: 'm-boost-console--types',
            templateUrl: 'types.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, router_1.Router, router_1.ActivatedRoute])
    ], BoostConsoleTypesComponent);
    return BoostConsoleTypesComponent;
}());
exports.BoostConsoleTypesComponent = BoostConsoleTypesComponent;
//# sourceMappingURL=types.component.js.map
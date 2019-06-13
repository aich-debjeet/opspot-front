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
var title_1 = require("../../../services/ux/title");
var BoostConsoleComponent = /** @class */ (function () {
    function BoostConsoleComponent(router, route, title) {
        this.router = router;
        this.route = route;
        this.title = title;
        this.opspot = window.Opspot;
        this.title.setTitle('Boost Console');
    }
    BoostConsoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.firstChild.url.subscribe(function (segments) {
            console.log(segments);
            _this.type = segments[0].path;
        });
    };
    BoostConsoleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-boost-console',
            templateUrl: 'console.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, title_1.OpspotTitle])
    ], BoostConsoleComponent);
    return BoostConsoleComponent;
}());
exports.BoostConsoleComponent = BoostConsoleComponent;
//# sourceMappingURL=console.component.js.map
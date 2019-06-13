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
var title_1 = require("../../services/ux/title");
var session_1 = require("../../services/session");
var Admin = /** @class */ (function () {
    function Admin(session, route, title, router) {
        this.session = session;
        this.route = route;
        this.title = title;
        this.router = router;
        this.filter = '';
    }
    Admin.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.session.isAdmin()) {
            this.router.navigate(['/']);
        }
        this.title.setTitle('Admin');
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['filter']) {
                _this.filter = params['filter'];
            }
        });
    };
    Admin.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    Admin = __decorate([
        core_1.Component({
            selector: 'opspot-admin',
            templateUrl: 'admin.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, router_1.ActivatedRoute, title_1.OpspotTitle, router_1.Router])
    ], Admin);
    return Admin;
}());
exports.Admin = Admin;
//# sourceMappingURL=admin.js.map
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
var navigation_1 = require("../../../services/navigation");
var session_1 = require("../../../services/session");
var SidebarNavigationComponent = /** @class */ (function () {
    function SidebarNavigationComponent(navigation, session) {
        this.navigation = navigation;
        this.session = session;
        this.items = navigation.getItems('sidebar');
        this.getUser();
    }
    SidebarNavigationComponent.prototype.getUser = function () {
        var _this = this;
        this.user = this.session.getLoggedInUser(function (user) {
            _this.user = user;
        });
    };
    SidebarNavigationComponent = __decorate([
        core_1.Component({
            selector: 'm-sidebar--navigation',
            templateUrl: 'navigation.component.html'
        }),
        __metadata("design:paramtypes", [navigation_1.Navigation,
            session_1.Session])
    ], SidebarNavigationComponent);
    return SidebarNavigationComponent;
}());
exports.SidebarNavigationComponent = SidebarNavigationComponent;
//# sourceMappingURL=navigation.component.js.map
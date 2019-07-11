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
var title_1 = require("../../../services/ux/title");
var session_1 = require("../../../services/session");
var MobileMarketingComponent = /** @class */ (function () {
    function MobileMarketingComponent(title, session) {
        this.title = title;
        this.session = session;
        this.opspot = window.Opspot;
        this.title.setTitle('Mobile');
    }
    MobileMarketingComponent.prototype.ngOnInit = function () {
        this.user = this.session.getLoggedInUser();
    };
    MobileMarketingComponent = __decorate([
        core_1.Component({
            selector: 'm-mobile--marketing',
            templateUrl: 'marketing.component.html'
        }),
        __metadata("design:paramtypes", [title_1.OpspotTitle,
            session_1.Session])
    ], MobileMarketingComponent);
    return MobileMarketingComponent;
}());
exports.MobileMarketingComponent = MobileMarketingComponent;
//# sourceMappingURL=marketing.component.js.map
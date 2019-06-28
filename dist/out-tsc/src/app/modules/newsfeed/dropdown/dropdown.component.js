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
var session_1 = require("../../../services/session");
var newsfeed_boost_service_1 = require("../newsfeed-boost.service");
var router_1 = require("@angular/router");
var NewsfeedDropdownComponent = /** @class */ (function () {
    function NewsfeedDropdownComponent(session, router, boostService) {
        this.session = session;
        this.router = router;
        this.boostService = boostService;
        this.boostRating = 2;
        this.plus = false;
        this.showBoostOptions = true;
    }
    NewsfeedDropdownComponent.prototype.ngOnInit = function () {
        this.boostRating = this.session.getLoggedInUser().boost_rating;
        this.plus = this.session.getLoggedInUser().plus;
    };
    NewsfeedDropdownComponent.prototype.setExplicit = function (value) {
        this.boostService.setExplicit(value);
    };
    NewsfeedDropdownComponent.prototype.toggleBoostPause = function () {
        this.boostService.togglePause();
    };
    NewsfeedDropdownComponent.prototype.hideBoost = function () {
        this.boostService.hideBoost();
    };
    NewsfeedDropdownComponent.prototype.showBoost = function () {
        this.boostService.showBoost();
    };
    NewsfeedDropdownComponent.prototype.selectCategories = function () {
        this.router.navigate(['/settings/general', 'categories']);
    };
    NewsfeedDropdownComponent = __decorate([
        core_1.Component({
            selector: 'm-newsfeed--dropdown',
            templateUrl: 'dropdown.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            router_1.Router,
            newsfeed_boost_service_1.NewsfeedBoostService])
    ], NewsfeedDropdownComponent);
    return NewsfeedDropdownComponent;
}());
exports.NewsfeedDropdownComponent = NewsfeedDropdownComponent;
//# sourceMappingURL=dropdown.component.js.map
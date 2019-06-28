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
var api_1 = require("../../../services/api");
var OnboardingCategoriesSelector = /** @class */ (function () {
    function OnboardingCategoriesSelector(client) {
        this.client = client;
        this.opspot = window.Opspot;
        this.categories = [];
        this.inProgress = false;
        this.done = new core_1.EventEmitter();
    }
    OnboardingCategoriesSelector.prototype.ngOnInit = function () {
        this.initCategories();
    };
    OnboardingCategoriesSelector.prototype.initCategories = function () {
        delete window.Opspot.categories.other;
        for (var category in window.Opspot.categories) {
            this.categories.push({
                id: category,
                label: window.Opspot.categories[category],
                'selected': false
            });
        }
    };
    OnboardingCategoriesSelector.prototype.saveCategories = function () {
        var _this = this;
        this.inProgress = true;
        var filteredCategories = this.categories.filter(function (category) { return category.selected; }).map(function (category) { return category.id; });
        this.client.post('api/v1/settings', {
            categories: filteredCategories
        })
            .then(function (response) {
            _this.inProgress = false;
            _this.done.next(true);
        })
            .catch(function () {
            _this.inProgress = false;
        });
    };
    OnboardingCategoriesSelector = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-onboarding-categories-selector',
            outputs: ['done'],
            templateUrl: 'categories-selector.html',
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], OnboardingCategoriesSelector);
    return OnboardingCategoriesSelector;
}());
exports.OnboardingCategoriesSelector = OnboardingCategoriesSelector;
//# sourceMappingURL=categories-selector.js.map
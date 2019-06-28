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
var AdminFeatured = /** @class */ (function () {
    function AdminFeatured(client) {
        this.client = client;
        this.category = '';
        this.featured = [];
        this.inProgress = false;
        this.moreData = true;
    }
    AdminFeatured.prototype.ngOnInit = function () {
        this.loadCategories(window.Opspot.categories);
    };
    AdminFeatured.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress) {
            return;
        }
        if (!this.category) {
            this.moreData = false;
            return;
        }
        this.inProgress = true;
        if (refresh) {
            this.featured = [];
            this.moreData = true;
        }
        this.client.get("api/v1/categories/featured", {
            categories: [this.category]
        })
            .then(function (response) {
            var _a;
            //@todo: refactor if pagination (offset) is implemented
            _this.moreData = false;
            _this.inProgress = false;
            if (!response.entities) {
                _this.inProgress = false;
                return;
            }
            (_a = _this.featured).push.apply(_a, response.entities);
        })
            .catch(function (e) {
            _this.moreData = false;
            _this.inProgress = false;
        });
    };
    AdminFeatured.prototype.setCategory = function (category) {
        this.category = category;
        this.load(true);
    };
    AdminFeatured.prototype.loadCategories = function (categories) {
        this.categories = [];
        for (var category in categories) {
            this.categories.push({
                id: category,
                value: window.Opspot.categories[category],
            });
        }
    };
    AdminFeatured = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-admin-featured',
            templateUrl: 'featured.html',
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], AdminFeatured);
    return AdminFeatured;
}());
exports.AdminFeatured = AdminFeatured;
//# sourceMappingURL=featured.js.map
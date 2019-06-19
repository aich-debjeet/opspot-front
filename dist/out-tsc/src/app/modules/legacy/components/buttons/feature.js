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
var session_1 = require("../../../../services/session");
var api_1 = require("../../../../services/api");
var FeatureButton = /** @class */ (function () {
    function FeatureButton(session, client) {
        this.session = session;
        this.client = client;
        this.isFeatured = false;
        this.open = false;
        this.category = 'not-selected';
        this.categories = [];
    }
    FeatureButton.prototype.ngOnInit = function () {
        this.initCategories();
    };
    FeatureButton.prototype.initCategories = function () {
        for (var category in window.Opspot.categories) {
            this.categories.push({
                id: category,
                label: window.Opspot.categories[category],
            });
        }
    };
    Object.defineProperty(FeatureButton.prototype, "_object", {
        set: function (value) {
            if (!value)
                return;
            this.object = value;
            this.isFeatured = value.featured_id || (value.featured === true);
        },
        enumerable: true,
        configurable: true
    });
    FeatureButton.prototype.feature = function () {
        var _this = this;
        var self = this;
        if (this.isFeatured)
            return this.unFeature();
        this.isFeatured = true;
        this.client.put('api/v1/admin/feature/' + this.object.guid + '/' + this.category, {})
            .then(function (response) {
            _this.open = false;
        })
            .catch(function (e) {
            _this.isFeatured = false;
        });
    };
    FeatureButton.prototype.unFeature = function () {
        var _this = this;
        var self = this;
        this.isFeatured = false;
        this.object.featured = false;
        this.client.delete('api/v1/admin/feature/' + this.object.guid, {})
            .then(function (response) {
            _this.open = false;
        })
            .catch(function (e) {
            _this.isFeatured = true;
        });
    };
    FeatureButton.prototype.onModalClose = function (e) {
        this.open = false;
    };
    FeatureButton = __decorate([
        core_1.Component({
            selector: 'opspot-button-feature',
            inputs: ['_object: object'],
            template: "\n    <button class=\"m-btn m-btn--with-icon\" [ngClass]=\"{'selected': isFeatured }\" (click)=\"isFeatured ? feature() : (open = true)\">\n      <i class=\"material-icons\">star</i>\n    </button>\n    <m-modal [open]=\"open\" (closed)=\"onModalClose($event)\">\n      <div class=\"m-button-feature-modal\">\n        <select [(ngModel)]=\"category\">\n          <option value=\"not-selected\" i18n=\"@@OPSPOT__BUTTONS__FEATURE__CATEGORY_PLACEHOLDER\">-- SELECT A CATEGORY --</option>\n          <option *ngFor=\"let category of categories\" [value]=\"category.id\">{{category.label}}</option>\n        </select>\n\n        <button class=\"mdl-button mdl-button--colored\" (click)=\"feature()\" i18n=\"@@M__ACTION__FEATURE\">Feature</button>\n      </div>\n    </m-modal>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client])
    ], FeatureButton);
    return FeatureButton;
}());
exports.FeatureButton = FeatureButton;
//# sourceMappingURL=feature.js.map
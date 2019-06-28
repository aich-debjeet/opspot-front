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
var title_1 = require("../../services/ux/title");
var api_1 = require("../../services/api");
var BrandingComponent = /** @class */ (function () {
    function BrandingComponent(client, title) {
        this.client = client;
        this.title = title;
        this.opspot = window.Opspot;
        this.title.setTitle('Branding');
    }
    BrandingComponent = __decorate([
        core_1.Component({
            selector: 'm-branding',
            templateUrl: 'branding.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            title_1.OpspotTitle])
    ], BrandingComponent);
    return BrandingComponent;
}());
exports.BrandingComponent = BrandingComponent;
//# sourceMappingURL=branding.component.js.map
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
var attachment_1 = require("../../../services/attachment");
var BlogTileComponent = /** @class */ (function () {
    function BlogTileComponent(session, attachment) {
        this.session = session;
        this.attachment = attachment;
        this.opspot = window.Opspot;
    }
    Object.defineProperty(BlogTileComponent.prototype, "setEntity", {
        set: function (entity) {
            if (!entity.thumbnail_src || !entity.header_bg)
                entity.thumbnail_src = this.opspot.cdn_assets_url + 'assets/logos/placeholder-bulb.jpg';
            this.entity = entity;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input('entity'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BlogTileComponent.prototype, "setEntity", null);
    BlogTileComponent = __decorate([
        core_1.Component({
            selector: 'm-blog--tile',
            templateUrl: 'tile.component.html',
        }),
        __metadata("design:paramtypes", [session_1.Session,
            attachment_1.AttachmentService])
    ], BlogTileComponent);
    return BlogTileComponent;
}());
exports.BlogTileComponent = BlogTileComponent;
//# sourceMappingURL=tile.component.js.map
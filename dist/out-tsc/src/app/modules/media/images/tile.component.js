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
var MediaImagesTileComponent = /** @class */ (function () {
    function MediaImagesTileComponent(session, attachment) {
        this.session = session;
        this.attachment = attachment;
    }
    MediaImagesTileComponent.prototype.getClass = function () {
        return;
    };
    MediaImagesTileComponent.prototype.getWidth = function () {
        var width = 320;
        if (!this.entity.width)
            return width;
        //work out aspect
        var aspect = this.entity.width / this.entity.height;
        //width = width * aspect;
        return width;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MediaImagesTileComponent.prototype, "entity", void 0);
    MediaImagesTileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-media--images--tile',
            templateUrl: 'tile.component.html',
            host: {
            //'[class]': 'm-media--images--tile-' + getFlex() + '-col'
            }
        }),
        __metadata("design:paramtypes", [session_1.Session,
            attachment_1.AttachmentService])
    ], MediaImagesTileComponent);
    return MediaImagesTileComponent;
}());
exports.MediaImagesTileComponent = MediaImagesTileComponent;
//# sourceMappingURL=tile.component.js.map
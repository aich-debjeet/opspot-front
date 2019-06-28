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
var ChannelsTileComponent = /** @class */ (function () {
    function ChannelsTileComponent(session) {
        this.session = session;
        this.opspot = window.Opspot;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ChannelsTileComponent.prototype, "entity", void 0);
    ChannelsTileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-channels--tile',
            templateUrl: 'tile.component.html',
        }),
        __metadata("design:paramtypes", [session_1.Session])
    ], ChannelsTileComponent);
    return ChannelsTileComponent;
}());
exports.ChannelsTileComponent = ChannelsTileComponent;
//# sourceMappingURL=tile.component.js.map
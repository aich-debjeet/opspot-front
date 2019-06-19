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
var storage_1 = require("../../../services/storage");
var AnnouncementComponent = /** @class */ (function () {
    function AnnouncementComponent(storage) {
        this.storage = storage;
        this.opspot = window.Opspot;
        this.hidden = false;
        this.id = 'default';
    }
    AnnouncementComponent.prototype.ngOnInit = function () {
        if (this.storage.get('hide-announcement:' + this.id))
            this.hidden = true;
    };
    AnnouncementComponent.prototype.close = function () {
        this.storage.set('hide-announcement:' + this.id, true);
        this.hidden = true;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AnnouncementComponent.prototype, "id", void 0);
    AnnouncementComponent = __decorate([
        core_1.Component({
            selector: 'm-announcement',
            host: {
                '[hidden]': 'hidden'
            },
            template: "\n    <div class=\"m-announcement\">\n\n\n      <div class=\"m-announcement--content\">\n        <ng-content></ng-content>\n      </div>\n\n      <div class=\"m-announcement--close\" (click)=\"close()\">\n        <i class=\"material-icons\">close</i>\n      </div>\n\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [storage_1.Storage])
    ], AnnouncementComponent);
    return AnnouncementComponent;
}());
exports.AnnouncementComponent = AnnouncementComponent;
//# sourceMappingURL=announcement.component.js.map
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
var client_1 = require("../../../services/api/client");
var SafeToggleComponent = /** @class */ (function () {
    function SafeToggleComponent(client) {
        this.client = client;
        this.entityChange = new core_1.EventEmitter();
    }
    SafeToggleComponent.prototype.onRatingToggle = function (event) {
        var _this = this;
        this.entity.rating = !this.entity.rating || this.entity.rating === 1 ? 2 : 1;
        this.client.post("api/v1/admin/rating/" + this.entity.guid + "/" + this.entity.rating)
            .then(function () {
            _this.entityChange.emit(_this.entity);
        })
            .catch(function (e) {
            _this.entity.rating = _this.entity.rating === 1 ? 2 : 1;
        });
        event.preventDefault();
        event.stopPropagation();
    };
    __decorate([
        core_1.Input('entity'),
        __metadata("design:type", Object)
    ], SafeToggleComponent.prototype, "entity", void 0);
    __decorate([
        core_1.Output('entityChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], SafeToggleComponent.prototype, "entityChange", void 0);
    SafeToggleComponent = __decorate([
        core_1.Component({
            selector: 'm-safe-toggle',
            template: "\n    <div class=\"m-safe-toggle\" (click)=\"onRatingToggle($event)\">\n      <label>\n        <i class=\"material-icons\" [class.m-safe-toggle--active]=\"entity.rating === 1\">ac_unit</i>\n      </label>\n    </div>"
        }),
        __metadata("design:paramtypes", [client_1.Client])
    ], SafeToggleComponent);
    return SafeToggleComponent;
}());
exports.SafeToggleComponent = SafeToggleComponent;
//# sourceMappingURL=safe-toggle.component.js.map
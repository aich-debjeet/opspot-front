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
var unique_id_helper_1 = require("../../../helpers/unique-id.helper");
var MaterialBoundSwitchComponent = /** @class */ (function () {
    function MaterialBoundSwitchComponent() {
        this.toggled = false;
        this.disabled = false;
        this.changeEmitter = new core_1.EventEmitter();
    }
    MaterialBoundSwitchComponent.prototype.ngOnInit = function () {
        this.id = unique_id_helper_1.UniqueId.generate();
    };
    MaterialBoundSwitchComponent.prototype.change = function (newValue, $event) {
        this.changeEmitter.emit(newValue);
        if ($event) {
            $event.stopPropagation();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MaterialBoundSwitchComponent.prototype, "toggled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MaterialBoundSwitchComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Output('change'),
        __metadata("design:type", core_1.EventEmitter)
    ], MaterialBoundSwitchComponent.prototype, "changeEmitter", void 0);
    MaterialBoundSwitchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-material--bound-switch',
            template: "\n    <label class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\" [for]=\"id\" [attr.disabled]=\"disabled\" [mdlSwitch] [toggled]=\"true\" *ngIf=\"toggled\" (click)=\"change(!toggled, $event)\">\n      <input type=\"checkbox\" [id]=\"id\" class=\"mdl-switch__input\" [disabled]=\"disabled\">\n    </label>\n    <label class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\" [for]=\"id\" [attr.disabled]=\"disabled\" [mdlSwitch] [toggled]=\"false\" *ngIf=\"!toggled\" (click)=\"change(toggled, $event)\">\n      <input type=\"checkbox\" [id]=\"id\" class=\"mdl-switch__input\" [disabled]=\"disabled\">\n    </label>\n  "
        })
    ], MaterialBoundSwitchComponent);
    return MaterialBoundSwitchComponent;
}());
exports.MaterialBoundSwitchComponent = MaterialBoundSwitchComponent;
//# sourceMappingURL=bound-switch.component.js.map
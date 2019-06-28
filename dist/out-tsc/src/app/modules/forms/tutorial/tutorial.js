"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Tutorial = /** @class */ (function () {
    function Tutorial() {
        this.error = '';
        this.inProgress = false;
        this.gender = 'private';
        this.done = new core_1.EventEmitter();
    }
    Tutorial = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-tutorial',
            outputs: ['done'],
            templateUrl: 'tutorial.html'
        })
    ], Tutorial);
    return Tutorial;
}());
exports.Tutorial = Tutorial;
//# sourceMappingURL=tutorial.js.map
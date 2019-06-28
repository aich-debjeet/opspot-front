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
var CardInput = /** @class */ (function () {
    function CardInput(client) {
        this.client = client;
        this._confirm = new core_1.EventEmitter();
        this.card = { month: 'mm', year: 'yyyy' };
        this.inProgress = false;
        this.confirmation = false; // @todo: ??
        this.error = ''; // @todo: ??
        this.useMDLStyling = true;
    }
    CardInput.prototype.validate = function () {
        if (!this.card.number || !this.card.sec || !this.card.name)
            return false;
        if (this.card.month === 'mm' || this.card.year === 'yyyy')
            return false;
        return true;
    };
    CardInput.prototype.confirm = function () {
        this._confirm.next(this.card);
    };
    __decorate([
        core_1.Input('useMDLStyling'),
        __metadata("design:type", Boolean)
    ], CardInput.prototype, "useMDLStyling", void 0);
    CardInput = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-checkout-card-input',
            outputs: ['_confirm: confirm'],
            templateUrl: 'card.html'
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], CardInput);
    return CardInput;
}());
exports.CardInput = CardInput;
//# sourceMappingURL=card.js.map
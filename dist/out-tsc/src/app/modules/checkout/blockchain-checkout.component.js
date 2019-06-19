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
var BlockchainCheckoutComponent = /** @class */ (function () {
    function BlockchainCheckoutComponent() {
        this.autoselect = true;
        this.allowOffchain = false;
        this.inputtedEventEmitter = new core_1.EventEmitter();
        this.autoselectChangeEmitter = new core_1.EventEmitter();
    }
    BlockchainCheckoutComponent.prototype.setValue = function (wallet) {
        this.autoselect = false;
        this.autoselectChangeEmitter.emit(false);
        this.inputtedEventEmitter.emit(wallet);
    };
    BlockchainCheckoutComponent.prototype.onAutoSelectChange = function (value) {
        this.autoselectChangeEmitter.emit(value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BlockchainCheckoutComponent.prototype, "autoselect", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BlockchainCheckoutComponent.prototype, "allowOffchain", void 0);
    __decorate([
        core_1.Output('inputed'),
        __metadata("design:type", core_1.EventEmitter)
    ], BlockchainCheckoutComponent.prototype, "inputtedEventEmitter", void 0);
    __decorate([
        core_1.Output('autoselectChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], BlockchainCheckoutComponent.prototype, "autoselectChangeEmitter", void 0);
    BlockchainCheckoutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-checkout--blockchain',
            templateUrl: 'blockchain-checkout.component.html'
        })
    ], BlockchainCheckoutComponent);
    return BlockchainCheckoutComponent;
}());
exports.BlockchainCheckoutComponent = BlockchainCheckoutComponent;
//# sourceMappingURL=blockchain-checkout.component.js.map
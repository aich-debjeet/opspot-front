"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var OverlayModalService = /** @class */ (function () {
    function OverlayModalService() {
    }
    OverlayModalService_1 = OverlayModalService;
    OverlayModalService._ = function () {
        return new OverlayModalService_1();
    };
    OverlayModalService.prototype.setContainer = function (container) {
        this.container = container;
        return this;
    };
    OverlayModalService.prototype.create = function (component, data, opts) {
        if (!this.container) {
            throw new Error('Missing overlay container');
        }
        this._onDidDismissFn = void 0;
        this.container.create(component, opts);
        this.container.setData(data);
        if (opts) {
            this.container.setOpts(opts);
        }
        return this;
    };
    OverlayModalService.prototype.setData = function (data) {
        if (!this.container) {
            throw new Error('Missing overlay container');
        }
        this.container.setData(data);
        return this;
    };
    OverlayModalService.prototype.onDidDismiss = function (fn) {
        if (!this.container) {
            throw new Error('Missing overlay container');
        }
        this._onDidDismissFn = fn;
        return this;
    };
    OverlayModalService.prototype._didDismiss = function () {
        if (this._onDidDismissFn) {
            this._onDidDismissFn();
        }
    };
    OverlayModalService.prototype.present = function () {
        if (!this.container) {
            throw new Error('Missing overlay container');
        }
        this.container.present();
        return this;
    };
    OverlayModalService.prototype.dismiss = function () {
        if (!this.container) {
            throw new Error('Missing overlay container');
        }
        this.container.dismiss();
        this._onDidDismissFn = void 0;
        return this;
    };
    var OverlayModalService_1;
    OverlayModalService = OverlayModalService_1 = __decorate([
        core_1.Injectable()
    ], OverlayModalService);
    return OverlayModalService;
}());
exports.OverlayModalService = OverlayModalService;
//# sourceMappingURL=overlay-modal.js.map
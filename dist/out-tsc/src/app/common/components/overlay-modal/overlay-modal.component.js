"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var dynamic_host_directive_1 = require("../../directives/dynamic-host.directive");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var OverlayModalComponent = /** @class */ (function () {
    function OverlayModalComponent(service, _componentFactoryResolver) {
        this.service = service;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.hidden = true;
        this.class = '';
    }
    OverlayModalComponent.prototype.ngAfterViewInit = function () {
        this.service.setContainer(this);
    };
    OverlayModalComponent.prototype.create = function (componentClass, opts) {
        this.dismiss();
        opts = __assign({
            class: '',
        }, opts);
        this.class = opts.class;
        if (!componentClass) {
            throw new Error('Unknown component class');
        }
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentClass), viewContainerRef = this.host.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentInstance = this.componentRef.instance;
    };
    OverlayModalComponent.prototype.setData = function (data) {
        if (!this.componentInstance) {
            return;
        }
        this.componentInstance.data = data;
        this.componentRef.changeDetectorRef.detectChanges();
    };
    OverlayModalComponent.prototype.setOpts = function (opts) {
        if (!this.componentInstance) {
            return;
        }
        this.componentInstance.opts = opts;
    };
    OverlayModalComponent.prototype.present = function () {
        if (!this.componentInstance) {
            return;
        }
        this.hidden = false;
        if (document && document.body) {
            document.body.classList.add('m-overlay-modal--shown');
        }
    };
    OverlayModalComponent.prototype.dismiss = function () {
        this.hidden = true;
        if (document && document.body) {
            document.body.classList.remove('m-overlay-modal--shown');
        }
        if (!this.componentInstance) {
            return;
        }
        this.componentRef.destroy();
        this.host.viewContainerRef.clear();
        this.service._didDismiss();
    };
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", dynamic_host_directive_1.DynamicHostDirective)
    ], OverlayModalComponent.prototype, "host", void 0);
    OverlayModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-overlay-modal',
            template: "\n    <div class=\"m-overlay-modal--backdrop\" [hidden]=\"hidden\" (click)=\"dismiss()\"></div>\n    <div class=\"m-overlay-modal {{class}}\" [hidden]=\"hidden\">\n      <a class=\"m-overlay-modal--close\" (click)=\"dismiss()\"><i class=\"material-icons\">close</i></a>\n      <ng-template dynamic-host></ng-template>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [overlay_modal_1.OverlayModalService,
            core_1.ComponentFactoryResolver])
    ], OverlayModalComponent);
    return OverlayModalComponent;
}());
exports.OverlayModalComponent = OverlayModalComponent;
//# sourceMappingURL=overlay-modal.component.js.map
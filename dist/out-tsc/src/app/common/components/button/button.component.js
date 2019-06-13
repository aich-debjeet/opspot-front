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
var dynamic_host_directive_1 = require("../../directives/dynamic-host.directive");
var boost_1 = require("../../../modules/legacy/components/buttons/boost");
var OpspotButton = /** @class */ (function () {
    function OpspotButton(_componentFactoryResolver) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this.object = {};
        this.cssClasses = '';
        this.initialized = false;
    }
    Object.defineProperty(OpspotButton.prototype, "_object", {
        set: function (value) {
            var _this = this;
            var oldType = this.type;
            this.object = value ? value : {};
            if (this.initialized) {
                if (!this.componentInstance || this.type !== oldType) {
                    setTimeout(function () { return _this.loadComponent(); }, 0);
                }
                else {
                    this.updateData();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotButton.prototype, "_hostClass", {
        set: function (value) {
            this.cssClasses = value || '';
            if (this.initialized) {
                this.updateClasses();
            }
        },
        enumerable: true,
        configurable: true
    });
    OpspotButton.prototype.ngAfterViewInit = function () {
        this.loadComponent();
        this.initialized = true;
    };
    OpspotButton.prototype.resolveComponentClass = function (type) {
        if (!type) {
            return null;
        }
        if (type === 'boost') {
            return boost_1.BoostButton;
        }
        return null;
    };
    OpspotButton.prototype.loadComponent = function () {
        var componentClass = this.resolveComponentClass(this.type);
        if (!componentClass) {
            return;
        }
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentClass), viewContainerRef = this.cardHost.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentInstance = this.componentRef.instance;
        this.anchorRef = viewContainerRef.element;
        this.updateData();
        this.updateClasses();
    };
    OpspotButton.prototype.updateData = function () {
        if (!this.componentInstance) {
            return;
        }
        this.componentInstance.object = this.object;
        this.componentRef.changeDetectorRef.detectChanges();
    };
    OpspotButton.prototype.updateClasses = function () {
        if (!this.anchorRef || !this.anchorRef.nativeElement) {
            return;
        }
        // @note: find a better way (when Angular implements one)
        this.anchorRef.nativeElement.nextSibling.className = this.cssClasses;
    };
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", dynamic_host_directive_1.DynamicHostDirective)
    ], OpspotButton.prototype, "cardHost", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotButton.prototype, "type", void 0);
    __decorate([
        core_1.Input('object'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], OpspotButton.prototype, "_object", null);
    __decorate([
        core_1.Input('hostClass'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], OpspotButton.prototype, "_hostClass", null);
    OpspotButton = __decorate([
        core_1.Component({
            selector: 'opspot-button',
            template: "\n    <ng-template dynamic-host></ng-template>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], OpspotButton);
    return OpspotButton;
}());
exports.OpspotButton = OpspotButton;
//# sourceMappingURL=button.component.js.map
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
var router_1 = require("@angular/router");
var dynamic_host_directive_1 = require("../../../common/directives/dynamic-host.directive");
var options_component_1 = require("../../monetization/revenue/options.component");
var session_1 = require("../../../services/session");
var WalletUSDSettingsComponent = /** @class */ (function () {
    function WalletUSDSettingsComponent(_componentFactoryResolver, router, session) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this.router = router;
        this.session = session;
    }
    WalletUSDSettingsComponent.prototype.ngOnInit = function () { };
    WalletUSDSettingsComponent.prototype.ngAfterViewInit = function () {
        this.loadComponent();
    };
    WalletUSDSettingsComponent.prototype.loadComponent = function () {
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(options_component_1.RevenueOptionsComponent), viewContainerRef = this.host.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentInstance = this.componentRef.instance;
    };
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", dynamic_host_directive_1.DynamicHostDirective)
    ], WalletUSDSettingsComponent.prototype, "host", void 0);
    WalletUSDSettingsComponent = __decorate([
        core_1.Component({
            selector: 'm-wallet--usd--settings',
            template: "\n    <ng-template dynamic-host></ng-template>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, router_1.Router, session_1.Session])
    ], WalletUSDSettingsComponent);
    return WalletUSDSettingsComponent;
}());
exports.WalletUSDSettingsComponent = WalletUSDSettingsComponent;
//# sourceMappingURL=settings.component.js.map
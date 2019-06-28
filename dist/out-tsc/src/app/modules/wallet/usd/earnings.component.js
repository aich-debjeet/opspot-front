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
var ledger_component_1 = require("../../monetization/revenue/ledger.component");
var session_1 = require("../../../services/session");
var WalletUSDEarningsComponent = /** @class */ (function () {
    function WalletUSDEarningsComponent(_componentFactoryResolver, router, session) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this.router = router;
        this.session = session;
    }
    WalletUSDEarningsComponent.prototype.ngOnInit = function () { };
    WalletUSDEarningsComponent.prototype.ngAfterViewInit = function () {
        this.loadComponent();
    };
    WalletUSDEarningsComponent.prototype.loadComponent = function () {
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(ledger_component_1.RevenueLedgerComponent), viewContainerRef = this.host.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentInstance = this.componentRef.instance;
    };
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", dynamic_host_directive_1.DynamicHostDirective)
    ], WalletUSDEarningsComponent.prototype, "host", void 0);
    WalletUSDEarningsComponent = __decorate([
        core_1.Component({
            selector: 'm-wallet--usd--earnings',
            template: "\n    <ng-template dynamic-host></ng-template>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, router_1.Router, session_1.Session])
    ], WalletUSDEarningsComponent);
    return WalletUSDEarningsComponent;
}());
exports.WalletUSDEarningsComponent = WalletUSDEarningsComponent;
//# sourceMappingURL=earnings.component.js.map
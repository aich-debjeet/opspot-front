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
var client_1 = require("../../../../services/api/client");
var session_1 = require("../../../../services/session");
var onboarding_service_1 = require("./onboarding.service");
var dynamic_host_directive_1 = require("../../../../common/directives/dynamic-host.directive");
var storage_1 = require("../../../../services/storage");
var TokenOnboardingComponent = /** @class */ (function () {
    function TokenOnboardingComponent(client, cd, session, router, service, _componentFactoryResolver, storage) {
        this.client = client;
        this.cd = cd;
        this.session = session;
        this.router = router;
        this.service = service;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.storage = storage;
        this.inProgress = false;
    }
    TokenOnboardingComponent.prototype.ngOnInit = function () {
        if (this.storage.get('walletOnboardingComplete') ||
            (this.session.getLoggedInUser().rewards &&
                this.session.getLoggedInUser().eth_wallet)) {
            return; //already onboarded
        }
        this.loadSlide();
    };
    TokenOnboardingComponent.prototype.loadSlide = function () {
        var _this = this;
        var viewContainerRef = this.host.viewContainerRef;
        viewContainerRef.clear();
        if (!this.service.slide) {
            return;
        }
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.service.slide);
        var componentRef = viewContainerRef.createComponent(componentFactory);
        if (componentRef.instance.next) {
            componentRef.instance.next.subscribe(function (next) {
                _this.service.next();
                _this.loadSlide();
                _this.detectChanges();
            });
        }
        //componentRef.changeDetectorRef.markForCheck();
        //componentRef.changeDetectorRef.detectChanges();
    };
    TokenOnboardingComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", Object)
    ], TokenOnboardingComponent.prototype, "host", void 0);
    TokenOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-token--onboarding',
            templateUrl: 'onboarding.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [client_1.Client,
            core_1.ChangeDetectorRef,
            session_1.Session,
            router_1.Router,
            onboarding_service_1.TokenOnboardingService,
            core_1.ComponentFactoryResolver,
            storage_1.Storage])
    ], TokenOnboardingComponent);
    return TokenOnboardingComponent;
}());
exports.TokenOnboardingComponent = TokenOnboardingComponent;
//# sourceMappingURL=onboarding.component.js.map
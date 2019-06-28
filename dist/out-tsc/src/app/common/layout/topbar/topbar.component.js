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
var storage_1 = require("../../../services/storage");
var sidebar_1 = require("../../../services/ui/sidebar");
var session_1 = require("../../../services/session");
var dynamic_host_directive_1 = require("../../directives/dynamic-host.directive");
var toaster_component_1 = require("../../../modules/notifications/toaster.component");
var TopbarComponent = /** @class */ (function () {
    function TopbarComponent(session, storage, sidebar, _componentFactoryResolver) {
        this.session = session;
        this.storage = storage;
        this.sidebar = sidebar;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.opspot = window.Opspot;
    }
    TopbarComponent.prototype.ngAfterViewInit = function () {
        this.loadComponent();
    };
    /**
     * Open the navigation
     */
    TopbarComponent.prototype.openNav = function () {
        this.sidebar.open();
    };
    TopbarComponent.prototype.loadComponent = function () {
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(toaster_component_1.NotificationsToasterComponent), viewContainerRef = this.host.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentRef.notifications = [];
        this.componentInstance = this.componentRef.instance;
    };
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", dynamic_host_directive_1.DynamicHostDirective)
    ], TopbarComponent.prototype, "host", void 0);
    TopbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-topbar',
            templateUrl: 'topbar.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, storage_1.Storage, sidebar_1.Sidebar, core_1.ComponentFactoryResolver])
    ], TopbarComponent);
    return TopbarComponent;
}());
exports.TopbarComponent = TopbarComponent;
//# sourceMappingURL=topbar.component.js.map
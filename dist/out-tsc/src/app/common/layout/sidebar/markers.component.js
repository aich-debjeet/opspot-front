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
var sidebar_markers_component_1 = require("../../../modules/groups/sidebar-markers/sidebar-markers.component");
var SidebarMarkersComponent = /** @class */ (function () {
    function SidebarMarkersComponent(session, storage, sidebar, _componentFactoryResolver) {
        this.session = session;
        this.storage = storage;
        this.sidebar = sidebar;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.opspot = window.Opspot;
        this.showMarkerSidebar = false;
    }
    SidebarMarkersComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var isLoggedIn = this.session.isLoggedIn(function (is) {
            // recheck on session status change
            _this.checkSidebarVisibility(is);
        });
        // check now
        this.checkSidebarVisibility(isLoggedIn);
    };
    SidebarMarkersComponent.prototype.checkSidebarVisibility = function (isLoggedIn) {
        var showMarkerSidebar = isLoggedIn && window.innerWidth >= 900;
        if (showMarkerSidebar === this.showMarkerSidebar) {
            return;
        }
        var mBody = document.getElementsByTagName('m-body')[0];
        if (showMarkerSidebar) {
            mBody.classList.add('has-markers-sidebar');
            this.createGroupsSideBar();
        }
        else {
            mBody.classList.remove('has-markers-sidebar');
            this.host.viewContainerRef.clear();
        }
        this.showMarkerSidebar = showMarkerSidebar;
    };
    SidebarMarkersComponent.prototype.detectWidth = function () {
        this.checkSidebarVisibility(this.session.isLoggedIn());
    };
    SidebarMarkersComponent.prototype.createGroupsSideBar = function () {
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(sidebar_markers_component_1.GroupsSidebarMarkersComponent), viewContainerRef = this.host.viewContainerRef;
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentInstance = this.componentRef.instance;
    };
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", dynamic_host_directive_1.DynamicHostDirective)
    ], SidebarMarkersComponent.prototype, "host", void 0);
    __decorate([
        core_1.HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SidebarMarkersComponent.prototype, "detectWidth", null);
    SidebarMarkersComponent = __decorate([
        core_1.Component({
            selector: 'm-sidebar--markers',
            templateUrl: 'markers.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            storage_1.Storage,
            sidebar_1.Sidebar,
            core_1.ComponentFactoryResolver])
    ], SidebarMarkersComponent);
    return SidebarMarkersComponent;
}());
exports.SidebarMarkersComponent = SidebarMarkersComponent;
//# sourceMappingURL=markers.component.js.map
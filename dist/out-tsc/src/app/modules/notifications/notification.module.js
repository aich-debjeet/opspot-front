"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var api_1 = require("../../services/api");
var sockets_1 = require("../../services/sockets");
var session_1 = require("../../services/session");
var title_1 = require("../../services/ux/title");
var common_module_1 = require("../../common/common.module");
var flyout_component_1 = require("./flyout.component");
var toggle_component_1 = require("./toggle.component");
var notification_component_1 = require("./notification.component");
var notifications_component_1 = require("./notifications.component");
var notification_service_1 = require("./notification.service");
var toaster_component_1 = require("./toaster.component");
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                router_1.RouterModule.forChild([
                    { path: 'notifications/:filter', component: notifications_component_1.NotificationsComponent },
                    { path: 'notifications', component: notifications_component_1.NotificationsComponent }
                ])
            ],
            declarations: [
                flyout_component_1.NotificationsFlyoutComponent,
                notifications_component_1.NotificationsComponent,
                notification_component_1.NotificationComponent,
                toggle_component_1.NotificationsTopbarToggleComponent,
                toaster_component_1.NotificationsToasterComponent,
            ],
            providers: [
                {
                    provide: notification_service_1.NotificationService,
                    useFactory: notification_service_1.NotificationService._,
                    deps: [session_1.Session, api_1.Client, sockets_1.SocketsService, title_1.OpspotTitle]
                }
            ],
            exports: [
                flyout_component_1.NotificationsFlyoutComponent,
                notifications_component_1.NotificationsComponent,
                notification_component_1.NotificationComponent,
                toggle_component_1.NotificationsTopbarToggleComponent,
                toaster_component_1.NotificationsToasterComponent,
            ]
        })
    ], NotificationModule);
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.module.js.map
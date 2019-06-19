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
var dynamic_host_directive_1 = require("../../common/directives/dynamic-host.directive");
var notification_service_1 = require("./notification.service");
var NotificationsToasterComponent = /** @class */ (function () {
    function NotificationsToasterComponent(notification) {
        this.notification = notification;
        this.notifications = [];
    }
    NotificationsToasterComponent.prototype.ngOnInit = function () {
        this.listenForNotifications();
    };
    NotificationsToasterComponent.prototype.listenForNotifications = function () {
        var _this = this;
        this.notification.onReceive.subscribe(function (notification) {
            _this.notifications.unshift(notification);
            setTimeout(function () {
                _this.closeNotification(notification);
            }, 6000);
        });
    };
    NotificationsToasterComponent.prototype.closeNotification = function (notification) {
        var i;
        for (i in this.notifications) {
            if (this.notifications[i] === notification) {
                this.notifications.splice(i, 1);
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NotificationsToasterComponent.prototype, "notifications", void 0);
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", dynamic_host_directive_1.DynamicHostDirective)
    ], NotificationsToasterComponent.prototype, "host", void 0);
    NotificationsToasterComponent = __decorate([
        core_1.Component({
            selector: 'm-notifications--toaster',
            template: "\n    <div class=\"m-notifications--toaster\" *ngIf=\"notifications\">\n      <opspot-notification\n        *ngFor=\"let notification of notifications\"\n        class=\"mdl-card mdl-shadow--4dp item\"\n        [notification]=\"notification\"\n        (click)=\"closeNotification(notification)\"\n      ></opspot-notification>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [notification_service_1.NotificationService])
    ], NotificationsToasterComponent);
    return NotificationsToasterComponent;
}());
exports.NotificationsToasterComponent = NotificationsToasterComponent;
//# sourceMappingURL=toaster.component.js.map
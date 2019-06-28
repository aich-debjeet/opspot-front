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
var session_1 = require("../../services/session");
var rejection_reasons_1 = require("../../controllers/admin/boosts/rejection-reasons");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(session) {
        this.session = session;
        this.opspot = window.Opspot;
    }
    Object.defineProperty(NotificationComponent.prototype, "_notification", {
        set: function (value) {
            this.notification = value;
        },
        enumerable: true,
        configurable: true
    });
    NotificationComponent.prototype.openMessengerWindow = function (event) {
        if (event) {
            event.preventDefault();
        }
        window.openMessengerWindow();
    };
    NotificationComponent.prototype.findReason = function (code) {
        return rejection_reasons_1.rejectionReasons.find(function (item) {
            return item.code === code;
        });
    };
    NotificationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-notification',
            inputs: ['_notification: notification'],
            templateUrl: 'notification.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notification.component.js.map
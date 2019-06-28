"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NotificationService = /** @class */ (function () {
    function NotificationService(session, client, sockets, title) {
        this.session = session;
        this.client = client;
        this.sockets = sockets;
        this.title = title;
        this.socketSubscriptions = {
            notification: null
        };
        this.onReceive = new core_1.EventEmitter();
        if (!window.Opspot.notifications_count)
            window.Opspot.notifications_count = 0;
        this.listen();
    }
    NotificationService._ = function (session, client, sockets, title) {
        return new NotificationService(session, client, sockets, title);
    };
    /**
     * Listen to socket events
     */
    NotificationService.prototype.listen = function () {
        var _this = this;
        this.socketSubscriptions.notification = this.sockets.subscribe('notification', function (guid) {
            _this.increment();
            _this.client.get("api/v1/notifications/single/" + guid)
                .then(function (response) {
                if (response.notification) {
                    _this.onReceive.next(response.notification);
                }
            });
        });
    };
    /**
     * Increment the notifications counter
     */
    NotificationService.prototype.increment = function (notifications) {
        if (notifications === void 0) { notifications = 1; }
        window.Opspot.notifications_count = window.Opspot.notifications_count + notifications;
        this.sync();
    };
    /**
     * Clear the notifications. For notification controller
     */
    NotificationService.prototype.clear = function () {
        window.Opspot.notifications_count = 0;
        this.sync();
    };
    /**
     * Return the notifications
     */
    NotificationService.prototype.getNotifications = function () {
        var self = this;
        setInterval(function () {
            console.log('getting notifications');
            if (!self.session.isLoggedIn())
                return;
            if (!window.Opspot.notifications_count)
                window.Opspot.notifications_count = 0;
            self.client.get('api/v1/notifications/count', {})
                .then(function (response) {
                window.Opspot.notifications_count = response.count;
                self.sync();
            });
        }, 60000);
    };
    /**
     * Sync Notifications to the topbar Counter
     */
    NotificationService.prototype.sync = function () {
        for (var i in window.Opspot.navigation.topbar) {
            if (window.Opspot.navigation.topbar[i].name === 'Notifications') {
                window.Opspot.navigation.topbar[i].extras.counter = window.Opspot.notifications_count;
            }
        }
        this.title.setCounter(window.Opspot.notifications_count);
    };
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map
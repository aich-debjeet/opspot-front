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
var title_1 = require("../../services/ux/title");
var client_1 = require("../../services/api/client");
var session_1 = require("../../services/session");
var notification_service_1 = require("./notification.service");
var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(session, client, router, title, notificationService, route, el) {
        this.session = session;
        this.client = client;
        this.router = router;
        this.title = title;
        this.notificationService = notificationService;
        this.route = route;
        this.el = el;
        this.visible = true;
        this.notifications = [];
        this.moreData = true;
        this.offset = '';
        this.inProgress = false;
        this._filter = 'all';
        this.opspot = window.Opspot;
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.session.isLoggedIn()) {
            if (!this.loadOnDemand)
                this.router.navigate(['/login']);
            return;
        }
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['filter']) {
                _this._filter = params['filter'];
                _this.notifications = [];
                _this.load(true);
            }
            if (params['ts']) {
                _this.notifications = [];
                _this.load(true);
                _this.notificationService.clear();
            }
        });
        this.notificationService.clear();
        if (!this.loadOnDemand) {
            this.title.setTitle('Notifications');
            this.load(true);
        }
    };
    NotificationsComponent.prototype.onVisible = function () {
        var _this = this;
        if (this.notifications.length === 0) {
            this.load(true);
        }
        else {
            setTimeout(function () {
                if (_this.opspot.notifications_count > 0 && _this.notificationList.nativeElement.scrollTop <= 100) {
                    _this.load(true);
                }
            }, 200);
        }
    };
    NotificationsComponent.prototype.ngOnDestroy = function () {
        if (this.paramsSubscription)
            this.paramsSubscription.unsubscribe();
    };
    NotificationsComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress)
            return false;
        if (refresh)
            this.offset = '';
        this.inProgress = true;
        this.client.get("api/v1/notifications/" + this._filter, { limit: 24, offset: this.offset })
            .then(function (data) {
            if (!data.notifications) {
                _this.moreData = false;
                _this.inProgress = false;
                return false;
            }
            if (refresh) {
                _this.notifications = data.notifications;
            }
            else {
                for (var _i = 0, _a = data.notifications; _i < _a.length; _i++) {
                    var entity = _a[_i];
                    _this.notifications.push(entity);
                }
            }
            if (!data['load-next'])
                _this.moreData = false;
            _this.offset = data['load-next'];
            _this.inProgress = false;
            _this.opspot.notifications_count = 0;
            _this.notificationService.clear();
        });
    };
    NotificationsComponent.prototype.loadEntity = function (entity) {
        var _this = this;
        if (entity.type === 'comment') {
            this.client.get('api/v1/entities/entity/' + entity.parent_guid)
                .then(function (response) {
                _this.entity = response.entity;
            });
        }
        else {
            this.entity = entity;
        }
    };
    NotificationsComponent.prototype.changeFilter = function (filter) {
        this._filter = filter;
        this.notifications = [];
        this.load(true);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NotificationsComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NotificationsComponent.prototype, "params", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NotificationsComponent.prototype, "count", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NotificationsComponent.prototype, "loadOnDemand", void 0);
    __decorate([
        core_1.ViewChild('notificationGrid'),
        __metadata("design:type", core_1.ElementRef)
    ], NotificationsComponent.prototype, "notificationList", void 0);
    NotificationsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-notifications',
            templateUrl: 'notifications.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            client_1.Client,
            router_1.Router,
            title_1.OpspotTitle,
            notification_service_1.NotificationService,
            router_1.ActivatedRoute,
            core_1.ElementRef])
    ], NotificationsComponent);
    return NotificationsComponent;
}());
exports.NotificationsComponent = NotificationsComponent;
//# sourceMappingURL=notifications.component.js.map
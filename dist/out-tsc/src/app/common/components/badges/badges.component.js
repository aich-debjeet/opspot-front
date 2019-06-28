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
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var ChannelBadgesComponent = /** @class */ (function () {
    function ChannelBadgesComponent(session, client, router) {
        this.session = session;
        this.client = client;
        this.router = router;
        this.badges = ['verified', 'plus', 'founder'];
    }
    ChannelBadgesComponent.prototype.verify = function (e) {
        var _this = this;
        if (!this.session.isAdmin()) {
            e.preventDefault();
            return this.router.navigate(['/plus']);
        }
        if (this.user.verified)
            return this.unVerify();
        this.user.verified = true;
        this.client.put('api/v1/admin/verify/' + this.user.guid)
            .catch(function () {
            _this.user.verified = false;
        });
    };
    ChannelBadgesComponent.prototype.unVerify = function () {
        var _this = this;
        this.user.verified = false;
        this.client.delete('api/v1/admin/verify/' + this.user.guid)
            .catch(function () {
            _this.user.verified = true;
        });
    };
    ChannelBadgesComponent.prototype.setFounder = function (e) {
        var _this = this;
        if (!this.session.isAdmin()) {
            e.preventDefault();
            return this.router.navigate(['/channels/founders']);
        }
        if (this.user.founder)
            return this.unsetFounder();
        this.user.founder = true;
        this.client.put('api/v1/admin/founder/' + this.user.guid)
            .catch(function () {
            _this.user.founder = false;
        });
    };
    ChannelBadgesComponent.prototype.unsetFounder = function () {
        var _this = this;
        this.user.founder = false;
        this.client.delete('api/v1/admin/founder/' + this.user.guid)
            .catch(function () {
            _this.user.founder = true;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ChannelBadgesComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ChannelBadgesComponent.prototype, "badges", void 0);
    ChannelBadgesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-channel--badges',
            templateUrl: 'badges.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, router_1.Router])
    ], ChannelBadgesComponent);
    return ChannelBadgesComponent;
}());
exports.ChannelBadgesComponent = ChannelBadgesComponent;
//# sourceMappingURL=badges.component.js.map
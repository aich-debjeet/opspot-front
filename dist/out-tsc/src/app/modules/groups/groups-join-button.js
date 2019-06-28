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
var groups_service_1 = require("./groups-service");
var session_1 = require("../../services/session");
var login_referrer_service_1 = require("../../services/login-referrer.service");
var GroupsJoinButton = /** @class */ (function () {
    function GroupsJoinButton(session, service, router, loginReferrer) {
        this.session = session;
        this.service = service;
        this.router = router;
        this.loginReferrer = loginReferrer;
        this.showModal = false;
        this.membership = new core_1.EventEmitter();
        this.inProgress = false;
        this.opspot = window.Opspot;
    }
    Object.defineProperty(GroupsJoinButton.prototype, "_group", {
        set: function (value) {
            this.group = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check if is a member
     */
    GroupsJoinButton.prototype.isMember = function () {
        if (this.group['is:member'])
            return true;
        return false;
    };
    /**
     * Check if the group is closed
     */
    GroupsJoinButton.prototype.isPublic = function () {
        if (this.group.membership !== 2)
            return false;
        return true;
    };
    /**
     * Join a group
     */
    GroupsJoinButton.prototype.join = function () {
        var _this = this;
        if (!this.session.isLoggedIn()) {
            //this.showModal = true;
            this.loginReferrer.register("/groups/profile/" + this.group.guid + "/feed?join=true");
            this.router.navigate(['/login']);
            return;
        }
        this.inProgress = true;
        this.service.join(this.group)
            .then(function () {
            _this.inProgress = false;
            if (_this.isPublic()) {
                _this.group['is:member'] = true;
                _this.membership.next({
                    member: true
                });
                return;
            }
            _this.membership.next({});
            _this.group['is:awaiting'] = true;
        })
            .catch(function (e) {
            var error = e.error;
            switch (e.error) {
                case 'You are banned from this group':
                    error = 'banned';
                    break;
                case 'User is already a member':
                    error = 'already_a_member';
                    break;
                default:
                    error = e.error;
                    break;
            }
            _this.group['is:member'] = false;
            _this.group['is:awaiting'] = false;
            _this.membership.next({ error: error });
            _this.inProgress = false;
        });
    };
    /**
     * Leave a group
     */
    GroupsJoinButton.prototype.leave = function () {
        var _this = this;
        this.service.leave(this.group)
            .then(function () {
            _this.group['is:member'] = false;
            _this.membership.next({
                member: false
            });
        })
            .catch(function (e) {
            _this.group['is:member'] = true;
        });
    };
    /**
     * Accept joining a group
     */
    GroupsJoinButton.prototype.accept = function () {
        var _this = this;
        this.group['is:member'] = true;
        this.group['is:invited'] = false;
        this.service.acceptInvitation(this.group)
            .then(function (done) {
            _this.group['is:member'] = done;
            _this.group['is:invited'] = !done;
            if (done) {
                _this.membership.next({
                    member: true
                });
            }
        });
    };
    /**
     * Cancel a group joining request
     */
    GroupsJoinButton.prototype.cancelRequest = function () {
        var _this = this;
        this.group['is:awaiting'] = false;
        this.service.cancelRequest(this.group)
            .then(function (done) {
            _this.group['is:awaiting'] = !done;
        });
    };
    /**
     * Decline joining a group
     */
    GroupsJoinButton.prototype.decline = function () {
        var _this = this;
        this.group['is:member'] = false;
        this.group['is:invited'] = false;
        this.service.declineInvitation(this.group)
            .then(function (done) {
            _this.group['is:member'] = false;
            _this.group['is:invited'] = !done;
        });
    };
    GroupsJoinButton = __decorate([
        core_1.Component({
            selector: 'opspot-groups-join-button',
            inputs: ['_group: group'],
            outputs: ['membership'],
            template: "\n    <button class=\"m-btn m-btn--slim m-btn--join-group\"\n      *ngIf=\"!group['is:banned'] && !group['is:awaiting']\n        && !group['is:invited'] && !group['is:member']\"\n        (click)=\"join()\" i18n=\"@@GROUPS__JOIN_BUTTON__JOIN_ACTION\"\n      >\n      <ng-container *ngIf=\"!inProgress\">Join</ng-container>\n      <ng-container *ngIf=\"inProgress\">Joining</ng-container>\n    </button>\n    <span *ngIf=\"group['is:invited'] &amp;&amp; !group['is:member']\">\n      <button class=\"m-btn m-btn--slim m-btn--action\" (click)=\"accept()\" i18n=\"@@M__ACTION__ACCEPT\">Accept</button>\n      <button class=\"m-btn m-btn--slim m-btn--action\" (click)=\"decline()\" i18n=\"@@GROUPS__JOIN_BUTTON__DECLINE_ACTION\">Decline</button>\n    </span>\n    <button class=\"m-btn m-btn--slim subscribed \" *ngIf=\"group['is:member']\" (click)=\"leave()\" i18n=\"@@GROUPS__JOIN_BUTTON__LEAVE_ACTION\">Leave</button>\n    <button class=\"m-btn m-btn--slim awaiting\" *ngIf=\"group['is:awaiting']\" (click)=\"cancelRequest()\" i18n=\"@@GROUPS__JOIN_BUTTON__CANCEL_REQ_ACTION\">Cancel request</button>\n    <m-modal-signup-on-action\n      [open]=\"showModal\"\n      (closed)=\"join(); showModal = false;\"\n      action=\"join a group\"\n      i18n-action=\"@@GROUPS__JOIN_BUTTON__JOIN_A_GROUP_TITLE\"\n      [overrideOnboarding]=\"true\"\n      *ngIf=\"!session.isLoggedIn()\">\n    </m-modal-signup-on-action>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session,
            groups_service_1.GroupsService,
            router_1.Router,
            login_referrer_service_1.LoginReferrerService])
    ], GroupsJoinButton);
    return GroupsJoinButton;
}());
exports.GroupsJoinButton = GroupsJoinButton;
//# sourceMappingURL=groups-join-button.js.map
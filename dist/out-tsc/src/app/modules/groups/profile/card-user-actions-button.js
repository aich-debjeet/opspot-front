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
var groups_service_1 = require("../groups-service");
var GroupsCardUserActionsButton = /** @class */ (function () {
    function GroupsCardUserActionsButton(service) {
        this.service = service;
        this.group = {};
        this.user = {
            'is:member': false,
            'is:moderator': false,
            'is:owner': false,
            'is:creator': false,
            'is:banned': false
        };
        this.kickPrompt = false;
        this.kickBan = false;
        this.wasReInvited = false;
        this.showMenu = false;
    }
    GroupsCardUserActionsButton.prototype.toggleMenu = function (e) {
        e.stopPropagation();
        if (this.showMenu) {
            this.showMenu = false;
            return;
        }
        this.showMenu = true;
        // TODO: [emi] Maybe refresh state?
    };
    GroupsCardUserActionsButton.prototype.removePrompt = function () {
        this.showMenu = false;
        this.kickPrompt = true;
        this.kickBan = false;
    };
    GroupsCardUserActionsButton.prototype.cancelRemove = function () {
        this.kickPrompt = false;
    };
    GroupsCardUserActionsButton.prototype.kick = function (ban) {
        var _this = this;
        if (ban === void 0) { ban = false; }
        var action;
        this.kickPrompt = false;
        if (ban) {
            action = this.service.ban(this.group, this.user.guid);
        }
        else {
            action = this.service.kick(this.group, this.user.guid);
        }
        action.then(function (done) {
            _this.user['is:member'] = !done;
            _this.user['is:banned'] = done && ban;
            _this.kickPrompt = !done;
            _this.changeCounter('members:count', -1);
        });
        this.showMenu = false;
    };
    GroupsCardUserActionsButton.prototype.reInvite = function () {
        var _this = this;
        this.service.invite(this.group, this.user.username)
            .then(function () {
            _this.wasReInvited = true;
        })
            .catch(function (e) {
            _this.wasReInvited = false;
        });
        this.showMenu = false;
    };
    GroupsCardUserActionsButton.prototype.grantOwnership = function () {
        var _this = this;
        this.user['is:owner'] = true;
        this.service.grantOwnership({ guid: this.group.guid }, this.user.guid)
            .then(function (isOwner) {
            _this.user['is:owner'] = isOwner;
        });
        this.showMenu = false;
    };
    GroupsCardUserActionsButton.prototype.revokeOwnership = function () {
        var _this = this;
        this.user['is:owner'] = false;
        this.service.revokeOwnership({ guid: this.group.guid }, this.user.guid)
            .then(function (isOwner) {
            _this.user['is:owner'] = isOwner;
        });
        this.showMenu = false;
    };
    /**
     * Grant moderation
     */
    GroupsCardUserActionsButton.prototype.grantModerator = function () {
        var _this = this;
        this.user['is:moderator'] = true;
        this.service.grantModerator({ guid: this.group.guid }, this.user.guid)
            .then(function (isModerator) {
            _this.user['is:moderator'] = isModerator;
        });
        this.showMenu = false;
    };
    /**
     * Revoke moderation
     */
    GroupsCardUserActionsButton.prototype.revokeModerator = function () {
        var _this = this;
        this.user['is:moderator'] = false;
        this.service.revokeModerator({ guid: this.group.guid }, this.user.guid)
            .then(function (isModerator) {
            _this.user['is:moderator'] = isModerator;
        });
        this.showMenu = false;
    };
    GroupsCardUserActionsButton.prototype.changeCounter = function (counter, val) {
        if (val === void 0) { val = 0; }
        if (typeof this.group[counter] !== 'undefined') {
            this.group[counter] = parseInt(this.group[counter], 10) + val;
        }
    };
    GroupsCardUserActionsButton = __decorate([
        core_1.Component({
            selector: 'opspot-groups-card-user-actions-button',
            inputs: ['group', 'user'],
            template: "\n  <button *ngIf=\"group['is:owner']\u00A0|| (group['is:moderator'] && !(user['is:owner']||user['is:moderator']))\" (click)=\"toggleMenu($event)\">\n    <i class=\"material-icons\">settings</i>\n  </button>\n\n  <ul class=\"opspot-dropdown-menu\" [hidden]=\"!showMenu\">\n    <li class=\"mdl-menu__item\"\n      *ngIf=\"(group['is:owner'] || group['is:moderator']) && !(user['is:owner']||user['is:moderator']) && user['is:member']\"\n      (click)=\"removePrompt()\" i18n=\"@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_FROM_GROUP\">\n      Remove from Group\n    </li>\n    <li class=\"mdl-menu__item\"\n      *ngIf=\"(group['is:owner'] || group['is:moderator']) && !user['is:member'] && !wasReInvited\"\n      (click)=\"reInvite()\" i18n=\"@@GROUPS__PROFILE__CARD_USER_ACTIONS__REINVITE\">\n      Re-invite to Group\n    </li>\n    <li class=\"mdl-menu__item\" *ngIf=\"(group['is:owner'] || group['is:moderator']) && wasReInvited\">\n      <span class=\"opspot-menu-info-item\" i18n=\"@@GROUPS__PROFILE__CARD_USER_ACTIONS__INVITED\">Invited</span>\n    </li>\n    <li class=\"mdl-menu__item\"\n      *ngIf=\"group['is:owner'] && !(user['is:owner']||user['is:moderator']) && user['is:member']\"\n      (click)=\"grantOwnership()\" i18n=\"@@GROUPS__PROFILE__CARD_USER_ACTIONS__MAKE_ADMIN\">\n      Make Admin\n    </li>\n    <li class=\"mdl-menu__item\"\n      *ngIf=\"group['is:owner'] && user['is:owner'] && user['is:member']\"\n      (click)=\"revokeOwnership()\" i18n=\"@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_AS_ADMIN\">\n      Remove as Admin\n    </li>\n    <li class=\"mdl-menu__item\"\n      *ngIf=\"group['is:owner'] && !(user['is:owner']||user['is:moderator']) && user['is:member']\"\n      (click)=\"grantModerator()\" i18n=\"@@GROUPS__PROFILE__CARD_USER_ACTIONS__MAKE_MODERATOR\">\n      Make Moderator\n    </li>\n    <li class=\"mdl-menu__item\"\n      *ngIf=\"group['is:owner'] && user['is:moderator'] && user['is:member']\"\n      (click)=\"revokeModerator()\" i18n=\"@@GROUPS__PROFILE__CARD_USER_ACTIONS__REMOVE_AS_MODERATOR\">\n      Remove as Moderator\n    </li>\n  </ul>\n  <div class=\"opspot-bg-overlay\" (click)=\"toggleMenu($event)\" [hidden]=\"!showMenu\"></div>\n\n  <m-modal [open]=\"kickPrompt\">\n      <div class=\"mdl-card__supporting-text\">\n        <p i18n=\"@@GROUPS__REMOVE_X_FROM_Y_CONFIRM\">Are you sure you want to remove {{ user.username }} from {{ group.name }}?</p>\n        <p><input type=\"checkbox\" #ban> <ng-container i18n=\"@@M__COMMON__BAN_PERMANENTLY\">Ban permanently</ng-container></p>\n      </div>\n      <div class=\"opspot-modal-dialog-actions\">\n        <button (click)=\"kick(ban.checked)\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\">\n          <ng-container i18n=\"@@M__ACTION__CONFIRM\">Confirm</ng-container>\n        </button>\n        <button (click)=\"cancelRemove()\" class=\"mdl-button mdl-js-button mdl-button--colored\">\n          <ng-container i18n=\"@@M__ACTION__CANCEL\">Cancel</ng-container>\n        </button>\n      </div>\n  </m-modal>\n  "
        }),
        __metadata("design:paramtypes", [groups_service_1.GroupsService])
    ], GroupsCardUserActionsButton);
    return GroupsCardUserActionsButton;
}());
exports.GroupsCardUserActionsButton = GroupsCardUserActionsButton;
//# sourceMappingURL=card-user-actions-button.js.map
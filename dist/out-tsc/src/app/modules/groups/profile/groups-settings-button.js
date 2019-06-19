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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var groups_service_1 = require("../groups-service");
var creator_component_1 = require("../../report/creator/creator.component");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var client_1 = require("../../../services/api/client");
var session_1 = require("../../../services/session");
var GroupsSettingsButton = /** @class */ (function () {
    function GroupsSettingsButton(service, client, session, overlayService, router) {
        this.service = service;
        this.client = client;
        this.session = session;
        this.overlayService = overlayService;
        this.router = router;
        this.group = {
            'is:muted': false,
            deleted: false
        };
        this.groupChange = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this.editing = false;
        this.showMenu = false;
        this.isGoingToBeDeleted = false;
        this.categories = [];
        this.category = 'not-selected';
        this.featured = false;
        this.featureModalOpen = false;
    }
    Object.defineProperty(GroupsSettingsButton.prototype, "_group", {
        set: function (value) {
            if (!value)
                return;
            this.group = value;
            this.featured = value.featured_id || value.featured === true;
        },
        enumerable: true,
        configurable: true
    });
    GroupsSettingsButton.prototype.ngOnInit = function () {
        this.initCategories();
    };
    GroupsSettingsButton.prototype.initCategories = function () {
        for (var category in window.Opspot.categories) {
            this.categories.push({
                id: category,
                label: window.Opspot.categories[category],
            });
        }
    };
    GroupsSettingsButton.prototype.mute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isMuted, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.group['is:muted'] = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.muteNotifications(this.group)];
                    case 2:
                        isMuted = _a.sent();
                        this.group['is:muted'] = isMuted;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.group['is:muted'] = false;
                        return [3 /*break*/, 4];
                    case 4:
                        this.showMenu = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupsSettingsButton.prototype.unmute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isMuted, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.group['is:muted'] = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.unmuteNotifications(this.group)];
                    case 2:
                        isMuted = _a.sent();
                        this.group['is:muted'] = isMuted;
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.group['is:muted'] = true;
                        return [3 /*break*/, 4];
                    case 4:
                        this.showMenu = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupsSettingsButton.prototype.openFeatureModal = function () {
        this.featureModalOpen = true;
    };
    GroupsSettingsButton.prototype.feature = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.featured = true;
                        this.group.featured = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.put("api/v1/admin/feature/" + this.group.guid + "/" + this.category, {})];
                    case 2:
                        _a.sent();
                        this.featureModalOpen = false;
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        this.featured = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GroupsSettingsButton.prototype.unfeature = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.featured = false;
                        this.group.featured = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.delete("api/v1/admin/feature/" + this.group.guid)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        this.featured = true;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GroupsSettingsButton.prototype.onFeatureModalClose = function (e) {
        this.featureModalOpen = false;
    };
    GroupsSettingsButton.prototype.report = function () {
        this.overlayService.create(creator_component_1.ReportCreatorComponent, this.group)
            .present();
    };
    GroupsSettingsButton.prototype.deletePrompt = function () {
        this.isGoingToBeDeleted = true;
    };
    GroupsSettingsButton.prototype.cancelDelete = function () {
        this.isGoingToBeDeleted = false;
    };
    GroupsSettingsButton.prototype.setExplicit = function (value) {
        var _this = this;
        this.service.setExplicit(this.group.guid, value)
            .then(function (result) {
            if (result) {
                _this.group.mature = value;
            }
        });
    };
    GroupsSettingsButton.prototype.delete = function () {
        var _this = this;
        if (!this.isGoingToBeDeleted) {
            return;
        }
        this.group.deleted = true;
        this.service.deleteGroup(this.group)
            .then(function (deleted) {
            _this.group.deleted = deleted;
            if (deleted) {
                _this.router.navigate(['/groups/member']);
            }
        });
        this.showMenu = false;
        this.isGoingToBeDeleted = false;
    };
    GroupsSettingsButton.prototype.toggleMenu = function (e) {
        e.stopPropagation();
        if (this.showMenu) {
            this.showMenu = false;
            return;
        }
        this.showMenu = true;
        // TODO: [emi] Maybe refresh state?
    };
    GroupsSettingsButton.prototype.toggleEdit = function () {
        this.editing = !this.editing;
        this.change.emit({ editing: this.editing });
    };
    GroupsSettingsButton.prototype.toggleVideoChat = function (enabled) {
        this.group.videoChatDisabled = enabled ? 0 : 1;
        this.client.post("api/v1/groups/group/" + this.group.guid, { videoChatDisabled: this.group.videoChatDisabled });
        this.groupChange.next(this.group);
    };
    GroupsSettingsButton.prototype.toggleModeration = function (enabled) {
        this.group.moderated = enabled ? 1 : 0;
        this.client.post("api/v1/groups/group/" + this.group.guid, { moderated: this.group.moderated });
        this.groupChange.next(this.group);
    };
    GroupsSettingsButton.prototype.togglePublic = function (enabled) {
        this.group.membership = enabled ? 2 : 0;
        this.client.post("api/v1/groups/group/" + this.group.guid, { membership: this.group.membership });
        this.groupChange.next(this.group);
    };
    __decorate([
        core_1.Input('group'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], GroupsSettingsButton.prototype, "_group", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GroupsSettingsButton.prototype, "groupChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GroupsSettingsButton.prototype, "change", void 0);
    GroupsSettingsButton = __decorate([
        core_1.Component({
            selector: 'opspot-groups-settings-button',
            template: "\n    <button class=\"material-icons\" (click)=\"toggleMenu($event)\">\n      settings\n      <i *ngIf=\"group['is:muted']\" class=\"opspot-groups-button-badge material-icons\">notifications_off</i>\n    </button>\n\n    <ul class=\"opspot-dropdown-menu\" [hidden]=\"!showMenu\" >\n      <!-- owner functions -->\n      <li class=\"mdl-menu__item\" *ngIf=\"group['is:owner']\" (click)=\"toggleEdit()\">\n          <ng-container *ngIf=\"!editing\">Edit</ng-container>\n          <ng-container *ngIf=\"editing\">Save</ng-container>\n      </li>\n\n      <li class=\"mdl-menu__item\" *ngIf=\"group['is:owner'] && group.videoChatDisabled\" (click)=\"toggleVideoChat(true)\">Enable Gathering</li>\n      <li class=\"mdl-menu__item\" *ngIf=\"group['is:owner'] && !group.videoChatDisabled\" (click)=\"toggleVideoChat(false)\">Disable Gathering</li>\n\n      <li class=\"mdl-menu__item\" *ngIf=\"group['is:owner'] && group.moderated\" (click)=\"toggleModeration(false)\">Disable moderation</li>\n      <li class=\"mdl-menu__item\" *ngIf=\"group['is:owner'] && !group.moderated\" (click)=\"toggleModeration(true)\">Enable moderation</li>\n\n      <li class=\"mdl-menu__item\" *ngIf=\"group['is:owner'] && !group.membership\" (click)=\"togglePublic(true)\">Make public</li>\n      <li class=\"mdl-menu__item\" *ngIf=\"group['is:owner'] && group.membership\" (click)=\"togglePublic(false)\">Make closed</li>\n\n      <!-- Member functions -->\n      <li class=\"mdl-menu__item\" [hidden]=\"group['is:muted']\" (click)=\"mute()\" i18n=\"@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__DISABLE_NOTIFICATIONS\">Disable Notifications</li>\n      <li class=\"mdl-menu__item\" [hidden]=\"!group['is:muted']\" (click)=\"unmute()\" i18n=\"@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__ENABLE_NOTIFICATIONS\">Enable Notifications</li>\n\n      <!-- admin functions -->\n      <li class=\"mdl-menu__item\" *ngIf=\"session.isAdmin() && !group.mature\" (click)=\"setExplicit(true)\" i18n=\"@@M__ACTION__SET_EXPLICIT\">Set Explicit</li>\n      <li class=\"mdl-menu__item\" *ngIf=\"session.isAdmin() && group.mature\" (click)=\"setExplicit(false)\" i18n=\"@@M__ACTION__REMOVE_EXPLICIT\">Remove Explicit</li>\n      <li class=\"mdl-menu__item\" (click)=\"report(); showMenu = false\" i18n=\"@@M__ACTION__REPORT\">Report</li>\n      <li class=\"mdl-menu__item\" *ngIf=\"group['is:creator']\" [hidden]=\"group.deleted\" (click)=\"deletePrompt()\" i18n=\"@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__DELETE_GROUP\">Delete Group</li>\n    </ul>\n    <div class=\"opspot-bg-overlay\" (click)=\"toggleMenu($event)\" [hidden]=\"!showMenu\"></div>\n\n    <m-modal [open]=\"group['is:owner'] && isGoingToBeDeleted\">\n      <div class=\"mdl-card__supporting-text\">\n        <p i18n=\"@@GROUPS__PROFILE__GROUP_SETTINGS_BTN__DELETE_GROUP_CONFIRM\">Are you sure you want to delete {{ group.name }}? This action cannot be undone.</p>\n      </div>\n      <div class=\"mdl-card__actions\">\n        <button (click)=\"delete()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored\">\n          <ng-container i18n=\"@@M__ACTION__CONFIRM\">Confirm</ng-container>\n        </button>\n        <button (click)=\"cancelDelete()\" class=\"mdl-button mdl-js-button mdl-button--colored\">\n          <ng-container i18n=\"@@M__ACTION__CANCEL\">Cancel</ng-container>\n        </button>\n      </div>\n    </m-modal>\n\n    <m-modal [open]=\"featureModalOpen\" (closed)=\"onFeatureModalClose($event)\">\n      <div class=\"m-button-feature-modal\">\n        <select [(ngModel)]=\"category\">\n          <option value=\"not-selected\" i18n=\"@@M__COMMON__SELECT_A_CATEGORY\">-- SELECT A CATEGORY --</option>\n          <option *ngFor=\"let category of categories\" [value]=\"category.id\">{{category.label}}</option>\n        </select>\n\n        <button class=\"mdl-button mdl-button--colored\" (click)=\"feature()\" i18n=\"@@M__ACTION__FEATURE\">Feature</button>\n      </div>\n    </m-modal>\n  "
        }),
        __metadata("design:paramtypes", [groups_service_1.GroupsService, client_1.Client, session_1.Session, overlay_modal_1.OverlayModalService, router_1.Router])
    ], GroupsSettingsButton);
    return GroupsSettingsButton;
}());
exports.GroupsSettingsButton = GroupsSettingsButton;
//# sourceMappingURL=groups-settings-button.js.map
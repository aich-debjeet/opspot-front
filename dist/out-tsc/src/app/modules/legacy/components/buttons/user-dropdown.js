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
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var overlay_modal_1 = require("../../../../services/ux/overlay-modal");
var modal_component_1 = require("../../../ban/modal/modal.component");
var creator_component_1 = require("../../../report/creator/creator.component");
var router_1 = require("@angular/router");
var UserDropdownButton = /** @class */ (function () {
    function UserDropdownButton(session, client, overlayService, router) {
        this.session = session;
        this.client = client;
        this.overlayService = overlayService;
        this.router = router;
        this.user = {
            blocked: false
        };
        this.userChanged = new core_1.EventEmitter;
        this.showMenu = false;
        this.banToggle = false;
        this.banMonetizationToggle = false;
        this.viewEmailToggle = false;
    }
    /**
     * Reindex the user
     */
    UserDropdownButton.prototype.reindex = function () {
        this.client.post('api/v2/admin/reindex', { guid: this.user.guid });
    };
    UserDropdownButton.prototype.block = function () {
        var self = this;
        this.user.blocked = true;
        this.client.put('api/v1/block/' + this.user.guid, {})
            .then(function (response) {
            self.user.blocked = true;
        })
            .catch(function (e) {
            self.user.blocked = false;
        });
        this.showMenu = false;
    };
    UserDropdownButton.prototype.unBlock = function () {
        var self = this;
        this.user.blocked = false;
        this.client.delete('api/v1/block/' + this.user.guid, {})
            .then(function (response) {
            self.user.blocked = false;
        })
            .catch(function (e) {
            self.user.blocked = true;
        });
        this.showMenu = false;
    };
    UserDropdownButton.prototype.unSubscribe = function () {
        var _this = this;
        this.user.subscribed = false;
        this.client.delete('api/v1/subscribe/' + this.user.guid, {})
            .then(function (response) {
            _this.user.subscribed = false;
        })
            .catch(function (e) {
            _this.user.subscribed = true;
        });
    };
    UserDropdownButton.prototype.ban = function () {
        this.user.banned = 'yes';
        this.overlayService.create(modal_component_1.BanModalComponent, this.user)
            .present();
        this.banToggle = false;
    };
    UserDropdownButton.prototype.unBan = function () {
        var _this = this;
        this.user.banned = 'no';
        this.client.delete("api/v1/admin/ban/" + this.user.guid, {})
            .then(function () {
            _this.user.banned = 'no';
        })
            .catch(function (e) {
            _this.user.banned = 'yes';
        });
        this.showMenu = false;
    };
    UserDropdownButton.prototype.banMonetization = function () {
        var _this = this;
        this.user.ban_monetization = 'yes';
        this.client.put("api/v1/admin/monetization/ban/" + this.user.guid, {})
            .then(function () {
            _this.user.ban_monetization = 'yes';
        })
            .catch(function (e) {
            _this.user.ban_monetization = 'no';
        });
        this.banMonetizationToggle = false;
    };
    UserDropdownButton.prototype.unBanMonetization = function () {
        var _this = this;
        this.user.ban_monetization = 'no';
        this.client.delete("api/v1/admin/monetization/ban/" + this.user.guid, {})
            .then(function () {
            _this.user.ban_monetization = 'no';
        })
            .catch(function (e) {
            _this.user.ban_monetization = 'yes';
        });
        this.showMenu = false;
    };
    UserDropdownButton.prototype.toggleMenu = function (e) {
        e.stopPropagation();
        if (this.showMenu) {
            this.showMenu = false;
            return;
        }
        this.showMenu = true;
        var self = this;
        this.client.get('api/v1/block/' + this.user.guid)
            .then(function (response) {
            self.user.blocked = response.blocked;
        });
        if (this.session.isAdmin()) {
            this.client.get("api/v1/admin/monetization/ban/" + this.user.guid)
                .then(function (response) {
                if (typeof response.banned !== 'undefined') {
                    self.user.ban_monetization = response.banned ? 'yes' : 'no';
                }
            });
        }
    };
    UserDropdownButton.prototype.report = function () {
        this.overlayService.create(creator_component_1.ReportCreatorComponent, this.user)
            .present();
    };
    UserDropdownButton.prototype.setSpam = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.user['spam'] = value ? 1 : 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!value) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.put("api/v1/admin/spam/" + this.user.guid)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.client.delete("api/v1/admin/spam/" + this.user.guid)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        this.user['spam'] = !value ? 1 : 0;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserDropdownButton.prototype.setExplicit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.user.is_mature = value;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.post("api/v1/entities/explicit/" + this.user.guid, { value: value ? '1' : '0' })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.user.is_mature = !value;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserDropdownButton.prototype.setRating = function (rating) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post("api/v1/admin/rating/" + this.user.guid + "/" + rating, {})];
                    case 1:
                        _a.sent();
                        this.user.rating = rating;
                        return [2 /*return*/];
                }
            });
        });
    };
    UserDropdownButton.prototype.viewLedger = function () {
        this.router.navigate(['/wallet/tokens/transactions', { remote: this.user.username }]);
    };
    UserDropdownButton.prototype.viewWithdrawals = function () {
        this.router.navigate(['/admin/withdrawals', { user: this.user.username }]);
    };
    UserDropdownButton.prototype.viewEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var email, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.viewEmailToggle = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.get("api/v2/admin/user/" + this.user.username + "/email")];
                    case 2:
                        email = (_a.sent()).email;
                        this.user.email = email;
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.error('viewEmail', e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserDropdownButton = __decorate([
        core_1.Component({
            selector: 'opspot-button-user-dropdown',
            inputs: ['user'],
            outputs: ['userChanged'],
            template: "\n    <button class=\"material-icons\" (click)=\"toggleMenu($event)\">settings</button>\n\n    <ul class=\"opspot-dropdown-menu\" [hidden]=\"!showMenu\" >\n      <li class=\"mdl-menu__item\" [hidden]=\"user.blocked\" (click)=\"block()\" i18n=\"@@OPSPOT__BUTTONS__USER_DROPDOWN__BLOCK\">Block @{{user.username}}</li>\n      <li class=\"mdl-menu__item\" [hidden]=\"!user.blocked\" (click)=\"unBlock()\" i18n=\"@@OPSPOT__BUTTONS__USER_DROPDOWN__UNBLOCK\">Un-Block @{{user.username}}</li>\n      <li class=\"mdl-menu__item\" [hidden]=\"!user.subscribed\" (click)=\"unSubscribe()\" i18n=\"@@OPSPOT__BUTTONS__USER_DROPDOWN__UNSUBSCRIBE\">Unsubscribe</li>\n      <li class=\"mdl-menu__item\"\n        *ngIf=\"session.isAdmin()\"\n        [hidden]=\"user.banned === 'yes'\"\n        (click)=\"banToggle = true; showMenu = false\"\n        i18n=\"@@OPSPOT__BUTTONS__USER_DROPDOWN__BAN_GLOBALLY\"\n        >\n        Ban globally\n      </li>\n      <li class=\"mdl-menu__item\" *ngIf=\"session.isAdmin()\" [hidden]=\"user.banned !== 'yes'\" (click)=\"unBan()\" i18n=\"@@OPSPOT__BUTTONS__USER_DROPDOWN__UNBAN_GLOBALLY\">Un-ban globally</li>\n      <li class=\"mdl-menu__item\"\n        *ngIf=\"session.isAdmin()\"\n        (click)=\"viewLedger()\"\n        i18n=\"@@OPSPOT_BUTTON__USER_DROPDOWN__VIEW_LEDGER\"\n      >\n        View Ledger\n      </li>\n      <li class=\"mdl-menu__item\"\n        *ngIf=\"session.isAdmin()\"\n        (click)=\"viewWithdrawals()\"\n        i18n=\"@@OPSPOT_BUTTON__USER_DROPDOWN__VIEW_WITHDRAWALS\"\n      >\n        View Withdrawals\n      </li>\n      <li class=\"mdl-menu__item\"\n        *ngIf=\"session.isAdmin()\"\n        (click)=\"viewEmail()\"\n        i18n=\"@@OPSPOT_BUTTON__USER_DROPDOWN__VIEW_EMAIL_ADDR\"\n      >\n        E-mail Address\n      </li>\n      <li class=\"mdl-menu__item\"\n        (click)=\"report(); showMenu = false\"\n        i18n=\"@@M__ACTION__REPORT\"\n      >\n        Report\n      </li>\n      <li class=\"mdl-menu__item\"\n        *ngIf=\"session.isAdmin()\"\n        [hidden]=\"user.is_mature\"\n        (click)=\"setExplicit(true); showMenu = false\"\n        i18n=\"@@M__ACTION__MARK_EXPLICIT\"\n      >\n        Set as explicit\n      </li>\n      <li class=\"mdl-menu__item\"\n        *ngIf=\"session.isAdmin()\"\n        [hidden]=\"!user.is_mature\"\n        (click)=\"setExplicit(false); showMenu = false\"\n        i18n=\"@@M__ACTION__REMOVE_EXPLICIT\"\n      >\n        Remove Explicit\n      </li>\n      <li class=\"mdl-menu__item\"\n        *ngIf=\"session.isAdmin()\"\n        (click)=\"reindex(); showMenu = false\"\n        i18n=\"@@M__ACTION__REINDEX\"\n      >\n        Reindex\n      </li>\n      <ng-container *ngIf=\"session.isAdmin()\">\n        <li class=\"mdl-menu__item\" [hidden]=\"user.rating === 1\" (click)=\"setRating(1)\" i18n=\"@@M__ACTION__MARK_AS_SAFE\">Mark as Safe</li>\n        <li class=\"mdl-menu__item\" [hidden]=\"user.rating === 2\" (click)=\"setRating(2)\" i18n=\"@@M__ACTION__MENU__MARK_AS_OPEN\">Mark as Open</li>\n      </ng-container>\n    </ul>\n    <div class=\"opspot-bg-overlay\" (click)=\"toggleMenu($event)\" [hidden]=\"!showMenu\"></div>\n\n    <m-modal-confirm *ngIf=\"banToggle\"\n      [open]=\"true\"\n      [closeAfterAction]=\"true\"\n      (closed)=\"banToggle = false\"\n      (actioned)=\"ban()\"\n      yesButton=\"Ban user\"\n      i18n-yesButton=\"@@M__ACTION__BAN_USER\"\n    >\n      <p confirm-message i18n=\"@@OPSPOT__BUTTONS__USER_DROPDOWN__BAN_USER_CONFIRM_MESSAGE\">\n          Are you sure you want to ban this user?<br><br>\n          This will close all open sessions and lock him/her out from Opspot.\n      </p>\n      <p confirm-success-message i18n=\"@@OPSPOT__BUTTONS__USER_DROPDOWN__BAN_USER_SUCCESS_MESSAGE\">\n          User has been banned.\n      </p>\n    </m-modal-confirm>\n    <m-modal-confirm *ngIf=\"banMonetizationToggle\"\n      [open]=\"true\"\n      [closeAfterAction]=\"true\"\n      (closed)=\"banMonetizationToggle = false\"\n      (actioned)=\"banMonetization()\"\n      yesButton=\"Ban user\"\n      i18n-yesButton=\"@@M__ACTION__BAN_USER\"\n    >\n      <p confirm-message i18n=\"@@OPSPOT__BUTTONS__USER_DROPDOWN__BAN_MONETIZATION_CONFIRM_MESSAGE\">\n          Are you sure you want to ban this user from monetization?<br><br>\n          This will close all open sessions and decline pending payments.<br>\n          There's no UNDO. This will NOT ban the user from Opspot.\n      </p>\n      <p confirm-success-message i18n=\"@@OPSPOT__BUTTONS__USER_DROPDOWN__BAN_MONETIZATION_SUCCESS_MESSAGE\">\n          User has been banned from monetization.\n      </p>\n    </m-modal-confirm>\n    <m-modal *ngIf=\"viewEmailToggle\" [open]=\"true\" (closed)=\"viewEmailToggle = false\">\n      <div class=\"mdl-card__supporting-text\" style=\"padding: 64px; font-size: 20px; text-align: center;\">\n        @{{user.username}}'s email:\n        <a *ngIf=\"user.email\" [href]=\"'mailto:' + user.email\" style=\"text-decoration: none;\">{{user.email}}</a>\n        <ng-container *ngIf=\"!user.email\">...</ng-container>\n      </div>\n    </m-modal>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            overlay_modal_1.OverlayModalService,
            router_1.Router])
    ], UserDropdownButton);
    return UserDropdownButton;
}());
exports.UserDropdownButton = UserDropdownButton;
//# sourceMappingURL=user-dropdown.js.map
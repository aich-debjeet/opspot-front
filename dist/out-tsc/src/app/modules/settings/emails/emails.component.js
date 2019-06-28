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
var client_1 = require("../../../services/api/client");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var modal_component_1 = require("../../modals/confirm-password/modal.component");
var SettingsEmailsComponent = /** @class */ (function () {
    function SettingsEmailsComponent(client, overlayModal) {
        this.client = client;
        this.overlayModal = overlayModal;
        this.notifications = {
            when: {
                unread_notifications: false,
                wire_received: false,
                boost_completed: false,
            },
            with: {
                top_posts: false,
                channel_improvement_tips: false,
                posts_missed_since_login: false,
                new_channels: false,
            },
            global: {
                opspot_news: false,
                opspot_tips: false,
                exclusive_promotions: false,
            }
        };
        this.email = '';
        this.error = '';
        this.changed = false;
        this.saved = false;
        this.inProgress = false;
        this.loading = false;
    }
    SettingsEmailsComponent.prototype.ngOnInit = function () {
        this.load();
    };
    SettingsEmailsComponent.prototype.onTopPostsCheckboxChange = function (value) {
        if (value) {
            this.notifications.with.top_posts = 'periodically';
        }
        else {
            this.notifications.with.top_posts = false;
        }
    };
    SettingsEmailsComponent.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        return [4 /*yield*/, this.client.get('api/v2/settings/emails')];
                    case 1:
                        response = _a.sent();
                        response.notifications.forEach(function (item, index, list) {
                            var value = item.value;
                            if (item.value === '1') {
                                value = true;
                            }
                            else if (item.value === '0') {
                                value = false;
                            }
                            _this.notifications[item.campaign][item.topic] = value;
                        });
                        this.email = response.email;
                        this.loading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsEmailsComponent.prototype.change = function () {
        this.changed = true;
        this.saved = false;
    };
    SettingsEmailsComponent.prototype.canSubmit = function () {
        return this.changed;
    };
    SettingsEmailsComponent.prototype.submit = function () {
        var _this = this;
        this.inProgress = true;
        this.client.post('api/v2/settings/emails', {
            'email': this.email,
            'notifications': this.notifications
        })
            .then(function (response) {
            _this.changed = false;
            _this.saved = true;
            _this.error = '';
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.error = e;
            _this.inProgress = false;
        });
    };
    SettingsEmailsComponent.prototype.save = function () {
        var _this = this;
        if (!this.canSubmit())
            return;
        var creator = this.overlayModal.create(modal_component_1.ConfirmPasswordModalComponent, {}, {
            class: 'm-overlay-modal--small',
            onComplete: function (wire) {
                _this.submit();
            }
        });
        creator.present();
    };
    SettingsEmailsComponent = __decorate([
        core_1.Component({
            selector: 'm-settings--emails',
            templateUrl: 'emails.component.html'
        }),
        __metadata("design:paramtypes", [client_1.Client, overlay_modal_1.OverlayModalService])
    ], SettingsEmailsComponent);
    return SettingsEmailsComponent;
}());
exports.SettingsEmailsComponent = SettingsEmailsComponent;
//# sourceMappingURL=emails.component.js.map
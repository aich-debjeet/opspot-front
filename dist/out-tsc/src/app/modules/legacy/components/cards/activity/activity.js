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
var api_1 = require("../../../../../services/api");
var session_1 = require("../../../../../services/session");
var scroll_1 = require("../../../../../services/ux/scroll");
var attachment_1 = require("../../../../../services/attachment");
var translation_1 = require("../../../../../services/translation");
var overlay_modal_1 = require("../../../../../services/ux/overlay-modal");
var creator_component_1 = require("../../../../boost/creator/creator.component");
var creator_component_2 = require("../../../../wire/creator/creator.component");
var video_component_1 = require("../../../../media/components/video/video.component");
var newsfeed_service_1 = require("../../../../newsfeed/services/newsfeed.service");
var Activity = /** @class */ (function () {
    function Activity(session, client, scroll, newsfeedService, _element, attachment, translationService, overlayModal, cd) {
        this.session = session;
        this.client = client;
        this.scroll = scroll;
        this.newsfeedService = newsfeedService;
        this.attachment = attachment;
        this.translationService = translationService;
        this.overlayModal = overlayModal;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.boosted = false;
        this.commentsToggle = false;
        this.shareToggle = false;
        this.deleteToggle = false;
        this.translateToggle = false;
        this.translateEvent = new core_1.EventEmitter();
        this.showBoostOptions = false;
        this.boost = false;
        this._showBoostMenuOptions = false;
        this.visible = false;
        this.editing = false;
        this._delete = new core_1.EventEmitter();
        this.commentsOpened = new core_1.EventEmitter();
        this.childEventsEmitter = new core_1.EventEmitter();
        this.onViewed = new core_1.EventEmitter();
        this.canDelete = false;
        this.showRatingToggle = false;
        this.defaultMenuOptions = ['edit', 'translate', 'share', 'mute', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];
        this.menuOptions = ['edit', 'translate', 'share', 'follow', 'feature', 'delete', 'report', 'set-explicit', 'block', 'rating'];
        this.viewed = false;
        this.element = _element.nativeElement;
        this.isVisible();
    }
    Object.defineProperty(Activity.prototype, "showBoostMenuOptions", {
        set: function (value) {
            this._showBoostMenuOptions = value;
            if (!value) {
                this.menuOptions = this.defaultMenuOptions;
            }
            this.menuOptions = this.menuOptions.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "object", {
        set: function (value) {
            if (!value)
                return;
            this.activity = value;
            this.activity.url = window.Opspot.site_url + 'newsfeed/' + value.guid;
            if (this.activity.custom_type == 'batch'
                && this.activity.custom_data
                && this.activity.custom_data[0].src) {
                this.activity.custom_data[0].src = this.activity.custom_data[0].src.replace(this.opspot.site_url, this.opspot.cdn_url);
            }
            if (!this.activity.message) {
                this.activity.message = '';
            }
            if (!this.activity.title) {
                this.activity.title = '';
            }
            this.boosted = this.activity.boosted || this.activity.p2p_boosted;
            this.isTranslatable = (this.translationService.isTranslatable(this.activity) ||
                (this.activity.remind_object && this.translationService.isTranslatable(this.activity.remind_object)));
        },
        enumerable: true,
        configurable: true
    });
    Activity.prototype.getOwnerIconTime = function () {
        var session = this.session.getLoggedInUser();
        if (session && session.guid === this.activity.ownerObj.guid) {
            return session.icontime;
        }
        else {
            return this.activity.ownerObj.icontime;
        }
    };
    Object.defineProperty(Activity.prototype, "boostToggle", {
        set: function (toggle) {
            //if(toggle)
            //  this.showBoost();
            return;
        },
        enumerable: true,
        configurable: true
    });
    Activity.prototype.save = function () {
        console.log('trying to save your changes to the server', this.activity);
        this.editing = false;
        this.activity.edited = true;
        this.client.post('api/v1/newsfeed/' + this.activity.guid, this.activity);
    };
    Activity.prototype.delete = function ($event) {
        var _this = this;
        if ($event === void 0) { $event = {}; }
        if ($event.inProgress) {
            $event.inProgress.emit(true);
        }
        this.client.delete("api/v1/newsfeed/" + this.activity.guid)
            .then(function (response) {
            if ($event.inProgress) {
                $event.inProgress.emit(false);
                $event.completed.emit(0);
            }
            _this._delete.next(_this.activity);
        })
            .catch(function (e) {
            if ($event.inProgress) {
                $event.inProgress.emit(false);
                $event.completed.emit(1);
            }
        });
    };
    /*async setSpam(value: boolean) {
      this.activity['spam'] = value;
  
      try {
        if (value) {
          await this.client.put(`api/v1/admin/spam/${this.activity.guid}`);
        } else {
          await this.client.delete(`api/v1/admin/spam/${this.activity.guid}`);
        }
      } catch (e) {
        this.activity['spam'] = !value;
      }
    }
  
    async setDeleted(value: boolean) {
      this.activity['deleted'] = value;
  
      try {
        if (value) {
          await this.client.put(`api/v1/admin/delete/${this.activity.guid}`);
        } else {
          await this.client.delete(`api/v1/admin/delete/${this.activity.guid}`);
        }
      } catch (e) {
        this.activity['delete'] = !value;
      }
    }*/
    Activity.prototype.openComments = function () {
        this.commentsToggle = !this.commentsToggle;
        this.commentsOpened.emit(this.commentsToggle);
    };
    Activity.prototype.togglePin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.session.getLoggedInUser().guid != this.activity.owner_guid) {
                            return [2 /*return*/];
                        }
                        this.activity.pinned = !this.activity.pinned;
                        url = "api/v2/newsfeed/pin/" + this.activity.guid;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!this.activity.pinned) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.post(url)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.client.delete(url)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        this.activity.pinned = !this.activity.pinned;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Activity.prototype.showBoost = function () {
        var _this = this;
        var boostModal = this.overlayModal.create(creator_component_1.BoostCreatorComponent, this.activity);
        boostModal.onDidDismiss(function () {
            _this.showBoostOptions = false;
        });
        boostModal.present();
    };
    Activity.prototype.showWire = function () {
        var _this = this;
        if (this.session.getLoggedInUser().guid !== this.activity.owner_guid) {
            this.overlayModal.create(creator_component_2.WireCreatorComponent, this.activity.remind_object ? this.activity.remind_object : this.activity, { onComplete: function (wire) { return _this.wireSubmitted(wire); } })
                .present();
        }
    };
    Activity.prototype.wireSubmitted = function (wire) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (wire && this.activity.wire_totals) {
                    this.activity.wire_totals.tokens =
                        parseFloat(this.activity.wire_totals.tokens) + (wire.amount * Math.pow(10, 18));
                    this.detectChanges();
                }
                return [2 /*return*/];
            });
        });
    };
    Activity.prototype.menuOptionSelected = function (option) {
        switch (option) {
            case 'edit':
                this.editing = true;
                break;
            case 'delete':
                this.delete();
                break;
            case 'set-explicit':
                this.setExplicit(true);
                break;
            case 'remove-explicit':
                this.setExplicit(false);
                break;
            case 'translate':
                this.translateToggle = true;
                break;
        }
    };
    Activity.prototype.setExplicit = function (value) {
        var _this = this;
        var oldValue = this.activity.mature, oldMatureVisibility = this.activity.mature_visibility;
        this.activity.mature = value;
        this.activity.mature_visibility = void 0;
        if (this.activity.custom_data && this.activity.custom_data[0]) {
            this.activity.custom_data[0].mature = value;
        }
        else if (this.activity.custom_data) {
            this.activity.custom_data.mature = value;
        }
        this.client.post("api/v1/entities/explicit/" + this.activity.guid, { value: value ? '1' : '0' })
            .catch(function (e) {
            _this.activity.mature = oldValue;
            _this.activity.mature_visibility = oldMatureVisibility;
            if (_this.activity.custom_data && _this.activity.custom_data[0]) {
                _this.activity.custom_data[0].mature = oldValue;
            }
            else if (_this.activity.custom_data) {
                _this.activity.custom_data.mature = oldValue;
            }
        });
    };
    Activity.prototype.isVisible = function () {
        var _this = this;
        if (this.visible) {
            this.onViewed.emit({ activity: this.activity, visible: true });
            return true;
        }
        this.scroll_listener = this.scroll.listenForView().subscribe(function (view) {
            if (_this.element.offsetTop - _this.scroll.view.clientHeight <= _this.scroll.view.scrollTop && !_this.visible) {
                //stop listening
                _this.scroll.unListen(_this.scroll_listener);
                //make visible
                _this.visible = true;
                //this.onViewed.emit({activity: this.activity, visible: true});
                //update the analytics
                _this.newsfeedService.recordView(_this.activity);
            }
        });
    };
    Activity.prototype.ngOnDestroy = function () {
        this.scroll.unListen(this.scroll_listener);
    };
    Activity.prototype.propagateTranslation = function ($event) {
        if (this.activity.remind_object && this.translationService.isTranslatable(this.activity.remind_object)) {
            this.childEventsEmitter.emit({
                action: 'translate',
                args: [$event]
            });
        }
    };
    Activity.prototype.hide = function () {
        if (this.player) {
            this.player.pause();
        }
    };
    Activity.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Activity.prototype, "boost", void 0);
    __decorate([
        core_1.Input('boost-toggle'),
        __metadata("design:type", Boolean)
    ], Activity.prototype, "_showBoostMenuOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Activity.prototype, "showBoostMenuOptions", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Activity.prototype, "hideTabs", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Activity.prototype, "focusedCommentGuid", void 0);
    __decorate([
        core_1.ViewChild('player'),
        __metadata("design:type", video_component_1.OpspotVideoComponent)
    ], Activity.prototype, "player", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Activity.prototype, "boostToggle", null);
    Activity = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-activity',
            host: {
                'class': 'mdl-card m-border'
            },
            inputs: ['object', 'commentsToggle', 'focusedCommentGuid', 'visible', 'canDelete', 'showRatingToggle'],
            outputs: ['_delete: delete', 'commentsOpened', 'onViewed'],
            templateUrl: 'activity.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            scroll_1.ScrollService,
            newsfeed_service_1.NewsfeedService,
            core_1.ElementRef,
            attachment_1.AttachmentService,
            translation_1.TranslationService,
            overlay_modal_1.OverlayModalService,
            core_1.ChangeDetectorRef])
    ], Activity);
    return Activity;
}());
exports.Activity = Activity;
//# sourceMappingURL=activity.js.map
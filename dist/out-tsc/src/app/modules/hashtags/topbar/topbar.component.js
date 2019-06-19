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
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var hashtags_selector_component_1 = require("../hashtag-selector-modal/hashtags-selector.component");
var topbar_service_1 = require("../service/topbar.service");
var dropdown_component_1 = require("../../../common/components/dropdown/dropdown.component");
var TopbarHashtagsComponent = /** @class */ (function () {
    function TopbarHashtagsComponent(overlayModal, service, cd) {
        this.overlayModal = overlayModal;
        this.service = service;
        this.cd = cd;
        this.hashtags = [];
        this.selectionChange = new core_1.EventEmitter();
        this.all = false;
        this.enabled = true;
        this.showMenu = false;
    }
    TopbarHashtagsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load()];
                    case 1:
                        _a.sent();
                        this.selectionChangeSubscription = this.service.selectionChange.subscribe(function (_a) {
                            var hashtag = _a.hashtag, emitter = _a.emitter;
                            //if (emitter === this)
                            //  return;
                            var tag = _this.hashtags.find(function (item) { return item.value === hashtag.value; });
                            if (tag) {
                                tag.selected = hashtag.selected;
                            }
                            else if (hashtag.selected) {
                                // if it's not in the collection AND it's a selection, then add it
                                _this.hashtags = [hashtag].concat(_this.hashtags.slice(0, 5));
                            }
                            _this.cd.markForCheck();
                            _this.cd.detectChanges();
                        });
                        this.detectWidth();
                        return [2 /*return*/];
                }
            });
        });
    };
    TopbarHashtagsComponent.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.service.load(5)];
                    case 1:
                        _a.hashtags = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TopbarHashtagsComponent.prototype.ngOnDestroy = function () {
        if (this.selectionChangeSubscription)
            this.selectionChangeSubscription.unsubscribe();
    };
    TopbarHashtagsComponent.prototype.toggleAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.dropdown) {
                            this.dropdown.toggle();
                        }
                        this.all = !this.all;
                        return [4 /*yield*/, this.selectionChange.emit(this.all)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TopbarHashtagsComponent.prototype.disableAll = function () {
        this.all = false;
        this.selectionChange.emit(this.all);
    };
    TopbarHashtagsComponent.prototype.toggleHashtag = function (hashtag) {
        return __awaiter(this, void 0, void 0, function () {
            var selected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.dropdown) {
                            this.dropdown.toggle();
                        }
                        if (!this.enabled) {
                            this.selectionChange.emit(this.all);
                            return [2 /*return*/];
                        }
                        if (this.all) {
                            this.disableAll();
                            selected = this.hashtags.find(function (item) { return item.value === hashtag.value; });
                            if (selected.selected) {
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, this.service.toggleSelection(hashtag, this)];
                    case 1:
                        _a.sent();
                        this.selectionChange.emit(this.all);
                        return [2 /*return*/];
                }
            });
        });
    };
    TopbarHashtagsComponent.prototype.openModal = function () {
        var _this = this;
        if (this.dropdown) {
            this.dropdown.toggle();
        }
        if (this.all)
            this.disableAll();
        this.overlayModal.create(hashtags_selector_component_1.HashtagsSelectorModalComponent, {}, {
            class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium-large'
        })
            .onDidDismiss(function () {
            _this.selectionChange.emit(_this.all);
            setTimeout(function () { return _this.load(); });
        })
            .present();
    };
    TopbarHashtagsComponent.prototype.detectWidth = function () {
        this.showMenu = window.innerWidth < 1200;
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TopbarHashtagsComponent.prototype, "selectionChange", void 0);
    __decorate([
        core_1.Input('enabled'),
        __metadata("design:type", Boolean)
    ], TopbarHashtagsComponent.prototype, "enabled", void 0);
    __decorate([
        core_1.ViewChild('dropdown'),
        __metadata("design:type", dropdown_component_1.DropdownComponent)
    ], TopbarHashtagsComponent.prototype, "dropdown", void 0);
    __decorate([
        core_1.HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TopbarHashtagsComponent.prototype, "detectWidth", null);
    TopbarHashtagsComponent = __decorate([
        core_1.Component({
            selector: 'm-topbar--hashtags',
            templateUrl: 'topbar.component.html'
        }),
        __metadata("design:paramtypes", [overlay_modal_1.OverlayModalService,
            topbar_service_1.TopbarHashtagsService,
            core_1.ChangeDetectorRef])
    ], TopbarHashtagsComponent);
    return TopbarHashtagsComponent;
}());
exports.TopbarHashtagsComponent = TopbarHashtagsComponent;
//# sourceMappingURL=topbar.component.js.map
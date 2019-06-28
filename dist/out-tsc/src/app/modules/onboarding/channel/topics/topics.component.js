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
var topbar_service_1 = require("../../../hashtags/service/topbar.service");
var TopicsOnboardingComponent = /** @class */ (function () {
    function TopicsOnboardingComponent(service) {
        this.service = service;
        this.input = '';
        this.addingHashtag = false;
        this.hashtags = [];
    }
    TopicsOnboardingComponent.prototype.ngOnInit = function () {
        this.load();
    };
    TopicsOnboardingComponent.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.inProgress = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.service.load(50)];
                    case 2:
                        _a.hashtags = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.inProgress = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    TopicsOnboardingComponent.prototype.toggleSelection = function (hashtag) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.service.toggleSelection(hashtag, this)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this.error = (e_2 && e_2.message) || 'Sorry, something went wrong';
                        hashtag.selected = !hashtag.selected;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TopicsOnboardingComponent.prototype.addNew = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hashtag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.addingHashtag = true;
                        hashtag = {
                            value: this.service.cleanupHashtag(this.input.toLowerCase()),
                            selected: false,
                        };
                        this.hashtags.push(hashtag);
                        return [4 /*yield*/, this.toggleSelection(hashtag)];
                    case 1:
                        _a.sent();
                        this.input = ''; // clear input
                        this.addingHashtag = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    TopicsOnboardingComponent.prototype.keyUp = function (e) {
        switch (e.keyCode) {
            case 32: //space
            case 9: //tab
            case 13: //enter
            case 188: //comma
                this.addNew();
                break;
        }
    };
    TopicsOnboardingComponent.items = ['suggested_hashtags'];
    TopicsOnboardingComponent.canSkip = true;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TopicsOnboardingComponent.prototype, "pendingItems", void 0);
    TopicsOnboardingComponent = __decorate([
        core_1.Component({
            selector: 'm-onboarding--topics',
            template: "\n    <div class=\"m-channelOnboarding__slide\">\n      <h2>What topics are you most interested in?</h2>\n\n      <ul class=\"m-channelOnboardingSlideSection__list\">\n        <div class=\"mdl-spinner mdl-js-spinner is-active\" [mdl] [hidden]=\"!inProgress\"></div>\n\n        <li class=\"m-channelOnboardingSlideSection__item\"\n            [ngClass]=\"{ 'm-channelOnboardingSlideSection__item--selected': hashtag.selected }\"\n            *ngFor=\"let hashtag of hashtags\"\n          >\n          <span [ngClass]=\"{ 'selected': hashtag.selected }\"\n                (click)=\"toggleSelection(hashtag)\">#{{hashtag.value}}</span>\n        </li>\n        <li class=\"m-hashtag--creator\" *ngIf=\"!inProgress\">\n          <input\n            type=\"text\"\n            name=\"hashtag\"\n            [(ngModel)]=\"input\"\n            (keyup)=\"keyUp($event)\"\n            #hashtagInput/>\n          <i class=\"material-icons m-hashtag--creator--done\"\n             (click)=\"addNew()\"\n          >\n            done\n          </i>\n          <i class=\"material-icons m-hashtag--creator--close\"\n             (click)=\"input = ''; addingHashtag = false; hashtagInput.focus()\"\n          >\n            close\n          </i>\n        </li>\n      </ul>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [topbar_service_1.TopbarHashtagsService])
    ], TopicsOnboardingComponent);
    return TopicsOnboardingComponent;
}());
exports.TopicsOnboardingComponent = TopicsOnboardingComponent;
//# sourceMappingURL=topics.component.js.map
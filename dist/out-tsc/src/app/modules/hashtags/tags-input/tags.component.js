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
var session_1 = require("../../../services/session");
var client_1 = require("../../../services/api/client");
var topbar_service_1 = require("../service/topbar.service");
var TagsInput = /** @class */ (function () {
    function TagsInput(client, session, element, service) {
        this.client = client;
        this.session = session;
        this.element = element;
        this.service = service;
        this.error = '';
        this.inProgress = false;
        this.input = '';
        this.placeholder = '+';
        this.tags = [];
        this.suggestedTags = [];
        this.change = new core_1.EventEmitter();
    }
    TagsInput.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTopHashtags()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(TagsInput.prototype, "_tags", {
        set: function (tags) {
            this.tags = this.suggestedTags.slice(0); // Reset
            if (Array.isArray(tags)) {
                this.merge(tags);
            }
        },
        enumerable: true,
        configurable: true
    });
    TagsInput.prototype.merge = function (tags) {
        var _loop_1 = function (tag) {
            var i = this_1.tags.findIndex(function (item) { return item.value === tag.value; });
            if (i > -1) {
                tag.selected = true;
                this_1.tags[i] = tag;
            }
            else {
                this_1.tags.push(tag);
            }
        };
        var this_1 = this;
        for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
            var tag = tags_1[_i];
            _loop_1(tag);
        }
    };
    TagsInput.prototype.keyUp = function (e) {
        switch (e.keyCode) {
            case 32: //space
            case 9: //tab
            case 13: //enter
            case 188: //comma
                this.push();
                break;
            case 8: //backspace
                //remove the last tag if we don't have an input
                if (!this.input) {
                    this.pop();
                }
                break;
        }
        if (e.keyCode === 13) {
            e.preventDefault();
        }
        this.emitChanges();
    };
    TagsInput.prototype.emitChanges = function () {
        this.change.next(this.tags.filter(function (item) { return item.selected; }));
    };
    TagsInput.prototype.blur = function (e) {
        this.push();
    };
    /**
     * Only called by clicking on topTags
     */
    TagsInput.prototype.toggleTag = function (tag) {
        var i = this.tags.findIndex(function (item) { return item.value === tag.value; });
        if (i > -1) {
            this.tags[i].selected = !tag.selected;
        }
        else {
            tag.selected = true;
            this.tags.push(tag);
        }
        this.emitChanges();
    };
    TagsInput.prototype.removeTag = function (index) {
        //    this.tags.splice(index, 1);
        //  this.emitChanges();
    };
    TagsInput.prototype.focus = function () {
        var input = this.element.nativeElement.querySelector('input[name=input-tags]');
        if (input)
            input.focus();
    };
    TagsInput.prototype.push = function () {
        var input = this.input;
        // sanitize tag
        input = this.service.cleanupHashtag(input);
        if (!input) {
            return;
        }
        this.tags.push({ value: input, selected: true });
        this.input = '';
    };
    TagsInput.prototype.pop = function () {
        this.tags.pop();
    };
    TagsInput.prototype.getTopHashtags = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tags, response, _i, _a, tag, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        tags = [];
                        return [4 /*yield*/, this.client.get('api/v2/hashtags/suggested/user')];
                    case 1:
                        response = _b.sent();
                        for (_i = 0, _a = response.tags; _i < _a.length; _i++) {
                            tag = _a[_i];
                            tags.push({ value: tag.value, selected: false });
                        }
                        this.suggestedTags = tags;
                        this.merge(tags);
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
    __decorate([
        core_1.Input('tags'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TagsInput.prototype, "_tags", null);
    TagsInput = __decorate([
        core_1.Component({
            selector: 'm-form-tags-input',
            host: {
                '(click)': 'focus()'
            },
            outputs: ['change: tagsChange'],
            template: "\n    <div class=\"m-form-tags-input-tags-tag\"\n      *ngFor=\"let tag of tags; let i = index\"\n      (click)=\"toggleTag(tag)\">\n      <span>#{{tag.value}}</span>\n      <div class=\"m-layout--spacer\"></div>\n      <i class=\"material-icons selected m-form-tags-input-tags--check\" [class.selected]=\"tag.selected\">check</i>\n    </div>\n\n    <div class=\"m-form-tags-input-tags-tag\">\n      <span>#</span>\n      <input\n        type=\"text\"\n        name=\"input-tags\"\n        [(ngModel)]=\"input\"\n        (keydown)=\"keyUp($event)\"\n        (blur)=\"blur($event)\"\n        placeholder=\"Enter a hashtag...\"\n      >\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [client_1.Client,
            session_1.Session,
            core_1.ElementRef,
            topbar_service_1.TopbarHashtagsService])
    ], TagsInput);
    return TagsInput;
}());
exports.TagsInput = TagsInput;
//# sourceMappingURL=tags.component.js.map
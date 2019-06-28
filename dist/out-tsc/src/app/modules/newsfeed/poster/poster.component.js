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
var attachment_1 = require("../../../services/attachment");
var upload_1 = require("../../../services/api/upload");
var client_1 = require("../../../services/api/client");
var selector_component_1 = require("../../hashtags/selector/selector.component");
var PosterComponent = /** @class */ (function () {
    function PosterComponent(session, client, upload, attachment) {
        this.session = session;
        this.client = client;
        this.upload = upload;
        this.attachment = attachment;
        this.content = '';
        this.meta = {
            message: '',
            wire_threshold: null
        };
        this.tags = [];
        this.load = new core_1.EventEmitter();
        this.inProgress = false;
        this.canPost = true;
        this.validThreshold = true;
        this.tooManyTags = false;
        this.errorMessage = null;
        this.opspot = window.Opspot;
    }
    Object.defineProperty(PosterComponent.prototype, "_container_guid", {
        set: function (guid) {
            this.attachment.setContainer(guid);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PosterComponent.prototype, "accessId", {
        set: function (access_id) {
            this.attachment.setAccessId(access_id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PosterComponent.prototype, "message", {
        set: function (value) {
            if (value) {
                value = decodeURIComponent((value).replace(/\+/g, '%20'));
                this.meta.message = value;
                this.showTagsError();
                this.getPostPreview({ value: value }); //a little ugly here!
            }
        },
        enumerable: true,
        configurable: true
    });
    PosterComponent.prototype.onMessageChange = function ($event) {
        this.errorMessage = "";
        this.meta.message = $event;
        var regex = /(^|\s||)#(\w+)/gim;
        this.tags = [];
        var match;
        while ((match = regex.exec(this.meta.message)) !== null) {
            this.tags.push(match[2]);
        }
    };
    PosterComponent.prototype.onTagsChange = function (tags) {
        if (this.hashtagsSelector.tags.length > 5) {
            this.errorMessage = "You can only select up to 5 hashtags";
            this.tooManyTags = true;
        }
        else {
            this.tooManyTags = false;
            if (this.errorMessage === "You can only select up to 5 hashtags") {
                this.errorMessage = '';
            }
        }
    };
    PosterComponent.prototype.showTagsError = function () {
        if (this.tags.length > 5) {
            this.errorMessage = 'You can only select up to 5 hashtags';
            this.tooManyTags = true;
        }
        else {
            this.tooManyTags = false;
        }
    };
    PosterComponent.prototype.onTagsAdded = function (tags) {
        for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
            var tag = tags_1[_i];
            this.meta.message += " #" + tag.value;
        }
    };
    PosterComponent.prototype.onTagsRemoved = function (tags) {
        for (var _i = 0, tags_2 = tags; _i < tags_2.length; _i++) {
            var tag = tags_2[_i];
            this.meta.message = this.meta.message.replace('#' + tag.value, tag.value);
        }
    };
    /**
     * Post to the newsfeed
     */
    PosterComponent.prototype.post = function () {
        var _this = this;
        if (!this.meta.message && !this.attachment.has()) {
            return;
        }
        if (this.hashtagsSelector.tags.length > 5) {
            this.showTagsError();
            return;
        }
        this.errorMessage = "";
        var data = Object.assign(this.meta, this.attachment.exportMeta());
        data.tags = this.tags;
        this.inProgress = true;
        this.client.post('api/v1/newsfeed', data)
            .then(function (data) {
            data.activity.boostToggle = true;
            _this.load.next(data.activity);
            _this.attachment.reset();
            _this.meta = { wire_threshold: null };
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
            alert(e.message);
        });
    };
    PosterComponent.prototype.uploadAttachment = function (file, event) {
        var _this = this;
        if (file.value) { // this prevents IE from executing this code twice
            this.canPost = false;
            this.inProgress = true;
            this.errorMessage = null;
            this.attachment.upload(file)
                .then(function (guid) {
                _this.inProgress = false;
                _this.canPost = true;
                if (_this.attachment.isPendingDelete()) {
                    _this.removeAttachment(file);
                }
                file.value = null;
            })
                .catch(function (e) {
                if (e && e.message) {
                    _this.errorMessage = e.message;
                }
                _this.inProgress = false;
                _this.canPost = true;
                file.value = null;
                _this.attachment.reset();
            });
        }
    };
    PosterComponent.prototype.removeRichEmbed = function () {
        this.attachment.reset();
    };
    PosterComponent.prototype.removeAttachment = function (file) {
        var _this = this;
        if (this.inProgress) {
            this.attachment.abort();
            this.canPost = true;
            this.inProgress = false;
            this.errorMessage = '';
            return;
        }
        // if we're not uploading a file right now
        this.attachment.setPendingDelete(false);
        this.canPost = false;
        this.inProgress = true;
        this.errorMessage = '';
        this.attachment.remove(file).then(function () {
            _this.inProgress = false;
            _this.canPost = true;
            file.value = '';
        }).catch(function (e) {
            console.error(e);
            _this.inProgress = false;
            _this.canPost = true;
        });
    };
    PosterComponent.prototype.getPostPreview = function (message) {
        if (!message.value) {
            return;
        }
        this.attachment.preview(message.value);
    };
    PosterComponent.prototype.findTrendingHashtags = function (searchText) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.get('api/v2/search/suggest/tags', { q: searchText })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.tags
                                .filter(function (item) { return item.toLowerCase().includes(searchText.toLowerCase()); })
                                .slice(0, 5)];
                }
            });
        });
    };
    PosterComponent.prototype.getChoiceLabel = function (text) {
        return "#" + text;
    };
    __decorate([
        core_1.ViewChild('hashtagsSelector'),
        __metadata("design:type", selector_component_1.HashtagsSelectorComponent)
    ], PosterComponent.prototype, "hashtagsSelector", void 0);
    PosterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-newsfeed-poster',
            inputs: ['_container_guid: containerGuid', 'accessId', 'message'],
            outputs: ['load'],
            providers: [
                {
                    provide: attachment_1.AttachmentService,
                    useFactory: attachment_1.AttachmentService._,
                    deps: [session_1.Session, client_1.Client, upload_1.Upload]
                }
            ],
            templateUrl: 'poster.component.html',
        }),
        __metadata("design:paramtypes", [session_1.Session, client_1.Client, upload_1.Upload, attachment_1.AttachmentService])
    ], PosterComponent);
    return PosterComponent;
}());
exports.PosterComponent = PosterComponent;
//# sourceMappingURL=poster.component.js.map
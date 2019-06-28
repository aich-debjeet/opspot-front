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
var session_1 = require("../../../services/session");
var upload_1 = require("../../../services/api/upload");
var attachment_1 = require("../../../services/attachment");
var textarea_component_1 = require("../../../common/components/editors/textarea.component");
var sockets_1 = require("../../../services/sockets");
var CommentsListComponent = /** @class */ (function () {
    function CommentsListComponent(session, client, attachment, sockets, renderer, cd) {
        this.session = session;
        this.client = client;
        this.attachment = attachment;
        this.sockets = sockets;
        this.renderer = renderer;
        this.cd = cd;
        this.guid = '';
        this.parentGuid = 0;
        this.focusedCommentGuid = '';
        this.comments = [];
        this.content = '';
        this.reversed = false;
        this.focusOnInit = false;
        this.scrollable = false;
        this.editing = false;
        this.showModal = false;
        this.limit = 12;
        this.earlierToken = '';
        this.laterToken = '';
        this.descendingInProgress = false;
        this.ascendingInProgress = false;
        this.canPost = true;
        this.triedToPost = false;
        this.moreDescendingData = false;
        this.moreAscendingData = false;
        this.loaded = false;
        this.socketSubscriptions = {
            comment: null
        };
        this.conversation = false;
        this.readonly = false;
        this.canEdit = false;
        this.commentsScrollEmitter = new core_1.EventEmitter();
        this.autoloadBlocked = false;
        this.overscrollAmount = 0;
        this.opspot = window.Opspot;
    }
    Object.defineProperty(CommentsListComponent.prototype, "_object", {
        set: function (value) {
            this.object = value;
            this.guid = this.object.guid;
            if (this.object.entity_guid)
                this.guid = this.object.entity_guid;
            this.parent = this.object;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentsListComponent.prototype, "_reversed", {
        set: function (value) {
            if (value)
                this.reversed = true;
            else
                this.reversed = false;
        },
        enumerable: true,
        configurable: true
    });
    CommentsListComponent.prototype.ngOnInit = function () {
        this.load(true, !this.focusedCommentGuid);
        this.listen();
    };
    CommentsListComponent.prototype.load = function (refresh, descending) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (descending === void 0) { descending = true; }
        if (refresh) {
            this.earlierToken = '';
            this.laterToken = '';
            this.moreDescendingData = descending || this.focusedCommentGuid !== '';
            this.moreAscendingData = !descending || this.focusedCommentGuid !== '';
            this.moreAscendingData = this.focusedCommentGuid !== '';
            this.comments = [];
            if (this.socketRoomName) {
                this.sockets.leave(this.socketRoomName);
            }
            this.socketRoomName = void 0;
        }
        if ((this.ascendingInProgress && !descending) || (this.descendingInProgress && descending)) {
            return;
        }
        this.error = '';
        if (descending) {
            this.descendingInProgress = true;
        }
        else {
            this.ascendingInProgress = true;
        }
        this.detectChanges();
        var parent_path = this.parent.child_path || "0:0:0";
        this.client.get("api/v1/comments/" + this.guid + "/0/" + parent_path, {
            limit: refresh ? 5 : this.limit,
            token: descending ? this.earlierToken : this.laterToken,
            offset: this.focusedCommentGuid || '',
            include_offset: !this.focusedCommentGuid == descending,
            descending: descending,
        })
            .then(function (response) {
            if (!_this.socketRoomName && response.socketRoomName) {
                _this.socketRoomName = response.socketRoomName;
                _this.joinSocketRoom();
            }
            _this.loaded = true;
            if (descending) {
                _this.descendingInProgress = false;
            }
            else {
                _this.ascendingInProgress = false;
            }
            //this.moreDescendingData = true;
            if (!response.comments) {
                if (descending) {
                    _this.moreDescendingData = false;
                }
                else {
                    _this.moreAscendingData = false;
                }
                _this.detectChanges();
                return false;
            }
            var el = _this.scrollView.nativeElement;
            var previousScrollHeightMinusTop = el.scrollHeight - el.scrollTop;
            if (descending) {
                _this.comments = response.comments.concat(_this.comments);
            }
            else {
                _this.comments = _this.comments.concat(response.comments);
            }
            _this.detectChanges();
            if (refresh) {
                _this.commentsScrollEmitter.emit('bottom');
            }
            if (_this.earlierToken && _this.scrollView) {
                el.scrollTop = el.scrollHeight - previousScrollHeightMinusTop;
                _this.detectChanges();
            }
            if (descending) {
                _this.earlierToken = response['load-previous'];
                if (!_this.earlierToken) {
                    _this.moreDescendingData = false;
                }
            }
            else {
                _this.laterToken = response['load-previous'];
                if (!_this.laterToken) {
                    _this.moreAscendingData = false;
                }
            }
            _this.detectChanges();
        })
            .catch(function (e) {
            if (descending) {
                _this.descendingInProgress = false;
            }
            else {
                _this.ascendingInProgress = false;
            }
            _this.error = (e && e.message) || 'There was an error';
            _this.detectChanges();
        });
    };
    CommentsListComponent.prototype.autoloadPrevious = function () {
        var _this = this;
        if (!this.moreDescendingData || this.autoloadBlocked) {
            return;
        }
        this.cancelOverscroll();
        this.autoloadBlocked = true;
        setTimeout(function () {
            _this.autoloadBlocked = false;
        }, 1000);
        this.load(false, true);
    };
    CommentsListComponent.prototype.overscrollHandler = function (_a) {
        var _this = this;
        var deltaY = _a.deltaY;
        this.cancelOverscroll();
        if (this.autoloadBlocked) {
            this.overscrollAmount = 0;
            return;
        }
        this.overscrollAmount += deltaY;
        this.overscrollTimer = setTimeout(function () {
            if (_this.overscrollAmount < -75) { //75px
                _this.autoloadPrevious();
            }
            _this.overscrollAmount = 0;
        }, 250); // in 250ms
    };
    CommentsListComponent.prototype.cancelOverscroll = function () {
        if (this.overscrollTimer) {
            clearTimeout(this.overscrollTimer);
        }
    };
    CommentsListComponent.prototype.joinSocketRoom = function () {
        if (this.socketRoomName) {
            this.sockets.join(this.socketRoomName);
        }
    };
    CommentsListComponent.prototype.ngAfterViewInit = function () {
        if (this.focusOnInit && this.textareaControl) {
            this.textareaControl.focus();
        }
    };
    CommentsListComponent.prototype.ngOnDestroy = function () {
        this.cancelOverscroll();
        if (this.socketRoomName && !this.conversation) {
            this.sockets.leave(this.socketRoomName);
        }
        for (var sub in this.socketSubscriptions) {
            if (this.socketSubscriptions[sub]) {
                this.socketSubscriptions[sub].unsubscribe();
            }
        }
    };
    CommentsListComponent.prototype.listen = function () {
        var _this = this;
        this.socketSubscriptions.comment = this.sockets.subscribe('comment', function (entity_guid, owner_guid, guid) {
            if (entity_guid !== _this.guid) {
                return;
            }
            if (_this.session.isLoggedIn() && owner_guid === _this.session.getLoggedInUser().guid) {
                return;
            }
            var parent_path = _this.parent.child_path || "0:0:0";
            _this.client.get("api/v1/comments/" + _this.guid + "/" + guid + "/" + parent_path, {
                limit: 1,
                reversed: false,
                descending: true,
            })
                .then(function (response) {
                if (!response.comments || response.comments.length === 0) {
                    return;
                }
                // if the list is scrolled to the bottom
                var scrolledToBottom = _this.scrollView.nativeElement.scrollTop + _this.scrollView.nativeElement.clientHeight >= _this.scrollView.nativeElement.scrollHeight;
                if (response.comments[0]._guid == guid)
                    _this.comments.push(response.comments[0]);
                _this.detectChanges();
                if (scrolledToBottom) {
                    _this.commentsScrollEmitter.emit('bottom');
                }
            });
        });
        this.sockets.subscribe('reply', function (guid) {
            for (var i = 0; i < _this.comments.length; i++) {
                if (_this.comments[i]._guid == guid) {
                    _this.comments[i].replies_count++;
                    _this.detectChanges();
                }
            }
        });
        this.sockets.subscribe('vote', function (guid, owner_guid, direction) {
            if (_this.session.isLoggedIn() && owner_guid === _this.session.getLoggedInUser().guid) {
                return;
            }
            var key = 'thumbs:' + direction + ':count';
            for (var i = 0; i < _this.comments.length; i++) {
                if (_this.comments[i]._guid == guid) {
                    _this.comments[i][key]++;
                    _this.detectChanges();
                }
            }
            //this.comments = this.comments.slice(0);
            _this.detectChanges();
        });
        this.sockets.subscribe('vote:cancel', function (guid, owner_guid, direction) {
            if (_this.session.isLoggedIn() && owner_guid === _this.session.getLoggedInUser().guid) {
                return;
            }
            var key = 'thumbs:' + direction + ':count';
            for (var i = 0; i < _this.comments.length; i++) {
                if (_this.comments[i]._guid == guid) {
                    _this.comments[i][key]--;
                    _this.detectChanges();
                }
            }
        });
    };
    CommentsListComponent.prototype.postEnabled = function () {
        return !this.descendingInProgress && !this.ascendingInProgress && this.canPost && ((this.content && this.content.trim() !== '') || this.attachment.has());
    };
    CommentsListComponent.prototype.keypress = function (e) {
        if (!e.shiftKey && e.charCode === 13) {
            this.post(e);
        }
    };
    CommentsListComponent.prototype.post = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var data, newLength, currentIndex, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (!this.content && !this.attachment.has()) {
                            return [2 /*return*/];
                        }
                        if (this.descendingInProgress || this.ascendingInProgress || !this.postEnabled()) {
                            this.triedToPost = true;
                            this.detectChanges();
                            return [2 /*return*/];
                        }
                        this.content = this.content.trim();
                        data = this.attachment.exportMeta();
                        data['comment'] = this.content;
                        data['parent_path'] = this.parent.child_path || '0:0:0';
                        newLength = this.comments.push({
                            description: this.content,
                            guid: 0,
                            ownerObj: this.session.getLoggedInUser(),
                            owner_guid: this.session.getLoggedInUser().guid,
                            time_created: Date.now() / 1000,
                            type: 'comment',
                        }), currentIndex = newLength - 1;
                        this.attachment.reset();
                        this.content = '';
                        this.detectChanges();
                        this.commentsScrollEmitter.emit('bottom');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.post('api/v1/comments/' + this.guid, data)];
                    case 2:
                        response = _a.sent();
                        this.comments[currentIndex] = response.comment;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.comments[currentIndex].error = (e_1 && e_1.message) || 'There was an error';
                        console.error('Error posting', e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.detectChanges();
                        this.commentsScrollEmitter.emit('bottom');
                        return [2 /*return*/];
                }
            });
        });
    };
    CommentsListComponent.prototype.isLoggedIn = function () {
        if (!this.session.isLoggedIn()) {
            this.showModal = true;
            this.detectChanges();
        }
    };
    CommentsListComponent.prototype.delete = function (index) {
        this.comments.splice(index, 1);
        this.object.replies_count -= 1;
        this.detectChanges();
    };
    CommentsListComponent.prototype.edited = function (index, $event) {
        this.comments[index] = $event.comment;
    };
    CommentsListComponent.prototype.resetPreview = function () {
        this.canPost = true;
        this.triedToPost = false;
        this.attachment.resetRich();
    };
    CommentsListComponent.prototype.uploadAttachment = function (file, e) {
        var _this = this;
        this.canPost = false;
        this.triedToPost = false;
        this.attachment.setHidden(true);
        this.attachment.setContainer(this.object);
        this.attachment.upload(file)
            .then(function (guid) {
            _this.canPost = true;
            _this.triedToPost = false;
            file.value = null;
        })
            .catch(function (e) {
            console.error(e);
            _this.canPost = true;
            _this.triedToPost = false;
            file.value = null;
        });
        this.detectChanges();
    };
    CommentsListComponent.prototype.removeAttachment = function (file) {
        var _this = this;
        this.canPost = false;
        this.triedToPost = false;
        this.attachment.remove(file).then(function () {
            _this.canPost = true;
            _this.triedToPost = false;
            file.value = '';
        }).catch(function (e) {
            console.error(e);
            _this.canPost = true;
            _this.triedToPost = false;
        });
        this.detectChanges();
    };
    CommentsListComponent.prototype.getPostPreview = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!message) {
                    return [2 /*return*/];
                }
                this.attachment.preview(message, this.detectChanges.bind(this));
                return [2 /*return*/];
            });
        });
    };
    CommentsListComponent.prototype.reply = function (comment) {
        var _this = this;
        if (!comment || !comment.ownerObj) {
            return;
        }
        var username = comment.ownerObj.username;
        this.content = "@" + username + " " + this.content;
        this.detectChanges();
        setTimeout(function () {
            _this.textareaControl.focus();
        }, 50);
    };
    CommentsListComponent.prototype.getAvatar = function () {
        if (this.session.isLoggedIn()) {
            return this.opspot.cdn_url + "icon/" + this.session.getLoggedInUser().guid + "/small/" + this.session.getLoggedInUser().icontime;
        }
        else {
            return this.opspot.cdn_assets_url + "assets/avatars/default-small.png";
        }
    };
    CommentsListComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    CommentsListComponent.prototype.ngOnChanges = function (changes) {
        //  console.log('[comment:list]: on changes', changes);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommentsListComponent.prototype, "parentGuid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommentsListComponent.prototype, "focusedCommentGuid", void 0);
    __decorate([
        core_1.ViewChild('message'),
        __metadata("design:type", textarea_component_1.Textarea)
    ], CommentsListComponent.prototype, "textareaControl", void 0);
    __decorate([
        core_1.ViewChild('scrollArea'),
        __metadata("design:type", core_1.ElementRef)
    ], CommentsListComponent.prototype, "scrollView", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CommentsListComponent.prototype, "conversation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CommentsListComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CommentsListComponent.prototype, "canEdit", void 0);
    CommentsListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-comments',
            inputs: ['_object : object', '_reversed : reversed', 'limit', 'focusOnInit', 'scrollable'],
            templateUrl: 'list.component.html',
            providers: [
                {
                    provide: attachment_1.AttachmentService,
                    useFactory: attachment_1.AttachmentService._,
                    deps: [session_1.Session, client_1.Client, upload_1.Upload]
                }
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [session_1.Session,
            client_1.Client,
            attachment_1.AttachmentService,
            sockets_1.SocketsService,
            core_1.Renderer,
            core_1.ChangeDetectorRef])
    ], CommentsListComponent);
    return CommentsListComponent;
}());
exports.CommentsListComponent = CommentsListComponent;
//# sourceMappingURL=list.component.js.map
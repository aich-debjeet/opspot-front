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
var recent_1 = require("../../../services/ux/recent");
var title_1 = require("../../../services/ux/title");
var session_1 = require("../../../services/session");
var sockets_1 = require("../../../services/sockets");
var feed_1 = require("./feed/feed");
var context_service_1 = require("../../../services/context.service");
var api_1 = require("../../../services/api");
var selector_component_1 = require("../../hashtags/selector/selector.component");
var videochat_service_1 = require("../../videochat/videochat.service");
var update_markers_service_1 = require("../../../common/services/update-markers.service");
var operators_1 = require("rxjs/operators");
var GroupsProfile = /** @class */ (function () {
    function GroupsProfile(session, service, route, router, title, sockets, context, recent, client, videochat, cd, updateMarkers) {
        this.session = session;
        this.service = service;
        this.route = route;
        this.router = router;
        this.title = title;
        this.sockets = sockets;
        this.context = context;
        this.recent = recent;
        this.client = client;
        this.videochat = videochat;
        this.cd = cd;
        this.updateMarkers = updateMarkers;
        this.filter = 'activity';
        this.postMeta = {
            message: '',
            container_guid: 0
        };
        this.editing = false;
        this.editDone = false;
        this.opspot = window.Opspot;
        this.showRight = true;
        this.activity = [];
        this.offset = '';
        this.inProgress = false;
        this.moreData = true;
        this.newConversationMessages = false;
    }
    GroupsProfile.prototype.ngOnInit = function () {
        var _this = this;
        this.context.set('activity');
        this.listenForNewMessages();
        this.detectWidth();
        this.detectConversationsState();
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['guid']) {
                var changed = params['guid'] !== _this.guid;
                _this.guid = params['guid'];
                _this.postMeta.container_guid = _this.guid;
                if (changed) {
                    _this.group = void 0;
                    _this.load()
                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.filterToDefaultView();
                                    if (!(this.route.snapshot.queryParamMap.has('join') && confirm('Are you sure you want to join this group'))) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.service.join(this.group)];
                                case 1:
                                    _a.sent();
                                    this.group['is:awaiting'] = true;
                                    this.detectChanges();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                }
            }
            if (params['filter']) {
                _this.filter = params['filter'];
                if (_this.filter == 'conversation') {
                    _this.newConversationMessages = false;
                }
            }
            _this.filterToDefaultView();
        });
        this.router.events.pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; })).subscribe(function (event) {
            var url = _this.router.routerState.snapshot.url;
            _this.setFilter(url);
        });
        this.setFilter(this.router.routerState.snapshot.url);
        this.reviewCountInterval = setInterval(function () {
            _this.reviewCountLoad();
        }, 120 * 1000);
        this.videoChatActiveSubscription = this.videochat.activate$.subscribe(function (next) { return window.scrollTo(0, 0); });
    };
    GroupsProfile.prototype.setFilter = function (url) {
        if (url.includes('/feed')) {
            if (url.includes('/image')) {
                this.filter = 'image';
            }
            else if (url.includes('/video')) {
                this.filter = 'video';
            }
            else {
                this.filter = 'activity';
            }
        }
    };
    GroupsProfile.prototype.ngOnDestroy = function () {
        if (this.paramsSubscription)
            this.paramsSubscription.unsubscribe();
        if (this.childParamsSubscription)
            this.childParamsSubscription.unsubscribe();
        if (this.queryParamsSubscripton)
            this.queryParamsSubscripton.unsubscribe();
        if (this.videoChatActiveSubscription)
            this.videoChatActiveSubscription.unsubscribe();
        if (this.updateMarkersSubscription)
            this.updateMarkersSubscription.unsubscribe();
        this.unlistenForNewMessages();
        this.leaveCommentsSocketRoom();
        if (this.reviewCountInterval) {
            clearInterval(this.reviewCountInterval);
        }
    };
    GroupsProfile.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.resetMarkers();
                        this.error = "";
                        this.group = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.service.load(this.guid)];
                    case 2:
                        _a.group = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        this.error = e_1.message;
                        return [2 /*return*/];
                    case 4:
                        if (this.updateMarkersSubscription)
                            this.updateMarkersSubscription.unsubscribe();
                        this.updateMarkersSubscription = this.updateMarkers.getByEntityGuid(this.guid).subscribe(function (marker) {
                            if (!marker)
                                return;
                            var hasMarker = (marker.read_timestamp < marker.updated_timestamp)
                                && (marker.entity_guid == _this.group.guid)
                                && (marker.marker != 'gathering-heartbeat');
                            if (hasMarker)
                                _this.resetMarkers();
                        });
                        // Check for comment updates
                        this.joinCommentsSocketRoom();
                        this.title.setTitle(this.group.name);
                        this.context.set('activity', { label: this.group.name, nameLabel: this.group.name, id: this.group.guid });
                        if (this.session.getLoggedInUser()) {
                            this.addRecent();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupsProfile.prototype.reviewCountLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.guid || !this.session.isLoggedIn()) {
                            return [2 /*return*/];
                        }
                        count = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.service.getReviewCount(this.guid)];
                    case 2:
                        count = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        this.group['adminqueue:count'] = count;
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupsProfile.prototype.addRecent = function () {
        var _this = this;
        if (!this.group) {
            return;
        }
        this.recent
            .store('recent', this.group, function (entry) { return entry.guid == _this.group.guid; })
            .splice('recent', 50);
    };
    GroupsProfile.prototype.filterToDefaultView = function () {
        if (!this.group || this.route.snapshot.params.filter && this.route.snapshot.params.filter !== 'gathering') {
            return;
        }
        if (this.filter === 'gathering') {
            this.videochat.activate(this.group);
        }
        switch (this.group.default_view) {
            case 1:
                this.filter = 'conversation';
                break;
        }
    };
    GroupsProfile.prototype.save = function () {
        this.group.videoChatDisabled = parseInt(this.group.videoChatDisabled);
        this.service.save(this.group);
        this.editing = false;
        this.editDone = true;
        this.detectChanges();
    };
    GroupsProfile.prototype.toggleEdit = function () {
        this.editing = !this.editing;
        if (this.editing) {
            this.editDone = false;
        }
    };
    GroupsProfile.prototype.add_banner = function (file) {
        this.service.upload({
            guid: this.group.guid,
            banner_position: file.top
        }, { banner: file.file });
        this.group.banner = true;
    };
    GroupsProfile.prototype.upload_avatar = function (file) {
        this.service.upload({
            guid: this.group.guid
        }, { avatar: file });
    };
    GroupsProfile.prototype.change_membership = function (membership) {
        if (!membership.error || membership.error === 'already_a_member') {
            this.load();
        }
        else {
            this.error = membership.error;
        }
    };
    GroupsProfile.prototype.canDeactivate = function () {
        if (!this.feed)
            return true;
        return this.feed.canDeactivate();
    };
    GroupsProfile.prototype.joinCommentsSocketRoom = function (keepAlive) {
        if (keepAlive === void 0) { keepAlive = false; }
        if (!keepAlive && this.socketRoomName) {
            this.leaveCommentsSocketRoom();
        }
        if (!this.group || !this.group.guid || !this.group['is:member']) {
            return;
        }
        // TODO: Only join if a member
        this.socketRoomName = "comments:" + this.group.guid;
        this.sockets.join(this.socketRoomName);
    };
    GroupsProfile.prototype.leaveCommentsSocketRoom = function () {
        if (!this.socketRoomName) {
            return;
        }
        this.sockets.leave(this.socketRoomName);
    };
    GroupsProfile.prototype.listenForNewMessages = function () {
        var _this = this;
        this.socketSubscription = this.sockets.subscribe('comment', function (parent_guid, owner_guid, guid) {
            if (!_this.group || parent_guid !== _this.group.guid) {
                return;
            }
            _this.group['comments:count']++;
            if (_this.filter != 'conversation') {
                _this.newConversationMessages = true;
            }
        });
    };
    GroupsProfile.prototype.unlistenForNewMessages = function () {
        if (this.socketSubscription) {
            this.socketSubscription.unsubscribe();
        }
    };
    GroupsProfile.prototype.findTrendingHashtags = function (searchText) {
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
    GroupsProfile.prototype.getChoiceLabel = function (text) {
        return "#" + text;
    };
    GroupsProfile.prototype.onTagsChange = function (tags) {
    };
    GroupsProfile.prototype.onTagsAdded = function (tags) {
        if (!this.group.tags)
            this.group.tags = [];
        for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
            var tag = tags_1[_i];
            this.group.tags.push(tag.value);
        }
    };
    GroupsProfile.prototype.onTagsRemoved = function (tags) {
        for (var _i = 0, tags_2 = tags; _i < tags_2.length; _i++) {
            var tag = tags_2[_i];
            for (var i in this.group.tags) {
                console.log(this.group.tags[i]);
                if (this.group.tags[i] == tag.value) {
                    this.group.tags.splice(i, 1);
                }
            }
        }
    };
    GroupsProfile.prototype.onOptionsChange = function (options) {
        this.editing = options.editing;
        if (options.editing === false)
            this.save();
    };
    GroupsProfile.prototype.detectWidth = function () {
        this.showRight = window.innerWidth > 900;
    };
    GroupsProfile.prototype.resetMarkers = function () {
        this.updateMarkers.markAsRead({
            entity_guid: this.guid,
            entity_type: 'group',
            marker: 'activity'
        });
        this.updateMarkers.markAsRead({
            entity_guid: this.guid,
            entity_type: 'group',
            marker: 'conversation'
        });
    };
    GroupsProfile.prototype.detectConversationsState = function () {
        var state = localStorage.getItem('groups:conversations:minimized');
        this.showRight = !state || state === 'false'; // it's maximized by default
    };
    GroupsProfile.prototype.toggleConversations = function () {
        this.showRight = !this.showRight;
        localStorage.setItem('groups:conversations:minimized', (!this.showRight).toString());
    };
    GroupsProfile.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.ViewChild('feed'),
        __metadata("design:type", feed_1.GroupsProfileFeed)
    ], GroupsProfile.prototype, "feed", void 0);
    __decorate([
        core_1.ViewChild('hashtagsSelector'),
        __metadata("design:type", selector_component_1.HashtagsSelectorComponent)
    ], GroupsProfile.prototype, "hashtagsSelector", void 0);
    __decorate([
        core_1.HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], GroupsProfile.prototype, "detectWidth", null);
    GroupsProfile = __decorate([
        core_1.Component({
            selector: 'm-groups--profile',
            templateUrl: 'profile.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            groups_service_1.GroupsService,
            router_1.ActivatedRoute,
            router_1.Router,
            title_1.OpspotTitle,
            sockets_1.SocketsService,
            context_service_1.ContextService,
            recent_1.RecentService,
            api_1.Client,
            videochat_service_1.VideoChatService,
            core_1.ChangeDetectorRef,
            update_markers_service_1.UpdateMarkersService])
    ], GroupsProfile);
    return GroupsProfile;
}());
exports.GroupsProfile = GroupsProfile;
//# sourceMappingURL=profile.js.map
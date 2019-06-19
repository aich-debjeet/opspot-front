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
var groups_service_1 = require("../../groups-service");
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var poster_component_1 = require("../../../newsfeed/poster/poster.component");
var router_1 = require("@angular/router");
var GroupsProfileFeed = /** @class */ (function () {
    function GroupsProfileFeed(session, client, service, route) {
        this.session = session;
        this.client = client;
        this.service = service;
        this.route = route;
        this.filter = 'activity';
        this.activity = [];
        this.pinned = [];
        this.offset = '';
        this.inProgress = false;
        this.moreData = true;
        this.pollingOffset = '';
        this.pollingNewPosts = 0;
        this.kickPrompt = false;
        this.kickBan = false;
        this.kickSuccess = false;
    }
    GroupsProfileFeed.prototype.ngOnInit = function () {
        var _this = this;
        this.$group = this.service.$group.subscribe(function (group) {
            _this.group = group;
            if (_this.group)
                _this.guid = group.guid;
        });
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            _this.filter = params['filter'] ? params['filter'] : 'activity';
            _this.load(true);
            _this.setUpPoll();
        });
    };
    GroupsProfileFeed.prototype.setUpPoll = function () {
        var _this = this;
        this.pollingTimer = setInterval(function () {
            _this.client.get('api/v1/newsfeed/container/' + _this.guid, { offset: _this.pollingOffset, count: true }, { cache: true })
                .then(function (response) {
                if (typeof response.count === 'undefined') {
                    return;
                }
                _this.pollingNewPosts = response.count;
                _this.pollingOffset = response['load-previous'];
            })
                .catch(function (e) { console.error('Newsfeed polling', e); });
        }, 60000);
    };
    GroupsProfileFeed.prototype.pollingLoadNew = function () {
        this.load(true);
    };
    GroupsProfileFeed.prototype.ngOnDestroy = function () {
        this.$group.unsubscribe();
        clearInterval(this.pollingTimer);
        this.paramsSubscription.unsubscribe();
    };
    GroupsProfileFeed.prototype.prepend = function (activity) {
        this.activity.unshift(activity);
        this.pollingOffset = activity.guid;
    };
    GroupsProfileFeed.prototype.loadActivities = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        this.inProgress = true;
        var endpoint = "api/v1/newsfeed/container/" + this.guid;
        if (this.filter == 'review') {
            endpoint = "api/v1/groups/review/" + this.guid;
        }
        var currentFilter = this.filter;
        var opts = {
            limit: 12,
            offset: this.offset,
        };
        if (!this.offset && this.group && this.group.pinned_posts && this.group.pinned_posts.length > 0) {
            opts.pinned = this.group.pinned_posts;
        }
        this.client.get(endpoint, opts)
            .then(function (response) {
            var _a;
            if (_this.filter !== currentFilter) {
                return; // Prevents race condition
            }
            _this.inProgress = false;
            if (refresh) {
                _this.activity = [];
            }
            if (typeof response['adminqueue:count'] !== 'undefined') {
                _this.group['adminqueue:count'] = response['adminqueue:count'];
            }
            if (!response.activity) {
                _this.moreData = false;
                return false;
            }
            _this.pinned = response.pinned;
            response.activity = response.activity
                .map(function (entity) {
                if (_this.group.pinned_posts && _this.group.pinned_posts.indexOf(entity.guid) >= 0) {
                    entity.pinned = true;
                }
                if (!(_this.group['is:moderator'] || _this.group['is:owner'])) {
                    entity.dontPin = true;
                }
                return entity;
            })
                .filter(function (entity) { return !entity.pinned; });
            (_a = _this.activity).push.apply(_a, (response.activity || []));
            if (typeof _this.activity[0] !== 'undefined') {
                _this.pollingOffset = response.activity[0].guid;
            }
            if (response['load-next']) {
                _this.offset = response['load-next'];
            }
            else {
                _this.moreData = false;
            }
        });
    };
    GroupsProfileFeed.prototype.loadMedia = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        this.inProgress = true;
        var endpoint = "api/v1/entities/container/" + this.filter + "/" + this.guid;
        var currentFilter = this.filter;
        this.client.get(endpoint, { limit: 12, offset: this.offset })
            .then(function (response) {
            if (_this.filter !== currentFilter) {
                return; // Prevents race condition
            }
            _this.inProgress = false;
            if (refresh) {
                _this.activity = [];
            }
            if (typeof response['adminqueue:count'] !== 'undefined') {
                _this.group['adminqueue:count'] = response['adminqueue:count'];
            }
            if (!response.entities || response.entities.length === 0) {
                _this.moreData = false;
                return false;
            }
            for (var _i = 0, _a = response.entities; _i < _a.length; _i++) {
                var entity = _a[_i];
                var fakeActivity = {
                    custom_type: _this.filter === 'image' ? 'batch' : 'video',
                    custom_data: _this.filter === 'image' ? [{ src: entity.thumbnail_src }] : entity,
                    guid: entity.guid,
                    entity_guid: entity.guid,
                    ownerObj: entity.ownerObj,
                    owner_guid: entity.owner_guid,
                    time_created: entity.time_created,
                    time_updated: entity.time_updated,
                    container_guid: entity.container_guid,
                    containerObj: entity.containerObj,
                    access_id: entity.access_id,
                    'thumbs:up:count': entity['thumbs:up:count'],
                    'thumbs:up:user_guids': entity['thumbs:up:user_guids'],
                    'thumbs:down:count': entity['thumbs:down:count'],
                    'thumbs:down:user_guids': entity['thumbs:down:user_guids'],
                    wire_totals: entity.wire_totals,
                    title: entity.title,
                    message: entity.message,
                };
                _this.activity.push(fakeActivity);
            }
            ;
            if (typeof _this.activity[0] !== 'undefined') {
                _this.pollingOffset = response.entities[0].guid;
            }
            if (response['load-next']) {
                _this.offset = response['load-next'];
            }
            else {
                _this.moreData = false;
            }
        });
    };
    /**
     * Load a groups newsfeed
     */
    GroupsProfileFeed.prototype.load = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        if (!this.group)
            return;
        if (this.inProgress && !refresh) {
            return false;
        }
        if (refresh) {
            this.offset = '';
            this.pollingOffset = '';
            this.pollingNewPosts = 0;
            this.activity = [];
        }
        switch (this.filter) {
            case 'activity':
            case 'review':
                return this.loadActivities(refresh);
            case 'image':
            case 'video':
                return this.loadMedia(refresh);
        }
    };
    GroupsProfileFeed.prototype.delete = function (activity) {
        var i;
        for (i in this.activity) {
            if (this.activity[i] === activity) {
                this.activity.splice(i, 1);
                break;
            }
        }
    };
    GroupsProfileFeed.prototype.canDeactivate = function () {
        if (!this.poster || !this.poster.attachment)
            return true;
        var progress = this.poster.attachment.getUploadProgress();
        if (progress > 0 && progress < 100) {
            return confirm('Your file is still uploading. Are you sure?');
        }
        return true;
    };
    // admin queue
    GroupsProfileFeed.prototype.approve = function (activity, index) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!activity) {
                            return [2 /*return*/];
                        }
                        this.activity.splice(index, 1);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.put("api/v1/groups/review/" + this.group.guid + "/" + activity.guid)];
                    case 2:
                        _a.sent();
                        this.group['adminqueue:count'] = this.group['adminqueue:count'] - 1;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        alert((e_1 && e_1.message) || 'Internal server error');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GroupsProfileFeed.prototype.reject = function (activity, index) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!activity) {
                            return [2 /*return*/];
                        }
                        this.activity.splice(index, 1);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.delete("api/v1/groups/review/" + this.group.guid + "/" + activity.guid)];
                    case 2:
                        _a.sent();
                        this.group['adminqueue:count'] = this.group['adminqueue:count'] - 1;
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        alert((e_2 && e_2.message) || 'Internal server error');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // kick & ban
    GroupsProfileFeed.prototype.removePrompt = function (user) {
        if (!user) {
            console.error(user);
            return;
        }
        this.kickSuccess = false;
        this.kickPrompt = true;
        this.kickBan = false;
        this.kickUser = user;
    };
    GroupsProfileFeed.prototype.cancelRemove = function () {
        this.kickSuccess = false;
        this.kickPrompt = false;
        this.kickBan = false;
        this.kickUser = void 0;
    };
    GroupsProfileFeed.prototype.kick = function (ban) {
        var _this = this;
        if (ban === void 0) { ban = false; }
        if (!this.kickUser) {
            return;
        }
        var action;
        this.kickPrompt = false;
        if (ban) {
            action = this.service.ban(this.group, this.kickUser.guid);
        }
        else {
            action = this.service.kick(this.group, this.kickUser.guid);
        }
        this.kickUser = void 0;
        action.then(function () {
            _this.kickPrompt = false;
            _this.kickBan = false;
            _this.kickSuccess = true;
        });
    };
    __decorate([
        core_1.ViewChild('poster'),
        __metadata("design:type", poster_component_1.PosterComponent)
    ], GroupsProfileFeed.prototype, "poster", void 0);
    GroupsProfileFeed = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-groups-profile-feed',
            templateUrl: 'feed.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, groups_service_1.GroupsService, router_1.ActivatedRoute])
    ], GroupsProfileFeed);
    return GroupsProfileFeed;
}());
exports.GroupsProfileFeed = GroupsProfileFeed;
//# sourceMappingURL=feed.js.map
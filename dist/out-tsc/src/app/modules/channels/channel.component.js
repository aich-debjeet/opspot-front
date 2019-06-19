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
var api_1 = require("../../services/api");
var title_1 = require("../../services/ux/title");
var session_1 = require("../../services/session");
var scroll_1 = require("../../services/ux/scroll");
var recent_1 = require("../../services/ux/recent");
var feed_1 = require("./feed/feed");
var context_service_1 = require("../../services/context.service");
var ChannelComponent = /** @class */ (function () {
    function ChannelComponent(session, client, upload, route, title, scroll, recent, context) {
        this.session = session;
        this.client = client;
        this.upload = upload;
        this.route = route;
        this.title = title;
        this.scroll = scroll;
        this.recent = recent;
        this.context = context;
        this.opspot = window.Opspot;
        this.filter = 'feed';
        this.isLocked = false;
        this.offset = '';
        this.moreData = true;
        this.inProgress = false;
        this.editing = false;
        this.error = '';
        this.openWireModal = false;
        this.changed = false;
        this.showOnboarding = false;
    }
    ChannelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle('Channel');
        this.context.set('activity');
        this.onScroll();
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            _this.changed = false;
            _this.editing = false;
            if (params['username']) {
                _this.changed = _this.username !== params['username'];
                _this.username = params['username'];
            }
            if (params['filter']) {
                if (params['filter'] === 'wire') {
                    _this.openWireModal = true;
                }
                else {
                    _this.filter = params['filter'];
                }
            }
            if (params['editToggle']) {
                _this.editing = true;
            }
            if (_this.changed) {
                _this.load();
            }
        });
    };
    ChannelComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    ChannelComponent.prototype.load = function () {
        var _this = this;
        this.error = '';
        this.user = null;
        this.title.setTitle(this.username);
        this.client.get('api/v1/channel/' + this.username, {})
            .then(function (data) {
            if (data.status !== 'success') {
                _this.error = data.message;
                return false;
            }
            _this.user = data.channel;
            if (!(_this.session.getLoggedInUser() && _this.session.getLoggedInUser().guid === _this.user.guid)) {
                _this.editing = false;
            }
            _this.title.setTitle(_this.user.username);
            _this.context.set('activity', { label: "@" + _this.user.username + " posts", nameLabel: "@" + _this.user.username, id: _this.user.guid });
            if (_this.session.getLoggedInUser()) {
                _this.addRecent();
            }
        })
            .catch(function (e) {
            if (e.status === 0) {
                _this.error = 'Sorry, there was a timeout error.';
            }
            else {
                _this.error = 'Sorry, the channel couldn\'t be found';
                console.log('couldnt load channel', e);
            }
        });
    };
    ChannelComponent.prototype.isOwner = function () {
        return this.session.getLoggedInUser().guid === this.user.guid;
    };
    ChannelComponent.prototype.toggleEditing = function () {
        if (this.editing) {
            this.update();
        }
        this.editing = !this.editing;
    };
    ChannelComponent.prototype.onScroll = function () {
        var _this = this;
        var listen = this.scroll.listen(function (view) {
            if (view.top > 250)
                _this.isLocked = true;
            if (view.top < 250)
                _this.isLocked = false;
        });
    };
    ChannelComponent.prototype.updateCarousels = function (value) {
        var _this = this;
        if (!value.length)
            return;
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var banner = value_1[_i];
            var options = { top: banner.top };
            if (banner.guid)
                options.guid = banner.guid;
            this.upload.post('api/v1/channel/carousel', [banner.file], options)
                .then(function (response) {
                response.index = banner.index;
                if (!_this.user.carousels) {
                    _this.user.carousels = [];
                }
                _this.user.carousels[banner.index] = response.carousel;
            });
        }
    };
    ChannelComponent.prototype.removeCarousel = function (value) {
        if (value.guid)
            this.client.delete('api/v1/channel/carousel/' + value.guid);
    };
    ChannelComponent.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post('api/v1/channel/info', this.user)];
                    case 1:
                        _a.sent();
                        this.editing = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    ChannelComponent.prototype.unBlock = function () {
        var _this = this;
        this.user.blocked = false;
        this.client.delete('api/v1/block/' + this.user.guid, {})
            .then(function (response) {
            _this.user.blocked = false;
        })
            .catch(function (e) {
            _this.user.blocked = true;
        });
    };
    ChannelComponent.prototype.addRecent = function () {
        var _this = this;
        if (!this.user) {
            return;
        }
        this.recent
            .store('recent', this.user, function (entry) { return entry.guid == _this.user.guid; })
            .splice('recent', 50);
    };
    __decorate([
        core_1.ViewChild('feed'),
        __metadata("design:type", feed_1.ChannelFeedComponent)
    ], ChannelComponent.prototype, "feed", void 0);
    ChannelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-channel',
            templateUrl: 'channel.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            api_1.Upload,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            scroll_1.ScrollService,
            recent_1.RecentService,
            context_service_1.ContextService])
    ], ChannelComponent);
    return ChannelComponent;
}());
exports.ChannelComponent = ChannelComponent;
var subscribers_1 = require("./subscribers/subscribers");
exports.ChannelSubscribers = subscribers_1.ChannelSubscribers;
var subscriptions_1 = require("./subscriptions/subscriptions");
exports.ChannelSubscriptions = subscriptions_1.ChannelSubscriptions;
//# sourceMappingURL=channel.component.js.map
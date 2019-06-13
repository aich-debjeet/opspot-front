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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var scroll_1 = require("../../../services/ux/scroll");
var poster_component_1 = require("../../../modules/newsfeed/poster/poster.component");
var channel_component_1 = require("../../../modules/wire/channel/channel.component");
var ChannelFeedComponent = /** @class */ (function () {
    function ChannelFeedComponent(session, client, upload, scroll) {
        this.session = session;
        this.client = client;
        this.upload = upload;
        this.scroll = scroll;
        this.opspot = window.Opspot;
        this.filter = 'feed';
        this.isLocked = false;
        this.feed = [];
        this.pinned = [];
        this.offset = '';
        this.moreData = true;
        this.inProgress = false;
        this.editing = false;
        this.error = '';
        this.openWireModal = false;
        this.showOnboarding = false;
    }
    ChannelFeedComponent.prototype.ngOnInit = function () {
        this.loadFeed(true);
        this.onScroll();
    };
    ChannelFeedComponent.prototype.loadFeed = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.openWireModal) {
            setTimeout(function () {
                _this.wire.sendWire();
            });
        }
        if (this.inProgress) {
            return false;
        }
        if (refresh) {
            this.feed = [];
            this.offset = '';
        }
        var params = {
            limit: 12,
            offset: ''
        };
        if (!this.offset && this.user.pinned_posts.length > 0) {
            params.pinned = this.user.pinned_posts;
        }
        this.inProgress = true;
        params.offset = this.offset;
        this.client.get('api/v1/newsfeed/personal/' + this.user.guid, params, { cache: true })
            .then(function (data) {
            if (!data.activity) {
                _this.moreData = false;
                _this.inProgress = false;
                return false;
            }
            if (_this.feed && !refresh) {
                for (var _i = 0, _a = data.activity; _i < _a.length; _i++) {
                    var activity = _a[_i];
                    _this.feed.push(activity);
                }
            }
            else {
                _this.feed = _this.filterPinned(data.activity);
                _this.pinned = data.pinned;
            }
            _this.offset = data['load-next'];
            _this.inProgress = false;
        })
            .catch(function (e) {
            this.inProgress = false;
        });
    };
    ChannelFeedComponent.prototype.isOwner = function () {
        return this.session.getLoggedInUser().guid === this.user.guid;
    };
    ChannelFeedComponent.prototype.filterPinned = function (activities) {
        var _this = this;
        return activities.filter(function (activity) {
            if (_this.user.pinned_posts.indexOf(activity.guid) >= 0) {
                activity.pinned = true;
            }
            else {
                return activity;
            }
        }).filter(function (x) { return !!x; });
    };
    ChannelFeedComponent.prototype.onScroll = function () {
        var _this = this;
        var listen = this.scroll.listen(function (view) {
            if (view.top > 250)
                _this.isLocked = true;
            if (view.top < 250)
                _this.isLocked = false;
        });
    };
    ChannelFeedComponent.prototype.delete = function (activity) {
        var i;
        for (i in this.feed) {
            if (this.feed[i] === activity) {
                this.feed.splice(i, 1);
                break;
            }
        }
    };
    ChannelFeedComponent.prototype.prepend = function (activity) {
        activity.boostToggle = true;
        this.feed.unshift(activity);
    };
    ChannelFeedComponent.prototype.canDeactivate = function () {
        if (!this.poster || !this.poster.attachment)
            return true;
        var progress = this.poster.attachment.getUploadProgress();
        if (progress > 0 && progress < 100) {
            return confirm('Your file is still uploading. Are you sure?');
        }
        return true;
    };
    __decorate([
        core_1.ViewChild('poster'),
        __metadata("design:type", poster_component_1.PosterComponent)
    ], ChannelFeedComponent.prototype, "poster", void 0);
    __decorate([
        core_1.ViewChild('wire'),
        __metadata("design:type", channel_component_1.WireChannelComponent)
    ], ChannelFeedComponent.prototype, "wire", void 0);
    ChannelFeedComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-channel--feed',
            inputs: ['user', 'openWireModal'],
            templateUrl: 'feed.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            api_1.Upload,
            scroll_1.ScrollService])
    ], ChannelFeedComponent);
    return ChannelFeedComponent;
}());
exports.ChannelFeedComponent = ChannelFeedComponent;
//# sourceMappingURL=feed.js.map
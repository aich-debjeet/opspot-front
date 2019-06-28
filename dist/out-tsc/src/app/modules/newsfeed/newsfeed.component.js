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
var router_1 = require("@angular/router");
var overlay_modal_1 = require("../../services/ux/overlay-modal");
var api_1 = require("../../services/api");
var title_1 = require("../../services/ux/title");
var navigation_1 = require("../../services/navigation");
var session_1 = require("../../services/session");
var storage_1 = require("../../services/storage");
var context_service_1 = require("../../services/context.service");
var poster_component_1 = require("./poster/poster.component");
var newsfeed_service_1 = require("./services/newsfeed.service");
var NewsfeedComponent = /** @class */ (function () {
    function NewsfeedComponent(session, client, upload, navigation, router, route, title, storage, overlayModal, context, newsfeedService) {
        var _this = this;
        this.session = session;
        this.client = client;
        this.upload = upload;
        this.navigation = navigation;
        this.router = router;
        this.route = route;
        this.title = title;
        this.storage = storage;
        this.overlayModal = overlayModal;
        this.context = context;
        this.newsfeedService = newsfeedService;
        this.prepended = [];
        this.offset = '';
        this.showBoostRotator = true;
        this.inProgress = false;
        this.moreData = true;
        this.showRightSidebar = true;
        this.preventHashtagOverflow = false;
        this.message = '';
        this.newUserPromo = false;
        this.postMeta = {
            title: '',
            description: '',
            thumbnail: '',
            url: '',
            active: false,
            attachment_guid: null
        };
        this.pollingOffset = '';
        this.pollingNewPosts = 0;
        this.boostFeed = false;
        this.showPlusButton = true;
        this.subscribed = false;
        this.tag = null;
        this.suggested = false;
        this.route.url.subscribe(function (segments) {
            _this.tag = null;
            var path = route.snapshot.firstChild && route.snapshot.firstChild.routeConfig.path;
            if (path === 'boost') {
                _this.title.setTitle('Boost Newsfeed');
                _this.boostFeed = true;
            }
            else if (path === 'tag/:tag') {
                _this.tag = route.snapshot.firstChild.url[1].path;
            }
            else {
                _this.title.setTitle('Newsfeed');
            }
            _this.subscribed = path === 'subscribed';
            _this.suggested = path === 'suggested';
        });
        var showPlusButton = localStorage.getItem('newsfeed:hide-plus-button');
        if (showPlusButton != null) {
            this.showPlusButton = false;
        }
    }
    NewsfeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.session.isLoggedIn()) {
            this.router.navigate(['/login']); //force login
        }
        else {
            this.load();
            //this.setUpPoll();
            this.opspot = window.Opspot;
        }
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['message']) {
                _this.message = params['message'];
            }
            _this.newUserPromo = !!params['newUser'];
            if (params['ts']) {
                _this.showBoostRotator = false;
                _this.load(true);
                setTimeout(function () {
                    _this.showBoostRotator = true;
                }, 300);
            }
        });
        this.context.set('activity');
        this.detectWidth();
    };
    NewsfeedComponent.prototype.setUpPoll = function () {
        var _this = this;
        this.pollingTimer = setInterval(function () {
            _this.client.get('api/v1/newsfeed', { offset: _this.pollingOffset, count: true }, { cache: true })
                .then(function (response) {
                if (typeof response.count === 'undefined') {
                    return;
                }
                _this.pollingNewPosts += response.count;
                _this.pollingOffset = response['load-previous'];
            })
                .catch(function (e) {
                console.error('Newsfeed polling', e);
            });
        }, 60000);
    };
    NewsfeedComponent.prototype.pollingLoadNew = function () {
        var _this = this;
        if (!this.pollingOffset || !this.pollingNewPosts) {
            return;
        }
        if (this.pollingNewPosts > 120) { // just replace the whole newsfeed
            return this.load(true);
        }
        this.inProgress = true;
        this.client.get('api/v1/newsfeed', {
            limit: this.pollingNewPosts,
            offset: this.pollingOffset,
            prepend: true
        }, { cache: true })
            .then(function (data) {
            _this.inProgress = false;
            _this.pollingNewPosts = 0;
            if (!data.activity) {
                return;
            }
            _this.prepended = data.activity.concat(_this.prepended);
            _this.pollingOffset = data['load-previous'] ? data['load-previous'] : '';
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    NewsfeedComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.pollingTimer);
        this.paramsSubscription.unsubscribe();
    };
    NewsfeedComponent.prototype.load = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        if (this.boostFeed) {
            this.loadBoosts(refresh);
        }
        else {
            this.loadNewsfeed(refresh);
        }
    };
    NewsfeedComponent.prototype.reloadTopFeed = function (all) {
        if (all === void 0) { all = false; }
        this.newsfeedService.reloadFeed(all);
        if (!this.suggested) {
            this.router.navigate(['newsfeed/suggested']);
        }
    };
    /**
     * Load boost newsfeed
     */
    NewsfeedComponent.prototype.loadBoosts = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress) {
            //console.log('already loading more..');
            return false;
        }
        if (refresh) {
            this.offset = '';
        }
        if (this.storage.get('boost:offset:boostfeed')) {
            this.offset = this.storage.get('boost:offset:boostfeed');
        }
        this.inProgress = true;
        this.client.get('api/v1/boost/fetch/newsfeed', { limit: 12, offset: this.offset }, { cache: true })
            .then(function (data) {
            if (!data.boosts) {
                _this.moreData = false;
                _this.inProgress = false;
                return false;
            }
            if (_this.newsfeed && !refresh) {
                _this.newsfeed = _this.newsfeed.concat(data.boosts);
            }
            else {
                _this.newsfeed = data.boosts;
            }
            _this.offset = data['load-next'];
            _this.storage.set('boost:offset:boostfeed', _this.offset);
            _this.inProgress = false;
        })
            .catch(function (e) {
            this.inProgress = false;
        });
    };
    /**
     * Load newsfeed
     */
    NewsfeedComponent.prototype.loadNewsfeed = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        var self = this;
        if (this.inProgress) {
            //console.log('already loading more..');
            return false;
        }
        if (refresh) {
            this.offset = '';
            this.pollingOffset = '';
            this.pollingNewPosts = 0;
        }
        this.inProgress = true;
        this.client.get('api/v1/newsfeed', { limit: 12, offset: this.offset }, { cache: true })
            .then(function (data) {
            if (!data.activity) {
                self.moreData = false;
                self.inProgress = false;
                return false;
            }
            if (self.newsfeed && !refresh) {
                self.newsfeed = self.newsfeed.concat(data.activity);
            }
            else {
                self.newsfeed = data.activity;
                if (data['load-previous']) {
                    self.pollingOffset = data['load-previous'];
                }
            }
            self.offset = data['load-next'];
            self.inProgress = false;
        })
            .catch(function (e) {
            self.inProgress = false;
        });
    };
    NewsfeedComponent.prototype.prepend = function (activity) {
        if (this.newUserPromo) {
            this.autoBoost(activity);
            activity.boostToggle = false;
            activity.boosted = true;
        }
        this.prepended.unshift(activity);
        this.pollingOffset = activity.guid;
        this.newUserPromo = false;
    };
    NewsfeedComponent.prototype.autoBoost = function (activity) {
        this.client.post('api/v2/boost/activity/' + activity.guid + '/' + activity.owner_guid, {
            newUserPromo: true,
            impressions: 200,
            destination: 'Newsfeed'
        });
    };
    NewsfeedComponent.prototype.delete = function (activity) {
        var i;
        for (i in this.prepended) {
            if (this.prepended[i] === activity) {
                this.prepended.splice(i, 1);
                return;
            }
        }
        for (i in this.newsfeed) {
            if (this.newsfeed[i] === activity) {
                this.newsfeed.splice(i, 1);
                return;
            }
        }
    };
    NewsfeedComponent.prototype.hidePlusButton = function (event) {
        this.showPlusButton = false;
        localStorage.setItem('newsfeed:hide-plus-button', 'true');
        event.preventDefault();
        event.stopPropagation();
    };
    NewsfeedComponent.prototype.onViewed = function (event) {
        if (this.boostFeed) {
            if (event.visible) {
                this.client.put('api/v1/boost/fetch/newsfeed/' + event.activity.boosted_guid);
            }
            else {
                this.client.put('api/v1/boost/fetch/newsfeed/' + event.activity.boosted_guid + '/stop');
            }
        }
    };
    NewsfeedComponent.prototype.detectWidth = function () {
        this.showRightSidebar = window.innerWidth >= 1100;
        this.preventHashtagOverflow = window.innerWidth < 400;
    };
    NewsfeedComponent.prototype.canDeactivate = function () {
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
    ], NewsfeedComponent.prototype, "poster", void 0);
    __decorate([
        core_1.HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NewsfeedComponent.prototype, "detectWidth", null);
    NewsfeedComponent = __decorate([
        core_1.Component({
            selector: 'm-newsfeed',
            templateUrl: 'newsfeed.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            api_1.Upload,
            navigation_1.Navigation,
            router_1.Router,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            storage_1.Storage,
            overlay_modal_1.OverlayModalService,
            context_service_1.ContextService,
            newsfeed_service_1.NewsfeedService])
    ], NewsfeedComponent);
    return NewsfeedComponent;
}());
exports.NewsfeedComponent = NewsfeedComponent;
//# sourceMappingURL=newsfeed.component.js.map
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
var title_1 = require("../../services/ux/title");
var api_1 = require("../../services/api");
var session_1 = require("../../services/session");
var context_service_1 = require("../../services/context.service");
var hashtags_selector_component_1 = require("../hashtags/hashtag-selector-modal/hashtags-selector.component");
var overlay_modal_1 = require("../../services/ux/overlay-modal");
var ChannelsListComponent = /** @class */ (function () {
    function ChannelsListComponent(client, router, route, title, context, session, overlayModal) {
        this.client = client;
        this.router = router;
        this.route = route;
        this.title = title;
        this.context = context;
        this.session = session;
        this.overlayModal = overlayModal;
        this.filter = 'top';
        this.uri = 'entities/trending/channels';
        this.entities = [];
        this.moreData = true;
        this.all = false;
        this.offset = '';
        this.inProgress = false;
        this.rating = 1; //safe by default
        this.version = 'v1';
        this.preventHashtagOverflow = false;
    }
    ChannelsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle('Channels');
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['filter']) {
                _this.filter = params['filter'];
                _this.version = 'v1';
                switch (_this.filter) {
                    case 'all':
                        _this.filter = 'all';
                        _this.uri = 'entities/all/channels';
                        break;
                    case 'top':
                        if (!_this.session.isLoggedIn()) {
                            _this.router.navigate(['/login']);
                        }
                        _this.version = 'v2';
                        _this.filter = 'trending';
                        _this.uri = 'entities/suggested/channels';
                        break;
                    case 'suggested':
                        if (!_this.session.isLoggedIn()) {
                            _this.router.navigate(['/channels', 'subscriptions']);
                        }
                        _this.filter = 'trending';
                        _this.uri = 'entities/trending/channels';
                        break;
                    case 'subscribers':
                        _this.uri = 'subscribe/subscribers/' + _this.session.getLoggedInUser().guid;
                        break;
                    case 'subscriptions':
                        _this.uri = 'subscribe/subscriptions/' + _this.session.getLoggedInUser().guid;
                        break;
                    case 'founders':
                        _this.uri = 'channels/founders/';
                        _this.version = 'v2';
                        break;
                }
            }
            _this.inProgress = false;
            _this.moreData = true;
            _this.entities = [];
            _this.load(true);
            _this.detectWidth();
        });
    };
    ChannelsListComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    ChannelsListComponent.prototype.reloadTags = function (all) {
        if (all === void 0) { all = false; }
        this.all = all;
        this.load(true);
    };
    ChannelsListComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress || !this.moreData && !refresh)
            return false;
        if (refresh) {
            this.offset = '';
            this.entities = [];
        }
        this.inProgress = true;
        var uri = this.uri;
        if (this.all) {
            uri = uri + '/all';
            this.router.navigate(['channels/top']);
        }
        this.client.get('api/' + this.version + '/' + uri, {
            limit: 24,
            offset: this.offset
        })
            .then(function (data) {
            if (data.users)
                data.entities = data.users;
            if (!data.entities || !data.entities.length) {
                _this.moreData = false;
                _this.inProgress = false;
                if (_this.filter == 'trending')
                    _this.openHashtagsSelector();
                return false;
            }
            if (refresh) {
                _this.entities = data.entities;
            }
            else {
                if (_this.offset)
                    data.entities.shift();
                _this.entities = _this.entities.concat(data.entities);
            }
            _this.offset = data['load-next'];
            if (!_this.offset)
                _this.moreData = false;
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    ChannelsListComponent.prototype.detectWidth = function () {
        this.preventHashtagOverflow = window.innerWidth < 400;
    };
    ChannelsListComponent.prototype.onOptionsChange = function (e) {
        var _this = this;
        this.rating = e.rating;
        if (this.inProgress) {
            return setTimeout(function () {
                _this.onOptionsChange(e);
            }, 100); //keep trying every 100ms
        }
        this.load(true);
    };
    ChannelsListComponent.prototype.openHashtagsSelector = function () {
        var _this = this;
        this.overlayModal.create(hashtags_selector_component_1.HashtagsSelectorModalComponent, {}, {
            class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium-large',
            onSelected: function () {
                _this.load(true); //refresh list
            },
        }).present();
    };
    __decorate([
        core_1.HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ChannelsListComponent.prototype, "detectWidth", null);
    ChannelsListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-channels--list',
            templateUrl: 'list.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            router_1.Router,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            context_service_1.ContextService,
            session_1.Session,
            overlay_modal_1.OverlayModalService])
    ], ChannelsListComponent);
    return ChannelsListComponent;
}());
exports.ChannelsListComponent = ChannelsListComponent;
//# sourceMappingURL=list.component.js.map
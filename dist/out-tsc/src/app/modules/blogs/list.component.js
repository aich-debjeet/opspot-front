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
var BlogListComponent = /** @class */ (function () {
    function BlogListComponent(client, route, router, title, context, session, overlayModal) {
        this.client = client;
        this.route = route;
        this.router = router;
        this.title = title;
        this.context = context;
        this.session = session;
        this.overlayModal = overlayModal;
        this.offset = '';
        this.moreData = true;
        this.inProgress = false;
        this.entities_0 = [];
        this.entities_1 = [];
        this.filter = 'featured';
        this._filter2 = '';
        this.rating = 1; //show safe by default
        this.all = false;
    }
    BlogListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle('Blogs');
        this.opspot = window.Opspot;
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            _this.filter = params['filter'];
            switch (_this.filter) {
                case 'network':
                    _this.filter = 'network';
                    break;
                case 'trending':
                    _this.title.setTitle('Trending Blogs');
                    break;
                case 'top':
                    if (!_this.session.isLoggedIn()) {
                        _this.router.navigate(['/login']);
                    }
                    _this.filter = 'trending';
                    break;
                case 'suggested':
                    if (!_this.session.isLoggedIn()) {
                        _this.router.navigate(['/login']);
                    }
                    _this.filter = 'trending';
                case 'featured':
                    _this.title.setTitle('Blogs');
                    break;
                case 'all':
                    break;
                case 'owner':
                    break;
                case 'my':
                    _this._filter2 = _this.session.getLoggedInUser().guid;
                    _this.filter = 'owner';
                    break;
                default:
                    _this._filter2 = _this.filter;
                    _this.filter = 'owner';
            }
            _this.inProgress = false;
            _this.moreData = true;
            _this.entities_0 = [];
            _this.entities_1 = [];
            if (_this.session.isLoggedIn())
                _this.rating = _this.session.getLoggedInUser().boost_rating;
            _this.load(true);
        });
        this.context.set('object:blog');
    };
    BlogListComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    BlogListComponent.prototype.reloadTags = function (all) {
        if (all === void 0) { all = false; }
        this.all = all;
        this.load(true);
    };
    BlogListComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress)
            return false;
        if (refresh) {
            this.offset = '';
            this.moreData = true;
            this.entities_0 = [];
            this.entities_1 = [];
        }
        this.inProgress = true;
        var endpoint;
        if (this.filter === 'trending') {
            endpoint = 'api/v2/entities/suggested/blogs';
            if (this.all)
                endpoint += '/all';
        }
        else {
            endpoint = 'api/v1/blog/' + this.filter + '/' + this._filter2;
        }
        this.client.get(endpoint, {
            limit: 12,
            offset: this.offset,
            rating: this.rating,
        })
            .then(function (response) {
            if (!response.entities || !response.entities.length) {
                _this.moreData = false;
                _this.inProgress = false;
                if (_this.filter == 'trending' && !_this.offset)
                    _this.openHashtagsSelector();
                return false;
            }
            _this.pushToColumns(response.entities);
            _this.offset = response['load-next'];
            if (!_this.offset) {
                _this.moreData = false;
            }
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    BlogListComponent.prototype.reloadTopFeed = function () {
        this.load(true);
    };
    BlogListComponent.prototype.onOptionsChange = function (e) {
        var _this = this;
        this.rating = e.rating;
        if (this.inProgress) {
            return setTimeout(function () {
                _this.onOptionsChange(e);
            }, 100); //keep trying every 100ms
        }
        this.load(true);
    };
    BlogListComponent.prototype.openHashtagsSelector = function () {
        var _this = this;
        this.overlayModal.create(hashtags_selector_component_1.HashtagsSelectorModalComponent, {}, {
            class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium-large',
            onSelected: function () {
                _this.load(true); //refresh list
            },
        }).present();
    };
    BlogListComponent.prototype.pushToColumns = function (blogs) {
        var listLength = this.entities_0.length + this.entities_1.length;
        for (var i = 0; i < blogs.length; i++) {
            var index = i + listLength;
            if (index <= 5) {
                if (index == 0 || index == 3 || index == 4) {
                    this.entities_0.push(blogs[i]);
                }
                else {
                    this.entities_1.push(blogs[i]);
                }
            }
            else {
                //even numbers take column 0
                if (index % 2 == 0) {
                    this.entities_0.push(blogs[i]);
                }
                else {
                    this.entities_1.push(blogs[i]);
                }
            }
        }
    };
    BlogListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-blog--list',
            templateUrl: 'list.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            router_1.ActivatedRoute,
            router_1.Router,
            title_1.OpspotTitle,
            context_service_1.ContextService,
            session_1.Session,
            overlay_modal_1.OverlayModalService])
    ], BlogListComponent);
    return BlogListComponent;
}());
exports.BlogListComponent = BlogListComponent;
var view_1 = require("./view/view");
exports.BlogView = view_1.BlogView;
var infinite_1 = require("./view/infinite");
exports.BlogViewInfinite = infinite_1.BlogViewInfinite;
var edit_1 = require("./edit/edit");
exports.BlogEdit = edit_1.BlogEdit;
//# sourceMappingURL=list.component.js.map
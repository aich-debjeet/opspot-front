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
var title_1 = require("../../../services/ux/title");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var context_service_1 = require("../../../services/context.service");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var poster_modal_component_1 = require("../../newsfeed/poster/poster-modal.component");
var hashtags_selector_component_1 = require("../../hashtags/hashtag-selector-modal/hashtags-selector.component");
var MediaImagesListComponent = /** @class */ (function () {
    function MediaImagesListComponent(client, router, route, title, context, session, overlayModal) {
        this.client = client;
        this.router = router;
        this.route = route;
        this.title = title;
        this.context = context;
        this.session = session;
        this.overlayModal = overlayModal;
        this.filter = 'featured';
        this.owner = '';
        this.entities = [];
        this.moreData = true;
        this.offset = '';
        this.inProgress = false;
        this.rating = 1; //safe by default
        this.all = false;
        this.city = '';
        this.cities = [];
        this.nearby = false;
        this.hasNearby = false;
        this.distance = 5;
    }
    MediaImagesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle('Images');
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['filter']) {
                _this.filter = params['filter'];
                _this.owner = '';
                switch (_this.filter) {
                    case 'all':
                        break;
                    case 'network':
                        _this.filter = 'network';
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
                        break;
                    case 'my':
                        _this.filter = 'owner';
                        _this.owner = _this.session.getLoggedInUser().guid;
                        break;
                    case 'owner':
                    default:
                        _this.owner = _this.filter;
                        _this.filter = 'owner';
                }
            }
            _this.context.set('object:image');
            _this.inProgress = false;
            _this.moreData = true;
            _this.entities = [];
            if (_this.session.isLoggedIn())
                _this.rating = _this.session.getLoggedInUser().boost_rating;
            _this.load(true);
        });
    };
    MediaImagesListComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    MediaImagesListComponent.prototype.showPoster = function () {
        var creator = this.overlayModal.create(poster_modal_component_1.ModalPosterComponent, {}, {
            class: 'm-overlay-modal--no-padding m-overlay-modal--top m-overlay-modal--medium m-overlay-modal--overflow'
        });
        creator.present();
    };
    MediaImagesListComponent.prototype.reloadTags = function (all) {
        if (all === void 0) { all = false; }
        this.all = all;
        this.load(true);
    };
    MediaImagesListComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress)
            return false;
        if (refresh) {
            this.offset = '';
            this.entities = [];
        }
        this.inProgress = true;
        var endpoint;
        if (this.filter === 'trending') {
            endpoint = 'api/v2/entities/suggested/images';
            if (this.all)
                endpoint += '/all';
        }
        else {
            endpoint = 'api/v1/entities/' + this.filter + '/images/' + this.owner;
        }
        this.client.get(endpoint, {
            limit: 12,
            offset: this.offset,
            rating: this.rating,
        })
            .then(function (data) {
            if (!data.entities || !data.entities.length) {
                _this.moreData = false;
                _this.inProgress = false;
                if (_this.filter === 'trending') {
                    _this.openHashtagsSelector();
                }
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
            console.log(_this.entities);
            _this.offset = data['load-next'];
            if (!_this.offset)
                _this.moreData = false;
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    MediaImagesListComponent.prototype.reloadTopFeed = function () {
        this.load(true);
    };
    MediaImagesListComponent.prototype.onOptionsChange = function (e) {
        var _this = this;
        this.rating = e.rating;
        if (this.inProgress) {
            return setTimeout(function () {
                _this.onOptionsChange(e);
            }, 100); //keep trying every 100ms
        }
        this.load(true);
    };
    MediaImagesListComponent.prototype.openHashtagsSelector = function () {
        var _this = this;
        this.overlayModal.create(hashtags_selector_component_1.HashtagsSelectorModalComponent, {}, {
            class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium-large',
            onSelected: function () {
                _this.load(true); //refresh list
            },
        }).present();
    };
    MediaImagesListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-media--images-list',
            templateUrl: 'list.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            router_1.Router,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            context_service_1.ContextService,
            session_1.Session,
            overlay_modal_1.OverlayModalService])
    ], MediaImagesListComponent);
    return MediaImagesListComponent;
}());
exports.MediaImagesListComponent = MediaImagesListComponent;
//# sourceMappingURL=list.component.js.map
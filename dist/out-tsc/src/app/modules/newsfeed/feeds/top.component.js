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
var api_1 = require("../../../services/api");
var title_1 = require("../../../services/ux/title");
var navigation_1 = require("../../../services/navigation");
var session_1 = require("../../../services/session");
var storage_1 = require("../../../services/storage");
var context_service_1 = require("../../../services/context.service");
var settings_service_1 = require("../../settings/settings.service");
var poster_component_1 = require("../poster/poster.component");
var hashtags_selector_component_1 = require("../../../modules/hashtags/hashtag-selector-modal/hashtags-selector.component");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var newsfeed_service_1 = require("../services/newsfeed.service");
var NewsfeedTopComponent = /** @class */ (function () {
    function NewsfeedTopComponent(client, upload, navigation, router, route, title, storage, context, session, settingsService, overlayModal, newsfeedService) {
        var _this = this;
        this.client = client;
        this.upload = upload;
        this.navigation = navigation;
        this.router = router;
        this.route = route;
        this.title = title;
        this.storage = storage;
        this.context = context;
        this.session = session;
        this.settingsService = settingsService;
        this.overlayModal = overlayModal;
        this.newsfeedService = newsfeedService;
        this.prepended = [];
        this.offset = '';
        this.inProgress = false;
        this.moreData = true;
        this.rating = 1;
        this.title.setTitle('Newsfeed');
        if (this.session.isLoggedIn())
            this.rating = this.session.getLoggedInUser().boost_rating;
        this.ratingSubscription = settingsService.ratingChanged.subscribe(function (event) {
            _this.onRatingChanged(event);
        });
        this.allHashtags = this.newsfeedService.allHashtags;
        this.reloadFeedSubscription = this.newsfeedService.onReloadFeed.subscribe(function (allHashtags) {
            _this.allHashtags = allHashtags;
            _this.load(true);
        });
    }
    NewsfeedTopComponent.prototype.ngOnInit = function () {
        this.load();
        this.opspot = window.Opspot;
        this.context.set('activity');
    };
    NewsfeedTopComponent.prototype.ngOnDestroy = function () {
        if (this.ratingSubscription) {
            this.ratingSubscription.unsubscribe();
        }
        if (this.paramsSubscription) {
            this.paramsSubscription.unsubscribe();
        }
        if (this.reloadFeedSubscription) {
            this.reloadFeedSubscription.unsubscribe();
        }
    };
    /**
     * Load newsfeed
     */
    NewsfeedTopComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress)
            return false;
        if (refresh) {
            this.moreData = true;
            this.offset = '';
            this.newsfeed = [];
        }
        this.inProgress = true;
        this.client.get('api/v2/entities/suggested/activities' + (this.allHashtags ? '/all' : ''), {
            limit: 12,
            offset: this.offset,
            rating: this.rating
        }, {
            cache: true
        })
            .then(function (data) {
            if (!data.entities || !data.entities.length) {
                _this.moreData = false;
                _this.inProgress = false;
                if (!_this.newsfeed || _this.newsfeed.length == 0) {
                    _this.openHashtagsSelector();
                }
                return false;
            }
            if (_this.newsfeed && !refresh) {
                _this.newsfeed = _this.newsfeed.concat(data.entities);
            }
            else {
                _this.newsfeed = data.entities;
            }
            _this.offset = data['load-next'];
            _this.inProgress = false;
        })
            .catch(function (e) {
            console.log(e);
            _this.inProgress = false;
        });
    };
    NewsfeedTopComponent.prototype.delete = function (activity) {
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
    NewsfeedTopComponent.prototype.prepend = function (activity) {
        this.prepended.unshift(activity);
    };
    NewsfeedTopComponent.prototype.onRatingChanged = function (rating) {
        this.rating = rating;
        this.load(true);
    };
    NewsfeedTopComponent.prototype.openHashtagsSelector = function () {
        var _this = this;
        this.overlayModal.create(hashtags_selector_component_1.HashtagsSelectorModalComponent, {}, {
            class: 'm-overlay-modal--hashtag-selector m-overlay-modal--medium-large',
            onSelected: function () {
                _this.load(true); //refresh list
            },
        }).present();
    };
    __decorate([
        core_1.ViewChild('poster'),
        __metadata("design:type", poster_component_1.PosterComponent)
    ], NewsfeedTopComponent.prototype, "poster", void 0);
    NewsfeedTopComponent = __decorate([
        core_1.Component({
            selector: 'm-newsfeed--top',
            templateUrl: 'top.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            api_1.Upload,
            navigation_1.Navigation,
            router_1.Router,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            storage_1.Storage,
            context_service_1.ContextService,
            session_1.Session,
            settings_service_1.SettingsService,
            overlay_modal_1.OverlayModalService,
            newsfeed_service_1.NewsfeedService])
    ], NewsfeedTopComponent);
    return NewsfeedTopComponent;
}());
exports.NewsfeedTopComponent = NewsfeedTopComponent;
//# sourceMappingURL=top.component.js.map
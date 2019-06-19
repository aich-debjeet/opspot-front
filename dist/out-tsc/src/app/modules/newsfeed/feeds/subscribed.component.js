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
var poster_component_1 = require("../poster/poster.component");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var NewsfeedSubscribedComponent = /** @class */ (function () {
    function NewsfeedSubscribedComponent(client, upload, navigation, router, route, title, storage, context, session, overlayModal) {
        this.client = client;
        this.upload = upload;
        this.navigation = navigation;
        this.router = router;
        this.route = route;
        this.title = title;
        this.storage = storage;
        this.context = context;
        this.session = session;
        this.overlayModal = overlayModal;
        this.prepended = [];
        this.offset = '';
        this.showBoostRotator = true;
        this.inProgress = false;
        this.moreData = true;
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
        this.title.setTitle('Newsfeed');
    }
    NewsfeedSubscribedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.load();
        this.opspot = window.Opspot;
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
    };
    NewsfeedSubscribedComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    /**
     * Load newsfeed
     */
    NewsfeedSubscribedComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress)
            return false;
        if (refresh) {
            this.offset = '';
        }
        this.inProgress = true;
        this.client.get('api/v1/newsfeed', { limit: 12, offset: this.offset }, { cache: true })
            .then(function (data) {
            if (!data.activity) {
                _this.moreData = false;
                _this.inProgress = false;
                return false;
            }
            if (_this.newsfeed && !refresh) {
                _this.newsfeed = _this.newsfeed.concat(data.activity);
            }
            else {
                _this.newsfeed = data.activity;
            }
            _this.offset = data['load-next'];
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    NewsfeedSubscribedComponent.prototype.prepend = function (activity) {
        if (this.newUserPromo) {
            this.autoBoost(activity);
            activity.boostToggle = false;
            activity.boosted = true;
        }
        this.prepended.unshift(activity);
        this.newUserPromo = false;
    };
    NewsfeedSubscribedComponent.prototype.autoBoost = function (activity) {
        this.client.post('api/v2/boost/activity/' + activity.guid + '/' + activity.owner_guid, {
            newUserPromo: true,
            impressions: 200,
            destination: 'Newsfeed'
        });
    };
    NewsfeedSubscribedComponent.prototype.delete = function (activity) {
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
    NewsfeedSubscribedComponent.prototype.canDeactivate = function () {
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
    ], NewsfeedSubscribedComponent.prototype, "poster", void 0);
    NewsfeedSubscribedComponent = __decorate([
        core_1.Component({
            selector: 'm-newsfeed--subscribed',
            templateUrl: 'subscribed.component.html'
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
            overlay_modal_1.OverlayModalService])
    ], NewsfeedSubscribedComponent);
    return NewsfeedSubscribedComponent;
}());
exports.NewsfeedSubscribedComponent = NewsfeedSubscribedComponent;
//# sourceMappingURL=subscribed.component.js.map
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
var NewsfeedBoostComponent = /** @class */ (function () {
    function NewsfeedBoostComponent(client, upload, navigation, router, route, title, storage, context, session) {
        this.client = client;
        this.upload = upload;
        this.navigation = navigation;
        this.router = router;
        this.route = route;
        this.title = title;
        this.storage = storage;
        this.context = context;
        this.session = session;
        this.prepended = [];
        this.offset = '';
        this.showBoostRotator = true;
        this.inProgress = false;
        this.moreData = true;
        this.message = '';
        this.boostFeed = false;
        this.title.setTitle('Boost Newsfeed');
    }
    NewsfeedBoostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.load();
        this.opspot = window.Opspot;
        this.paramsSubscription = this.route.params.subscribe(function (params) {
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
    NewsfeedBoostComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    NewsfeedBoostComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress)
            return false;
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
            _this.inProgress = false;
        });
    };
    NewsfeedBoostComponent.prototype.delete = function (activity) {
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
    __decorate([
        core_1.ViewChild('poster'),
        __metadata("design:type", poster_component_1.PosterComponent)
    ], NewsfeedBoostComponent.prototype, "poster", void 0);
    NewsfeedBoostComponent = __decorate([
        core_1.Component({
            selector: 'm-newsfeed--boost',
            templateUrl: 'boost.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            api_1.Upload,
            navigation_1.Navigation,
            router_1.Router,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            storage_1.Storage,
            context_service_1.ContextService,
            session_1.Session])
    ], NewsfeedBoostComponent);
    return NewsfeedBoostComponent;
}());
exports.NewsfeedBoostComponent = NewsfeedBoostComponent;
//# sourceMappingURL=boost.component.js.map
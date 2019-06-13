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
var api_1 = require("../../services/api");
var title_1 = require("../../services/ux/title");
var session_1 = require("../../services/session");
var context_service_1 = require("../../services/context.service");
var hashtags_selector_component_1 = require("../hashtags/hashtag-selector-modal/hashtags-selector.component");
var overlay_modal_1 = require("../../services/ux/overlay-modal");
var GroupsListComponent = /** @class */ (function () {
    function GroupsListComponent(client, route, router, title, context, session, overlayModal) {
        this.client = client;
        this.route = route;
        this.router = router;
        this.title = title;
        this.context = context;
        this.session = session;
        this.overlayModal = overlayModal;
        this.moreData = true;
        this.inProgress = false;
        this.all = false;
        this.offset = '';
        this.entities = [];
        this.filter = 'top';
        this.rating = 1;
        this.preventHashtagOverflow = false;
    }
    GroupsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle('Groups');
        this.context.set('group');
        this.opspot = window.Opspot;
        this.detectWidth();
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['filter']) {
                if (params['filter'] === 'suggested' && !_this.session.isLoggedIn()) {
                    _this.router.navigate(['/login']);
                }
                _this.filter = params['filter'];
                _this.inProgress = false;
                _this.moreData = true;
                _this.entities = [];
                if (_this.session.isLoggedIn())
                    _this.rating = _this.session.getLoggedInUser().boost_rating;
                _this.load(true);
            }
        });
    };
    GroupsListComponent.prototype.ngOnDestroy = function () {
        if (this.paramsSubscription) {
            this.paramsSubscription.unsubscribe();
        }
    };
    GroupsListComponent.prototype.reloadTags = function (all) {
        this.all = all;
        this.load(true);
    };
    GroupsListComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress)
            return;
        if (refresh) {
            this.offset = '';
            this.entities = [];
            this.moreData = true;
        }
        var endpoint, key;
        switch (this.filter) {
            case 'top':
                if (!this.session.isLoggedIn()) {
                    this.router.navigate(['/login']);
                }
                endpoint = "api/v2/entities/suggested/groups";
                if (this.all)
                    endpoint += '/all';
                key = 'entities';
                break;
            case 'suggested':
                endpoint = "api/v2/entities/suggested/groups";
                key = 'entities';
                break;
            default:
                endpoint = "api/v1/groups/" + this.filter;
                key = 'groups';
                if (this.all)
                    this.router.navigate(['/groups/top']);
                break;
        }
        this.inProgress = true;
        this.client.get(endpoint, {
            limit: 12,
            offset: this.offset,
            rating: this.rating
        })
            .then(function (response) {
            var _a;
            if (!response[key] || response[key].length === 0) {
                _this.moreData = false;
                _this.inProgress = false;
                if (_this.filter == 'top')
                    _this.openHashtagsSelector();
                return false;
            }
            if (refresh) {
                _this.entities = response[key];
            }
            else {
                if (_this.offset)
                    response[key].shift();
                (_a = _this.entities).push.apply(_a, response[key]);
            }
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
    GroupsListComponent.prototype.reloadTopFeed = function () {
        this.load(true);
    };
    GroupsListComponent.prototype.onOptionsChange = function (e) {
        var _this = this;
        this.rating = e.rating;
        if (this.inProgress) {
            return setTimeout(function () {
                _this.onOptionsChange(e);
            }, 100); //keep trying every 100ms
        }
        this.load(true);
    };
    GroupsListComponent.prototype.detectWidth = function () {
        this.preventHashtagOverflow = window.innerWidth < 400;
    };
    GroupsListComponent.prototype.openHashtagsSelector = function () {
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
    ], GroupsListComponent.prototype, "detectWidth", null);
    GroupsListComponent = __decorate([
        core_1.Component({
            selector: 'm-groups--list',
            templateUrl: 'list.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            router_1.ActivatedRoute,
            router_1.Router,
            title_1.OpspotTitle,
            context_service_1.ContextService,
            session_1.Session,
            overlay_modal_1.OverlayModalService])
    ], GroupsListComponent);
    return GroupsListComponent;
}());
exports.GroupsListComponent = GroupsListComponent;
var profile_1 = require("./profile/profile");
exports.GroupsProfile = profile_1.GroupsProfile;
var create_1 = require("./create/create");
exports.GroupsCreator = create_1.GroupsCreator;
//# sourceMappingURL=list.component.js.map
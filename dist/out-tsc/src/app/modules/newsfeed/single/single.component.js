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
var session_1 = require("../../../services/session");
var context_service_1 = require("../../../services/context.service");
var NewsfeedSingleComponent = /** @class */ (function () {
    function NewsfeedSingleComponent(client, upload, router, route, context, session) {
        this.client = client;
        this.upload = upload;
        this.router = router;
        this.route = route;
        this.context = context;
        this.session = session;
        this.opspot = window.Opspot;
        this.inProgress = false;
        this.error = '';
        this.focusedCommentGuid = '';
    }
    NewsfeedSingleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.context.set('activity');
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['guid']) {
                _this.error = '';
                _this.activity = void 0;
                if (_this.route.snapshot.queryParamMap.has('comment_guid')) {
                    _this.focusedCommentGuid = _this.route.snapshot.queryParamMap.get('comment_guid');
                }
                _this.load(params['guid']);
            }
        });
    };
    NewsfeedSingleComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    /**
     * Load newsfeed
     */
    NewsfeedSingleComponent.prototype.load = function (guid) {
        var _this = this;
        this.context.set('activity');
        this.client.get('api/v1/newsfeed/single/' + guid, {}, { cache: true })
            .then(function (data) {
            _this.activity = data.activity;
            switch (_this.activity.subtype) {
                case 'image':
                case 'video':
                case 'album':
                    _this.router.navigate(['/media', _this.activity.guid], { replaceUrl: true });
                    break;
                case 'blog':
                    _this.router.navigate(['/blog/view', _this.activity.guid], { replaceUrl: true });
                    break;
            }
            if (_this.activity.ownerObj) {
                _this.context.set('activity', {
                    label: "@" + _this.activity.ownerObj.username + " posts",
                    nameLabel: "@" + _this.activity.ownerObj.username,
                    id: _this.activity.ownerObj.guid
                });
            }
            else if (_this.activity.owner_guid) {
                _this.context.set('activity', {
                    label: "this user's posts",
                    id: _this.activity.owner_guid
                });
            }
            else {
                _this.context.reset();
            }
        })
            .catch(function (e) {
            if (e.status === 0) {
                _this.error = 'Sorry, there was a timeout error.';
            }
            else {
                _this.error = 'Sorry, we couldn\'t load the activity';
            }
            _this.inProgress = false;
        });
    };
    NewsfeedSingleComponent.prototype.delete = function (activity) {
        this.router.navigate(['/newsfeed']);
    };
    NewsfeedSingleComponent = __decorate([
        core_1.Component({
            selector: 'm-newsfeed--single',
            templateUrl: 'single.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            api_1.Upload,
            router_1.Router,
            router_1.ActivatedRoute,
            context_service_1.ContextService,
            session_1.Session])
    ], NewsfeedSingleComponent);
    return NewsfeedSingleComponent;
}());
exports.NewsfeedSingleComponent = NewsfeedSingleComponent;
//# sourceMappingURL=single.component.js.map
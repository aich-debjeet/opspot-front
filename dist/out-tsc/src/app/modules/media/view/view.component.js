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
var recommended_service_1 = require("../components/video/recommended.service");
var attachment_1 = require("../../../services/attachment");
var context_service_1 = require("../../../services/context.service");
var title_1 = require("../../../services/ux/title");
var MediaViewComponent = /** @class */ (function () {
    function MediaViewComponent(session, client, router, title, route, attachment, context, cd) {
        this.session = session;
        this.client = client;
        this.router = router;
        this.title = title;
        this.route = route;
        this.attachment = attachment;
        this.context = context;
        this.cd = cd;
        this.opspot = window.Opspot;
        this.entity = {};
        this.inProgress = true;
        this.error = '';
        this.deleteToggle = false;
        this.theaterMode = false;
        this.menuOptions = ['edit', 'follow', 'feature', 'delete', 'report', 'set-explicit', 'subscribe', 'remove-explicit', 'rating'];
        this.focusedCommentGuid = '';
    }
    MediaViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle('');
        this.paramsSubscription = this.route.paramMap.subscribe(function (params) {
            if (params.get('guid')) {
                _this.guid = params.get('guid');
                _this.load(true);
            }
        });
        this.queryParamsSubscription$ = this.route.queryParamMap.subscribe(function (params) {
            _this.focusedCommentGuid = params.get('comment_guid');
            if (_this.focusedCommentGuid) {
                window.scrollTo(0, 500);
            }
        });
    };
    MediaViewComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
        this.queryParamsSubscription$.unsubscribe();
    };
    MediaViewComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (refresh) {
            this.entity = {};
            this.detectChanges();
        }
        this.inProgress = true;
        this.client.get('api/v1/media/' + this.guid, { children: false })
            .then(function (response) {
            _this.inProgress = false;
            if (response.entity.type !== 'object') {
                return;
            }
            if (response.entity) {
                _this.entity = response.entity;
                switch (_this.entity.subtype) {
                    case 'video':
                        _this.context.set('object:video');
                        break;
                    case 'image':
                        _this.context.set('object:image');
                        break;
                    default:
                        _this.context.reset();
                }
                if (_this.entity.title) {
                    _this.title.setTitle(_this.entity.title);
                }
            }
            _this.detectChanges();
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.error = 'Sorry, there was problem.';
        });
    };
    MediaViewComponent.prototype.delete = function () {
        var _this = this;
        this.client.delete('api/v1/media/' + this.guid)
            .then(function (response) {
            var type = _this.entity.subtype === 'video' ? 'videos' : 'images';
            _this.router.navigate(["/media/" + type + "/my"]);
        })
            .catch(function (e) {
            alert((e && e.message) || 'Server error');
        });
    };
    MediaViewComponent.prototype.getNext = function () {
        if (this.entity.container_guid === this.entity.owner_guid
            || !this.entity.album_children_guids
            || this.entity.album_children_guids.length <= 1) {
            return;
        }
        var pos = this.entity['album_children_guids'].indexOf(this.entity.guid);
        //bump up if less than 0
        if (pos <= 0)
            pos = 1;
        //bump one up if we are in the same position as ourself
        if (this.entity['album_children_guids'][pos] === this.entity.guid)
            pos++;
        //reset back to 0 if we are are the end
        if (pos >= this.entity['album_children_guids'].length)
            pos = 0;
        return this.entity['album_children_guids'][pos];
    };
    MediaViewComponent.prototype.menuOptionSelected = function (option) {
        switch (option) {
            case 'edit':
                this.router.navigate(['/media/edit', this.entity.guid]);
                break;
            case 'delete':
                this.delete();
                break;
            case 'set-explicit':
                this.setExplicit(true);
                break;
            case 'remove-explicit':
                this.setExplicit(false);
                break;
        }
    };
    MediaViewComponent.prototype.setExplicit = function (value) {
        var _this = this;
        this.entity.mature = value;
        this.detectChanges();
        this.client.post("api/v1/entities/explicit/" + this.entity.guid, { value: value ? '1' : '0' })
            .catch(function (e) {
            _this.entity.mature = !!_this.entity.mature;
            _this.detectChanges();
        });
    };
    MediaViewComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    MediaViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-media--view',
            templateUrl: 'view.component.html',
            providers: [{
                    provide: recommended_service_1.RecommendedService,
                    useFactory: recommended_service_1.RecommendedService._,
                    deps: [api_1.Client]
                }],
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            router_1.Router,
            title_1.OpspotTitle,
            router_1.ActivatedRoute,
            attachment_1.AttachmentService,
            context_service_1.ContextService,
            core_1.ChangeDetectorRef])
    ], MediaViewComponent);
    return MediaViewComponent;
}());
exports.MediaViewComponent = MediaViewComponent;
//# sourceMappingURL=view.component.js.map
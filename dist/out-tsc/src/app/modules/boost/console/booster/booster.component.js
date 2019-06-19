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
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var poster_component_1 = require("../../../newsfeed/poster/poster.component");
var BoostConsoleBooster = /** @class */ (function () {
    function BoostConsoleBooster(client, session, route, _componentFactoryResolver) {
        this.client = client;
        this.session = session;
        this.route = route;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.inProgress = false;
        this.loaded = false;
        this.posts = [];
        this.media = [];
    }
    BoostConsoleBooster.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.url.subscribe(function (segments) {
            _this.type = segments[0].path;
            _this.load();
        });
    };
    BoostConsoleBooster.prototype.load = function (refresh) {
        var _this = this;
        if (this.inProgress) {
            return Promise.resolve(false);
        }
        if (!refresh && this.loaded) {
            return Promise.resolve(true);
        }
        this.inProgress = true;
        var promises = [
            this.client.get('api/v1/newsfeed/personal'),
            this.client.get('api/v1/entities/owner')
        ];
        return Promise.all(promises)
            .then(function (responses) {
            _this.loaded = true;
            _this.inProgress = false;
            _this.posts = responses[0].activity || [];
            _this.media = responses[1].entities || [];
            // this.posts = [];
            // this.media = [];
            _this.loadComponent();
        })
            .catch(function (e) {
            _this.inProgress = false;
            return false;
        });
    };
    BoostConsoleBooster.prototype.loadComponent = function () {
        var _this = this;
        this.poster.clear();
        if (((this.type === 'offers' || this.type === 'newsfeed') && this.posts.length === 0)
            || (this.type === 'content' && this.media.length === 0)) {
            var componentFactory = this._componentFactoryResolver.resolveComponentFactory(poster_component_1.PosterComponent);
            this.componentRef = this.poster.createComponent(componentFactory);
            this.componentInstance = this.componentRef.instance;
            this.componentInstance.load.subscribe(function () {
                _this.load();
            });
        }
    };
    __decorate([
        core_1.Input('type'),
        __metadata("design:type", String)
    ], BoostConsoleBooster.prototype, "type", void 0);
    __decorate([
        core_1.ViewChild('poster', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], BoostConsoleBooster.prototype, "poster", void 0);
    BoostConsoleBooster = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-boost-console-booster',
            templateUrl: 'booster.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            session_1.Session,
            router_1.ActivatedRoute,
            core_1.ComponentFactoryResolver])
    ], BoostConsoleBooster);
    return BoostConsoleBooster;
}());
exports.BoostConsoleBooster = BoostConsoleBooster;
//# sourceMappingURL=booster.component.js.map
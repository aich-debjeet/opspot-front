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
var Discovery = /** @class */ (function () {
    function Discovery(session, client, router, route, title, context) {
        this.session = session;
        this.client = client;
        this.router = router;
        this.route = route;
        this.title = title;
        this.context = context;
        this._filter = 'featured';
        this._owner = '';
        this._type = 'all';
        this.entities = [];
        this.moreData = true;
        this.offset = '';
        this.inProgress = false;
        this.city = '';
        this.cities = [];
        this.nearby = false;
        this.hasNearby = false;
        this.distance = 5;
    }
    Discovery.prototype.ngOnInit = function () {
        var _this = this;
        this.title.setTitle('Discovery');
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['filter']) {
                _this._filter = params['filter'];
                switch (_this._filter) {
                    case 'all':
                        break;
                    case 'suggested':
                        if (!_this.session.isLoggedIn()) {
                            _this.router.navigate(['/discovery/featured/channels']);
                            return;
                        }
                        _this._type = 'channels';
                        if (_this.session.getLoggedInUser().city) {
                            _this.city = _this.session.getLoggedInUser().city;
                            _this.nearby = true;
                            _this.hasNearby = false;
                        }
                        break;
                    case 'trending':
                        _this._type = 'images';
                        break;
                    case 'featured':
                        _this._type = 'channels';
                        break;
                    case 'owner':
                        break;
                    default:
                        _this._owner = _this._filter;
                        _this._filter = _this._filter;
                }
            }
            if (params['type']) {
                _this._type = params['type'];
            }
            switch (_this._type) {
                case 'videos':
                    _this.context.set('object:video');
                    break;
                case 'images':
                    _this.context.set('object:image');
                    break;
                case 'channels':
                    _this.context.set('user');
                    break;
                default:
                    _this.context.reset();
            }
            _this.inProgress = false;
            _this.entities = [];
            _this.load(true);
        });
    };
    Discovery.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    Discovery.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress)
            return false;
        if (refresh)
            this.offset = '';
        this.inProgress = true;
        var filter = this._filter;
        if (this._owner)
            filter = 'owner';
        this.client.get('api/v1/entities/' + filter + '/' + this._type + '/' + this._owner, {
            limit: 24,
            offset: this.offset,
            skip: 0,
            nearby: this.nearby,
            distance: this.distance
        })
            .then(function (data) {
            if (!data.entities) {
                if (_this.nearby) {
                    _this.hasNearby = false;
                    return _this.setNearby(false);
                }
                _this.moreData = false;
                _this.inProgress = false;
                return false;
            }
            if (_this.nearby) {
                _this.hasNearby = true;
            }
            if (refresh) {
                _this.entities = data.entities;
            }
            else {
                if (_this.offset && filter != 'trending')
                    data.entities.shift();
                _this.entities = _this.entities.concat(data.entities);
            }
            _this.offset = data['load-next'];
            _this.inProgress = false;
            if (!_this.offset)
                _this.moreData = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
            if (_this.nearby) {
                _this.setNearby(false);
            }
        });
    };
    Discovery.prototype.pass = function (index) {
        var entity = this.entities[index];
        this.client.post('api/v1/entities/suggested/pass/' + entity.guid);
        this.pop(index);
    };
    Discovery.prototype.pop = function (index) {
        this.entities.splice(index, 1);
        if (this.entities.length < 3) {
            this.offset = 3;
            this.load(true);
        }
    };
    Discovery.prototype.findCity = function (q) {
        var _this = this;
        if (this.searching) {
            clearTimeout(this.searching);
        }
        this.searching = setTimeout(function () {
            _this.client.get('api/v1/geolocation/list', { q: q })
                .then(function (response) {
                _this.cities = response.results;
            });
        }, 100);
    };
    Discovery.prototype.setCity = function (row) {
        var _this = this;
        this.cities = [];
        if (row.address.city)
            window.Opspot.user.city = row.address.city;
        if (row.address.town)
            window.Opspot.user.city = row.address.town;
        this.city = window.Opspot.user.city;
        this.entities = [];
        this.inProgress = true;
        this.client.post('api/v1/channel/info', {
            coordinates: row.lat + ',' + row.lon,
            city: window.Opspot.user.city
        })
            .then(function (response) {
            _this.inProgress = false;
            _this.setNearby(true);
        });
    };
    Discovery.prototype.setNearby = function (nearby) {
        this.nearby = nearby;
        this.entities = [];
        this.load(true);
    };
    Discovery = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-discovery',
            templateUrl: 'discovery.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, router_1.Router, router_1.ActivatedRoute, title_1.OpspotTitle,
            context_service_1.ContextService])
    ], Discovery);
    return Discovery;
}());
exports.Discovery = Discovery;
//# sourceMappingURL=discovery.js.map
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var api_1 = require("../../services/api");
var title_1 = require("../../services/ux/title");
var storage_1 = require("../../services/storage");
var session_1 = require("../../services/session");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(client, route, router, title, storage, session) {
        this.client = client;
        this.route = route;
        this.router = router;
        this.title = title;
        this.storage = storage;
        this.session = session;
        this.q = '';
        this.type = '';
        this.container = '';
        this.offset = '';
        this.inProgress = false;
        this.moreData = true;
        this.optionsToggle = false;
        this.mature = false;
        this.paywall = true;
        this.rating = 2;
        this.ref = '';
        if (!this.session.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadOptions();
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (typeof params['q'] !== 'undefined') {
                _this.q = decodeURIComponent(params['q'] || '');
            }
            if (typeof params['type'] !== 'undefined') {
                _this.type = params['type'] || '';
            }
            if (typeof params['id'] !== 'undefined') {
                _this.container = params['id'] || '';
            }
            if (typeof params['ref'] !== 'undefined') {
                _this.ref = params['ref'] || '';
            }
            _this.reset();
            _this.inProgress = false;
            _this.offset = '';
            _this.search();
        });
        this.title.setTitle('Search');
    };
    SearchComponent.prototype.ngOnDestroy = function () {
        if (this.paramsSubscription)
            this.paramsSubscription.unsubscribe();
    };
    /**
     * Search
     */
    SearchComponent.prototype.search = function (refresh) {
        if (refresh === void 0) { refresh = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, endpoint, searchType, data, response, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.inProgress && !refresh) {
                            return [2 /*return*/];
                        }
                        this.inProgress = true;
                        this.searchType = !this.type || this.type == 'latest' ? 'hybrid' : 'simple';
                        if (refresh) {
                            this.reset();
                            this.offset = '';
                            this.moreData = true;
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        endpoint = 'api/v2/search', searchType = this.searchType;
                        data = {
                            q: this.q,
                            container: this.container || '',
                            limit: 12,
                            rating: this.rating,
                            offset: this.offset
                        };
                        if (searchType == 'hybrid') {
                            endpoint = 'api/v2/search/top';
                            data['sort'] = this.type;
                            if (this.hasRef('hashtag')) {
                                data['topLimits[user]'] = 2;
                                data['topLimits[group]'] = 0;
                            }
                        }
                        else {
                            data['taxonomies'] = this.type;
                        }
                        if (!this.mature) {
                            data['mature'] = 0;
                        }
                        else {
                            data.rating = 3; // explicit is now rating 3
                        }
                        if (!this.paywall) {
                            data['paywall'] = 0;
                        }
                        return [4 /*yield*/, this.client.get(endpoint, data)];
                    case 2:
                        response = _b.sent();
                        if (refresh) {
                            this.reset();
                        }
                        if (searchType == 'hybrid') {
                            this.hybridEntitiesPush(response.entities);
                        }
                        else {
                            (_a = this.entities).push.apply(_a, (response.entities || []));
                        }
                        if (response['load-next']) {
                            this.offset = response['load-next'];
                        }
                        else {
                            this.moreData = false;
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.inProgress = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SearchComponent.prototype.toggleOptions = function (forceValue) {
        if (typeof forceValue !== 'undefined') {
            this.optionsToggle = forceValue;
            return;
        }
        this.optionsToggle = !this.optionsToggle;
    };
    SearchComponent.prototype.toggleMature = function () {
        this.mature = !this.mature;
        this.search(true);
        this.saveOptions();
    };
    SearchComponent.prototype.togglePaywall = function () {
        this.paywall = !this.paywall;
        this.search(true);
        this.saveOptions();
    };
    SearchComponent.prototype.onWindowClick = function ($event) {
        this.toggleOptions(false);
    };
    SearchComponent.prototype.loadOptions = function () {
        var options = JSON.parse(this.storage.get('search:options') || '{}');
        if (typeof options['mature'] !== 'undefined') {
            this.mature = options['mature'];
        }
        if (typeof options['paywall'] !== 'undefined') {
            this.paywall = options['paywall'];
        }
    };
    SearchComponent.prototype.saveOptions = function () {
        this.storage.set('search:options', JSON.stringify({
            mature: this.mature,
            paywall: this.paywall
        }));
    };
    SearchComponent.prototype.hasRef = function (ref) {
        if (!this.ref) {
            return false;
        }
        var refs = this.ref.split('-');
        return refs.indexOf(ref) > -1;
    };
    SearchComponent.prototype.onOptionsChange = function (opts) {
        this.rating = opts.rating;
        this.search(true);
    };
    SearchComponent.prototype.reset = function () {
        this.entities = [];
        this.hybridEntities = {
            user: [],
            group: [],
            'object:video': [],
            'object:image': [],
            'object:blog': [],
            activity: []
        };
    };
    ;
    SearchComponent.prototype.hybridEntitiesPush = function (entities) {
        var _a;
        if (!entities) {
            return;
        }
        for (var key in this.hybridEntities) {
            if (typeof entities[key] !== 'undefined') {
                (_a = this.hybridEntities[key]).push.apply(_a, entities[key]);
            }
        }
    };
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-search',
            templateUrl: 'search.component.html',
            host: {
                '(window:click)': 'onWindowClick($event)'
            }
        }),
        __metadata("design:paramtypes", [api_1.Client,
            router_1.ActivatedRoute,
            router_1.Router,
            title_1.OpspotTitle,
            storage_1.Storage,
            session_1.Session])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map
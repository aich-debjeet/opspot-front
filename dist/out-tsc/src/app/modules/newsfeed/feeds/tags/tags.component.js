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
var context_service_1 = require("../../../../services/context.service");
var title_1 = require("../../../../services/ux/title");
var upload_1 = require("../../../../services/api/upload");
var api_1 = require("../../../../services/api");
var navigation_1 = require("../../../../services/navigation");
var storage_1 = require("../../../../services/storage");
var NewsfeedTagsComponent = /** @class */ (function () {
    function NewsfeedTagsComponent(client, upload, navigation, router, route, title, storage, context) {
        var _this = this;
        this.client = client;
        this.upload = upload;
        this.navigation = navigation;
        this.router = router;
        this.route = route;
        this.title = title;
        this.storage = storage;
        this.context = context;
        this.prepended = [];
        this.offset = 0;
        this.inProgress = false;
        this.moreData = true;
        this.opspot = window.Opspot;
        this.title.setTitle('Newsfeed');
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['tag']) {
                _this.tag = params['tag'];
            }
            else {
                _this.router.navigate(['/newsfeed']);
            }
            _this.load(true);
        });
        this.context.set('activity');
    }
    NewsfeedTagsComponent.prototype.ngOnDestroy = function () {
        if (this.paramsSubscription) {
            this.paramsSubscription.unsubscribe();
        }
    };
    /**
     * Load newsfeed
     */
    NewsfeedTagsComponent.prototype.load = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var data, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.inProgress)
                            return [2 /*return*/, false];
                        if (refresh) {
                            this.offset = 0;
                            this.newsfeed = [];
                        }
                        this.inProgress = true;
                        data = {
                            hashtag: this.tag,
                            limit: 12,
                            offset: this.offset,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.get('api/v2/entities/suggested/activities', data)];
                    case 2:
                        response = _a.sent();
                        if (!response.entities || !response.entities.length) {
                            this.moreData = false;
                            this.inProgress = false;
                            return [2 /*return*/, false];
                        }
                        if (this.newsfeed && !refresh) {
                            this.newsfeed = this.newsfeed.concat(response.entities);
                        }
                        else {
                            this.newsfeed = response.entities;
                        }
                        this.offset = response['load-next'];
                        this.inProgress = false;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.inProgress = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NewsfeedTagsComponent.prototype.delete = function (activity) {
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
    NewsfeedTagsComponent = __decorate([
        core_1.Component({
            selector: 'm-newsfeed--tags',
            templateUrl: 'tags.component.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            upload_1.Upload,
            navigation_1.Navigation,
            router_1.Router,
            router_1.ActivatedRoute,
            title_1.OpspotTitle,
            storage_1.Storage,
            context_service_1.ContextService])
    ], NewsfeedTagsComponent);
    return NewsfeedTagsComponent;
}());
exports.NewsfeedTagsComponent = NewsfeedTagsComponent;
//# sourceMappingURL=tags.component.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var client_1 = require("./api/client");
var AnalyticsService = /** @class */ (function () {
    function AnalyticsService(router, client) {
        var _this = this;
        this.router = router;
        this.client = client;
        this.defaultPrevented = false;
        this.onRouterInit();
        this.router.events.subscribe(function (navigationState) {
            if (navigationState instanceof router_1.NavigationEnd) {
                try {
                    _this.onRouteChanged(navigationState.urlAfterRedirects);
                }
                catch (e) {
                    console.error('Opspot: router hook(AnalyticsService)', e);
                }
            }
        });
    }
    AnalyticsService_1 = AnalyticsService;
    AnalyticsService._ = function (router, client) {
        return new AnalyticsService_1(router, client);
    };
    AnalyticsService.prototype.send = function (type, fields, entityGuid) {
        if (fields === void 0) { fields = {}; }
        if (entityGuid === void 0) { entityGuid = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (type === 'pageview') {
                    this.client.post('api/v2/analytics/pageview', fields);
                }
                else {
                    this.client.post('api/v1/analytics', { type: type, fields: fields, entityGuid: entityGuid });
                }
                return [2 /*return*/];
            });
        });
    };
    AnalyticsService.prototype.onRouterInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AnalyticsService.prototype.onRouteChanged = function (path) {
        if (!this.defaultPrevented) {
            this.send('pageview', {
                url: path,
                referrer: document.referrer
            });
        }
        this.defaultPrevented = false;
    };
    AnalyticsService.prototype.preventDefault = function () {
        this.defaultPrevented = true;
    };
    AnalyticsService.prototype.wasDefaultPrevented = function () {
        return this.defaultPrevented;
    };
    var AnalyticsService_1;
    AnalyticsService = AnalyticsService_1 = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(router_1.Router)), __param(1, core_1.Inject(client_1.Client)),
        __metadata("design:paramtypes", [router_1.Router, client_1.Client])
    ], AnalyticsService);
    return AnalyticsService;
}());
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analytics.js.map
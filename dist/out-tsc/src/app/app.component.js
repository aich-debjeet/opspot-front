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
var notification_service_1 = require("./modules/notifications/notification.service");
var analytics_1 = require("./services/analytics");
var sockets_1 = require("./services/sockets");
var session_1 = require("./services/session");
var login_referrer_service_1 = require("./services/login-referrer.service");
var scroll_to_top_service_1 = require("./services/scroll-to-top.service");
var context_service_1 = require("./services/context.service");
var web3_wallet_service_1 = require("./modules/blockchain/web3-wallet.service");
var client_1 = require("./services/api/client");
var webtorrent_service_1 = require("./modules/webtorrent/webtorrent.service");
var router_1 = require("@angular/router");
var onboarding_service_1 = require("./modules/onboarding/channel/onboarding.service");
var Opspot = /** @class */ (function () {
    function Opspot(session, route, notificationService, scrollToTop, analytics, sockets, loginReferrer, context, web3Wallet, client, webtorrent, onboardingService, router) {
        this.session = session;
        this.route = route;
        this.notificationService = notificationService;
        this.scrollToTop = scrollToTop;
        this.analytics = analytics;
        this.sockets = sockets;
        this.loginReferrer = loginReferrer;
        this.context = context;
        this.web3Wallet = web3Wallet;
        this.client = client;
        this.webtorrent = webtorrent;
        this.onboardingService = onboardingService;
        this.router = router;
        this.opspot = window.Opspot;
        this.showOnboarding = false;
        this.showTOSModal = false;
        this.name = 'Opspot';
    }
    Opspot.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.notificationService.getNotifications();
                this.session.isLoggedIn(function (is) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!is) return [3 /*break*/, 2];
                                _a = this;
                                return [4 /*yield*/, this.onboardingService.showModal()];
                            case 1:
                                _a.showOnboarding = _b.sent();
                                if (this.opspot.user.language !== this.opspot.language) {
                                    console.log('[app]:: language change', this.opspot.user.language, this.opspot.language);
                                    window.location.reload(true);
                                }
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                this.onboardingService.onClose.subscribe(function () {
                    _this.showOnboarding = false;
                    _this.router.navigate(['/newsfeed']);
                });
                this.onboardingService.onOpen.subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this;
                                return [4 /*yield*/, this.onboardingService.showModal(true)];
                            case 1:
                                _a.showOnboarding = _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                this.loginReferrer
                    .avoid([
                    '/login',
                    '/logout',
                    '/logout/all',
                    '/register',
                    '/forgot-password',
                ])
                    .listen();
                this.scrollToTop.listen();
                this.context.listen();
                this.web3Wallet.setUp();
                this.webtorrent.setUp();
                return [2 /*return*/];
            });
        });
    };
    Opspot.prototype.ngOnDestroy = function () {
        this.loginReferrer.unlisten();
        this.scrollToTop.unlisten();
        this.paramsSubscription.unsubscribe();
    };
    Opspot = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-app',
            templateUrl: 'app.component.html',
        }),
        __metadata("design:paramtypes", [session_1.Session,
            router_1.ActivatedRoute,
            notification_service_1.NotificationService,
            scroll_to_top_service_1.ScrollToTopService,
            analytics_1.AnalyticsService,
            sockets_1.SocketsService,
            login_referrer_service_1.LoginReferrerService,
            context_service_1.ContextService,
            web3_wallet_service_1.Web3WalletService,
            client_1.Client,
            webtorrent_service_1.WebtorrentService,
            onboarding_service_1.ChannelOnboardingService,
            router_1.Router])
    ], Opspot);
    return Opspot;
}());
exports.Opspot = Opspot;
//# sourceMappingURL=app.component.js.map
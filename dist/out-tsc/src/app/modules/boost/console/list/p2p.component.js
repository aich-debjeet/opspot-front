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
var boost_service_1 = require("../../boost.service");
var router_1 = require("@angular/router");
var BoostConsoleP2PListComponent = /** @class */ (function () {
    function BoostConsoleP2PListComponent(service, router) {
        this.service = service;
        this.router = router;
        this.initialized = false;
        this.inProgress = false;
        this.filter = '';
        this.boosts = [];
        this.offset = '';
        this.moreData = true;
        this.error = '';
    }
    Object.defineProperty(BoostConsoleP2PListComponent.prototype, "_filter", {
        set: function (filter) {
            if (filter !== 'inbox' && filter !== 'outbox') {
                this.router.navigate(['/boost/console/offers/history/inbox']);
            }
            this.filter = filter;
            if (this.initialized) {
                this.load(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    BoostConsoleP2PListComponent.prototype.ngOnInit = function () {
        this.load(true);
        this.initialized = true;
    };
    BoostConsoleP2PListComponent.prototype.load = function (refresh) {
        var _this = this;
        if ((this.inProgress && !refresh) || !this.filter) {
            return;
        }
        this.inProgress = true;
        if (refresh) {
            this.boosts = [];
            this.offset = '';
            this.moreData = true;
        }
        this.service.load('peer', this.filter, {
            offset: this.offset
        })
            .then(function (_a) {
            var boosts = _a.boosts, loadNext = _a.loadNext;
            var _b;
            _this.inProgress = false;
            if (!boosts.length) {
                _this.moreData = false;
                return;
            }
            (_b = _this.boosts).push.apply(_b, boosts);
            _this.offset = loadNext;
            _this.moreData = !!loadNext;
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.moreData = false;
            _this.error = (e && e.message) || '';
        });
    };
    __decorate([
        core_1.Input('filter'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BoostConsoleP2PListComponent.prototype, "_filter", null);
    BoostConsoleP2PListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [boost_service_1.BoostService],
            selector: 'm-boost-console-p2p',
            templateUrl: 'p2p.component.html'
        }),
        __metadata("design:paramtypes", [boost_service_1.BoostService, router_1.Router])
    ], BoostConsoleP2PListComponent);
    return BoostConsoleP2PListComponent;
}());
exports.BoostConsoleP2PListComponent = BoostConsoleP2PListComponent;
//# sourceMappingURL=p2p.component.js.map
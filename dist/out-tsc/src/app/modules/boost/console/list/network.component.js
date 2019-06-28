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
var boost_service_1 = require("../../boost.service");
var overlay_modal_1 = require("../../../../services/ux/overlay-modal");
var poster_modal_component_1 = require("../../../newsfeed/poster/poster-modal.component");
var BoostConsoleNetworkListComponent = /** @class */ (function () {
    function BoostConsoleNetworkListComponent(service, overlayModal, router) {
        this.service = service;
        this.overlayModal = overlayModal;
        this.router = router;
        this.initialized = false;
        this.inProgress = false;
        this.type = '';
        this.boosts = [];
        this.offset = '';
        this.moreData = true;
        this.error = '';
    }
    Object.defineProperty(BoostConsoleNetworkListComponent.prototype, "_type", {
        set: function (type) {
            this.type = type;
            if (this.initialized) {
                this.load(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    BoostConsoleNetworkListComponent.prototype.ngOnInit = function () {
        this.load(true);
        this.initialized = true;
    };
    BoostConsoleNetworkListComponent.prototype.showPoster = function () {
        var creator = this.overlayModal.create(poster_modal_component_1.ModalPosterComponent, {}, {
            class: 'm-overlay-modal--no-padding m-overlay-modal--top m-overlay-modal--medium m-overlay-modal--overflow'
        });
        creator.present();
    };
    BoostConsoleNetworkListComponent.prototype.load = function (refresh) {
        var _this = this;
        if ((this.inProgress && !refresh) || !this.type) {
            return;
        }
        this.inProgress = true;
        if (refresh) {
            this.boosts = [];
            this.offset = '';
            this.moreData = true;
        }
        var type = this.type === 'offers' ? 'peer' : this.type;
        this.service.load(type, '', {
            offset: this.offset
        })
            .then(function (_a) {
            var boosts = _a.boosts, loadNext = _a.loadNext;
            var _b;
            _this.inProgress = false;
            if (!boosts.length) {
                _this.moreData = false;
                if (_this.boosts.length == 0 && type == 'content') {
                    _this.router.navigate(['/boost/console/sidebar/create']);
                }
                else {
                    _this.router.navigate(['/boost/console/newsfeed/create']);
                }
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
        core_1.Input('type'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BoostConsoleNetworkListComponent.prototype, "_type", null);
    BoostConsoleNetworkListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [boost_service_1.BoostService],
            selector: 'm-boost-console-network',
            templateUrl: 'network.component.html'
        }),
        __metadata("design:paramtypes", [boost_service_1.BoostService,
            overlay_modal_1.OverlayModalService,
            router_1.Router])
    ], BoostConsoleNetworkListComponent);
    return BoostConsoleNetworkListComponent;
}());
exports.BoostConsoleNetworkListComponent = BoostConsoleNetworkListComponent;
//# sourceMappingURL=network.component.js.map
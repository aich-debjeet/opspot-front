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
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var wire_service_1 = require("../../wire.service");
var WireChannelOverviewComponent = /** @class */ (function () {
    function WireChannelOverviewComponent(wireService, client, session, cd) {
        var _this = this;
        this.wireService = wireService;
        this.client = client;
        this.session = session;
        this.cd = cd;
        this.ready = true;
        this.stats = {
            count: 0,
            tokens: 0,
            sent: 0
        };
        this.sentSubscription = this.wireService.wireSent.subscribe(function (wire) {
            _this.getStats();
        });
    }
    WireChannelOverviewComponent.prototype.ngOnInit = function () {
        this.getStats();
    };
    WireChannelOverviewComponent.prototype.ngOnDestroy = function () {
        if (this.sentSubscription)
            this.sentSubscription.unsubscribe();
    };
    WireChannelOverviewComponent.prototype.getStats = function () {
        var _this = this;
        this.client.get('api/v1/wire/sums/overview/' + this.channel.guid, {
            merchant: this.channel.merchant ? 1 : 0
        })
            .then(function (_a) {
            var count = _a.count, tokens = _a.tokens;
            _this.stats = {
                count: count,
                tokens: tokens,
                sent: _this.stats.sent
            };
            _this.detectChanges();
        });
        if (!this.canWire())
            return;
        this.client.get('api/v1/wire/rewards/' + this.channel.guid)
            .then(function (_a) {
            var sums = _a.sums;
            _this.stats.sent = sums.tokens;
            _this.detectChanges();
        });
    };
    WireChannelOverviewComponent.prototype.canWire = function () {
        return this.session.getLoggedInUser().guid !== this.channel.guid && this.session.isLoggedIn();
    };
    WireChannelOverviewComponent.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireChannelOverviewComponent.prototype, "channel", void 0);
    WireChannelOverviewComponent = __decorate([
        core_1.Component({
            selector: 'm-wire-channel--overview',
            templateUrl: 'overview.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [wire_service_1.WireService, api_1.Client, session_1.Session, core_1.ChangeDetectorRef])
    ], WireChannelOverviewComponent);
    return WireChannelOverviewComponent;
}());
exports.WireChannelOverviewComponent = WireChannelOverviewComponent;
//# sourceMappingURL=overview.component.js.map
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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var WireConsoleSupporterComponent = /** @class */ (function () {
    function WireConsoleSupporterComponent(client, currencyPipe, cd, session, route) {
        this.client = client;
        this.currencyPipe = currencyPipe;
        this.cd = cd;
        this.session = session;
        this.route = route;
        this.reverse = false;
        this.method = 'money';
        this.sum = 0;
        this.inProgress = false;
    }
    WireConsoleSupporterComponent.prototype.ngOnInit = function () {
        this.load();
    };
    WireConsoleSupporterComponent.prototype.load = function () {
        var _this = this;
        if (this.inProgress) {
            return;
        }
        this.inProgress = true;
        var endpoint = this.reverse ?
            "api/v1/wire/sums/sender/" + this.session.getLoggedInUser().guid + "/" + this.method + "/" + this.guid :
            "api/v1/wire/sums/sender/" + this.guid + "/" + this.method + "/" + this.session.getLoggedInUser().guid;
        this.client.get(endpoint, {})
            .then(function (_a) {
            var sum = _a.sum;
            _this.inProgress = false;
            _this.sum = sum;
            _this.cd.markForCheck();
            _this.cd.detectChanges();
        })
            .catch(function (e) {
            _this.inProgress = false;
            _this.cd.markForCheck();
            _this.cd.detectChanges();
            //this.error = e.message || 'Server error';
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WireConsoleSupporterComponent.prototype, "guid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireConsoleSupporterComponent.prototype, "supporter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WireConsoleSupporterComponent.prototype, "reverse", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WireConsoleSupporterComponent.prototype, "method", void 0);
    WireConsoleSupporterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wire-console--supporter',
            templateUrl: 'supporter.component.html',
            providers: [
                common_1.CurrencyPipe
            ]
        }),
        __metadata("design:paramtypes", [api_1.Client,
            common_1.CurrencyPipe,
            core_1.ChangeDetectorRef,
            session_1.Session,
            router_1.ActivatedRoute])
    ], WireConsoleSupporterComponent);
    return WireConsoleSupporterComponent;
}());
exports.WireConsoleSupporterComponent = WireConsoleSupporterComponent;
//# sourceMappingURL=supporter.component.js.map
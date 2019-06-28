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
var api_1 = require("../../../services/api");
var WireConsoleLedgerComponent = /** @class */ (function () {
    function WireConsoleLedgerComponent(client, currencyPipe, cd) {
        this.client = client;
        this.currencyPipe = currencyPipe;
        this.cd = cd;
        this.wires = [];
        this.inProgress = false;
        this.offset = '';
        this.moreData = false;
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        this.startDate = d.toISOString();
    }
    WireConsoleLedgerComponent.prototype.ngOnInit = function () {
        if (!this.type) {
            this.type = 'sent';
            if (window.Opspot.user.merchant && window.Opspot.user.merchant.exclusive) {
                this.type = 'received';
            }
        }
        if (!this.method) {
            this.method = 'points';
            if (window.Opspot.user.merchant) {
                this.method = 'money';
            }
            else if (window.Opspot.user.eth_wallet) {
                this.method = 'tokens';
            }
        }
        this.loadList(true);
    };
    WireConsoleLedgerComponent.prototype.setType = function (type) {
        this.type = type;
        this.loadList(true);
    };
    WireConsoleLedgerComponent.prototype.setMethod = function (method) {
        this.method = method;
        this.loadList(true);
    };
    WireConsoleLedgerComponent.prototype.loadList = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress) {
            return;
        }
        this.inProgress = true;
        if (refresh) {
            this.wires = [];
            this.offset = '';
            this.moreData = true;
        }
        return this.client.get("api/v1/wire/supporters", {
            offset: this.offset,
            limit: 12,
            type: this.type,
            method: this.method,
            start: Date.parse(this.startDate) / 1000
        })
            .then(function (_a) {
            var wires = _a.wires, loadNext = _a["load-next"];
            var _b;
            _this.inProgress = false;
            if (wires) {
                (_b = _this.wires).push.apply(_b, wires);
            }
            if (loadNext) {
                _this.offset = loadNext;
            }
            else {
                _this.moreData = false;
            }
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
    WireConsoleLedgerComponent.prototype.expand = function (i) {
        this.wires[i].expanded = !this.wires[i].expanded;
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    WireConsoleLedgerComponent.prototype.onStartDateChange = function (newDate) {
        this.startDate = newDate;
        this.inProgress = false;
        this.cd.markForCheck();
        this.cd.detectChanges();
        this.loadList(true);
    };
    WireConsoleLedgerComponent.prototype.canSelectMethod = function () {
        return !!window.Opspot.user.merchant;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WireConsoleLedgerComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WireConsoleLedgerComponent.prototype, "method", void 0);
    WireConsoleLedgerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wire-console--ledger',
            templateUrl: 'ledger.component.html',
            providers: [
                common_1.CurrencyPipe
            ]
        }),
        __metadata("design:paramtypes", [api_1.Client, common_1.CurrencyPipe, core_1.ChangeDetectorRef])
    ], WireConsoleLedgerComponent);
    return WireConsoleLedgerComponent;
}());
exports.WireConsoleLedgerComponent = WireConsoleLedgerComponent;
//# sourceMappingURL=ledger.component.js.map
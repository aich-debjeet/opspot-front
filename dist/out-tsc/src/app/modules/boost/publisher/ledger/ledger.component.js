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
var client_1 = require("../../../../services/api/client");
var session_1 = require("../../../../services/session");
var BoostPublisherLedgerComponent = /** @class */ (function () {
    function BoostPublisherLedgerComponent(client, session) {
        this.client = client;
        this.session = session;
        this.opspot = window.Opspot;
        this.inProgress = false;
        this.rows = [];
    }
    BoostPublisherLedgerComponent.prototype.ngOnInit = function () {
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        this.startDate = d.toISOString();
        d.setMonth(d.getMonth() + 1);
        this.endDate = d.toISOString();
    };
    BoostPublisherLedgerComponent.prototype.loadList = function (refresh) {
    };
    BoostPublisherLedgerComponent.prototype.onStartDateChange = function (newDate) {
        this.startDate = newDate;
        this.loadList(true);
    };
    BoostPublisherLedgerComponent.prototype.onEndDateChange = function (newDate) {
        this.endDate = newDate;
        this.loadList(true);
    };
    BoostPublisherLedgerComponent = __decorate([
        core_1.Component({
            selector: 'm-boost-publisher--ledger',
            templateUrl: 'ledger.component.html'
        }),
        __metadata("design:paramtypes", [client_1.Client,
            session_1.Session])
    ], BoostPublisherLedgerComponent);
    return BoostPublisherLedgerComponent;
}());
exports.BoostPublisherLedgerComponent = BoostPublisherLedgerComponent;
//# sourceMappingURL=ledger.component.js.map
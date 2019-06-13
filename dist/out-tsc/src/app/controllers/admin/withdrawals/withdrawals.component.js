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
var api_1 = require("../../../services/api");
var router_1 = require("@angular/router");
var AdminWithdrawals = /** @class */ (function () {
    function AdminWithdrawals(client, route) {
        this.client = client;
        this.route = route;
        this.withdrawals = [];
        this.inProgress = false;
        this.moreData = true;
        this.offset = '';
        this.user = '';
    }
    AdminWithdrawals.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.user = params['user'] || '';
            _this.load(true);
        });
        this.load();
    };
    AdminWithdrawals.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.inProgress && !refresh) {
            return;
        }
        if (refresh) {
            this.withdrawals = [];
            this.offset = '';
            this.moreData = true;
        }
        if (!this.moreData) {
            return false;
        }
        this.inProgress = true;
        this.client.get("api/v2/admin/rewards/withdrawals", {
            limit: 50,
            offset: this.offset,
            user: this.user
        })
            .then(function (response) {
            var _a;
            if (!response.withdrawals) {
                _this.inProgress = false;
                _this.moreData = false;
                return;
            }
            (_a = _this.withdrawals).push.apply(_a, response.withdrawals);
            _this.inProgress = false;
            if (response['load-next']) {
                _this.offset = response['load-next'];
            }
            else {
                _this.moreData = false;
            }
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    AdminWithdrawals = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-admin-withdrawals',
            templateUrl: 'withdrawals.component.html',
        }),
        __metadata("design:paramtypes", [api_1.Client,
            router_1.ActivatedRoute])
    ], AdminWithdrawals);
    return AdminWithdrawals;
}());
exports.AdminWithdrawals = AdminWithdrawals;
//# sourceMappingURL=withdrawals.component.js.map
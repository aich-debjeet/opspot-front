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
var api_1 = require("../../../services/api");
var AdminPayouts = /** @class */ (function () {
    function AdminPayouts(client, route) {
        this.client = client;
        this.route = route;
        this.payouts = [];
        this.inProgress = false;
        this.moreData = true;
        this.offset = '';
        this.reviewing = null;
    }
    AdminPayouts.prototype.ngOnInit = function () {
        this.load();
    };
    AdminPayouts.prototype.load = function () {
        var _this = this;
        if (this.inProgress) {
            return;
        }
        this.inProgress = true;
        this.client.get("api/v1/admin/monetization/payouts/queue", { limit: 50, offset: this.offset })
            .then(function (response) {
            var _a;
            if (!response.payouts) {
                _this.inProgress = false;
                _this.moreData = false;
                return;
            }
            (_a = _this.payouts).push.apply(_a, response.payouts);
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
    AdminPayouts.prototype.removeFromList = function (index) {
        this.payouts.splice(index, 1);
    };
    AdminPayouts.prototype.review = function (index) {
        this.reviewing = index;
    };
    AdminPayouts.prototype.pay = function (index) {
        var _this = this;
        if (!window.confirm('Payment has no UNDO. Proceed?')) {
            return;
        }
        this.inProgress = true;
        this.reviewing = null;
        this.client.post("api/v1/admin/monetization/payouts/" + this.payouts[index].guid)
            .then(function (response) {
            _this.removeFromList(index);
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    AdminPayouts = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-admin-payouts',
            templateUrl: 'payouts.component.html',
        }),
        __metadata("design:paramtypes", [api_1.Client, router_1.ActivatedRoute])
    ], AdminPayouts);
    return AdminPayouts;
}());
exports.AdminPayouts = AdminPayouts;
//# sourceMappingURL=payouts.component.js.map
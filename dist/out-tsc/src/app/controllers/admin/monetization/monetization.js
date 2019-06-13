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
var AdminMonetization = /** @class */ (function () {
    function AdminMonetization(client, route) {
        this.client = client;
        this.route = route;
        this.entities = [];
        this.inProgress = false;
        this.moreData = true;
        this.offset = '';
    }
    AdminMonetization.prototype.ngOnInit = function () {
        this.load();
    };
    AdminMonetization.prototype.load = function () {
        var _this = this;
        if (this.inProgress) {
            return;
        }
        this.inProgress = true;
        this.client.get("api/v1/admin/paywall/review", { limit: 12, offset: this.offset })
            .then(function (response) {
            var _a;
            if (!response.entities) {
                _this.inProgress = false;
                _this.moreData = false;
                return;
            }
            (_a = _this.entities).push.apply(_a, response.entities);
            if (response['load-next']) {
                _this.offset = response['load-next'];
            }
            else {
                _this.moreData = false;
            }
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    AdminMonetization.prototype.removeFromList = function (index) {
        this.entities.splice(index, 1);
    };
    AdminMonetization.prototype.deMonetize = function (entity, index) {
        var _this = this;
        this.client.post("api/v1/admin/paywall/" + entity.guid + "/demonetize", {})
            .then(function (response) {
            if (response.status !== 'success') {
                alert('There was a problem demonetizing this content. Please try again.');
                return;
            }
            _this.removeFromList(index);
        })
            .catch(function (e) {
            alert('There was a problem demonetizing this content. Please try again.');
        });
    };
    AdminMonetization = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-admin-monetization',
            templateUrl: 'monetization.html',
        }),
        __metadata("design:paramtypes", [api_1.Client, router_1.ActivatedRoute])
    ], AdminMonetization);
    return AdminMonetization;
}());
exports.AdminMonetization = AdminMonetization;
//# sourceMappingURL=monetization.js.map
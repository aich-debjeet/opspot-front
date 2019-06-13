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
var AdminPrograms = /** @class */ (function () {
    function AdminPrograms(client, route) {
        this.client = client;
        this.route = route;
        this.applications = [];
        this.inProgress = false;
        this.moreData = true;
        this.offset = '';
        this.reviewing = null;
    }
    AdminPrograms.prototype.ngOnInit = function () {
        this.load();
    };
    AdminPrograms.prototype.load = function () {
        var _this = this;
        if (this.inProgress) {
            return;
        }
        this.inProgress = true;
        this.client.get("api/v1/admin/programs/queue", { limit: 50, offset: this.offset })
            .then(function (response) {
            var _a;
            if (!response.applications) {
                _this.inProgress = false;
                _this.moreData = false;
                return;
            }
            (_a = _this.applications).push.apply(_a, response.applications);
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
    AdminPrograms.prototype.removeFromList = function (index) {
        this.applications.splice(index, 1);
    };
    AdminPrograms.prototype.review = function (index) {
        this.reviewing = index;
    };
    AdminPrograms.prototype.accept = function (index) {
        var _this = this;
        if (!window.confirm('User will be ACCEPTED. There is no UNDO. Proceed?')) {
            return;
        }
        this.inProgress = true;
        this.reviewing = null;
        this.client.put("api/v1/admin/programs/" + this.applications[index].guid)
            .then(function (response) {
            _this.removeFromList(index);
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    AdminPrograms.prototype.reject = function (index) {
        var _this = this;
        if (!window.confirm('User will be REJECTED. There is no UNDO. Proceed?')) {
            return;
        }
        this.inProgress = true;
        this.reviewing = null;
        this.client.delete("api/v1/admin/programs/" + this.applications[index].guid)
            .then(function (response) {
            _this.removeFromList(index);
            _this.inProgress = false;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    AdminPrograms = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-admin-programs',
            templateUrl: 'programs.component.html',
        }),
        __metadata("design:paramtypes", [api_1.Client, router_1.ActivatedRoute])
    ], AdminPrograms);
    return AdminPrograms;
}());
exports.AdminPrograms = AdminPrograms;
//# sourceMappingURL=programs.component.js.map
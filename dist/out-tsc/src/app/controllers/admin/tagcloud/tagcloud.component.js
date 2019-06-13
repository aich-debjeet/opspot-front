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
var AdminTagcloud = /** @class */ (function () {
    function AdminTagcloud(client) {
        this.client = client;
        this.tags = [];
        this.age = false;
        this.hidden = [];
    }
    AdminTagcloud.prototype.ngOnInit = function () {
        this.load();
    };
    AdminTagcloud.prototype.load = function () {
        var _this = this;
        this.client.get("api/v1/admin/tagcloud")
            .then(function (_a) {
            var tags = _a.tags, age = _a.age, hidden = _a.hidden;
            _this.tags = tags;
            _this.age = age !== false ? Math.floor(age / 60) : false;
            _this.hidden = hidden;
        })
            .catch(function (e) {
            alert("Error loading tags: " + e.message);
        });
    };
    AdminTagcloud.prototype.hide = function (index, tag) {
        var _this = this;
        if (!confirm("Are you sure you want to hide #" + tag + "? This hashtag won't appear again.")) {
            return;
        }
        this.tags.splice(index, 1);
        this.client.delete("api/v1/admin/tagcloud/" + tag)
            .then(function () {
            _this.load();
        })
            .catch(function (e) {
            _this.load();
            alert("Error deleting #" + tag + "!");
        });
    };
    AdminTagcloud.prototype.unhide = function (index, tag) {
        var _this = this;
        if (!confirm("Are you sure you want to unhide #" + tag + "? This hashtag will start appearing.")) {
            return;
        }
        this.hidden.splice(index, 1);
        this.client.put("api/v1/admin/tagcloud/" + tag)
            .then(function () {
            _this.load();
        })
            .catch(function (e) {
            _this.load();
            alert("Error showing #" + tag + "!");
        });
    };
    AdminTagcloud.prototype.resync = function () {
        var _this = this;
        if (!confirm("Are you sure you want to re-sync? This will wipe the caches.")) {
            return;
        }
        this.client.post("api/v1/admin/tagcloud/refresh")
            .then(function () {
            _this.load();
        })
            .catch(function (e) {
            alert("Error resyncing!");
        });
    };
    AdminTagcloud = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-admin-tagcloud',
            templateUrl: 'tagcloud.component.html',
        }),
        __metadata("design:paramtypes", [api_1.Client])
    ], AdminTagcloud);
    return AdminTagcloud;
}());
exports.AdminTagcloud = AdminTagcloud;
//# sourceMappingURL=tagcloud.component.js.map
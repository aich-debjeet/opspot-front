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
var storage_1 = require("../storage");
var RecentService = /** @class */ (function () {
    function RecentService(storage) {
        this.storage = storage;
    }
    RecentService_1 = RecentService;
    RecentService.prototype.store = function (key, entry, cleanupFn) {
        var data = this.read(key);
        if (cleanupFn) {
            data = data.filter(function (e) { return !cleanupFn(e); });
        }
        data.unshift(entry);
        this.write(key, data);
        return this;
    };
    RecentService.prototype.fetch = function (key, limit) {
        var data = this.read(key);
        if (limit) {
            data.splice(0, data.length - limit);
        }
        return data;
    };
    RecentService.prototype.splice = function (key, deleteCount) {
        this.write(key, this.read(key).splice(0, deleteCount));
        return this;
    };
    //
    RecentService.prototype.read = function (key) {
        return JSON.parse(this.storage.get("recent:" + key) || '[]');
    };
    RecentService.prototype.write = function (key, data) {
        this.storage.set("recent:" + key, JSON.stringify(data));
    };
    //
    RecentService._ = function (storage) {
        return new RecentService_1(storage);
    };
    var RecentService_1;
    RecentService = RecentService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [storage_1.Storage])
    ], RecentService);
    return RecentService;
}());
exports.RecentService = RecentService;
//# sourceMappingURL=recent.js.map
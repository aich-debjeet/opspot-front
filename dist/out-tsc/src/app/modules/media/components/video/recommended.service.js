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
var RecommendedService = /** @class */ (function () {
    function RecommendedService(client) {
        this.client = client;
        this.recommended = [];
    }
    RecommendedService_1 = RecommendedService;
    RecommendedService._ = function (client) {
        return new RecommendedService_1(client);
    };
    RecommendedService.prototype.getRecommended = function (type, channel, params) {
        var _this = this;
        return this.client.get("api/v1/media/recommended/" + type + "/" + channel, params)
            .then(function (_a) {
            var entities = _a.entities;
            _this.recommended = entities;
            return entities;
        });
    };
    RecommendedService.prototype.getFirstRecommended = function () {
        if (this.recommended.length > 0) {
            return this.recommended[0];
        }
        else {
            return false;
        }
    };
    var RecommendedService_1;
    RecommendedService = RecommendedService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_1.Client])
    ], RecommendedService);
    return RecommendedService;
}());
exports.RecommendedService = RecommendedService;
//# sourceMappingURL=recommended.service.js.map
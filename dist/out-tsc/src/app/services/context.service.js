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
var storage_1 = require("./storage");
var client_1 = require("./api/client");
var ContextService = /** @class */ (function () {
    function ContextService(router, storage, client) {
        this.router = router;
        this.storage = storage;
        this.client = client;
    }
    ContextService_1 = ContextService;
    ContextService._ = function (router, storage, client) {
        return new ContextService_1(router, storage, client);
    };
    ContextService.prototype.listen = function () {
        var _this = this;
        this._routerListener = this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                _this.reset();
            }
        });
        return this;
    };
    ContextService.prototype.unlisten = function () {
        this._routerListener.unsubscribe();
        return this;
    };
    ContextService.prototype.reset = function () {
        this.context = null;
    };
    ContextService.prototype.set = function (product, entity) {
        var label = this.getProductLabel(product) || product;
        this.context = { product: product, label: label, entity: entity };
        if (entity && entity.nameLabel) {
            this._storeLabel(entity.id, entity.nameLabel);
        }
    };
    ContextService.prototype.get = function () {
        return this.context;
    };
    ContextService.prototype.getProductLabel = function (product) {
        var label = '';
        switch (product) {
            case 'activity':
                label = 'posts';
                break;
            case 'user':
                label = 'channels';
                break;
            case 'object:video':
                label = 'videos';
                break;
            case 'object:image':
                label = 'images';
                break;
            case 'object:blog':
                label = 'blogs';
                break;
            case 'group':
                label = 'groups';
                break;
        }
        return label;
    };
    // Context name label resolution
    ContextService.prototype.resolveLabel = function (guid) {
        var _this = this;
        var cache = this._fetchLabel(guid);
        if (cache !== null) {
            return Promise.resolve(cache);
        }
        return this.client.get("api/v1/entities/entity/" + guid)
            .then(function (response) {
            if (!response || !response.entity) {
                return '';
            }
            var label = '';
            if (response.entity.username) {
                label = "@" + response.entity.username;
            }
            else if (response.entity.name) {
                label = response.entity.name;
            }
            _this._storeLabel(guid, label);
            return label;
        });
    };
    ContextService.prototype.resolveStaticLabel = function (product) {
        return Promise.resolve(this.getProductLabel(product) || 'Opspot');
    };
    ContextService.prototype._storeLabel = function (guid, label) {
        var cache = JSON.parse(this.storage.get('context-label-cache') || "{}");
        cache[guid] = label;
        this.storage.set('context-label-cache', JSON.stringify(cache));
    };
    ContextService.prototype._fetchLabel = function (guid) {
        var cache = JSON.parse(this.storage.get('context-label-cache') || "{}");
        if (typeof cache[guid] !== 'undefined') {
            return cache[guid];
        }
        return null;
    };
    var ContextService_1;
    ContextService = ContextService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, storage_1.Storage, client_1.Client])
    ], ContextService);
    return ContextService;
}());
exports.ContextService = ContextService;
//# sourceMappingURL=context.service.js.map
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
var recommended_service_1 = require("../../components/video/recommended.service");
var MediaViewRecommendedComponent = /** @class */ (function () {
    function MediaViewRecommendedComponent(service) {
        this.service = service;
        this.entities = [];
        this.initialized = false;
        this.loaded = false;
    }
    Object.defineProperty(MediaViewRecommendedComponent.prototype, "_opts", {
        set: function (_a) {
            var current = _a.current, next = _a.next, channel = _a.channel, type = _a.type;
            this.current = current || '';
            this.next = next || '';
            this.channel = channel;
            this.type = type;
            if (this.initialized) {
                this.load(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    MediaViewRecommendedComponent.prototype.ngOnInit = function () {
        this.initialized = true;
        this.load(true);
    };
    MediaViewRecommendedComponent.prototype.load = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.loaded && !refresh) {
            return;
        }
        this.loaded = true;
        this.service.getRecommended(this.type, this.channel, {
            current: this.current,
            next: this.next,
            limit: this.limit
        }).then(function (entities) {
            if (!entities) {
                _this.entities = [];
                return;
            }
            _this.entities = entities;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MediaViewRecommendedComponent.prototype, "limit", void 0);
    __decorate([
        core_1.Input('opts'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MediaViewRecommendedComponent.prototype, "_opts", null);
    MediaViewRecommendedComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-media--recommended',
            templateUrl: 'recommended.component.html'
        }),
        __metadata("design:paramtypes", [recommended_service_1.RecommendedService])
    ], MediaViewRecommendedComponent);
    return MediaViewRecommendedComponent;
}());
exports.MediaViewRecommendedComponent = MediaViewRecommendedComponent;
//# sourceMappingURL=recommended.component.js.map
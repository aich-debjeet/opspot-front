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
var features_service_1 = require("../../services/features.service");
var IfFeatureDirective = /** @class */ (function () {
    function IfFeatureDirective(_templateRef, _viewContainerRef, _featuresService) {
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
        this._featuresService = _featuresService;
    }
    Object.defineProperty(IfFeatureDirective.prototype, "mIfFeature", {
        set: function (feature) {
            this._currentValue = this._featuresService.has(feature);
            this._update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfFeatureDirective.prototype, "mIfFeatureElse", {
        set: function (templateRef) {
            this._elseTemplateRef = templateRef;
            this._update();
        },
        enumerable: true,
        configurable: true
    });
    IfFeatureDirective.prototype._update = function () {
        if (this._currentValue) {
            if (!this._viewRef) {
                this._viewContainerRef.clear();
                this._elseViewRef = void 0;
                if (this._templateRef) {
                    this._viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef);
                }
            }
        }
        else {
            if (!this._elseViewRef) {
                this._viewContainerRef.clear();
                this._viewRef = void 0;
                if (this._elseTemplateRef) {
                    this._elseViewRef = this._viewContainerRef.createEmbeddedView(this._elseTemplateRef);
                }
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IfFeatureDirective.prototype, "mIfFeature", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef),
        __metadata("design:paramtypes", [core_1.TemplateRef])
    ], IfFeatureDirective.prototype, "mIfFeatureElse", null);
    IfFeatureDirective = __decorate([
        core_1.Directive({
            selector: '[mIfFeature]'
        }),
        __metadata("design:paramtypes", [core_1.TemplateRef,
            core_1.ViewContainerRef,
            features_service_1.FeaturesService])
    ], IfFeatureDirective);
    return IfFeatureDirective;
}());
exports.IfFeatureDirective = IfFeatureDirective;
//# sourceMappingURL=if-feature.directive.js.map
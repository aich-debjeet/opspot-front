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
var dynamic_host_directive_1 = require("../../directives/dynamic-host.directive");
var user_1 = require("../../../modules/legacy/components/cards/user/user");
var activity_1 = require("../../../modules/legacy/components/cards/activity/activity");
var card_1 = require("../../../modules/groups/card/card");
var image_1 = require("../../../modules/legacy/components/cards/object/image/image");
var video_1 = require("../../../modules/legacy/components/cards/object/video/video");
var album_1 = require("../../../modules/legacy/components/cards/object/album/album");
var card_2 = require("../../../modules/blogs/card/card");
var OpspotCard = /** @class */ (function () {
    function OpspotCard(_componentFactoryResolver) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this.object = {};
        this.cssClasses = '';
        this.flags = {};
        this.initialized = false;
    }
    Object.defineProperty(OpspotCard.prototype, "_object", {
        set: function (value) {
            var _this = this;
            var oldType = this.type;
            this.object = value ? value : {};
            this.type = (this.object.type || '') + "/" + (this.object.subtype || '');
            if (this.initialized) {
                if (!this.componentInstance || this.type !== oldType) {
                    setTimeout(function () { return _this.loadComponent(); }, 0);
                }
                else {
                    this.updateData();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotCard.prototype, "_hostClass", {
        set: function (value) {
            this.cssClasses = value || '';
            if (this.initialized) {
                this.updateClasses();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotCard.prototype, "_flags", {
        set: function (value) {
            this.flags = value || {};
            if (this.initialized) {
                this.updateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    OpspotCard.prototype.ngAfterViewInit = function () {
        this.loadComponent();
        this.initialized = true;
    };
    OpspotCard.prototype.resolveComponentClass = function (object) {
        if (!object) {
            return null;
        }
        if (object.type === 'user') {
            return user_1.UserCard;
        }
        else if (object.type === 'activity') {
            return activity_1.Activity;
        }
        else if (object.type === 'group') {
            return card_1.GroupsCard;
        }
        else if (object.subtype === 'image') {
            return image_1.ImageCard;
        }
        else if (object.subtype === 'video') {
            return video_1.VideoCard;
        }
        else if (object.subtype === 'blog') {
            return card_2.BlogCard;
        }
        else if (object.subtype === 'album') {
            return album_1.AlbumCard;
        }
        return null;
    };
    OpspotCard.prototype.loadComponent = function () {
        var componentClass = this.resolveComponentClass(this.object);
        if (!componentClass) {
            return;
        }
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentClass), viewContainerRef = this.cardHost.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentInstance = this.componentRef.instance;
        this.anchorRef = viewContainerRef.element;
        this.updateData();
        this.updateClasses();
    };
    OpspotCard.prototype.updateData = function () {
        if (!this.componentInstance) {
            return;
        }
        if (this.object.type === 'group') {
            this.componentInstance.group = this.object;
        }
        else if (this.object.subtype === 'blog') {
            this.componentInstance._blog = this.object;
        }
        else {
            this.componentInstance.object = this.object;
            if (this.object.type === 'activity') {
                this.componentInstance.hideTabs = this.flags.hideTabs || false;
            }
        }
        this.componentRef.changeDetectorRef.detectChanges();
    };
    OpspotCard.prototype.updateClasses = function () {
        if (!this.anchorRef || !this.anchorRef.nativeElement) {
            return;
        }
        // @note: find a better way (when Angular implements one)
        this.anchorRef.nativeElement.nextSibling.className = this.cssClasses;
    };
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", dynamic_host_directive_1.DynamicHostDirective)
    ], OpspotCard.prototype, "cardHost", void 0);
    __decorate([
        core_1.Input('object'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], OpspotCard.prototype, "_object", null);
    __decorate([
        core_1.Input('hostClass'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], OpspotCard.prototype, "_hostClass", null);
    __decorate([
        core_1.Input('flags'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], OpspotCard.prototype, "_flags", null);
    OpspotCard = __decorate([
        core_1.Component({
            selector: 'opspot-card',
            template: "\n    <ng-template dynamic-host></ng-template>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], OpspotCard);
    return OpspotCard;
}());
exports.OpspotCard = OpspotCard;
//# sourceMappingURL=card.component.js.map
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
var dynamic_host_directive_1 = require("../../../common/directives/dynamic-host.directive");
var preview_1 = require("../../legacy/components/cards/activity/preview");
// had forwardRef(() => ActivityPreview)
var RemindComposerModal = /** @class */ (function () {
    function RemindComposerModal(_componentFactoryResolver) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this.open = false;
        this.closed = new core_1.EventEmitter();
        this.post = new core_1.EventEmitter();
        this.object = {};
        this.message = '';
    }
    Object.defineProperty(RemindComposerModal.prototype, "_object", {
        set: function (object) {
            this.object = object;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RemindComposerModal.prototype, "_default", {
        set: function (message) {
            this.message = message;
        },
        enumerable: true,
        configurable: true
    });
    RemindComposerModal.prototype.ngAfterViewInit = function () {
        this.loadPreview();
    };
    RemindComposerModal.prototype.close = function (e) {
        this.open = false;
        this.closed.next(true);
    };
    RemindComposerModal.prototype.send = function () {
        this.post.next({
            message: this.message
        });
        this.close();
    };
    RemindComposerModal.prototype.loadPreview = function () {
        var previewFactory = this._componentFactoryResolver.resolveComponentFactory(preview_1.ActivityPreview), viewContainerRef = this.cardHost.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(previewFactory);
        if (this.object && !this.object.remind_object) {
            componentRef.instance.object = this.object;
        }
        else if (this.object && this.object.remind_object) {
            componentRef.instance.object = this.object.remind_object;
        }
        componentRef.changeDetectorRef.detectChanges();
    };
    __decorate([
        core_1.ViewChild(dynamic_host_directive_1.DynamicHostDirective),
        __metadata("design:type", dynamic_host_directive_1.DynamicHostDirective)
    ], RemindComposerModal.prototype, "cardHost", void 0);
    RemindComposerModal = __decorate([
        core_1.Component({
            selector: 'm-modal-remind-composer',
            inputs: ['_default: default', 'open', '_object: object'],
            outputs: ['closed', 'post'],
            template: "\n    <m-modal [open]=\"open\" (closed)=\"close($event)\" class=\"mdl-color-text--blue-grey-700\">\n\n      <div class=\"m-modal-remind-composer\">\n        <h3 class=\"m-modal-remind-title\" i18n=\"@@MODALS__REMIND_COMPOSER__REMIND_TITLE\">Remind</h3>\n\n        <textarea name=\"message\"\n          [(ngModel)]=\"message\"\n          placeholder=\"Enter your remind status here (optional)\"\n          i18n-placeholder=\"@@MODALS__REMIND_COMPOSER__PLACEHOLDER\"\n          [autoGrow]\n          ></textarea>\n\n        <div class=\"m-modal-remind-composer-buttons\">\n          <a class=\"m-modal-remind-composer-send\" (click)=\"send()\">\n            <i class=\"material-icons\">send</i>\n          </a>\n        </div>\n      </div>\n\n      <ng-template dynamic-host></ng-template>\n    </m-modal>\n  "
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], RemindComposerModal);
    return RemindComposerModal;
}());
exports.RemindComposerModal = RemindComposerModal;
//# sourceMappingURL=remind-composer.js.map
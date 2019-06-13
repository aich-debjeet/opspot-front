"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var OpspotFatBanner = /** @class */ (function () {
    function OpspotFatBanner() {
        this.opspot = window.Opspot;
        this.editing = false;
        this.src = '';
        this.index = 0;
        this.top = 0;
        this.added = new core_1.EventEmitter();
    }
    Object.defineProperty(OpspotFatBanner.prototype, "_object", {
        set: function (value) {
            if (!value)
                return;
            this.object = value;
            this.src = '/fs/v1/banners/' + this.object.guid + '/' + this.top + '/' + this.object.last_updated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotFatBanner.prototype, "_src", {
        set: function (value) {
            this.src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotFatBanner.prototype, "_top", {
        set: function (value) {
            if (!value)
                return;
            this.top = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotFatBanner.prototype, "_editMode", {
        set: function (value) {
            this.editing = value;
        },
        enumerable: true,
        configurable: true
    });
    OpspotFatBanner.prototype.add = function (e) {
        var _this = this;
        if (!this.editing)
            return;
        var element = e.target ? e.target : e.srcElement;
        this.file = element ? element.files[0] : null;
        /**
         * Set a live preview
         */
        var reader = new FileReader();
        reader.onloadend = function () {
            _this.src = typeof reader.result === 'string' ? reader.result : reader.result.toString();
        };
        reader.readAsDataURL(this.file);
        element.value = '';
    };
    OpspotFatBanner.prototype.cancel = function () {
        this.file = null;
    };
    Object.defineProperty(OpspotFatBanner.prototype, "_done", {
        /**
         * An upstream done event, which triggers the export process. Usually called from carousels
         */
        set: function (value) {
            if (value)
                this.done();
        },
        enumerable: true,
        configurable: true
    });
    OpspotFatBanner.prototype.done = function () {
        this.added.next({
            index: this.index,
            file: this.file,
            top: this.top
        });
        this.file = null;
        //this.editing = false;
    };
    OpspotFatBanner.prototype.onClick = function (e) {
        e.target.parentNode.parentNode.getElementsByTagName('input')[0].click();
    };
    OpspotFatBanner = __decorate([
        core_1.Component({
            selector: 'opspot-banner-fat',
            inputs: ['_object: object', '_src: src', '_editMode: editMode', '_done: done'],
            outputs: ['added'],
            template: "\n  <div class=\"opspot-banner\" *ngIf=\"!editing\">\n    <img [src]=\"src\" class=\"opspot-banner-img\" />\n  </div>\n  <div *ngIf=\"editing\" class=\"opspot-banner opspot-banner-editing\">\n    <img [src]=\"src\" class=\"opspot-banner-img\"/>\n    <div class=\"overlay\" [hidden]=\"file\">\n      <i class=\"material-icons\">camera</i>\n      <span i18n=\"@@OPSPOT__BANNER__ADD_NEW_BANNER\">Click here to add a new banner</span>\n    </div>\n\n    <button class=\"add-button mdl-button mdl-button--raised mdl-button--colored material-icons\" (click)=\"onClick($event)\">\n      <i class=\"material-icons\">file_upload</i>\n    </button>\n    <input type=\"file\" id=\"file\" (change)=\"add($event)\" [hidden]=\"file\" />\n  </div>\n  "
        })
    ], OpspotFatBanner);
    return OpspotFatBanner;
}());
exports.OpspotFatBanner = OpspotFatBanner;
//# sourceMappingURL=fat.js.map
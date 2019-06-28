"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var OpspotAvatar = /** @class */ (function () {
    function OpspotAvatar() {
        this.opspot = window.Opspot;
        this.editing = false;
        this.waitForDoneSignal = true;
        this.src = '';
        this.index = 0;
        this.icon = 'camera';
        this.showPrompt = true;
        this.added = new core_1.EventEmitter();
    }
    Object.defineProperty(OpspotAvatar.prototype, "_object", {
        set: function (value) {
            if (!value)
                return;
            value.icontime = value.icontime ? value.icontime : '';
            this.object = value;
            this.src = this.opspot.cdn_url + "fs/v1/avatars/" + this.object.guid + "/large/" + this.object.icontime;
            if (this.object.type === 'user')
                this.src = this.opspot.cdn_url + "icon/" + this.object.guid + "/large/" + this.object.icontime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotAvatar.prototype, "_src", {
        set: function (value) {
            this.src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotAvatar.prototype, "_editMode", {
        set: function (value) {
            this.editing = value;
            if (!this.editing && this.file)
                this.done();
        },
        enumerable: true,
        configurable: true
    });
    OpspotAvatar.prototype.add = function (e) {
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
        console.log(this.waitForDoneSignal);
        if (this.waitForDoneSignal !== true)
            this.done();
    };
    OpspotAvatar.prototype.done = function () {
        console.log('sending done');
        this.added.next(this.file);
        this.file = null;
    };
    OpspotAvatar = __decorate([
        core_1.Component({
            selector: 'opspot-avatar',
            inputs: ['_object: object', '_src: src', '_editMode: editMode', 'waitForDoneSignal', 'icon', 'showPrompt'],
            outputs: ['added'],
            template: "\n  <div class=\"opspot-avatar\" [style.background-image]=\"'url(' + src + ')'\">\n    <img *ngIf=\"!src\" src=\"{{opspot.cdn_assets_url}}assets/avatars/blue/default-large.png\" class=\"mdl-shadow--4dp\" />\n    <div *ngIf=\"editing\" class=\"overlay\">\n      <i class=\"material-icons\">{{icon}}</i>\n      <ng-container *ngIf=\"showPrompt\">\n        <span *ngIf=\"src\" i18n=\"@@COMMON__AVATAR__CHANGE\">Change avatar</span>\n        <span *ngIf=\"!src\" i18n=\"@@COMMON__AVATAR__ADD\">Add an avatar</span>\n      </ng-container>\n    </div>\n    <input *ngIf=\"editing\" type=\"file\" #file (change)=\"add($event)\"/>\n  </div>\n  "
        })
    ], OpspotAvatar);
    return OpspotAvatar;
}());
exports.OpspotAvatar = OpspotAvatar;
//# sourceMappingURL=avatar.js.map
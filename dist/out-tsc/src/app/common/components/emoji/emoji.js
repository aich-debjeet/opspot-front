"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var emoji_list_1 = require("../../../services/emoji-list");
var OpspotEmoji = /** @class */ (function () {
    function OpspotEmoji() {
        this.emojis = emoji_list_1.EmojiList;
    }
    OpspotEmoji.prototype.hide = function () {
        if (!this.localDirective.shown) {
            return;
        }
        this.localDirective.close();
    };
    OpspotEmoji.prototype.select = function (codePoint, $event) {
        if ($event) {
            $event.preventDefault();
        }
        this.localDirective.emoji.next({
            character: this.represent(codePoint)
        });
    };
    OpspotEmoji.prototype.represent = function (codePoint) {
        return this.fromCodePoint(codePoint);
    };
    // Internal
    OpspotEmoji.prototype.fromCodePoint = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof String.fromCodePoint !== 'undefined') {
            return String.fromCodePoint.apply(String, args);
        }
        var chars = [], point, offset, units, i;
        for (i = 0; i < args.length; ++i) {
            point = args[i];
            offset = point - 0x10000;
            units = point > 0xFFFF ? [0xD800 + (offset >> 10), 0xDC00 + (offset & 0x3FF)] : [point];
            chars.push(String.fromCharCode.apply(null, units));
        }
        return chars.join('');
    };
    OpspotEmoji = __decorate([
        core_1.Component({
            selector: 'opspot-emoji',
            inputs: ['localDirective'],
            template: "\n    <div class=\"m-bubble-popup mdl-shadow--4dp\"\n    *ngIf=\"localDirective.shown\"\n    [ngStyle]=\"localDirective.style\"\n    >\n      <div class=\"m-emoji-selector-title\">\n        <ng-container i18n=\"@@OPSPOT__EMOJI__LABEL\">Emoji</ng-container>\n        <i class=\"material-icons m-emoji-selector-close\"\n        (click)=\"hide()\"\n        >close</i>\n      </div>\n      <div class=\"m-emoji-selector-list\">\n        <span *ngFor=\"let emoji of emojis\"\n        tabindex=\"0\"\n        class=\"m-emoji\"\n        [title]=\"emoji.name\"\n        (click)=\"select(emoji.codePoint, $event)\"\n        (keydown.enter)=\"select(emoji.codePoint, $event)\"\n        (keydown.space)=\"select(emoji.codePoint, $event)\"\n        (keydown.esc)=\"hide()\"\n        >{{ represent(emoji.codePoint) }}</span>\n      </div>\n    </div>\n  "
        })
    ], OpspotEmoji);
    return OpspotEmoji;
}());
exports.OpspotEmoji = OpspotEmoji;
//# sourceMappingURL=emoji.js.map
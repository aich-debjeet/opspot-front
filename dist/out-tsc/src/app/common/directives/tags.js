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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TagsLinks = /** @class */ (function () {
    function TagsLinks(_element) {
        var _this = this;
        this.rendered = false;
        this.element = _element.nativeElement;
        setTimeout(function () {
            _this.render();
        });
    }
    TagsLinks.prototype.render = function () {
        return false;
        // if(this.element.classList.contains('rendered') === true)
        //   return;
        // var value = this.element.innerHTML;
        // //<a>tag
        // var url = /(\b(?:https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
        // value = value.replace(url, '<a href="$1" target="_blank"  class="mdl-color-text--blue-grey-600">$1</a>');
        // //#hashtag
        // var hash = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
        // value = value.replace(hash, '$1<a href="/search?q=$2" target="_blank" class="mdl-color-text--blue-grey-600">#$2</a>');
        // //@tag
        // var at = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
        // value = value.replace(at, '$1<a href="/$2" target="_blank" class="mdl-color-text--blue-grey-500">@$2</a>');
        // this.element.innerHTML = value;
        // this.element.className += " rendered";
    };
    TagsLinks = __decorate([
        core_1.Directive({
            selector: '[tags]',
            inputs: ['tags']
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TagsLinks);
    return TagsLinks;
}());
exports.TagsLinks = TagsLinks;
//# sourceMappingURL=tags.js.map
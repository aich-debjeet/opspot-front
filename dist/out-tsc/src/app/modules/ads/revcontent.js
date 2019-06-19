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
var RevContent = /** @class */ (function () {
    function RevContent(element) {
        var _this = this;
        this.visible = false;
        this._element = element.nativeElement;
        RevContentService.load(this._element).then(function () {
            _this.visible = true;
        });
    }
    RevContent.prototype.ngOnDestroy = function () {
        RevContentService.unload(this._element);
    };
    RevContent = __decorate([
        core_1.Component({
            selector: 'revcontent',
            template: "\n    <!-- ads will load into here -->\n  ",
            host: {
                'class': 'm-ad-block m-ad-block-revcontent'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], RevContent);
    return RevContent;
}());
exports.RevContent = RevContent;
var RevContentService = /** @class */ (function () {
    function RevContentService() {
    }
    RevContentService.load = function (element) {
        return new Promise(function (resolve) {
            if (!RevContentService.script) {
                RevContentService.script = document.createElement('script');
                RevContentService.script.id = 'rc_' + Math.floor(Math.random() * 1000);
                RevContentService.script.type = 'text/javascript';
                RevContentService.script.src = 'https://trends.revcontent.com/serve.js.php?w=11364&t='
                    + RevContentService.script.id
                    + '&c=' + (new Date()).getTime()
                    + '&width=' + (window.outerWidth || document.documentElement.clientWidth);
                RevContentService.script.async = true;
                //var rcds = document.getElementById("rcjsload_7c87b6");
                element.appendChild(RevContentService.script);
                resolve(true);
            }
            else {
                resolve(true);
            }
        });
    };
    RevContentService.unload = function (element) {
        element.innerHTML = '';
        if (RevContentService.script) {
            RevContentService.script.remove();
            RevContentService.script = null;
        }
    };
    return RevContentService;
}());
//# sourceMappingURL=revcontent.js.map
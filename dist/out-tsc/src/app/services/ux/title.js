"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OpspotTitle = /** @class */ (function () {
    function OpspotTitle(title) {
        this.title = title;
        this.sep = ' | ';
        this.default_title = 'Opspot';
        this.text = '';
    }
    OpspotTitle._ = function (title) {
        return new OpspotTitle(title);
    };
    OpspotTitle.prototype.setTitle = function (value) {
        var title;
        if (value) {
            title = [value, this.default_title].join(this.sep);
        }
        else {
            title = this.default_title;
        }
        this.text = title;
        this.applyTitle();
    };
    OpspotTitle.prototype.setCounter = function (value) {
        this.counter = value;
        this.applyTitle();
    };
    OpspotTitle.prototype.applyTitle = function () {
        if (this.counter) {
            this.title.setTitle("(*) " + this.text);
        }
        else {
            this.title.setTitle(this.text);
        }
    };
    return OpspotTitle;
}());
exports.OpspotTitle = OpspotTitle;
//# sourceMappingURL=title.js.map
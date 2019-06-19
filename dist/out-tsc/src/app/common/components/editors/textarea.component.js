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
var Textarea = /** @class */ (function () {
    function Textarea() {
        this.model = '';
        this.update = new core_1.EventEmitter();
        this.disabled = false;
        this.placeholder = '';
    }
    Textarea.prototype.getControlText = function () {
        return this.editorControl.nativeElement.innerText;
    };
    Textarea.prototype.setControlText = function (value) {
        this.editorControl.nativeElement.innerText = value;
    };
    Textarea.prototype.focus = function () {
        this.editorControl.nativeElement.focus();
        this._placeCaretAtEnd(this.editorControl.nativeElement);
    };
    Textarea.prototype.blur = function () {
        this.editorControl.nativeElement.blur();
    };
    Textarea.prototype.change = function () {
        this.update.emit(this.getControlText());
    };
    Textarea.prototype.paste = function (e) {
        e.preventDefault();
        var text;
        if (e.clipboardData && e.clipboardData.getData) {
            text = e.clipboardData.getData('text/plain');
            document.execCommand('insertHTML', false, text);
        }
        else if (window.clipboardData && window.clipboardData.getData) {
            text = window.clipboardData.getData('Text');
            this.insertTextAtCursor(text);
        }
    };
    Textarea.prototype.ngOnChanges = function (changes) {
        if (changes.model &&
            this.getControlText() !== changes.model.currentValue &&
            (changes.model.isFirstChange() ||
                changes.model.previousValue !== changes.model.currentValue)) {
            this.setControlText(this.model);
        }
        if (changes.disabled && changes.disabled.currentValue) {
            this.blur();
        }
    };
    //
    Textarea.prototype.insertTextAtCursor = function (text) {
        var sel, range, html;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(text));
            }
        }
        else if (document.selection && document.selection.createRange) {
            document.selection.createRange().text = text;
        }
    };
    Textarea.prototype._placeCaretAtEnd = function (el) {
        if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        else if (typeof document.body.createTextRange !== 'undefined') {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    };
    __decorate([
        core_1.ViewChild('editor'),
        __metadata("design:type", core_1.ElementRef)
    ], Textarea.prototype, "editorControl", void 0);
    __decorate([
        core_1.Input('mModel'),
        __metadata("design:type", String)
    ], Textarea.prototype, "model", void 0);
    __decorate([
        core_1.Output('mModelChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], Textarea.prototype, "update", void 0);
    __decorate([
        core_1.Input('disabled'),
        __metadata("design:type", Boolean)
    ], Textarea.prototype, "disabled", void 0);
    __decorate([
        core_1.Input('placeholder'),
        __metadata("design:type", String)
    ], Textarea.prototype, "placeholder", void 0);
    Textarea = __decorate([
        core_1.Component({
            selector: 'opspot-textarea',
            template: "\n    <div\n      #editor\n      class=\"m-editor\"\n      [ngClass]=\"{ 'm-editor-disabled': disabled }\"\n      [attr.contenteditable]=\"!disabled ? 'true' : null\"\n      (keyup)=\"change()\"\n      (blur)=\"change()\"\n      (paste)=\"paste($event); change()\"\n    ></div>\n    <span\n      *ngIf=\"placeholder && model.length === 0\"\n      class=\"m-placeholder\"\n    >{{ placeholder }}</span>\n  ",
            exportAs: 'Textarea'
        })
    ], Textarea);
    return Textarea;
}());
exports.Textarea = Textarea;
//# sourceMappingURL=textarea.component.js.map
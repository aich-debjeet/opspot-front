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
var forms_1 = require("@angular/forms");
var embed_image_plugin_1 = require("./plugins/embed-image.plugin");
var embed_video_plugin_1 = require("./plugins/embed-video.plugin");
var buttons_plugin_1 = require("./plugins/buttons.plugin");
var attachment_1 = require("../../../services/attachment");
exports.MEDIUM_EDITOR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InlineEditorComponent; }),
    multi: true
};
var InlineEditorComponent = /** @class */ (function () {
    function InlineEditorComponent(el, cd, attachment) {
        this.cd = cd;
        this.attachment = attachment;
        this.buttons = new buttons_plugin_1.ButtonsPlugin({
            addons: {
                'images': "<i class=\"material-icons\">photo_camera</i>",
                'videos': "<i class=\"material-icons\">play_arrow</i>"
            },
            placeholder: 'Paste your link and then press Enter',
            uploadFunction: this.attachment.upload.bind(this.attachment)
        });
        this.images = new embed_image_plugin_1.EmbedImage({
            buttonText: "<i class=\"material-icons\">photo_camera</i>",
            placeholder: 'Type caption for image (optional)'
        });
        this.videos = new embed_video_plugin_1.EmbedVideo({ buttonText: "<i class=\"material-icons\">play_arrow</i>" });
        this.propagateChange = function (_) {
        };
        this.first = true;
        this.el = el;
    }
    InlineEditorComponent.prototype.reset = function () {
        this.editor.setContent('');
        this.ngOnChanges('');
    };
    InlineEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        var options = {
            'toolbar': {
                'buttons': [
                    {
                        name: 'bold',
                        contentDefault: '<i class="material-icons">format_bold</i>'
                    },
                    {
                        name: 'italic',
                        contentDefault: '<i class="material-icons">format_italic</i>'
                    },
                    {
                        name: 'underline',
                        contentDefault: '<i class="material-icons">format_underlined</i>'
                    },
                    {
                        name: 'strikethrough',
                        contentDefault: '<i class="material-icons">strikethrough_s</i>'
                    },
                    {
                        name: 'h2',
                        contentDefault: '<b class="m-inline-editor--toolbar-text">H</b><sup>2</sup>'
                    },
                    {
                        name: 'h3',
                        contentDefault: '<b class="m-inline-editor--toolbar-text">H</b><sup>3</sup>'
                    },
                    {
                        name: 'removeFormat',
                        contentDefault: '<i class="material-icons">format_clear</i>',
                    },
                    {
                        name: 'justifyLeft',
                        contentDefault: '<i class="material-icons">format_align_left</i>'
                    },
                    {
                        name: 'justifyCenter',
                        contentDefault: '<i class="material-icons">format_align_center</i>'
                    },
                    {
                        name: 'justifyRight',
                        contentDefault: '<i class="material-icons">format_align_right</i>'
                    },
                    {
                        name: 'anchor',
                        contentDefault: '<i class="material-icons">insert_link</i>'
                    },
                    {
                        name: 'justifyFull',
                        contentDefault: '<i class="material-icons">format_align_justify</i>'
                    },
                    {
                        name: 'quote',
                        contentDefault: '<i class="material-icons">format_quote</i>'
                    }
                ]
            },
            extensions: {
                'buttonsPlugin': this.buttons,
                'embedImage': this.images,
                'embedVideo': this.videos
            }
        };
        if (this.placeholder) {
            Object.assign(options, {
                'placeholder': {
                    text: this.placeholder,
                    hidOnClick: true
                }
            });
        }
        this.editor = new MediumEditor(this.host.nativeElement, options);
        this.host.nativeElement.focus();
        this.editor.subscribe('editableInput', function (event, editable) {
            var value = _this.editor.elements[0].innerHTML;
            _this.ngOnChanges(value);
        });
    };
    InlineEditorComponent.prototype.prepareForSave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.buttons.prepare();
            _this.images.prepare();
            _this.videos.prepare();
            _this.propagateChange(_this.editor.elements[0].innerHTML);
            setTimeout(function () {
                resolve();
            });
        });
    };
    InlineEditorComponent.prototype.ngOnDestroy = function () {
        if (this.editor) {
            this.editor.destroy();
        }
    };
    InlineEditorComponent.prototype.ngOnChanges = function (changes) {
        this.propagateChange(changes);
    };
    InlineEditorComponent.prototype.writeValue = function (value) {
        if (this.editor) {
            if (value && value !== '') {
                this.editor.setContent(value);
            }
            if (this.first) {
                var p = this.el.nativeElement.querySelector('.medium-editor-element p');
                if (p)
                    p.click();
                this.first = false;
            }
        }
    };
    InlineEditorComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    InlineEditorComponent.prototype.registerOnTouched = function (fn) {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InlineEditorComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.ViewChild('host'),
        __metadata("design:type", Object)
    ], InlineEditorComponent.prototype, "host", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], InlineEditorComponent.prototype, "reset", null);
    InlineEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-inline-editor',
            template: "\n  <div #host></div>\n  ",
            host: {
                'change': 'propagateChange($event.target.value)'
            },
            providers: [exports.MEDIUM_EDITOR_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.ChangeDetectorRef, attachment_1.AttachmentService])
    ], InlineEditorComponent);
    return InlineEditorComponent;
}());
exports.InlineEditorComponent = InlineEditorComponent;
//# sourceMappingURL=inline-editor.component.js.map
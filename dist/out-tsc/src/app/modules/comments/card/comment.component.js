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
var session_1 = require("../../../services/session");
var upload_1 = require("../../../services/api/upload");
var client_1 = require("../../../services/api/client");
var attachment_1 = require("../../../services/attachment");
var translation_1 = require("../../../services/translation");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var creator_component_1 = require("../../report/creator/creator.component");
var list_component_1 = require("../list/list.component");
var timediff_service_1 = require("../../../services/timediff.service");
var operators_1 = require("rxjs/operators");
var CommentComponent = /** @class */ (function () {
    function CommentComponent(session, client, attachment, translationService, overlayModal, cd, timeDiffService) {
        this.session = session;
        this.client = client;
        this.attachment = attachment;
        this.translationService = translationService;
        this.overlayModal = overlayModal;
        this.cd = cd;
        this.timeDiffService = timeDiffService;
        this.editing = false;
        this.opspot = window.Opspot;
        this.canPost = true;
        this.triedToPost = false;
        this.inProgress = false;
        this.error = '';
        this.showReplies = false;
        this.changesDetected = false;
        this._delete = new core_1.EventEmitter();
        this._saved = new core_1.EventEmitter();
        this.reportToggle = false;
        this.translation = {
            translated: false,
            target: '',
            error: false,
            description: '',
            source: null
        };
        this.translateToggle = false;
        this.canEdit = false;
        this.onReply = new core_1.EventEmitter();
    }
    CommentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commentAge$ = this.timeDiffService.source.pipe(operators_1.map(function (secondsElapsed) {
            return (_this.comment.time_created - secondsElapsed) * 1000;
        }));
    };
    Object.defineProperty(CommentComponent.prototype, "object", {
        set: function (value) {
            if (!value)
                return;
            this.comment = value;
            this.attachment.load(this.comment);
            this.isTranslatable = this.translationService.isTranslatable(this.comment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentComponent.prototype, "_editing", {
        set: function (value) {
            this.editing = value;
        },
        enumerable: true,
        configurable: true
    });
    CommentComponent.prototype.saveEnabled = function () {
        return !this.inProgress && this.canPost && ((this.comment.description && this.comment.description.trim() !== '') || this.attachment.has());
    };
    CommentComponent.prototype.save = function () {
        var _this = this;
        this.comment.description = this.comment.description.trim();
        if (!this.comment.description && !this.attachment.has()) {
            return;
        }
        var data = this.attachment.exportMeta();
        data['comment'] = this.comment.description;
        this.editing = false;
        this.inProgress = true;
        this.client.post('api/v1/comments/update/' + this.comment.guid, data)
            .then(function (response) {
            _this.inProgress = false;
            if (response.comment) {
                _this._saved.next({
                    comment: response.comment
                });
            }
            _this.comment.edited = true;
        })
            .catch(function (e) {
            _this.inProgress = false;
        });
    };
    CommentComponent.prototype.applyAndSave = function (control, e) {
        e.preventDefault();
        if (!this.saveEnabled()) {
            this.triedToPost = true;
            return;
        }
        this.comment.description = control.value;
        this.save();
    };
    CommentComponent.prototype.cancel = function (control, e) {
        e.preventDefault();
        if (this.inProgress) {
            return;
        }
        this.editing = false;
        control.value = this.comment.description;
    };
    CommentComponent.prototype.delete = function () {
        if (!confirm('Do you want to delete this comment?\n\nThere\'s no UNDO.')) {
            return;
        }
        this.client.delete('api/v1/comments/' + this.comment.guid);
        if (this.parent.type === 'comment') {
            this.parent.replies_count -= 1;
        }
        this._delete.next(true);
    };
    CommentComponent.prototype.uploadAttachment = function (file) {
        var _this = this;
        this.canPost = false;
        this.triedToPost = false;
        this.attachment.upload(file)
            .then(function (guid) {
            _this.canPost = true;
            _this.triedToPost = false;
            file.value = null;
        })
            .catch(function (e) {
            console.error(e);
            _this.canPost = true;
            _this.triedToPost = false;
            file.value = null;
        });
    };
    CommentComponent.prototype.removeAttachment = function (file) {
        var _this = this;
        this.canPost = false;
        this.triedToPost = false;
        this.attachment.remove(file).then(function () {
            _this.canPost = true;
            _this.triedToPost = false;
            file.value = '';
        }).catch(function (e) {
            console.error(e);
            _this.canPost = true;
            _this.triedToPost = false;
        });
    };
    CommentComponent.prototype.getPostPreview = function (message) {
        if (!message.value) {
            return;
        }
        this.attachment.preview(message.value);
    };
    CommentComponent.prototype.translate = function ($event) {
        var _this = this;
        if ($event === void 0) { $event = {}; }
        if (!$event.selected) {
            return;
        }
        if (!this.translationService.isTranslatable(this.comment)) {
            return;
        }
        this.translation.target = '';
        this.translationService.getLanguageName($event.selected)
            .then(function (name) { return _this.translation.target = name; });
        this.translationInProgress = true;
        this.translationService.translate(this.comment.guid, $event.selected)
            .then(function (translation) {
            _this.translationInProgress = false;
            _this.translation.source = null;
            for (var field in translation) {
                _this.translation.translated = true;
                _this.translation[field] = translation[field].content;
                if (_this.translation.source === null && translation[field].source) {
                    _this.translation.source = '';
                    _this.translationService.getLanguageName(translation[field].source)
                        .then(function (name) { return _this.translation.source = name; });
                }
            }
        })
            .catch(function (e) {
            _this.translationInProgress = false;
            _this.translation.error = true;
            console.error('translate()', e);
        });
    };
    CommentComponent.prototype.hideTranslation = function () {
        if (!this.translation.translated) {
            return;
        }
        this.translation.translated = false;
    };
    CommentComponent.prototype.showReport = function () {
        this.overlayModal.create(creator_component_1.ReportCreatorComponent, this.comment)
            .present();
    };
    CommentComponent.prototype.toggleReplies = function () {
        this.showReplies = !this.showReplies;
    };
    CommentComponent.prototype.ngOnChanges = function (changes) {
        //  console.log('[comment:card]: on changes', changes);
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    CommentComponent.prototype.ngDoCheck = function () {
        this.changesDetected = false;
        if (this.comment.error != this.error) {
            this.error = this.comment.error;
            this.changesDetected = true;
        }
        if (this.changesDetected) {
            this.cd.detectChanges();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CommentComponent.prototype, "canEdit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CommentComponent.prototype, "onReply", void 0);
    __decorate([
        core_1.Input('object'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CommentComponent.prototype, "object", null);
    CommentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-card-comment',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            inputs: ['parent'],
            outputs: ['_delete: delete', '_saved: saved'],
            host: {
                '(keydown.esc)': 'editing = false'
            },
            templateUrl: 'comment.component.html',
            providers: [
                {
                    provide: attachment_1.AttachmentService,
                    useFactory: attachment_1.AttachmentService._,
                    deps: [session_1.Session, client_1.Client, upload_1.Upload]
                },
                {
                    provide: list_component_1.CommentsListComponent,
                    useValue: core_1.forwardRef(function () { return list_component_1.CommentsListComponent; }),
                },
            ],
        }),
        __metadata("design:paramtypes", [session_1.Session,
            client_1.Client,
            attachment_1.AttachmentService,
            translation_1.TranslationService,
            overlay_modal_1.OverlayModalService,
            core_1.ChangeDetectorRef,
            timediff_service_1.TimeDiffService])
    ], CommentComponent);
    return CommentComponent;
}());
exports.CommentComponent = CommentComponent;
//# sourceMappingURL=comment.component.js.map
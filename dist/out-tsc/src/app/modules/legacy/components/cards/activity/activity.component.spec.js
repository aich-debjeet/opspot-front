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
///<reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var activity_1 = require("./activity");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../../../../tests/session-mock.spec");
var client_1 = require("../../../../../services/api/client");
var session_1 = require("../../../../../services/session");
var material_mock_spec_1 = require("../../../../../../tests/material-mock.spec");
var scroll_service_mock_spec_1 = require("../../../../../../tests/scroll-service-mock.spec");
var scroll_1 = require("../../../../../services/ux/scroll");
var attachment_1 = require("../../../../../services/attachment");
var attachment_service_mock_spec_1 = require("../../../../../../tests/attachment-service-mock.spec");
var translation_service_mock_spec_1 = require("../../../../../../tests/translation-service-mock.spec");
var translation_1 = require("../../../../../services/translation");
var overlay_modal_service_mock_spec_1 = require("../../../../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../../../../services/ux/overlay-modal");
var tags_1 = require("../../../../../common/pipes/tags");
var rich_embed_1 = require("../../../../../common/components/rich-embed/rich-embed");
var domain_1 = require("../../../../../common/pipes/domain");
var abbr_1 = require("../../../../../common/pipes/abbr");
var badges_component_1 = require("../../../../../common/components/badges/badges.component");
var tooltip_component_1 = require("../../../../../mocks/common/components/tooltip/tooltip.component");
var token_pipe_1 = require("../../../../../common/pipes/token.pipe");
var excerpt_1 = require("../../../../../common/pipes/excerpt");
var newsfeed_service_1 = require("../../../../newsfeed/services/newsfeed.service");
/* tslint:disable */
// START MOCKS
var WireLockScreenComponentMock = /** @class */ (function () {
    function WireLockScreenComponentMock() {
        this.update = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireLockScreenComponentMock.prototype, "entity", void 0);
    __decorate([
        core_1.Output('entityChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireLockScreenComponentMock.prototype, "update", void 0);
    WireLockScreenComponentMock = __decorate([
        core_1.Component({
            selector: 'm-wire--lock-screen',
            template: ''
        })
    ], WireLockScreenComponentMock);
    return WireLockScreenComponentMock;
}());
exports.WireLockScreenComponentMock = WireLockScreenComponentMock;
var TranslateMock = /** @class */ (function () {
    function TranslateMock() {
        this.onTranslateInit = new core_1.EventEmitter();
        this.onTranslate = new core_1.EventEmitter();
        this.onTranslateError = new core_1.EventEmitter();
        this.languagesInProgress = false;
        this.languagesError = false;
        this.preferredLanguages = [];
        this.languages = [];
        this.open = false;
        this.entity = {};
        this.translateEvent = new core_1.EventEmitter();
        this.translation = {
            translated: false,
            target: '',
            error: false,
            message: '',
            title: '',
            description: '',
            source: ''
        };
    }
    Object.defineProperty(TranslateMock.prototype, "_entity", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    TranslateMock.prototype.select = function (language) {
    };
    TranslateMock.prototype.translate = function ($event) {
        if ($event === void 0) { $event = {}; }
    };
    TranslateMock = __decorate([
        core_1.Component({
            selector: 'm-translate',
            inputs: ['_open: open', '_entity: entity', '_translateEvent: translateEvent'],
            outputs: ['onTranslateInit', 'onTranslate', 'onTranslateError'],
            exportAs: 'translate',
            template: ''
        })
    ], TranslateMock);
    return TranslateMock;
}());
exports.TranslateMock = TranslateMock;
var WireThresholdInputComponentMock = /** @class */ (function () {
    function WireThresholdInputComponentMock() {
        this.enabled = false;
        this.thresholdChangeEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(WireThresholdInputComponentMock.prototype, "_threshold", {
        set: function (threshold) {
        },
        enumerable: true,
        configurable: true
    });
    WireThresholdInputComponentMock.prototype.toggle = function () {
    };
    WireThresholdInputComponentMock.prototype.setType = function (type) {
    };
    __decorate([
        core_1.Input('enabled'),
        __metadata("design:type", Boolean)
    ], WireThresholdInputComponentMock.prototype, "enabled", void 0);
    __decorate([
        core_1.Input('threshold'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WireThresholdInputComponentMock.prototype, "_threshold", null);
    __decorate([
        core_1.Output('thresholdChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireThresholdInputComponentMock.prototype, "thresholdChangeEmitter", void 0);
    WireThresholdInputComponentMock = __decorate([
        core_1.Component({
            selector: 'm-wire-threshold-input',
            template: ''
        })
    ], WireThresholdInputComponentMock);
    return WireThresholdInputComponentMock;
}());
exports.WireThresholdInputComponentMock = WireThresholdInputComponentMock;
var PosterMock = /** @class */ (function () {
    function PosterMock() {
        this.load = new core_1.EventEmitter();
    }
    Object.defineProperty(PosterMock.prototype, "accessId", {
        set: function (access_id) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PosterMock.prototype, "message", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    PosterMock.prototype.post = function () {
    };
    PosterMock.prototype.uploadAttachment = function (file, event) {
    };
    PosterMock.prototype.removeAttachment = function (file) {
    };
    PosterMock.prototype.getPostPreview = function (message) {
    };
    PosterMock = __decorate([
        core_1.Component({
            selector: 'opspot-newsfeed-poster',
            inputs: ['_container_guid: containerGuid', 'accessId', 'message'],
            outputs: ['load'],
            template: ''
        })
    ], PosterMock);
    return PosterMock;
}());
exports.PosterMock = PosterMock;
var VideoComponentMock = /** @class */ (function () {
    function VideoComponentMock() {
    }
    Object.defineProperty(VideoComponentMock.prototype, "_preview", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoComponentMock.prototype, "_previewPlayback", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoComponentMock.prototype, "_src", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoComponentMock.prototype, "_torrent", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoComponentMock.prototype, "_autoplay", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    VideoComponentMock.prototype.listen = function () {
    };
    VideoComponentMock.prototype.unListen = function () {
    };
    VideoComponentMock.prototype.trigger = function (type, ev) {
    };
    VideoComponentMock.prototype.exitFullScreen = function () {
    };
    __decorate([
        core_1.Input('thumbnail'),
        __metadata("design:type", String)
    ], VideoComponentMock.prototype, "thumbnail", void 0);
    __decorate([
        core_1.Input('muted'),
        __metadata("design:type", Boolean)
    ], VideoComponentMock.prototype, "muted", void 0);
    __decorate([
        core_1.Input('loop'),
        __metadata("design:type", Boolean)
    ], VideoComponentMock.prototype, "loop", void 0);
    __decorate([
        core_1.Input('analyticsGuid'),
        __metadata("design:type", Object)
    ], VideoComponentMock.prototype, "analyticsGuid", void 0);
    __decorate([
        core_1.Input('preview'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], VideoComponentMock.prototype, "_preview", null);
    __decorate([
        core_1.Input('previewPlayback'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], VideoComponentMock.prototype, "_previewPlayback", null);
    __decorate([
        core_1.Input('src'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], VideoComponentMock.prototype, "_src", null);
    __decorate([
        core_1.Input('torrent'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], VideoComponentMock.prototype, "_torrent", null);
    __decorate([
        core_1.Input('autoplay'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], VideoComponentMock.prototype, "_autoplay", null);
    __decorate([
        core_1.Input('poster'),
        __metadata("design:type", Object)
    ], VideoComponentMock.prototype, "poster", void 0);
    __decorate([
        core_1.Input('guid'),
        __metadata("design:type", Object)
    ], VideoComponentMock.prototype, "guid", void 0);
    __decorate([
        core_1.Input('playCount'),
        __metadata("design:type", Object)
    ], VideoComponentMock.prototype, "playCount", void 0);
    VideoComponentMock = __decorate([
        core_1.Component({
            selector: 'm-video',
            template: ''
        })
    ], VideoComponentMock);
    return VideoComponentMock;
}());
exports.VideoComponentMock = VideoComponentMock;
var VideoAdsMock = /** @class */ (function () {
    function VideoAdsMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VideoAdsMock.prototype, "player", void 0);
    VideoAdsMock = __decorate([
        core_1.Component({
            selector: 'video-ads',
            template: ''
        })
    ], VideoAdsMock);
    return VideoAdsMock;
}());
exports.VideoAdsMock = VideoAdsMock;
var PostMenuComponentMock = /** @class */ (function () {
    function PostMenuComponentMock() {
        this.optionSelected = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PostMenuComponentMock.prototype, "entity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PostMenuComponentMock.prototype, "options", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PostMenuComponentMock.prototype, "optionSelected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PostMenuComponentMock.prototype, "canDelete", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PostMenuComponentMock.prototype, "isTranslatable", void 0);
    PostMenuComponentMock = __decorate([
        core_1.Component({
            selector: 'm-post-menu',
            template: ''
        })
    ], PostMenuComponentMock);
    return PostMenuComponentMock;
}());
exports.PostMenuComponentMock = PostMenuComponentMock;
var RemindMock = /** @class */ (function () {
    function RemindMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RemindMock.prototype, "object", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RemindMock.prototype, "events", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RemindMock.prototype, "boosted", void 0);
    RemindMock = __decorate([
        core_1.Component({
            selector: 'opspot-remind',
            template: ''
        })
    ], RemindMock);
    return RemindMock;
}());
exports.RemindMock = RemindMock;
var ThumbsUpButtonMock = /** @class */ (function () {
    function ThumbsUpButtonMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ThumbsUpButtonMock.prototype, "object", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ThumbsUpButtonMock.prototype, "events", void 0);
    ThumbsUpButtonMock = __decorate([
        core_1.Component({
            selector: 'opspot-button-thumbs-up',
            template: ''
        })
    ], ThumbsUpButtonMock);
    return ThumbsUpButtonMock;
}());
exports.ThumbsUpButtonMock = ThumbsUpButtonMock;
var ThumbsDownButtonMock = /** @class */ (function () {
    function ThumbsDownButtonMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ThumbsDownButtonMock.prototype, "object", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ThumbsDownButtonMock.prototype, "events", void 0);
    ThumbsDownButtonMock = __decorate([
        core_1.Component({
            selector: 'opspot-button-thumbs-down',
            template: ''
        })
    ], ThumbsDownButtonMock);
    return ThumbsDownButtonMock;
}());
exports.ThumbsDownButtonMock = ThumbsDownButtonMock;
var ButtonCommentMock = /** @class */ (function () {
    function ButtonCommentMock() {
        this.click = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ButtonCommentMock.prototype, "object", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ButtonCommentMock.prototype, "click", void 0);
    ButtonCommentMock = __decorate([
        core_1.Component({
            selector: 'opspot-button-comment',
            template: ''
        })
    ], ButtonCommentMock);
    return ButtonCommentMock;
}());
exports.ButtonCommentMock = ButtonCommentMock;
var ButtonRemindMock = /** @class */ (function () {
    function ButtonRemindMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ButtonRemindMock.prototype, "object", void 0);
    ButtonRemindMock = __decorate([
        core_1.Component({
            selector: 'opspot-button-remind',
            template: ''
        })
    ], ButtonRemindMock);
    return ButtonRemindMock;
}());
exports.ButtonRemindMock = ButtonRemindMock;
var OpspotCommentsMock = /** @class */ (function () {
    function OpspotCommentsMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotCommentsMock.prototype, "object", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotCommentsMock.prototype, "focusOnInit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotCommentsMock.prototype, "focusedCommentGuid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotCommentsMock.prototype, "canEdit", void 0);
    OpspotCommentsMock = __decorate([
        core_1.Component({
            selector: 'opspot-comments',
            template: ''
        })
    ], OpspotCommentsMock);
    return OpspotCommentsMock;
}());
exports.OpspotCommentsMock = OpspotCommentsMock;
var WireButtonMock = /** @class */ (function () {
    function WireButtonMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireButtonMock.prototype, "object", void 0);
    WireButtonMock = __decorate([
        core_1.Component({
            selector: 'm-wire-button',
            template: ''
        })
    ], WireButtonMock);
    return WireButtonMock;
}());
exports.WireButtonMock = WireButtonMock;
var ModalShareMock = /** @class */ (function () {
    function ModalShareMock() {
        this.closed = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalShareMock.prototype, "open", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalShareMock.prototype, "url", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalShareMock.prototype, "embed", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalShareMock.prototype, "closed", void 0);
    ModalShareMock = __decorate([
        core_1.Component({
            selector: 'm-modal-share',
            template: ''
        })
    ], ModalShareMock);
    return ModalShareMock;
}());
exports.ModalShareMock = ModalShareMock;
var ModalReportMock = /** @class */ (function () {
    function ModalReportMock() {
        this.closed = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalReportMock.prototype, "open", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalReportMock.prototype, "object", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalReportMock.prototype, "closed", void 0);
    ModalReportMock = __decorate([
        core_1.Component({
            selector: 'm-modal-report',
            template: ''
        })
    ], ModalReportMock);
    return ModalReportMock;
}());
exports.ModalReportMock = ModalReportMock;
var ModalConfirmMock = /** @class */ (function () {
    function ModalConfirmMock() {
        this.closed = new core_1.EventEmitter();
        this.actioned = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalConfirmMock.prototype, "open", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalConfirmMock.prototype, "closeAfterAction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalConfirmMock.prototype, "yesButton", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalConfirmMock.prototype, "closed", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalConfirmMock.prototype, "actioned", void 0);
    ModalConfirmMock = __decorate([
        core_1.Component({
            selector: 'm-modal-confirm',
            template: ''
        })
    ], ModalConfirmMock);
    return ModalConfirmMock;
}());
exports.ModalConfirmMock = ModalConfirmMock;
var HovercardMock = /** @class */ (function () {
    function HovercardMock() {
    }
    Object.defineProperty(HovercardMock.prototype, "_hovercard", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HovercardMock.prototype, "_hovercardAnchor", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    HovercardMock.prototype.show = function () {
    };
    HovercardMock.prototype.hide = function () {
    };
    HovercardMock.prototype.hideForcefully = function () {
    };
    HovercardMock = __decorate([
        core_1.Directive({
            selector: '[hovercard]',
            inputs: ['_hovercard: hovercard', '_hovercardAnchor: hovercardAnchor'],
            host: {
                '(mouseenter)': 'show()',
                '(mouseleave)': 'hide()',
                '(click)': 'hideForcefully()'
            }
        })
    ], HovercardMock);
    return HovercardMock;
}());
exports.HovercardMock = HovercardMock;
var ReadMoreButtonComponentMock = /** @class */ (function () {
    function ReadMoreButtonComponentMock() {
    }
    ReadMoreButtonComponentMock = __decorate([
        core_1.Component({
            selector: 'm-read-more--button',
            template: ''
        })
    ], ReadMoreButtonComponentMock);
    return ReadMoreButtonComponentMock;
}());
exports.ReadMoreButtonComponentMock = ReadMoreButtonComponentMock;
var CryptoTokenSymbolMock = /** @class */ (function () {
    function CryptoTokenSymbolMock() {
    }
    CryptoTokenSymbolMock = __decorate([
        core_1.Component({
            selector: 'm--crypto-token-symbol',
            template: ''
        })
    ], CryptoTokenSymbolMock);
    return CryptoTokenSymbolMock;
}());
var AutoGrowMock = /** @class */ (function () {
    function AutoGrowMock() {
    }
    Object.defineProperty(AutoGrowMock.prototype, "_model", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    AutoGrowMock.prototype.grow = function () {
    };
    AutoGrowMock = __decorate([
        core_1.Directive({
            selector: '[autoGrow]',
            inputs: ['autoGrow', '_model: ngModel'],
            host: {
                '(keydown)': 'grow()',
                '(paste)': 'grow()',
                '(change)': 'grow()',
                '(ngModelChange)': 'grow()'
            }
        })
    ], AutoGrowMock);
    return AutoGrowMock;
}());
exports.AutoGrowMock = AutoGrowMock;
var PostMenuMock = /** @class */ (function () {
    function PostMenuMock() {
    }
    PostMenuMock = __decorate([
        core_1.Component({
            selector: 'm-post-menu',
            template: '',
            inputs: ['entity', 'canDelete', 'isTranslatable', 'options']
        })
    ], PostMenuMock);
    return PostMenuMock;
}());
exports.PostMenuMock = PostMenuMock;
var SafeToggleComponentMock = /** @class */ (function () {
    function SafeToggleComponentMock() {
        this.entityChange = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input('entity'),
        __metadata("design:type", Object)
    ], SafeToggleComponentMock.prototype, "entity", void 0);
    __decorate([
        core_1.Output('entityChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], SafeToggleComponentMock.prototype, "entityChange", void 0);
    SafeToggleComponentMock = __decorate([
        core_1.Component({
            selector: 'm-safe-toggle',
            template: ''
        })
    ], SafeToggleComponentMock);
    return SafeToggleComponentMock;
}());
exports.SafeToggleComponentMock = SafeToggleComponentMock;
// END MOCKS
describe('Activity', function () {
    var comp;
    var fixture;
    var defaultActivity = {
        ownerObj: {
            username: 'opspot'
        },
        wire_threshold: {
            type: 'points',
            min: '10'
        },
        wire_totals: {
            points: 10,
            money: 3,
            tokens: 1
        },
        impressions: 100,
        paywall: true,
        message: 'test'
    };
    function getActivityMetrics() {
        return fixture.debugElement.query(platform_browser_1.By.css('.impressions-tag.m-activity--metrics'));
    }
    function getActivityMetric(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".m-activity--metrics .m-activity--metrics-metric:nth-child(" + i + ") > span"));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                tags_1.TagsPipe,
                domain_1.DomainPipe,
                abbr_1.AbbrPipe,
                excerpt_1.ExcerptPipe,
                rich_embed_1.OpspotRichEmbed,
                badges_component_1.ChannelBadgesComponent,
                material_mock_spec_1.MaterialMock,
                HovercardMock,
                WireLockScreenComponentMock,
                TranslateMock,
                WireThresholdInputComponentMock,
                PosterMock,
                VideoComponentMock,
                VideoAdsMock,
                RemindMock,
                ThumbsUpButtonMock,
                ThumbsDownButtonMock,
                ButtonCommentMock,
                ButtonRemindMock,
                OpspotCommentsMock,
                WireButtonMock,
                ModalShareMock,
                ModalReportMock,
                ModalConfirmMock,
                ReadMoreButtonComponentMock,
                AutoGrowMock,
                PostMenuMock,
                tooltip_component_1.TooltipComponentMock,
                CryptoTokenSymbolMock,
                activity_1.Activity,
                token_pipe_1.TokenPipe,
                SafeToggleComponentMock,
            ],
            imports: [
                testing_2.RouterTestingModule,
                forms_1.FormsModule /*, CommonModule*/
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: scroll_1.ScrollService, useValue: scroll_service_mock_spec_1.scrollServiceMock },
                { provide: attachment_1.AttachmentService, useValue: attachment_service_mock_spec_1.attachmentServiceMock },
                { provide: translation_1.TranslationService, useValue: translation_service_mock_spec_1.translationServiceMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
                newsfeed_service_1.NewsfeedService,
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(activity_1.Activity);
        comp = fixture.componentInstance; // LoginForm test instance
        comp.activity = defaultActivity;
        fixture.detectChanges();
        comp.detectChanges();
    });
    it('should show m-wire--lock-screen if activity.paywall == true', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('m-wire--lock-screen'))).not.toBeNull();
    });
    it('shouldn\'t show m-wire--lock-screen if activity.paywall == false', function () {
        var activity = {
            ownerObj: {
                username: 'opspot'
            },
            wire_threshold: {
                type: 'points',
                min: '10'
            },
            wire_totals: {
                points: 10,
                money: 3,
                tokens: 1
            },
            impressions: 100,
            paywall: false,
        };
        comp.activity = activity;
        fixture.detectChanges();
        comp.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('m-wire--lock-screen'))).toBeNull();
    });
    it('should have activity metrics', function () {
        expect(getActivityMetrics()).toBeDefined();
    });
    it('activity metrics should have token metric', function () {
        var tokens = getActivityMetric(1);
        expect(tokens).not.toBeNull();
        expect(tokens.nativeElement.textContent).toContain(1);
    });
    it('activity metrics should have views metric', function () {
        var views = getActivityMetric(2);
        expect(views).not.toBeNull();
        expect(views.nativeElement.textContent).toContain(100);
    });
    // TODO test the rest of the features
});
//# sourceMappingURL=activity.component.spec.js.map
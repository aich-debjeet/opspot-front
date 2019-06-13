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
var testing_1 = require("@angular/core/testing");
var edit_1 = require("./edit");
var forms_1 = require("@angular/forms");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var core_1 = require("@angular/core");
var hovercard_1 = require("../../../common/directives/hovercard");
var upload_mock_spec_1 = require("../../../../tests/upload-mock.spec");
var upload_1 = require("../../../services/api/upload");
var title_1 = require("../../../services/ux/title");
var hovercard_2 = require("../../../services/hovercard");
var hovercard_mock_spec_1 = require("../../../mocks/services/hovercard-mock.spec");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var opspot_title_service_mock_spec_1 = require("../../../mocks/services/ux/opspot-title.service.mock.spec");
var mock_1 = require("../../../utils/mock");
var OpspotBannerMock = /** @class */ (function () {
    function OpspotBannerMock() {
        this.opspot = window.Opspot;
        this.editing = false;
        this.src = '';
        this.index = 0;
        this.top = 0;
        this.added = new core_1.EventEmitter();
    }
    Object.defineProperty(OpspotBannerMock.prototype, "_object", {
        set: function (value) {
            if (!value)
                return;
            this.object = value;
            this.src = '/fs/v1/banners/' + this.object.guid + '/' + this.top + '/' + this.object.banner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotBannerMock.prototype, "_src", {
        set: function (value) {
            this.src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotBannerMock.prototype, "_top", {
        set: function (value) {
            if (!value)
                return;
            this.top = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotBannerMock.prototype, "_editMode", {
        set: function (value) {
            this.editing = value;
        },
        enumerable: true,
        configurable: true
    });
    OpspotBannerMock.prototype.add = function (e) {
    };
    OpspotBannerMock.prototype.cancel = function () {
    };
    Object.defineProperty(OpspotBannerMock.prototype, "_done", {
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
    OpspotBannerMock.prototype.done = function () {
    };
    OpspotBannerMock.prototype.onClick = function (e) {
        e.target.parentNode.parentNode.getElementsByTagName('input')[0].click();
    };
    OpspotBannerMock = __decorate([
        core_1.Component({
            selector: 'opspot-banner',
            inputs: ['_object: object', '_src: src', '_top: top', 'overlay', '_editMode: editMode', '_done: done'],
            outputs: ['added'],
            template: ""
        })
    ], OpspotBannerMock);
    return OpspotBannerMock;
}());
var MDLMock = /** @class */ (function () {
    function MDLMock() {
    }
    MDLMock = __decorate([
        core_1.Directive({
            selector: '[mdl]',
            inputs: ['mdl']
        })
    ], MDLMock);
    return MDLMock;
}());
exports.MDLMock = MDLMock;
var TextareaMock = /** @class */ (function () {
    function TextareaMock() {
        this.model = '';
        this.update = new core_1.EventEmitter();
        this.disabled = false;
        this.placeholder = '';
    }
    TextareaMock.prototype.focus = function () {
    };
    TextareaMock.prototype.blur = function () {
    };
    TextareaMock.prototype.change = function () {
    };
    TextareaMock.prototype.paste = function (e) {
    };
    __decorate([
        core_1.Input('mModel'),
        __metadata("design:type", String)
    ], TextareaMock.prototype, "model", void 0);
    __decorate([
        core_1.Output('mModelChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], TextareaMock.prototype, "update", void 0);
    __decorate([
        core_1.Input('disabled'),
        __metadata("design:type", Boolean)
    ], TextareaMock.prototype, "disabled", void 0);
    __decorate([
        core_1.Input('placeholder'),
        __metadata("design:type", String)
    ], TextareaMock.prototype, "placeholder", void 0);
    TextareaMock = __decorate([
        core_1.Component({
            selector: 'opspot-textarea',
            template: "",
            exportAs: 'Textarea'
        })
    ], TextareaMock);
    return TextareaMock;
}());
var WireThresholdInputComponentMock = /** @class */ (function () {
    function WireThresholdInputComponentMock() {
        this.disabled = false;
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
        core_1.Input('threshold'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WireThresholdInputComponentMock.prototype, "_threshold", null);
    __decorate([
        core_1.Input('disabled'),
        __metadata("design:type", Boolean)
    ], WireThresholdInputComponentMock.prototype, "disabled", void 0);
    __decorate([
        core_1.Input('enabled'),
        __metadata("design:type", Boolean)
    ], WireThresholdInputComponentMock.prototype, "enabled", void 0);
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
exports.MEDIUM_EDITOR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InlineEditorComponentMock; }),
    multi: true
};
var InlineEditorComponentMock = /** @class */ (function () {
    function InlineEditorComponentMock(cd) {
        this.cd = cd;
        this.propagateChange = function (_) {
        };
    }
    InlineEditorComponentMock.prototype.reset = function () {
        this.host.innerHTML = '';
        this.ngOnChanges('');
    };
    InlineEditorComponentMock.prototype.ngOnInit = function () {
        this.options = (typeof this.options === 'string') ? JSON.parse(this.options)
            : (typeof this.options === 'object') ? this.options : {};
        if (this.placeholder && this.placeholder !== '') {
            Object.assign(this.options, {
                placeholder: { text: this.placeholder }
            });
        }
    };
    InlineEditorComponentMock.prototype.prepareForSave = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            });
        });
    };
    InlineEditorComponentMock.prototype.ngOnChanges = function (changes) {
        this.propagateChange(changes);
    };
    InlineEditorComponentMock.prototype.writeValue = function (value) {
        if (value && value !== '') {
            this.host.innerHTML = value;
        }
    };
    InlineEditorComponentMock.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    InlineEditorComponentMock.prototype.registerOnTouched = function (fn) {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], InlineEditorComponentMock.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InlineEditorComponentMock.prototype, "placeholder", void 0);
    __decorate([
        core_1.ViewChild('host'),
        __metadata("design:type", HTMLDivElement)
    ], InlineEditorComponentMock.prototype, "host", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], InlineEditorComponentMock.prototype, "reset", null);
    InlineEditorComponentMock = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-inline-editor',
            template: "\n    <div #host></div>",
            host: {
                'change': 'propagateChange($event.target.value)'
            },
            providers: [exports.MEDIUM_EDITOR_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], InlineEditorComponentMock);
    return InlineEditorComponentMock;
}());
describe('BlogEdit', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                hovercard_1.Hovercard,
                OpspotBannerMock,
                TextareaMock,
                InlineEditorComponentMock,
                WireThresholdInputComponentMock,
                mock_1.MockComponent({
                    selector: 'opspot-form-tags-input',
                    inputs: ['tags', 'additionalTags'],
                    outputs: ['change', 'tagsChange'],
                }),
                mock_1.MockComponent({
                    selector: 'm-hashtags-selector',
                    inputs: ['tags', 'alignLeft'],
                    outputs: ['tagsChange', 'tagsAdded', 'tagsRemoved'],
                }),
                edit_1.BlogEdit,
                MDLMock
            ],
            imports: [
                testing_2.RouterTestingModule,
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: upload_1.Upload, useValue: upload_mock_spec_1.uploadMock },
                { provide: title_1.OpspotTitle, useValue: opspot_title_service_mock_spec_1.opspotTitleMock },
                { provide: hovercard_2.HovercardService, useValue: hovercard_mock_spec_1.hovercardServiceMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(edit_1.BlogEdit);
        comp = fixture.componentInstance; // BlogEdit test instance
        spyOn(comp.session, 'isLoggedIn').and.returnValue(true);
        client_mock_spec_1.clientMock.response = [];
        client_mock_spec_1.clientMock.response["api/v1/admin/boosts/newsfeed"] = {
            'status': 'success',
        };
        window.Opspot.categories = {
            'art': 'Art',
            'animals': 'Animals',
            'music': 'Music',
            'science': 'Science',
            'technology': 'Technology',
            'gaming': 'Gaming',
            'nature': 'Nature',
            'news': 'News',
            'politics': 'Politics',
            'comedy': 'Comedy',
            'film': 'Film ',
            'education': 'Education',
            'sports': 'Sports',
            'food': 'Food',
            'modeling': 'Modeling',
            'spirituality': 'Spirituality ',
            'health': 'Health'
        };
        fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable().then(function () {
                done();
            });
        }
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should have an instance of opspot-textarea used for the title', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-h1-input'))).not.toBeNull();
    });
    it('should have an instance of m-inline-editor used for the description', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.opspot-blog-descriptions > m-inline-editor'))).not.toBeNull();
    });
    /*it('should have a list of categories', () => {
      expect(fixture.debugElement.query(By.css('ul.m-blog--categories-list'))).not.toBeNull();
    });
  
    it('clicking on a category should select it', () => {
      spyOn(comp, 'onCategoryClick').and.callThrough();
  
      const category = fixture.debugElement.query(By.css('ul.m-blog--categories-list > li.m-blog--categories-list-item'));
      expect(category).not.toBeNull();
      category.nativeElement.click();
      fixture.detectChanges();
  
      expect(comp.onCategoryClick).toHaveBeenCalled();
  
      expect(comp.blog.categories.length).toBe(1);
    });*/
    it('should have a save draft button', function () {
        var draft = fixture.debugElement.query(platform_browser_1.By.css('.m-button.m-button--draft'));
        expect(draft).not.toBeNull();
        expect(draft.nativeElement.innerText).toContain('Save draft');
    });
    it('clicking on save draft button should call save()', function () {
        spyOn(comp, 'save').and.stub();
        var draft = fixture.debugElement.query(platform_browser_1.By.css('.m-button.m-button--draft'));
        draft.nativeElement.click();
        fixture.detectChanges();
        expect(comp.blog.published).toBe(0);
        expect(comp.save).toHaveBeenCalled();
    });
    it('should have a publish button', function () {
        var publish = fixture.debugElement.query(platform_browser_1.By.css('.m-button.m-button--submit'));
        expect(publish).not.toBeNull();
        expect(publish.nativeElement.innerText).toContain('Publish');
    });
    it('clicking on publish button should set blog.published to 1 and then call publish()', function () {
        spyOn(comp, 'save').and.stub();
        var publish = fixture.debugElement.query(platform_browser_1.By.css('.m-button.m-button--submit'));
        publish.nativeElement.click();
        fixture.detectChanges();
        expect(comp.blog.published).toBe(1);
        expect(comp.save).toHaveBeenCalled();
    });
    it('should have a m-wire-threshold-input', function () {
        var threshold = fixture.debugElement.query(platform_browser_1.By.css('m-wire-threshold-input'));
        expect(threshold).not.toBeNull();
        expect(threshold.nativeElement.disabled).toBeFalsy();
    });
});
//# sourceMappingURL=edit.spec.js.map
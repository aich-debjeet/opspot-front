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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var card_1 = require("./card");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var attachment_1 = require("../../../services/attachment");
var attachment_service_mock_spec_1 = require("../../../../tests/attachment-service-mock.spec");
var excerpt_1 = require("../../../common/pipes/excerpt");
var core_1 = require("@angular/core");
var ThumbsUpMock = /** @class */ (function () {
    function ThumbsUpMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ThumbsUpMock.prototype, "object", void 0);
    ThumbsUpMock = __decorate([
        core_1.Component({
            selector: 'opspot-button-thumbs-up',
            template: ''
        })
    ], ThumbsUpMock);
    return ThumbsUpMock;
}());
var ThumbsDownMock = /** @class */ (function () {
    function ThumbsDownMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ThumbsDownMock.prototype, "object", void 0);
    ThumbsDownMock = __decorate([
        core_1.Component({
            selector: 'opspot-button-thumbs-down',
            template: ''
        })
    ], ThumbsDownMock);
    return ThumbsDownMock;
}());
var CommentsMock = /** @class */ (function () {
    function CommentsMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommentsMock.prototype, "object", void 0);
    CommentsMock = __decorate([
        core_1.Component({
            selector: 'opspot-button-comment',
            template: ''
        })
    ], CommentsMock);
    return CommentsMock;
}());
describe('BlogCard', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                excerpt_1.ExcerptPipe,
                ThumbsUpMock,
                ThumbsDownMock,
                CommentsMock,
                card_1.BlogCard,
            ],
            imports: [
                testing_2.RouterTestingModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: attachment_1.AttachmentService, useValue: attachment_service_mock_spec_1.attachmentServiceMock },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(card_1.BlogCard);
        comp = fixture.componentInstance;
        comp._blog = {
            guid: '1',
            title: 'title',
            time_created: 1525865293,
            thumbnail_src: 'link/to/thumbnail',
            excerpt: 'this is an excerpt',
            published: false,
            ownerObj: {
                guid: '2',
                username: 'testowner',
                icontime: 1525865293,
            }
        };
        session_mock_spec_1.sessionMock.user.admin = false;
        fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable()
                .then(function () {
                fixture.detectChanges();
                done();
            });
        }
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should link to the blog', function () {
        var a = fixture.debugElement.query(platform_browser_1.By.css('a'));
        expect(a).not.toBeNull();
        expect(a.nativeElement.getAttributeNode('ng-reflect-router-link').textContent).toBe('/blog/view,1');
    });
    it('should have a mature overlay', function () {
        attachment_service_mock_spec_1.attachmentServiceMock.blur = true;
        fixture.detectChanges();
        var a = fixture.debugElement.query(platform_browser_1.By.css('a'));
        expect(a.nativeElement.classList).toContain('m-mature-thumbnail');
        var matureOverlay = fixture.debugElement.query(platform_browser_1.By.css('span.m-mature-thumbnail-overlay'));
        expect(matureOverlay).not.toBeNull();
    });
    it('should have an owner block', function () {
        var block = fixture.debugElement.query(platform_browser_1.By.css('div.m-title-block'));
        expect(block).not.toBeNull();
        var a = fixture.debugElement.query(platform_browser_1.By.css('div.m-title-block a'));
        expect(a).not.toBeNull();
        expect(a.nativeElement.getAttributeNode('ng-reflect-router-link').textContent).toBe('/blog/view,1');
        var title = fixture.debugElement.query(platform_browser_1.By.css('div.m-title-block a strong'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('title');
        var ownerBlock = fixture.debugElement.query(platform_browser_1.By.css('.m-inline-owner-block'));
        expect(ownerBlock).not.toBeNull();
        var username = fixture.debugElement.query(platform_browser_1.By.css('.m-inline-owner-block a'));
        expect(username).not.toBeNull();
        expect(username.nativeElement.textContent).toContain('testowner');
        expect(username.nativeElement.getAttributeNode('ng-reflect-router-link').textContent).toBe('/,testowner');
        var avatar = fixture.debugElement.query(platform_browser_1.By.css('.m-inline-owner-block > a > img'));
        expect(avatar).not.toBeNull();
        expect(avatar.nativeElement.src).toContain('/icon/2/small/1525865293');
        var time = fixture.debugElement.query(platform_browser_1.By.css('.m-inline-owner-block > span'));
        expect(time).not.toBeNull();
        expect(time.nativeElement.textContent).toBe('May 9, 2018');
    });
    it("should have a draft indicator if the blog was not published and the logged in user is the blog owner", function () {
        comp._blog = {};
        fixture.detectChanges();
        comp._blog = {
            guid: '1',
            title: 'title',
            time_created: 1525865293,
            thumbnail_src: 'link/to/thumbnail',
            excerpt: 'this is an excerpt',
            published: false,
            owner_guid: '1000',
            ownerObj: {
                guid: '1000',
                username: 'test',
                icontime: 1525865293,
            }
        };
        fixture.detectChanges();
        var draft = fixture.debugElement.query(platform_browser_1.By.css('.m-inline-owner-block > span:last-child'));
        expect(draft).not.toBeNull();
        expect(draft.nativeElement.textContent).toBe('Draft');
    });
    it('should have an action bar with buttons', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-action-tabs'))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-action-tabs opspot-button-thumbs-up'))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-action-tabs opspot-button-thumbs-down'))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-action-tabs opspot-button-comment'))).not.toBeNull();
    });
});
//# sourceMappingURL=card.spec.js.map
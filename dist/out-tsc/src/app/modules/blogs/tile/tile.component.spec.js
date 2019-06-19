"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var excerpt_1 = require("../../../common/pipes/excerpt");
var activity_component_spec_1 = require("../../legacy/components/cards/activity/activity.component.spec");
var testing_2 = require("@angular/router/testing");
var tile_component_1 = require("./tile.component");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var attachment_1 = require("../../../services/attachment");
var attachment_service_mock_spec_1 = require("../../../../tests/attachment-service-mock.spec");
describe('BlogTileComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [excerpt_1.ExcerptPipe, activity_component_spec_1.SafeToggleComponentMock, tile_component_1.BlogTileComponent],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule, common_1.CommonModule, forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: attachment_1.AttachmentService, useValue: attachment_service_mock_spec_1.attachmentServiceMock },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(tile_component_1.BlogTileComponent);
        comp = fixture.componentInstance;
        comp.setEntity = {
            guid: '1',
            title: 'title',
            time_created: 1525865293,
            thumbnail_src: 'link/to/thumbnail',
            excerpt: 'this is an excerpt',
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
    it('should link to the blog url', function () {
        var tile = fixture.debugElement.query(platform_browser_1.By.css('.m-blog--tile'));
        expect(tile).not.toBeNull();
        expect(tile.nativeElement.getAttributeNode('ng-reflect-router-link').textContent).toBe('/blog/view,1');
    });
    it('should have a mature content wrapper', function () {
        attachment_service_mock_spec_1.attachmentServiceMock.blur = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-blog--tile-thumbnail-wrapper'))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-blog--tile-thumbnail-wrapper.m-blog--tile--mature-thumbnail'))).not.toBeNull();
    });
    it('should have a thumbnail', function () {
        var a = fixture.debugElement.query(platform_browser_1.By.css('a.m-blog--tile-thumbnail'));
        expect(a).not.toBeNull();
        expect(a.nativeElement.getAttributeNode('ng-reflect-router-link').textContent).toContain('/blog/view,1');
    });
    it('should have a title and excerpt', function () {
        var label = fixture.debugElement.query(platform_browser_1.By.css('.m-blog--tile-title > label'));
        var excerpt = fixture.debugElement.query(platform_browser_1.By.css('.m-blog--tile-title > p'));
        expect(label).not.toBeNull();
        expect(label.nativeElement.textContent).toContain('title');
        expect(excerpt).not.toBeNull();
        expect(excerpt.nativeElement.textContent).toContain('this is an excerpt');
    });
    it('should have an owner block', function () {
        var block = fixture.debugElement.query(platform_browser_1.By.css('.m-inline-owner-block'));
        expect(block).not.toBeNull();
        var owner = fixture.debugElement.query(platform_browser_1.By.css('.m-inline-owner-block > a'));
        expect(owner).not.toBeNull();
        expect(owner.nativeElement.getAttributeNode('ng-reflect-router-link').textContent).toBe('/,testowner');
        expect(owner.nativeElement.textContent).toContain('testowner');
        var avatar = fixture.debugElement.query(platform_browser_1.By.css('.m-inline-owner-block > a > img'));
        expect(avatar).not.toBeNull();
        expect(avatar.nativeElement.src).toContain('/icon/2/small/1525865293');
        var time = fixture.debugElement.query(platform_browser_1.By.css('.m-inline-owner-block > span'));
        expect(time).not.toBeNull();
        expect(time.nativeElement.textContent).toBe('May 9, 2018');
        var toggle = fixture.debugElement.query(platform_browser_1.By.css('.m-blog--tile-title > m-safe-toggle'));
        expect(toggle).toBeNull();
    });
    it('should have a safe toggle if the user is an admin', function () {
        session_mock_spec_1.sessionMock.user.admin = true;
        fixture.detectChanges();
        var toggle = fixture.debugElement.query(platform_browser_1.By.css('.m-blog--tile-title > m-safe-toggle'));
        expect(toggle).not.toBeNull();
    });
});
//# sourceMappingURL=tile.component.spec.js.map
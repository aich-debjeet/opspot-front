"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var filter_selector_component_1 = require("./filter-selector.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var mock_1 = require("../../../../utils/mock");
var videochat_service_1 = require("../../../videochat/videochat.service");
var videoChatServiceMock = mock_1.MockService(videochat_service_1.VideoChatService);
describe('GroupsProfileFilterSelector', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [filter_selector_component_1.GroupsProfileFilterSelector],
            providers: [
                { provide: videochat_service_1.VideoChatService, useValue: videoChatServiceMock }
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(filter_selector_component_1.GroupsProfileFilterSelector);
        comp = fixture.componentInstance;
        comp.group = {
            guid: 123
        };
        comp.filter = 'activity';
        fixture.detectChanges();
    });
    it('should wrap everything inside a div', function () {
        var div = fixture.debugElement.query(platform_browser_1.By.css('.m-groups--filter-selector'));
        expect(div).not.toBeNull();
        expect(div.nativeElement.children.length).toBe(3);
    });
    it('should have a link to feed', function () {
        var a = fixture.debugElement.query(platform_browser_1.By.css('.m-groups--filter-selector-item:first-child'));
        expect(a).not.toBeNull();
        expect(a.nativeElement.textContent).toContain('Feed');
        expect(a.nativeElement.href).toContain('/groups/profile/123/feed');
        expect(a.nativeElement.classList).toContain('m-groups--filter-selector-active');
    });
    it('should have a link to images', function () {
        comp.filter = 'image';
        fixture.detectChanges();
        var a = fixture.debugElement.query(platform_browser_1.By.css('.m-groups--filter-selector-item:nth-child(2)'));
        expect(a).not.toBeNull();
        expect(a.nativeElement.textContent).toContain('Images');
        expect(a.nativeElement.href).toContain('/groups/profile/123/feed/image');
        expect(a.nativeElement.classList).toContain('m-groups--filter-selector-active');
    });
    it('should have a link to videos', function () {
        comp.filter = 'image';
        fixture.detectChanges();
        var a = fixture.debugElement.query(platform_browser_1.By.css('.m-groups--filter-selector-item:nth-child(3)'));
        expect(a).not.toBeNull();
        expect(a.nativeElement.textContent).toContain('Videos');
    });
});
//# sourceMappingURL=filter-selector.component.spec.js.map
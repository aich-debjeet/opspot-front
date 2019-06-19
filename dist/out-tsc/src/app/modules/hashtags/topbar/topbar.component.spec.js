"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var topbar_component_1 = require("./topbar.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var mock_1 = require("../../../utils/mock");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var topbar_service_1 = require("../service/topbar.service");
var topbar_service_mock_1 = require("../../../mocks/modules/hashtags/service/topbar.service.mock");
describe('TopbarHashtagsComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockComponent({ selector: 'm-tooltip', template: '<ng-content></ng-content>' }),
                mock_1.MockComponent({ selector: 'm-dropdown', template: '<ng-content></ng-content>' }),
                topbar_component_1.TopbarHashtagsComponent
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
                {
                    provide: topbar_service_1.TopbarHashtagsService, useValue: topbar_service_mock_1.topbarHashtagsServiceMock
                }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        fixture = testing_1.TestBed.createComponent(topbar_component_1.TopbarHashtagsComponent);
        topbar_service_mock_1.topbarHashtagsServiceMock.loadResponse = [
            {
                value: 'hashtag1',
                selected: true
            },
            {
                value: 'hashtag2',
                selected: false
            }
        ];
        comp = fixture.componentInstance;
        fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable().then(function () {
                fixture.detectChanges();
                done();
            });
        }
    });
    it('should have an #all option that lets the feed know to ignore user selected hashtags', function () {
        var all = fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--hashtags--hashtag--all'));
        expect(all).not.toBeNull();
        expect(all.nativeElement.textContent).toContain('#all');
        expect(comp.all).toBeFalsy();
        all.nativeElement.click();
        expect(comp.all).toBeTruthy();
    });
    it('should have two hashtags, and one should be selected', function () {
        var hashtag1 = fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--hashtags > span.m-topbar--hashtags--hashtag.m-topbar--hashtags--hashtag--selected:not(.m-topbar--hashtags--hashtag--all)'));
        expect(hashtag1).not.toBeNull();
        expect(hashtag1.nativeElement.textContent).toContain('#hashtag1');
        var hashtag2 = fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--hashtags > span.m-topbar--hashtags--hashtag:not(.m-topbar--hashtags--hashtag--selected):not(.m-topbar--hashtags--hashtag--all)'));
        expect(hashtag2).not.toBeNull();
        expect(hashtag2.nativeElement.textContent).toContain('#hashtag2');
    });
    it('should toggle the hashtag when clicked', function () {
        var hashtag1 = fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--hashtags > span.m-topbar--hashtags--hashtag.m-topbar--hashtags--hashtag--selected'));
        hashtag1.nativeElement.click();
        fixture.detectChanges();
        expect(topbar_service_mock_1.topbarHashtagsServiceMock.toggleSelection).toHaveBeenCalled();
    });
    it('should have a MORE button', function () {
        var button = fixture.debugElement.query(platform_browser_1.By.css('span.m-topbar--hashtags--select-more'));
        expect(button).not.toBeNull();
        expect(button.nativeElement.textContent).toContain('MORE');
        var tooltip = fixture.debugElement.query(platform_browser_1.By.css('span.m-topbar--hashtags--select-more m-tooltip'));
        expect(tooltip).not.toBeNull();
        expect(tooltip.nativeElement.textContent).toContain('Select the hashtags you wish to see more often');
    });
    it('should open the hashtags selector modal when clicking on MORE', function () {
        spyOn(comp, 'openModal').and.stub();
        var button = fixture.debugElement.query(platform_browser_1.By.css('span.m-topbar--hashtags--select-more'));
        button.nativeElement.click();
        expect(comp.openModal).toHaveBeenCalled();
    });
});
//# sourceMappingURL=topbar.component.spec.js.map
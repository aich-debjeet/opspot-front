"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var hashtags_selector_component_1 = require("./hashtags-selector.component");
var abbr_1 = require("../../../common/pipes/abbr");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var topbar_service_1 = require("../service/topbar.service");
var topbar_service_mock_1 = require("../../../mocks/modules/hashtags/service/topbar.service.mock");
describe('HashtagsSelectorModalComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                abbr_1.AbbrPipe,
                hashtags_selector_component_1.HashtagsSelectorModalComponent,
            ],
            imports: [forms_1.FormsModule, testing_2.RouterTestingModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
                { provide: topbar_service_1.TopbarHashtagsService, useValue: topbar_service_mock_1.topbarHashtagsServiceMock }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(hashtags_selector_component_1.HashtagsSelectorModalComponent);
        comp = fixture.componentInstance;
        topbar_service_mock_1.topbarHashtagsServiceMock.loadResponse = [
            {
                value: 'thegreatmigration',
                selected: true,
            },
            {
                value: 'thegreatmigration',
                selected: true,
            },
            {
                value: 'thegreatmigration',
                selected: true,
            },
            {
                value: 'thegreatmigration',
                selected: true,
            }
        ];
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
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should have a title', function () {
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-hashtags-selector--header h3'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Personalize your feed');
    });
    it('should have subtext', function () {
        var subtitle = fixture.debugElement.query(platform_browser_1.By.css('.m-hashtags-selector--header .m-hashtags-selector--subtext'));
        expect(subtitle).not.toBeNull();
        expect(topbar_service_mock_1.topbarHashtagsServiceMock.load).toHaveBeenCalled();
        comp.toggleSelection({
            selected: true,
            value: '22'
        });
        fixture.detectChanges();
        expect(topbar_service_mock_1.topbarHashtagsServiceMock.toggleSelection).toHaveBeenCalled();
        comp.toggleSelection({
            selected: false,
            value: '22'
        });
        fixture.detectChanges();
        expect(topbar_service_mock_1.topbarHashtagsServiceMock.toggleSelection).toHaveBeenCalled();
        expect(subtitle.nativeElement.textContent).toContain("Select the hashtags below that you wish to see more of. The hashtags you select will be pinned to the top bar of your feed. You can change these at anytime via your settings or by clicking on 'MORE' at the top of any feed");
    });
    it('should create a hashtag', function () {
        var subtitle = fixture.debugElement.query(platform_browser_1.By.css('.m-hashtags-selector--header .m-hashtags-selector--subtext'));
        expect(subtitle).not.toBeNull();
        comp.input = 'Newhastag';
        comp.addNew();
        fixture.detectChanges();
        expect(topbar_service_mock_1.topbarHashtagsServiceMock.toggleSelection).toHaveBeenCalled();
        expect(subtitle.nativeElement.textContent).toContain("Select the hashtags below that you wish to see more of. The hashtags you select will be pinned to the top bar of your feed. You can change these at anytime via your settings or by clicking on 'MORE' at the top of any feed");
    });
    it('should create a hashtag and be case insensitive', function () {
        var subtitle = fixture.debugElement.query(platform_browser_1.By.css('.m-hashtags-selector--header .m-hashtags-selector--subtext'));
        expect(subtitle).not.toBeNull();
        comp.input = "UpperCaseDoesn'tMatter";
        comp.addNew();
        fixture.detectChanges();
        expect(comp.hashtags.findIndex(function (item) { return item.value === "uppercasedoesntmatter"; })).not.toBe(-1);
        expect(topbar_service_mock_1.topbarHashtagsServiceMock.toggleSelection).toHaveBeenCalled();
        expect(subtitle.nativeElement.textContent).toContain("Select the hashtags below that you wish to see more of. The hashtags you select will be pinned to the top bar of your feed. You can change these at anytime via your settings or by clicking on 'MORE' at the top of any feed");
    });
    it('should have a done button', function () {
        var button = fixture.debugElement.query(platform_browser_1.By.css('i.m-hashtag--creator--done'));
        console.warn(comp.inProgress);
        expect(button).not.toBeNull();
        expect(button.nativeElement.textContent).toContain('done');
    });
    it('clicking on done should close the modal', function () {
        var button = fixture.debugElement.query(platform_browser_1.By.css('i.m-hashtag--creator--close'));
        button.nativeElement.click();
        expect(comp.addingHashtag).toBeFalsy();
    });
});
//# sourceMappingURL=hashtags-selector.component.spec.js.map
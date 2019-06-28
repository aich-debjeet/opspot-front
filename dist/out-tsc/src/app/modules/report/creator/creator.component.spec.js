"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var creator_component_1 = require("./creator.component");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var abbr_1 = require("../../../common/pipes/abbr");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var forms_1 = require("@angular/forms");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
/* tslint:disable */
var MdlRadioMock = /** @class */ (function () {
    function MdlRadioMock() {
    }
    MdlRadioMock = __decorate([
        core_1.Directive({
            selector: '[mdlRadio]',
            inputs: ['mdlRadio', 'checked', 'mdlRadioValue']
        })
    ], MdlRadioMock);
    return MdlRadioMock;
}());
exports.MdlRadioMock = MdlRadioMock;
describe('ReportCreatorComponent', function () {
    var comp;
    var fixture;
    function getSubjectItem(i) {
        return fixture.debugElement.queryAll(platform_browser_1.By.css(".mdl-radio__button"))[i];
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_mock_spec_1.MaterialMock, MdlRadioMock, material_switch_mock_spec_1.MaterialSwitchMock, abbr_1.AbbrPipe, creator_component_1.ReportCreatorComponent],
            imports: [forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(creator_component_1.ReportCreatorComponent);
        client_mock_spec_1.clientMock.response = {};
        fixture.detectChanges();
        comp = fixture.componentInstance;
        comp.guid = '1';
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
    it('should have a title', function () {
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--header span'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Report');
    });
    it('should have a disabled send button and get the guid from the object', function () {
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--button-submit'));
        expect(button.properties.disabled).toBe(true);
    });
    it('should have a subject list with the expected items', function () {
        var subjectList = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--subjects'));
        var subjectListInputs = fixture.debugElement.queryAll(platform_browser_1.By.css('.m-report-creator--subjects-subject'));
        expect(subjectList).not.toBeNull();
        expect(subjectListInputs.length).toBe(10);
    });
    it('once a item is clicked submit shouldnt be disabled', function () {
        var item = getSubjectItem(2);
        item.nativeElement.click();
        fixture.detectChanges();
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--button-submit'));
        expect(comp.subject).toEqual(3);
        expect(button.properties.disabled).toBe(false);
    });
    it('once a item is clicked and is not submittable, next button should appear, and 2nd step', function () {
        var item = getSubjectItem(9);
        item.nativeElement.click();
        fixture.detectChanges();
        var next = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--button-next'));
        expect(next).not.toBeNull();
        next.nativeElement.click();
        fixture.detectChanges();
        expect(comp.next).toBe(true);
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--button-submit'));
        expect(button.properties.disabled).toBe(false);
    });
    it('should show success msg after submission, calling with the expected params', testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.post.calls.reset();
        client_mock_spec_1.clientMock.response["api/v1/entities/report/1"] = {
            'status': 'success',
            done: true,
        };
        var item = getSubjectItem(1);
        item.nativeElement.click();
        fixture.detectChanges();
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--button-submit'));
        expect(button.properties.disabled).toBe(false);
        button.nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({ subject: 2, note: '' });
        expect(comp.success).toBe(true);
        expect(comp.inProgress).toBe(false);
    }));
    it('should not show succes if param is not true', testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.post.calls.reset();
        client_mock_spec_1.clientMock.response["api/v1/entities/report/1"] = {
            'status': 'success',
            done: false,
        };
        var item = getSubjectItem(1);
        item.nativeElement.click();
        fixture.detectChanges();
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--button-submit'));
        expect(button.properties.disabled).toBe(false);
        button.nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({ subject: 2, note: '' });
        expect(comp.success).toBe(false);
        expect(comp.inProgress).toBe(false);
    }));
    it('should show error msg after submission, calling with the expected params', testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.post.calls.reset();
        client_mock_spec_1.clientMock.response["api/v1/entities/report/1"] = {
            'status': 'error',
            done: false,
            'message': 'error message',
        };
        var item = getSubjectItem(1);
        item.nativeElement.click();
        fixture.detectChanges();
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--button-submit'));
        expect(button.properties.disabled).toBe(false);
        button.nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({ subject: 2, note: '' });
        expect(comp.success).toBe(false);
        expect(comp.inProgress).toBe(false);
    }));
    /*it('should show error msg after submission, calling with the expected params', fakeAsync(() => {
      clientMock.post.calls.reset();
      clientMock.response[ `api/v1/entities/report/1` ] = {
        'status': 'error',
        done: false,
        'message': 'error message',
      };
  
      const item = getSubjectItem(1);
      item.nativeElement.click();
      fixture.detectChanges();
      comp.showErrors();
      fixture.detectChanges();
      comp.subject = null;
      comp.showErrors();
      fixture.detectChanges();
      expect(comp.error).toBe('There was an error sending your report.');
    }));*/
    it('once a item is clicked and its copyright one, next button should appear, and 2nd step should allow closing', function () {
        var item = getSubjectItem(8);
        item.nativeElement.click();
        fixture.detectChanges();
        var next = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--button-next'));
        expect(next).not.toBeNull();
        next.nativeElement.click();
        expect(comp.subject).toEqual(10);
        expect(comp.next).toBe(true);
        fixture.detectChanges();
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--close button'));
        expect(button).not.toBeNull();
        button.nativeElement.click();
    });
});
//# sourceMappingURL=creator.component.spec.js.map
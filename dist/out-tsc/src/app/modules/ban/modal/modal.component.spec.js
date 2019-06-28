"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var abbr_1 = require("../../../common/pipes/abbr");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var forms_1 = require("@angular/forms");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var modal_component_1 = require("./modal.component");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
describe('BanModalComponent', function () {
    var comp;
    var fixture;
    function getSubjectItem(i) {
        return fixture.debugElement.queryAll(platform_browser_1.By.css(".mdl-radio__button"))[i];
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_mock_spec_1.MaterialMock, material_switch_mock_spec_1.MaterialSwitchMock, abbr_1.AbbrPipe, modal_component_1.BanModalComponent],
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
        fixture = testing_1.TestBed.createComponent(modal_component_1.BanModalComponent);
        client_mock_spec_1.clientMock.response = {};
        comp = fixture.componentInstance;
        //set the user
        comp.data = {
            'guid': '1',
            'type': 'user',
            'name': 'test',
            'username': 'test',
            'language': 'en',
            'banned': 'no',
            'city': 'Parana',
            'merchant': false,
            'boostProPlus': false,
            'fb': false,
            'mature': 1,
            'monetized': '',
            'signup_method': false,
            'feature_flags': false,
            'programs': [],
            'plus': false,
            'verified': true,
            'disabled_boost': false,
            'wire_rewards': null,
            'chat': true,
            'subscribed': false,
            'subscriber': false,
            'subscribers_count': 73,
            'subscriptions_count': 29,
            'impressions': 14761,
            'boost_rating': '2'
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
    it('should have a title', function () {
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--header span'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Ban');
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
        client_mock_spec_1.clientMock.put.calls.reset();
        client_mock_spec_1.clientMock.response["api/v1/admin/ban/1"] = { 'status': 'success' };
        var item = getSubjectItem(1);
        item.nativeElement.click();
        fixture.detectChanges();
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--button-submit'));
        expect(button.properties.disabled).toBe(false);
        button.nativeElement.click();
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.put).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.put.calls.mostRecent().args[1]).toEqual({
            subject: {
                label: 'Should be marked as explicit',
                value: 2
            }, note: ''
        });
        expect(comp.success).toBe(true);
        expect(comp.inProgress).toBe(false);
    }));
    it('should show error msg after submission, calling with the expected params', testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.put.calls.reset();
        client_mock_spec_1.clientMock.response["api/v1/admin/ban/1"] = {
            'status': 'error',
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
        expect(client_mock_spec_1.clientMock.put).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.put.calls.mostRecent().args[1]).toEqual({
            subject: {
                label: 'Should be marked as explicit',
                value: 2
            }, note: ''
        });
        expect(comp.success).toBe(false);
        expect(comp.inProgress).toBe(false);
    }));
    it('once an item is clicked if it\'s the copyright one, next button shouldnt appear', function () {
        var item = getSubjectItem(8);
        item.nativeElement.click();
        fixture.detectChanges();
        var next = fixture.debugElement.query(platform_browser_1.By.css('.m-report-creator--button-next'));
        expect(next).toBeNull();
    });
});
//# sourceMappingURL=modal.component.spec.js.map
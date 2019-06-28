"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../services/session");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var emails_component_1 = require("./emails.component");
xdescribe('SettingsEmailsComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    function getSaveButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-settings--emails--save'));
    }
    function getListElement(campaign, i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".m-settings--emails--" + campaign + "-campaign ul.m-settings--emails-campaigns li:nth-child(" + i + ")"));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_mock_spec_1.MaterialMock, emails_component_1.SettingsEmailsComponent],
            imports: [testing_2.RouterTestingModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(emails_component_1.SettingsEmailsComponent);
        comp = fixture.componentInstance; // SettingsEmailsComponent test instance
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v1/settings'] = {
            'status': 'success',
            'notifications': [
                {
                    'campaign': 'when',
                    'topic': 'boost_completed',
                    'value': false
                },
                {
                    'campaign': 'when',
                    'topic': 'wire_received',
                    'value': false
                }
            ]
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
    it('load function should update notifications', testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.response['api/v1/settings'] = {
            'status': 'success',
            'notifications': [
                {
                    'campaign': 'when',
                    'topic': 'boost_completed',
                    'value': true
                }
            ]
        };
        expect(comp.notifications.when.boost_completed).toBeFalsy();
        comp.load();
        testing_1.tick();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toBe('api/v1/settings');
        expect(comp.notifications.when.boost_completed).toBeTruthy();
    }));
    it('should have save button', function () {
        expect(getSaveButton()).not.toBeNull();
    });
    it('save button should be disabled', function () {
        expect(getSaveButton().nativeElement.disabled).toBeTruthy();
    });
    it('save button should be enabled if something changed', function () {
        comp.changed = true;
        fixture.detectChanges();
        expect(getSaveButton().nativeElement.disabled).toBeFalsy();
    });
    it('save button should call save()', function () {
        comp.changed = true;
        fixture.detectChanges();
        spyOn(comp, 'save').and.callThrough();
        getSaveButton().nativeElement.click();
        fixture.detectChanges();
        expect(comp.save).toHaveBeenCalled();
    });
    it('should have a spinner', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.mdl-spinner'))).not.toBeNull();
    });
    it('should have a \'Email me when...\' label', function () {
        var label = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--emails--when-campaign h4'));
        expect(label).not.toBeNull();
        expect(label.nativeElement.textContent).toContain('Email me when');
    });
    it('should have a list of campaigns', function () {
        var list = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--emails--when-campaign ul.m-settings--emails-campaigns'));
        expect(list).not.toBeNull();
        expect(list.nativeElement.children.length).toBe(3);
    });
    it('should have a \'I have unread notifications\' item', function () {
        var element = getListElement('when', 1);
        expect(element).not.toBeNull();
    });
    it('\'I have unread notifications\' should have a checkbox and a label', function () {
        var element = getListElement('when', 1);
        expect(element.nativeElement.children[0].tagName).toBe('INPUT');
        expect(element.nativeElement.children[0].type).toBe('checkbox');
        expect(element.nativeElement.children[1].tagName).toBe('LABEL');
        expect(element.nativeElement.children[1].textContent).toContain('I have unread notifications');
    });
    it('should have a \'I receive a wire\' item', function () {
        var element = getListElement('when', 2);
        expect(element).not.toBeNull();
        expect(element.nativeElement.children[1].textContent).toContain('I receive a wire');
    });
    it('should have a \'My boost has been completed\' item', function () {
        var element = getListElement('when', 3);
        expect(element).not.toBeNull();
        expect(element.nativeElement.children[1].textContent).toContain('My boost has been completed');
    });
    it('should have a \'Email me with...\' label', function () {
        var label = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--emails--with-campaign h4'));
        expect(label).not.toBeNull();
        expect(label.nativeElement.textContent).toContain('Email me with');
    });
    it('should have a \'Top posts from my network\' item', function () {
        var element = getListElement('with', 1);
        expect(element).not.toBeNull();
        expect(element.nativeElement.children[1].textContent).toContain('Top posts from my network');
    });
    it('\'Top posts from my network\' should also have a dropdown with \'Periodically\', \'Daily\' and \'Weekly\' ', function () {
        var element = getListElement('with', 1);
        expect(element).not.toBeNull();
        expect(element.nativeElement.children[3].tagName).toBe('SELECT');
        expect(element.nativeElement.children[3].children[0].textContent).toBe('Periodically');
        expect(element.nativeElement.children[3].children[1].textContent).toBe('Daily');
        expect(element.nativeElement.children[3].children[2].textContent).toBe('Weekly');
    });
    it('should have a \'Tips on how to improve my channel\' item', function () {
        var element = getListElement('with', 2);
        expect(element).not.toBeNull();
        expect(element.nativeElement.children[1].textContent).toContain('Tips on how to improve my channel');
    });
    it('should have a \'Things I\'ve missed since my last login\' item', function () {
        var element = getListElement('with', 3);
        expect(element).not.toBeNull();
        expect(element.nativeElement.children[1].textContent).toContain('Things I\'ve missed since my last login');
    });
    it('should have a \'New channels to subscribe to\' item', function () {
        var element = getListElement('with', 4);
        expect(element).not.toBeNull();
        expect(element.nativeElement.children[1].textContent).toContain('New channels to subscribe to');
    });
    it('should have a \'Keep me updated with...\' label', function () {
        var label = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--emails--global-campaign h4'));
        expect(label).not.toBeNull();
        expect(label.nativeElement.textContent).toContain('Keep me updated with');
    });
    it('should have a \'News about new Opspot products and features\' item', function () {
        var element = getListElement('global', 1);
        expect(element).not.toBeNull();
        expect(element.nativeElement.children[1].textContent).toContain('News about new Opspot products and features');
    });
    it('should have a \'Tips on how to use Opspot\' item', function () {
        var element = getListElement('global', 2);
        expect(element).not.toBeNull();
        expect(element.nativeElement.children[1].textContent).toContain('Tips on how to use Opspot');
    });
    it('should have a \'Exclusive promotions\' item', function () {
        var element = getListElement('global', 3);
        expect(element).not.toBeNull();
        expect(element.nativeElement.children[1].textContent).toContain('Exclusive promotions');
    });
    it('clicking on an element\'s checkbox should set changed to true', function () {
        spyOn(comp, 'change').and.callThrough();
        var element = getListElement('when', 1);
        expect(comp.changed).toBeFalsy();
        element.nativeElement.children[0].click();
        fixture.detectChanges();
        expect(comp.change).toHaveBeenCalled();
        expect(comp.changed).toBeTruthy();
    });
    it('should submit the changes', function () {
        spyOn(comp, 'change').and.callThrough();
        var element1 = getListElement('when', 1);
        var element2 = getListElement('when', 2);
        var element3 = getListElement('with', 1);
        element1.nativeElement.children[0].click();
        element2.nativeElement.children[0].click();
        element3.nativeElement.children[0].click();
        fixture.detectChanges();
        element3.nativeElement.children[3].children[1].selected = true;
        fixture.detectChanges();
        element3.nativeElement.children[2].dispatchEvent(new Event('change'));
        fixture.detectChanges();
        client_mock_spec_1.clientMock.response['api/v1/settings'] = { 'status': 'success' };
        getSaveButton().nativeElement.click();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe('api/v1/settings');
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({ 'notifications': comp.notifications });
        fixture.detectChanges();
    });
});
//# sourceMappingURL=emails.component.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var publisher_component_1 = require("./publisher.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../services/session");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
describe('BoostPublisherComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                publisher_component_1.BoostPublisherComponent
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(publisher_component_1.BoostPublisherComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should have a sidebar with two items: Earnings and Settings', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-page > .m-page--sidebar'))).not.toBeNull();
        var earnings = fixture.debugElement.query(platform_browser_1.By.css('.m-page--sidebar--navigation .m-page--sidebar--navigation--item:first-child'));
        expect(earnings).not.toBeNull();
        expect(earnings.nativeElement.children[0].textContent).toBe('history');
        expect(earnings.nativeElement.children[1].textContent).toBe('Earnings');
        var settings = fixture.debugElement.query(platform_browser_1.By.css('.m-page--sidebar--navigation .m-page--sidebar--navigation--item:last-child'));
        expect(settings).not.toBeNull();
        expect(settings.nativeElement.children[0].textContent).toBe('settings');
        expect(settings.nativeElement.children[1].textContent).toBe('Settings');
    });
    it('should have a router outlet', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-page > .m-page--main > router-outlet'))).not.toBeNull();
    });
});
//# sourceMappingURL=publisher.component.spec.js.map
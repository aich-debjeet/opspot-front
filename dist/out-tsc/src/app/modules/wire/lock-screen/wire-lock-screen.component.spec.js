"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var wire_lock_screen_component_1 = require("../lock-screen/wire-lock-screen.component");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var service_1 = require("../../modals/signup/service");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var signup_modal_service_mock_1 = require("../../../mocks/modules/modals/signup/signup-modal-service.mock");
describe('WireLockScreenComponent', function () {
    var comp;
    var fixture;
    var defaultActivity = {
        ownerObj: {
            username: 'opspot',
            guid: 123
        },
        wire_threshold: {
            type: 'tokens',
            min: 10
        }
    };
    function setLoggedIn(loggedIn) {
        session_mock_spec_1.sessionMock.loggedIn = loggedIn;
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_mock_spec_1.MaterialMock, wire_lock_screen_component_1.WireLockScreenComponent],
            imports: [],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
                { provide: service_1.SignupModalService, useValue: signup_modal_service_mock_1.signupModalServiceMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(wire_lock_screen_component_1.WireLockScreenComponent);
        comp = fixture.componentInstance; // LoginForm test instance
        comp.entity = defaultActivity;
        client_mock_spec_1.clientMock.response = { 'status': 'success' };
        spyOn(comp.update, 'next').and.callThrough();
        spyOn(comp.session, 'getLoggedInUser').and.callFake(function () {
            return { guid: 456 };
        });
    });
    it('should have an unlock button', function () {
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('button.m-unlock-button'))).not.toBeNull();
    });
    it('clicking on the unlock button should call unlock function', function () {
        spyOn(comp, 'unlock').and.callThrough();
        fixture.detectChanges();
        var button = fixture.debugElement.query(platform_browser_1.By.css('button.m-unlock-button'));
        button.nativeElement.click();
        expect(comp.unlock).toHaveBeenCalled();
    });
    it('should have wire bolt icon', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.ion-icon.ion-flash'))).toBeDefined();
    });
    it('should show monthly threshold', testing_1.fakeAsync(function () {
        comp.preview = true;
        fixture.detectChanges();
        var monthlyMin = fixture.debugElement.query(platform_browser_1.By.css('h2'));
        expect(monthlyMin.nativeElement.textContent).toContain('10 Tokens/month');
    }));
    it('should have message', function () {
        fixture.detectChanges();
        var message = fixture.debugElement.query(platform_browser_1.By.css('.m-wire--lock-screen--message'));
        expect(message).toBeDefined();
        expect(message.nativeElement.textContent).toContain('This post can only be seen by supporters who wire');
        expect(message.nativeElement.textContent).toContain('over 10 Tokens/month');
        expect(message.nativeElement.textContent).toContain('to @opspot');
    });
    it("shouldn't update the entity if wire/threshold doesn't return an activity", testing_1.fakeAsync(function () {
        comp.preview = true;
        fixture.detectChanges();
        comp.unlock();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.update.next).not.toHaveBeenCalled();
    }));
    it('should update the entity if wire/threshold returns an activity', testing_1.fakeAsync(function () {
        setLoggedIn(true);
        client_mock_spec_1.clientMock.response = { 'status': 'success', 'activity': defaultActivity };
        comp.unlock();
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toContain('api/v1/wire/threshold');
        expect(comp.update.next).toHaveBeenCalled();
        expect(comp.update.next['calls'].mostRecent().args[0]).toBe(defaultActivity);
    }));
    it('should open signup modal if not loggedin and the user clicks on unlock', testing_1.fakeAsync(function () {
        setLoggedIn(false);
        fixture.detectChanges();
        comp.unlock();
        expect(signup_modal_service_mock_1.signupModalServiceMock.open).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=wire-lock-screen.component.spec.js.map
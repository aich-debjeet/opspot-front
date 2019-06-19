"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var rewards_component_1 = require("./rewards.component");
var client_mock_spec_1 = require("../../../../../../tests/client-mock.spec");
var client_1 = require("../../../../../services/api/client");
var mock_1 = require("../../../../../utils/mock");
var session_1 = require("../../../../../services/session");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_mock_spec_1 = require("../../../../../../tests/session-mock.spec");
var router_1 = require("@angular/router");
describe('TokenRewardsOnboardingComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                rewards_component_1.TokenRewardsOnboardingComponent,
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockComponent({ selector: 'm-tooltip', inputs: ['icon', 'i18n'] }),
                mock_1.MockComponent({ selector: 'm-phone-input' }),
                mock_1.MockComponent({ selector: 'm-token--onboarding--video', inputs: ['src'] }),
            ],
            imports: [
                forms_1.FormsModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: core_1.ChangeDetectorRef, useValue: core_1.ChangeDetectorRef },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: router_1.Router, useValue: testing_2.RouterTestingModule },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v2/blockchain/rewards/verify"] = {
            "status": "success",
            "secret": "0",
        };
        client_mock_spec_1.clientMock.response["api/v2/blockchain/rewards/confirm"] = {
            "status": "success",
            "secret": "0",
        };
        fixture = testing_1.TestBed.createComponent(rewards_component_1.TokenRewardsOnboardingComponent);
        comp = fixture.componentInstance;
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
    it('should show verify structure', testing_1.fakeAsync(function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css("m-phone-input"))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token--onboarding--subtext"))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token--onboarding--slide"))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css("m-token--onboarding--video"))).not.toBeNull();
    }));
    it('should call proper endpoints', testing_1.fakeAsync(function () {
        comp.number = 1111;
        comp.verify();
        testing_1.tick();
        comp.cancel();
        testing_1.tick();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe('api/v2/blockchain/rewards/verify');
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({ number: 1111 });
    }));
    it('should show confirm endpoints', testing_1.fakeAsync(function () {
        comp.number = 1111;
        comp.confirm();
        testing_1.tick();
        comp.join();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe('api/v2/blockchain/rewards/confirm');
    }));
    it('should show confim endpoints and fail', testing_1.fakeAsync(function () {
        spyOn(session_mock_spec_1.sessionMock, 'getLoggedInUser').and.returnValue({ guid: 1234, rewards: ['s'] });
        client_mock_spec_1.clientMock.response["api/v2/blockchain/rewards/confirm"] = {
            "status": "error",
            "secret": "0",
        };
        fixture = testing_1.TestBed.createComponent(rewards_component_1.TokenRewardsOnboardingComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        comp.number = 1111;
        comp.confirm();
        testing_1.tick();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe('api/v2/blockchain/rewards/confirm');
    }));
});
//# sourceMappingURL=rewards.component.spec.js.map
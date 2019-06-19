"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var onboarding_component_1 = require("./onboarding.component");
var onboarding_service_1 = require("./onboarding.service");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var client_1 = require("../../../../services/api/client");
var session_1 = require("../../../../services/session");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
var router_1 = require("@angular/router");
var storage_mock_spec_1 = require("../../../../../tests/storage-mock.spec");
var storage_1 = require("../../../../services/storage");
var tokenOnboardingService = new function () {
    this.slide = null;
};
describe('TokenOnboardingComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                onboarding_component_1.TokenOnboardingComponent,
            ],
            imports: [
                forms_1.FormsModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: core_1.ChangeDetectorRef, useValue: core_1.ChangeDetectorRef },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: router_1.Router, useValue: testing_2.RouterTestingModule },
                { provide: storage_1.Storage, useValue: storage_mock_spec_1.storageMock },
                { provide: onboarding_service_1.TokenOnboardingService, useValue: tokenOnboardingService },
                { provide: core_1.ComponentFactoryResolver, useValue: core_1.ComponentFactoryResolver }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(onboarding_component_1.TokenOnboardingComponent);
        comp = fixture.componentInstance;
        comp.host = { viewContainerRef: { clear: function () { } } };
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
    it('should have proper structure', testing_1.fakeAsync(function () {
        spyOn(session_mock_spec_1.sessionMock, 'getLoggedInUser').and.returnValue({ guid: 1234, rewards: ['s'], eth_wallet: '0x0x0x' });
        fixture = testing_1.TestBed.createComponent(onboarding_component_1.TokenOnboardingComponent);
        comp = fixture.componentInstance;
        comp.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token--onboarding"))).not.toBeNull();
    }));
});
//# sourceMappingURL=onboarding.component.spec.js.map
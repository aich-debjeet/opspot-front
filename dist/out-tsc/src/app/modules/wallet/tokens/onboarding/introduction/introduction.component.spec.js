"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var introduction_component_1 = require("./introduction.component");
var client_mock_spec_1 = require("../../../../../../tests/client-mock.spec");
var client_1 = require("../../../../../services/api/client");
var router_1 = require("@angular/router");
var mock_1 = require("../../../../../utils/mock");
var session_1 = require("../../../../../services/session");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_mock_spec_1 = require("../../../../../../tests/session-mock.spec");
var storage_mock_spec_1 = require("../../../../../../tests/storage-mock.spec");
var storage_1 = require("../../../../../services/storage");
describe('TokenIntroductionOnboardingComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                introduction_component_1.TokenIntroductionOnboardingComponent,
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockComponent({ selector: 'm-token--onboarding--video', inputs: ['src'] }),
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: core_1.ChangeDetectorRef, useValue: core_1.ChangeDetectorRef },
                { provide: router_1.Router, useValue: testing_2.RouterTestingModule },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: storage_1.Storage, useValue: storage_mock_spec_1.storageMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(introduction_component_1.TokenIntroductionOnboardingComponent);
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
    it('should show next button and proper structure', function () {
        spyOn(comp.next, 'next').and.stub();
        expect(fixture.debugElement.query(platform_browser_1.By.css("button"))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token--onboarding--slide"))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css("m-token--onboarding--video"))).not.toBeNull();
        var next = fixture.debugElement.query(platform_browser_1.By.css("button"));
        next.nativeElement.click();
        expect(comp.next.next).toHaveBeenCalled();
    });
});
//# sourceMappingURL=introduction.component.spec.js.map
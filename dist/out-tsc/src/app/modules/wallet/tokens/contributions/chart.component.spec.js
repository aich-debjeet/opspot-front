"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var chart_component_1 = require("./chart.component");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var client_1 = require("../../../../services/api/client");
var router_1 = require("@angular/router");
var session_1 = require("../../../../services/session");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
describe('WalletTokenContributionsChartComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                chart_component_1.WalletTokenContributionsChartComponent
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: core_1.ChangeDetectorRef, useValue: core_1.ChangeDetectorRef },
                { provide: router_1.Router, useValue: testing_2.RouterTestingModule },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(chart_component_1.WalletTokenContributionsChartComponent);
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
    it('should show chart', testing_1.fakeAsync(function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token-contributions--chart"))).not.toBeNull();
    }));
});
//# sourceMappingURL=chart.component.spec.js.map
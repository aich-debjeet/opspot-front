"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var earnings_component_1 = require("./earnings.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../../services/session");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var mock_1 = require("../../../../utils/mock");
var client_1 = require("../../../../services/api/client");
describe('BoostPublisherEarningsComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockComponent({ selector: 'm-tooltip', template: '<ng-content></ng-content>', inputs: ['icon'] }),
                mock_1.MockComponent({ selector: 'm-boost-publisher--ledger' }),
                earnings_component_1.BoostPublisherEarningsComponent
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        fixture = testing_1.TestBed.createComponent(earnings_component_1.BoostPublisherEarningsComponent);
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v2/boost/sums'] = {
            sums: {
                total_count: 3,
                total_earnings: 200,
                token_earnings: 200,
                token_count: 3,
                usd_earnings: 0,
                usd_count: 0,
                points_earnings: 0,
                points_count: 0,
            }
        };
        comp.filter = 'earnings';
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
    it('should have an overview of the earnings, showing amount of boosts shown and total earned in tokens', function () {
        fixture.detectChanges();
        var overview = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-publisher--earnings-overview'));
        expect(overview).not.toBeNull();
        expect(overview.children.length).toBe(2);
        var amountSpan = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-publisher--earnings-overview .m-boost-publisher--earnings-overview--total:first-child span'));
        expect(amountSpan).not.toBeNull();
        expect(amountSpan.nativeElement.textContent).toContain('3');
        var amountLabel = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-publisher--earnings-overview .m-boost-publisher--earnings-overview--total:first-child label'));
        expect(amountLabel).not.toBeNull();
        expect(amountLabel.nativeElement.textContent).toContain('Shown');
        var amountTooltip = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-publisher--earnings-overview .m-boost-publisher--earnings-overview--total:first-child m-tooltip'));
        expect(amountTooltip).not.toBeNull();
        expect(amountTooltip.nativeElement.textContent).toContain('How many boosts you have shown in total');
        var earningsSpan = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-publisher--earnings-overview .m-boost-publisher--earnings-overview--total:last-child span'));
        expect(earningsSpan).not.toBeNull();
        expect(earningsSpan.nativeElement.textContent).toContain('200');
        var earningsLabel = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-publisher--earnings-overview .m-boost-publisher--earnings-overview--total:last-child label'));
        expect(earningsLabel).not.toBeNull();
        expect(earningsLabel.nativeElement.textContent).toContain('Earnings');
        var earningsTooltip = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-publisher--earnings-overview .m-boost-publisher--earnings-overview--total:last-child m-tooltip'));
        expect(earningsTooltip).not.toBeNull();
        expect(earningsTooltip.nativeElement.textContent).toContain("How much you've earned (in tokens) in total from all the boosts you have shown");
    });
    it('should have a ledger', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-boost-publisher--earnings--ledger m-boost-publisher--ledger'))).not.toBeNull();
    });
});
//# sourceMappingURL=earnings.component.spec.js.map
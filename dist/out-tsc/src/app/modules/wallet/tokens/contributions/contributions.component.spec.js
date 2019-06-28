"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var contributions_component_1 = require("./contributions.component");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var client_1 = require("../../../../services/api/client");
var router_1 = require("@angular/router");
var mock_1 = require("../../../../utils/mock");
var session_1 = require("../../../../services/session");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
describe('WalletTokenContributionsComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockComponent({ selector: 'm-wallet-token--overview' }),
                mock_1.MockComponent({ selector: 'm-wallet-token--chart' }),
                mock_1.MockComponent({ selector: 'm-date-selector', inputs: ['label', 'date', 'dateChange', 'dateFormat'] }),
                mock_1.MockComponent({ selector: 'm-token--onboarding--rewards', inputs: ['skippable'] }),
                contributions_component_1.WalletTokenContributionsComponent
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
        fixture = testing_1.TestBed.createComponent(contributions_component_1.WalletTokenContributionsComponent);
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v2/blockchain/contributions"] = {
            'status': 'success',
            'balance': 301529,
            contributions: [
                {
                    "timestamp": 1533081600000,
                    "metrics": { "votes": {
                            "metric": "votes",
                            "timestamp": 1533081600000,
                            "amount": "1",
                            "score": 1,
                            "user": "747562985026756623"
                        }
                    },
                    "amount": 1,
                    "score": 1,
                    "share": 0.0009832358291136129
                },
                {
                    "timestamp": 1533081600000,
                    "metrics": { "votes": {
                            "metric": "votes",
                            "timestamp": 1533081600000,
                            "amount": "1",
                            "score": 1,
                            "user": "747562985026756623"
                        }
                    },
                    "amount": 1,
                    "score": 1,
                    "share": 0.0009832358291136129
                },
                {
                    "timestamp": 1533081600000,
                    "metrics": { "votes": {
                            "metric": "votes",
                            "timestamp": 1533081600000,
                            "amount": "1",
                            "score": 1,
                            "user": "747562985026756623"
                        }
                    },
                    "amount": 1,
                    "score": 1,
                    "share": 0.0009832358291136129
                }
            ]
        };
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
        comp.inProgress = true;
        comp.load(false);
        comp.inProgress = false;
        comp.load(true);
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token-contributions--ledger"))).not.toBeNull();
    }));
    it('should show chart', testing_1.fakeAsync(function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token-contributions--ledger"))).not.toBeNull();
        comp.onEndDateChange('a/b/c');
        comp.onStartDateChange('a/b/c');
        testing_1.tick();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toBe('api/v2/blockchain/contributions');
        expect(fixture.debugElement.queryAll(platform_browser_1.By.css(".m-token-contributions--ledger-row")).length).toBe(6);
    }));
    it('should show chart, but no data', testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v2/blockchain/contributions"] = {};
        comp = fixture.componentInstance;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token-contributions--ledger"))).not.toBeNull();
        comp.onEndDateChange('a/b/c');
        comp.onStartDateChange('a/b/c');
        testing_1.tick();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toBe('api/v2/blockchain/contributions');
    }));
});
//# sourceMappingURL=contributions.component.spec.js.map
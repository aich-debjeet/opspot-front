"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var addresses_component_1 = require("./addresses.component");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var client_1 = require("../../../../services/api/client");
var web3_wallet_service_1 = require("../../../blockchain/web3-wallet.service");
var router_1 = require("@angular/router");
var mock_1 = require("../../../../utils/mock");
var session_1 = require("../../../../services/session");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
var web3walletMock = new function () {
    this.getWallets = jasmine.createSpy('getWallets').and.stub().and.returnValue(222);
    this.getCurrentWallet = jasmine.createSpy('getCurrentWallet').and.returnValue('aaa');
    this.getBalance = jasmine.createSpy('getBalance').and.stub();
    this.isLocal = jasmine.createSpy('isLocal').and.stub();
    this.unlock = jasmine.createSpy('unlock').and.stub();
    this.isSameNetwork = jasmine.createSpy('isSameNetwork').and.stub();
    this.setUp = jasmine.createSpy('setUp').and.stub();
    this.ready = jasmine.createSpy('ready').and.stub();
    this.isUnavailable = jasmine.createSpy('isUnavailable').and.stub();
    this.sendSignedContractMethodWithValue = jasmine.createSpy('sendSignedContractMethodWithValue').and.stub();
    this.sendSignedContractMethod = jasmine.createSpy('sendSignedContractMethod').and.stub();
    this.getOnChainInterfaceLabel = jasmine.createSpy('getOnChainInterfaceLabel').and.stub();
    this.sendTransaction = jasmine.createSpy('sendTransaction').and.stub();
    this.config = {
        rate: 0.4
    };
};
describe('WalletTokenAddressesComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockComponent({ selector: 'm-token--onboarding--onchain' }),
                addresses_component_1.WalletTokenAddressesComponent
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: core_1.ChangeDetectorRef, useValue: core_1.ChangeDetectorRef },
                { provide: web3_wallet_service_1.Web3WalletService, useValue: web3walletMock },
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
        fixture = testing_1.TestBed.createComponent(addresses_component_1.WalletTokenAddressesComponent);
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
    it('should show onboarding', testing_1.fakeAsync(function () {
        testing_1.tick();
        expect(comp.editing).toBeTruthy();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token--onboarding"))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-card--subtext"))).toBeNull();
    }));
    it('should disable editing', testing_1.fakeAsync(function () {
        expect(comp.editing).toBeTruthy();
        comp.disableEditing();
        fixture.detectChanges();
        expect(comp.editing).toBeFalsy();
        comp.enableEditing();
        fixture.detectChanges();
        expect(comp.editing).toBeTruthy();
    }));
});
//# sourceMappingURL=addresses.component.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var onchain_component_1 = require("./onchain.component");
var client_mock_spec_1 = require("../../../../../../tests/client-mock.spec");
var client_1 = require("../../../../../services/api/client");
var local_wallet_service_1 = require("../../../../blockchain/local-wallet.service");
var local_wallet_service_mock_spec_1 = require("../../../../../../tests/local-wallet-service-mock.spec");
var mock_1 = require("../../../../../utils/mock");
var session_1 = require("../../../../../services/session");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_mock_spec_1 = require("../../../../../../tests/session-mock.spec");
var blockchain_service_1 = require("../../../../blockchain/blockchain.service");
var web3_wallet_service_1 = require("../../../../blockchain/web3-wallet.service");
var router_1 = require("@angular/router");
var storage_mock_spec_1 = require("../../../../../../tests/storage-mock.spec");
var storage_1 = require("../../../../../services/storage");
var blockchainService = mock_1.MockService(blockchain_service_1.BlockchainService, {
    'getWallet': null
});
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
describe('TokenOnChainOnboardingComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                onchain_component_1.TokenOnChainOnboardingComponent,
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockComponent({ selector: 'm-token--onboarding--video', inputs: ['src'] }),
            ],
            imports: [
                forms_1.FormsModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: core_1.ChangeDetectorRef, useValue: core_1.ChangeDetectorRef },
                { provide: local_wallet_service_1.LocalWalletService, useValue: local_wallet_service_mock_spec_1.localWalletServiceMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: router_1.Router, useValue: testing_2.RouterTestingModule },
                { provide: blockchain_service_1.BlockchainService, useValue: blockchainService },
                { provide: web3_wallet_service_1.Web3WalletService, useValue: web3walletMock },
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
        fixture = testing_1.TestBed.createComponent(onchain_component_1.TokenOnChainOnboardingComponent);
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
    it('should create address', testing_1.fakeAsync(function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css("button"))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".m-token--onboarding--slide"))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css("m-token--onboarding--video"))).not.toBeNull();
        comp.createAddress();
        testing_1.tick();
        expect(blockchainService.setWallet).toHaveBeenCalled();
    }));
    it('should call next when provided valid address', testing_1.fakeAsync(function () {
        spyOn(comp.next, 'next').and.stub();
        comp.createAddress();
        comp.providedAddress = '0x8ba5b43846ecf44e08968dd824db544a94e05b2a';
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.canProvideAddress()).toBeTruthy();
        comp.provideAddress();
        testing_1.tick();
        expect(comp.next.next).toHaveBeenCalled();
    }));
    it('should use external and detect', testing_1.fakeAsync(function () {
        spyOn(comp.next, 'next').and.stub();
        comp.providedAddress = '0x8ba5b43846ecf44e08968dd824db544a94e05b2a';
        fixture.detectChanges();
        testing_1.tick();
        comp.useExternal();
        expect(comp.canProvideAddress()).toBeTruthy();
        comp.provideAddress();
        testing_1.tick();
        expect(comp.next.next).toHaveBeenCalled();
    }));
    it('should use download', testing_1.fakeAsync(function () {
        spyOn(comp.next, 'next').and.stub();
        comp.providedAddress = '0x8ba5b43846ecf44e08968dd824db544a94e05b2a';
        fixture.detectChanges();
        testing_1.tick();
        comp.downloadPrivateKey();
        expect(comp.canProvideAddress()).toBeTruthy();
        comp.downloadMetamask();
        testing_1.tick();
        expect(comp.downloadingMetamask).toBeTruthy();
    }));
});
//# sourceMappingURL=onchain.component.spec.js.map
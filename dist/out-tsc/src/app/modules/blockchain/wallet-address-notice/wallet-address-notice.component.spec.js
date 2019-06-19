"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var wallet_address_notice_component_1 = require("./wallet-address-notice.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var mock_1 = require("../../../utils/mock");
var blockchain_service_1 = require("../blockchain.service");
var web3_wallet_service_1 = require("../web3-wallet.service");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var walletService = mock_1.MockService(web3_wallet_service_1.Web3WalletService, {
    'ready': true,
    'getCurrentWallet': '0x1234',
});
var blockchainService = mock_1.MockService(blockchain_service_1.BlockchainService, {
    'getWallet': null
});
var routerMock = { navigate: jasmine.createSpy('navigate') };
describe('BlockchainWalletAddressNoticeComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockComponent({ selector: 'm-announcement', template: '<ng-content></ng-content>' }),
                wallet_address_notice_component_1.BlockchainWalletAddressNoticeComponent
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: web3_wallet_service_1.Web3WalletService, useValue: walletService },
                { provide: blockchain_service_1.BlockchainService, useValue: blockchainService },
                { provide: router_1.Router, useValue: routerMock }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        fixture = testing_1.TestBed.createComponent(wallet_address_notice_component_1.BlockchainWalletAddressNoticeComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable()
                .then(function () {
                fixture.detectChanges();
                done();
            });
        }
    });
    it('should have an m-announcement with a prompt to set up the wallet', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var announcement = fixture.debugElement.query(platform_browser_1.By.css('m-announcement'));
        expect(announcement).not.toBeNull();
        var text = fixture.debugElement.query(platform_browser_1.By.css('m-announcement span'));
        expect(text).not.toBeNull();
        expect(text.nativeElement.textContent).toContain('Hey, do you want to setup your Tokens wallet?');
    }));
    it('clicking on the text should set up the wallet and navigate to /wallet/tokens/addresses', testing_1.fakeAsync(function () {
        spyOn(comp, 'setWallet').and.callThrough();
        var text = fixture.debugElement.query(platform_browser_1.By.css('m-announcement span'));
        text.nativeElement.click();
        expect(comp.setWallet).toHaveBeenCalled();
        jasmine.clock().tick(10);
        expect(blockchainService.setWallet).toHaveBeenCalled();
        expect(blockchainService.setWallet).toHaveBeenCalled();
        expect(blockchainService.setWallet.calls.mostRecent().args[0]).toEqual({ address: '0x1234' });
        expect(routerMock.navigate).toHaveBeenCalled();
        expect(routerMock.navigate.calls.mostRecent().args[0]).toEqual(['/wallet/tokens/addresses']);
    }));
});
//# sourceMappingURL=wallet-address-notice.component.spec.js.map
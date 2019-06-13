"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var console_component_1 = require("./console.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var mock_1 = require("../../../utils/mock");
var blockchain_service_1 = require("../blockchain.service");
var web3_wallet_service_1 = require("../web3-wallet.service");
var platform_browser_1 = require("@angular/platform-browser");
describe('BlockchainConsoleComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockComponent({ selector: 'm-blockchain--wallet-selector', inputs: ['current'], outputs: ['select'] }),
                console_component_1.BlockchainConsoleComponent],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: blockchain_service_1.BlockchainService, useValue: mock_1.MockService(blockchain_service_1.BlockchainService) },
                { provide: web3_wallet_service_1.Web3WalletService, useValue: mock_1.MockService(web3_wallet_service_1.Web3WalletService) },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        fixture = testing_1.TestBed.createComponent(console_component_1.BlockchainConsoleComponent);
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
    it('should have a title', function () {
        var h3 = fixture.debugElement.query(platform_browser_1.By.css('.m-blockchain--options-wallet h3'));
        expect(h3).not.toBeNull();
        expect(h3.nativeElement.textContent).toContain('Token Configuration');
    });
    it('should have an explanation', function () {
        var text = fixture.debugElement.query(platform_browser_1.By.css('.m-blockchain--options-wallet--setup p'));
        expect(text).not.toBeNull();
        expect(text.nativeElement.textContent).toContain('Enter your Ethereum wallet address below. If you installed and unlocked MetaMask, or have a web3-enabled browser your local wallets will be listed below. You can click on them to auto-fill the address field.');
    });
    it('should have a form with a wallet address input, a list of local wallets and a save button', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('form'))).not.toBeNull();
        var inputLabel = fixture.debugElement.query(platform_browser_1.By.css('form .m-blockchain--options--section:first-child label'));
        expect(inputLabel).not.toBeNull();
        expect(inputLabel.nativeElement.textContent).toContain('Ethereum Wallet Address');
        var input = fixture.debugElement.query(platform_browser_1.By.css('form .m-blockchain--options--section:first-child input'));
        expect(input).not.toBeNull();
        var walletsLabel = fixture.debugElement.query(platform_browser_1.By.css('form .m-blockchain--options--section:nth-child(2) label'));
        expect(walletsLabel).not.toBeNull();
        expect(walletsLabel.nativeElement.textContent).toContain('Local Wallets');
        //refresh button
        var refreshButton = fixture.debugElement.query(platform_browser_1.By.css('.m-blockchain--options--local-wallets--refresh'));
        expect(refreshButton).not.toBeNull();
        expect(refreshButton.nativeElement.textContent).toContain('autorenew');
        expect(fixture.debugElement.query(platform_browser_1.By.css('m-blockchain--wallet-selector'))).not.toBeNull();
        var saveButton = fixture.debugElement.query(platform_browser_1.By.css('.m-blockchain--options--section button'));
        expect(saveButton).not.toBeNull();
        expect(saveButton.nativeElement.textContent).toContain('Save Address');
    });
    it('should submit a new wallet', function () {
        var input = fixture.debugElement.query(platform_browser_1.By.css('form .m-blockchain--options--section:first-child input'));
        input.nativeElement.value = '0xE8f01b5254B5fACaF2d5Bbf7CFd782dF283B945D';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        spyOn(comp, 'setWallet').and.callThrough();
        var saveButton = fixture.debugElement.query(platform_browser_1.By.css('.m-blockchain--options--section button'));
        saveButton.nativeElement.click();
        fixture.detectChanges();
        expect(comp.setWallet).toHaveBeenCalled();
    });
});
//# sourceMappingURL=console.component.spec.js.map
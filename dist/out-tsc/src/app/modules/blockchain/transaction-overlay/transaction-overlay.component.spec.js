"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var transaction_overlay_component_1 = require("./transaction-overlay.component");
var transaction_overlay_service_1 = require("./transaction-overlay.service");
var token_contract_service_1 = require("../contracts/token-contract.service");
var testing_2 = require("@angular/router/testing");
var transaction_overlay_service_mock_1 = require("../../../mocks/modules/blockchain/transaction-overlay/transaction-overlay-service-mock");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var web3_wallet_service_mock_spec_1 = require("../../../../tests/web3-wallet-service-mock.spec");
var web3_wallet_service_1 = require("../web3-wallet.service");
describe('TransactionOverlayComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_switch_mock_spec_1.MaterialSwitchMock, transaction_overlay_component_1.TransactionOverlayComponent],
            imports: [testing_2.RouterTestingModule, forms_1.FormsModule],
            providers: [
                { provide: transaction_overlay_service_1.TransactionOverlayService, useValue: transaction_overlay_service_mock_1.transactionOverlayService },
                { provide: token_contract_service_1.TokenContractService, useValue: token_contract_service_1.TokenContractService },
                { provide: web3_wallet_service_1.Web3WalletService, useValue: web3_wallet_service_mock_spec_1.web3WalletServiceMock }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(transaction_overlay_component_1.TransactionOverlayComponent);
        comp = fixture.componentInstance;
        window.Opspot.site_url = 'https://www.ops.doesntexist.com/';
        fixture.detectChanges();
    });
    it('should have a title', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m--blockchain--transaction-overlay--title'))).not.toBeNull();
    });
    it('note content on non-unlock modal should come from a variable', function () {
        comp.comp = comp.COMP_LOCAL;
        comp.message = 'Testing';
        comp.detectChanges(); // For some reason we have to call this as well
        fixture.detectChanges();
        var note = fixture.debugElement.query(platform_browser_1.By.css('.m--blockchain--transaction-overlay--note'));
        expect(note.nativeElement.textContent.trim()).toContain('Testing');
    });
    xit('should have a link that says \'Having Issues?\' that redirects to /coin page', function () {
        var havingIssues = fixture.debugElement.query(platform_browser_1.By.css('.m--blockchain--transaction-overlay--help > a'));
        expect(havingIssues).not.toBeNull();
        expect(havingIssues.nativeElement.href).toMatch(/https?:\/\/.*\/token/);
    });
});
//# sourceMappingURL=transaction-overlay.component.spec.js.map
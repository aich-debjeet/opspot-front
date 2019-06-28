"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wire_service_1 = require("./wire.service");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var wire_contract_service_mock_spec_1 = require("../../../tests/wire-contract-service-mock.spec");
var token_contract_service_mock_spec_1 = require("../../../tests/token-contract-service-mock.spec");
var web3_wallet_service_mock_spec_1 = require("../../../tests/web3-wallet-service-mock.spec");
var testing_1 = require("@angular/core/testing");
describe('WireService', function () {
    var service;
    var wireGuid = null;
    beforeEach(function () {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        service = new wire_service_1.WireService(client_mock_spec_1.clientMock, wire_contract_service_mock_spec_1.wireContractServiceMock, token_contract_service_mock_spec_1.tokenContractServiceMock, web3_wallet_service_mock_spec_1.web3WalletServiceMock);
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v1/wire/" + wireGuid] = { 'status': 'success' };
        client_mock_spec_1.clientMock.get.calls.reset();
        client_mock_spec_1.clientMock.post.calls.reset();
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should submit an onchain wire', testing_1.fakeAsync(function () {
        service.submitWire({
            amount: 10,
            guid: null,
            payload: { receiver: '0x1234', address: '' },
            payloadType: "onchain",
            recurring: false
        });
        testing_1.tick();
        expect(web3_wallet_service_mock_spec_1.web3WalletServiceMock.ready).toHaveBeenCalled();
        expect(web3_wallet_service_mock_spec_1.web3WalletServiceMock.isUnavailable).toHaveBeenCalled();
        expect(web3_wallet_service_mock_spec_1.web3WalletServiceMock.getCurrentWallet).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe("api/v1/wire/null");
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({
            amount: 10,
            payload: { receiver: '0x1234', address: '0x123', method: 'onchain', txHash: 'hash' },
            method: 'tokens',
            recurring: false
        });
    }));
    it('should submit an offchain wire', testing_1.fakeAsync(function () {
        service.submitWire({
            amount: 10,
            guid: null,
            payload: null,
            payloadType: "offchain",
            recurring: false
        });
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe("api/v1/wire/null");
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({
            amount: 10,
            payload: { address: 'offchain', method: 'offchain' },
            method: 'tokens',
            recurring: false
        });
    }));
    it('should submit a credit card wire', testing_1.fakeAsync(function () {
        service.submitWire({
            amount: 10,
            guid: null,
            payload: { address: 'offchain', token: 'tok_KPte7942xySKBKyrBu11yEpf' },
            payloadType: "creditcard",
            recurring: false
        });
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe("api/v1/wire/null");
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({
            amount: 10,
            payload: { address: 'offchain', token: 'tok_KPte7942xySKBKyrBu11yEpf', method: 'creditcard' },
            method: 'tokens',
            recurring: false
        });
    }));
});
//# sourceMappingURL=wire.service.spec.js.map
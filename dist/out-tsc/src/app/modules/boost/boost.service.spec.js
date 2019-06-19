"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boost_service_1 = require("./boost.service");
var testing_1 = require("@angular/core/testing");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var boost_contract_service_mock_spec_1 = require("../../mocks/modules/blockchain/contracts/boost-contract.service.mock.spec");
describe('BoostService', function () {
    var service;
    beforeEach(function () {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        service = new boost_service_1.BoostService(session_mock_spec_1.sessionMock, client_mock_spec_1.clientMock, boost_contract_service_mock_spec_1.boostContractServiceMock);
        client_mock_spec_1.clientMock.response = {};
        boost_contract_service_mock_spec_1.boostContractServiceMock.tx = '0xa123123';
        boost_contract_service_mock_spec_1.boostContractServiceMock.accept.calls.reset();
        boost_contract_service_mock_spec_1.boostContractServiceMock.reject.calls.reset();
        boost_contract_service_mock_spec_1.boostContractServiceMock.revoke.calls.reset();
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should be instantiated', function () {
        expect(service).toBeTruthy();
    });
    it('should load boosts', testing_1.fakeAsync(function () {
        service = new boost_service_1.BoostService(session_mock_spec_1.sessionMock, client_mock_spec_1.clientMock, boost_contract_service_mock_spec_1.boostContractServiceMock);
        client_mock_spec_1.clientMock.response['api/v2/boost/newsfeed/'] = {
            status: 'success'
        };
        service.load('newsfeed', '');
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var args = client_mock_spec_1.clientMock.get.calls.mostRecent().args;
        expect(args[0]).toBe('api/v2/boost/newsfeed/');
        expect(args[1]).toEqual({ limit: 12, offset: '' });
    }));
    it('should accept a usd p2p boost', testing_1.fakeAsync(function () {
        var boost = {
            guid: '1234',
            handler: 'p2p',
            state: 'created',
            currency: 'usd'
        };
        var url = 'api/v2/boost/peer/1234';
        client_mock_spec_1.clientMock.response[url] = { status: 'success' };
        service.accept(boost);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.put).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.put.calls.mostRecent().args[0]).toBe(url);
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.accept).not.toHaveBeenCalled();
    }));
    it('should accept a p2p boost', testing_1.fakeAsync(function () {
        var boost = {
            guid: '1234',
            handler: 'p2p',
            state: 'created',
            currency: 'tokens'
        };
        var url = 'api/v2/boost/peer/1234';
        client_mock_spec_1.clientMock.response[url] = { status: 'success' };
        service.accept(boost);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.put).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.put.calls.mostRecent().args[0]).toBe(url);
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.accept).toHaveBeenCalled();
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.accept.calls.mostRecent().args[0]).toBe('1234');
    }));
    it('should reject a p2p boost', testing_1.fakeAsync(function () {
        var boost = {
            guid: '1234',
            handler: 'p2p',
            state: 'created',
            currency: 'tokens'
        };
        var url = 'api/v2/boost/peer/1234';
        client_mock_spec_1.clientMock.response[url] = { status: 'success' };
        service.reject(boost);
        testing_1.tick(500);
        // tick(500);
        expect(client_mock_spec_1.clientMock.delete).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toBe(url);
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.reject).toHaveBeenCalled();
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.reject.calls.mostRecent().args[0]).toBe('1234');
    }));
    it('should reject a usd p2p boost', testing_1.fakeAsync(function () {
        var boost = {
            guid: '1234',
            handler: 'p2p',
            state: 'created',
            currency: 'usd'
        };
        var url = 'api/v2/boost/peer/1234';
        client_mock_spec_1.clientMock.response[url] = { status: 'success' };
        service.reject(boost);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.delete).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toBe(url);
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.reject).not.toHaveBeenCalled();
    }));
    it('should revoke a non p2p usd boost', testing_1.fakeAsync(function () {
        var boost = {
            guid: '1234',
            handler: 'newsfeed',
            state: 'created',
            currency: 'usd'
        };
        var url = 'api/v2/boost/newsfeed/1234/revoke';
        client_mock_spec_1.clientMock.response[url] = { status: 'success' };
        service.revoke(boost);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.delete).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toBe(url);
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.revoke).not.toHaveBeenCalled();
    }));
    it('should revoke a non p2p boost', testing_1.fakeAsync(function () {
        var boost = {
            guid: '1234',
            handler: 'newsfeed',
            state: 'created',
            currency: 'tokens'
        };
        var url = 'api/v2/boost/newsfeed/1234/revoke';
        client_mock_spec_1.clientMock.response[url] = { status: 'success' };
        service.revoke(boost);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.delete).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toBe(url);
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.revoke).toHaveBeenCalled();
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.revoke.calls.mostRecent().args[0]).toBe('1234');
    }));
    it('should revoke a p2p usd boost', testing_1.fakeAsync(function () {
        var boost = {
            guid: '1234',
            handler: 'p2p',
            state: 'created',
            currency: 'usd'
        };
        var url = 'api/v2/boost/peer/1234/revoke';
        client_mock_spec_1.clientMock.response[url] = { status: 'success' };
        service.revoke(boost);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.delete).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toBe(url);
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.revoke).not.toHaveBeenCalled();
    }));
    it('should revoke a p2p boost', testing_1.fakeAsync(function () {
        var boost = {
            guid: '1234',
            handler: 'p2p',
            state: 'created',
            currency: 'tokens'
        };
        var url = 'api/v2/boost/peer/1234/revoke';
        client_mock_spec_1.clientMock.response[url] = { status: 'success' };
        service.revoke(boost);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.delete).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toBe(url);
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.revoke).toHaveBeenCalled();
        expect(boost_contract_service_mock_spec_1.boostContractServiceMock.revoke.calls.mostRecent().args[0]).toBe('1234');
    }));
});
//# sourceMappingURL=boost.service.spec.js.map
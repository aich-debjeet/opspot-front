"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var newsfeed_boost_service_1 = require("./newsfeed-boost.service");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var testing_1 = require("@angular/core/testing");
describe('NewsfeedBoostService', function () {
    var service;
    beforeEach(function () {
        service = new newsfeed_boost_service_1.NewsfeedBoostService(session_mock_spec_1.sessionMock, client_mock_spec_1.clientMock);
        client_mock_spec_1.clientMock.response = {};
        session_mock_spec_1.sessionMock.user.boost_autorotate = true;
    });
    it('should be instantiated', function () {
        expect(service).toBeTruthy();
    });
    it('should disable boosts by default if user is plus and has boosts disabled', function () {
        session_mock_spec_1.sessionMock.user.plus = true;
        session_mock_spec_1.sessionMock.user.disabled_boost = true;
        service = new newsfeed_boost_service_1.NewsfeedBoostService(session_mock_spec_1.sessionMock, client_mock_spec_1.clientMock);
        expect(service.enabled).toBeFalsy();
    });
    it('should disable boosts autorotate if user has that option disabled', function () {
        session_mock_spec_1.sessionMock.user.boost_autorotate = false;
        service = new newsfeed_boost_service_1.NewsfeedBoostService(session_mock_spec_1.sessionMock, client_mock_spec_1.clientMock);
        expect(service.paused).toBeTruthy();
    });
    it("should set the user's explicit rating", testing_1.fakeAsync(function () {
        session_mock_spec_1.sessionMock.user.mature = false;
        var url = 'api/v1/settings/1000';
        client_mock_spec_1.clientMock.response[url] = { 'status': 'success' };
        service.setExplicit(true);
        jasmine.clock().tick(10);
        expect(session_mock_spec_1.sessionMock.user.mature).toBeTruthy();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe(url);
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({
            mature: true,
            boost_rating: 2
        });
    }));
    it('should toggle boost pause', testing_1.fakeAsync(function () {
        expect(service.isBoostPaused()).toBeFalsy();
        var url = 'api/v1/settings';
        client_mock_spec_1.clientMock.post[url] = { 'status': 'success' };
        service.togglePause();
        jasmine.clock().tick(10);
        expect(service.isBoostPaused).toBeTruthy();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe(url);
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({ boost_autorotate: !service.isBoostPaused() });
    }));
    it('should hide boosts', testing_1.fakeAsync(function () {
        session_mock_spec_1.sessionMock.user.disabled_boost = false;
        var url = 'api/v1/plus/boost';
        client_mock_spec_1.clientMock.response[url] = { 'status': 'success' };
        service.hideBoost();
        jasmine.clock().tick(10);
        expect(session_mock_spec_1.sessionMock.user.disabled_boost).toBeTruthy();
        expect(service.enabled).toBeFalsy();
        expect(client_mock_spec_1.clientMock.put).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.put.calls.mostRecent().args[0]).toBe(url);
    }));
    it('should show boosts', testing_1.fakeAsync(function () {
        expect(session_mock_spec_1.sessionMock.user.disabled_boost).toBeTruthy();
        var url = 'api/v1/plus/boost';
        client_mock_spec_1.clientMock.response[url] = { 'status': 'success' };
        service.showBoost();
        jasmine.clock().tick(10);
        expect(session_mock_spec_1.sessionMock.user.disabled_boost).toBeFalsy();
        expect(service.enabled).toBeTruthy();
        expect(client_mock_spec_1.clientMock.delete).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toBe(url);
    }));
});
//# sourceMappingURL=newsfeed-boost.service.spec.js.map
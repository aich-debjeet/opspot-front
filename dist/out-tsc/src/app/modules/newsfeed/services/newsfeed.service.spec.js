"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var newsfeed_service_1 = require("./newsfeed.service");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var testing_1 = require("@angular/core/testing");
describe('NewsfeedService', function () {
    var service;
    beforeEach(function () {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        service = new newsfeed_service_1.NewsfeedService(client_mock_spec_1.clientMock, session_mock_spec_1.sessionMock);
        client_mock_spec_1.clientMock.response = {};
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should be instantiated', function () {
        expect(service).toBeTruthy();
    });
    it('should record an activity view in newsfeed', testing_1.fakeAsync(function () {
        var url = 'api/v2/analytics/views/activity/123';
        client_mock_spec_1.clientMock.response[url] = { 'status': 'success' };
        var entity = {
            guid: 123,
        };
        service.recordView(entity);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toContain(url);
    }));
    it('should record a boosted activity view in the newsfeed', testing_1.fakeAsync(function () {
        var url = 'api/v2/analytics/views/boost/1234';
        client_mock_spec_1.clientMock.response[url] = { 'status': 'success' };
        var entity = {
            guid: 123,
            boosted_guid: 1234,
        };
        service.recordView(entity);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toContain(url);
    }));
    it('should record a boosted activity view stop in the newsfeed', testing_1.fakeAsync(function () {
        var url = 'api/v2/analytics/views/boost/1234/stop';
        client_mock_spec_1.clientMock.response[url] = { 'status': 'success' };
        var entity = {
            guid: 123,
            boosted_guid: 1234,
        };
        service.recordView(entity, false);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toContain(url);
    }));
    it('should record a boosted activity view in a channel', testing_1.fakeAsync(function () {
        var url = 'api/v2/analytics/views/boost/1234/456';
        client_mock_spec_1.clientMock.response[url] = { 'status': 'success' };
        var entity = {
            guid: 123,
            boosted_guid: 1234,
        };
        var channel = {
            guid: '456'
        };
        service.recordView(entity, true, channel);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toContain(url);
    }));
    it('should record a boosted activity view stop in a channel', testing_1.fakeAsync(function () {
        var url = 'api/v2/analytics/views/boost/1234/456/stop';
        client_mock_spec_1.clientMock.response[url] = { 'status': 'success' };
        var entity = {
            guid: 123,
            boosted_guid: 1234,
        };
        var channel = {
            guid: '456'
        };
        service.recordView(entity, false, channel);
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toContain(url);
    }));
});
//# sourceMappingURL=newsfeed.service.spec.js.map
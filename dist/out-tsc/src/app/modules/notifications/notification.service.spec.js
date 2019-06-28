"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notification_service_1 = require("./notification.service");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var socket_mock_spec_1 = require("../../../tests/socket-mock.spec");
var testing_1 = require("@angular/core/testing");
var opspot_title_service_mock_spec_1 = require("../../../app/mocks/services/ux/opspot-title.service.mock.spec");
describe('NewsfeedService', function () {
    var service;
    beforeEach(function () {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        service = new notification_service_1.NotificationService(client_mock_spec_1.clientMock, session_mock_spec_1.sessionMock, socket_mock_spec_1.socketMock, opspot_title_service_mock_spec_1.opspotTitleMock);
        client_mock_spec_1.clientMock.response = {};
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should be instantiated', function () {
        expect(service).toBeTruthy();
    });
    it('should subscribe when listening', testing_1.fakeAsync(function () {
        window.Opspot.navigation = {};
        window.Opspot.navigation.topbar = [];
        window.Opspot.notifications_count = 0;
        var entity = {
            guid: 123,
        };
        service.listen();
        jasmine.clock().tick(10);
        expect(socket_mock_spec_1.socketMock.subscribe).toHaveBeenCalled();
        service.increment(4);
        expect(window.Opspot.notifications_count).toBe(4);
    }));
});
//# sourceMappingURL=notification.service.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attachment_1 = require("./attachment");
var api_1 = require("./api");
var session_1 = require("./session");
var client_mock_spec_1 = require("../../tests/client-mock.spec");
var upload_mock_spec_1 = require("../../tests/upload-mock.spec");
var session_mock_spec_1 = require("../../tests/session-mock.spec");
var testing_1 = require("@angular/core/testing");
/* tslint:disable */
describe('Service: Attachment Service', function () {
    var service;
    var mockObject;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [attachment_1.AttachmentService],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: api_1.Upload, useValue: upload_mock_spec_1.uploadMock },
                { provide: api_1.Client, useValue: client_mock_spec_1.clientMock }
            ]
        });
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["/api/v1/newsfeed/preview"] = { 'status': 'success' };
        service = new attachment_1.AttachmentService(session_mock_spec_1.sessionMock, client_mock_spec_1.clientMock, upload_mock_spec_1.uploadMock);
        client_mock_spec_1.clientMock.get.calls.reset();
        client_mock_spec_1.clientMock.post.calls.reset();
        mockObject = {
            'guid': '758019279000969217',
            'type': 'object',
            'subtype': 'video',
            'time_created': '1506101878',
            'time_updated': '1506101878',
            'container_guid': '758019184876593168',
            'owner_guid': '758019184876593168',
            'access_id': '2',
            'featured': false,
            'featured_id': false,
            'ownerObj': {
                'guid': '758019184876593168',
                'type': 'user',
                'name': 'nicoronchiprod',
                'username': 'nicoronchiprod'
            },
            'category': false,
            'flags': { 'mature': true },
            'wire_threshold': '0',
            'thumbnail': false,
            'cinemr_guid': '758019279000969217',
            'license': false,
            'monetized': false,
            'mature': false,
            'boost_rejection_reason': -1,
            'thumbnail_src': 'https:\/\/d3ae0shxev0cb7.cloudfront.net\/api\/v1\/media\/thumbnails\/758019279000969217',
            'src': { '360.mp4': 'https:\/\/d2isvgrdif6ua5.cloudfront.net\/cinemr_com\/758019279000969217\/360.mp4', '720.mp4': 'https:\/\/d2isvgrdif6ua5.cloudfront.net\/cinemr_com\/758019279000969217\/720.mp4' },
            'play:count': 6,
            'description': ''
        };
    }));
    it('parseMature should return false when undefined', function () {
        expect(service.parseMaturity(undefined)).toEqual(false);
    });
    it('service should should prioritice flag as mature when repeated value', function () {
        expect(service.parseMaturity(mockObject)).toEqual(true);
    });
    it('service should should prioritice flag as mature when repeated value', function () {
        mockObject.mature = undefined;
        expect(service.parseMaturity(mockObject)).toEqual(true);
    });
    it('service should should return false if not present in flags, and mature:false', function () {
        mockObject.flags = {};
        expect(service.parseMaturity(mockObject)).toEqual(false);
    });
    it('service should should return false if not present in flags, and mature:true', function () {
        mockObject.mature = true;
        mockObject.flags = {};
        expect(service.parseMaturity(mockObject)).toEqual(false);
    });
    it('preview should be set', testing_1.fakeAsync(function () {
        service.preview('https://github.com/releases');
        testing_1.tick(1000);
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
    }));
    it('preview wont call if url doesnt change', testing_1.fakeAsync(function () {
        service.preview('https://github.com/releases');
        testing_1.tick(1000);
        service.preview('https://github.com/releases');
        testing_1.tick(1000);
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalledTimes(1);
    }));
    it('preview call twice if url change', testing_1.fakeAsync(function () {
        service.preview('https://github.com/releases');
        testing_1.tick(1000);
        service.preview('https://github.com/releases2');
        testing_1.tick(1000);
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalledTimes(2);
    }));
    it('preview call twice if url change and paste similar ones', testing_1.fakeAsync(function () {
        service.preview('https://github.com/releases');
        testing_1.tick(1000);
        service.preview('https://github.com/releases2');
        testing_1.tick(1000);
        service.preview('https://github.com/releases2');
        testing_1.tick(1000);
        service.preview('https://github.com/releases');
        testing_1.tick(1000);
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalledTimes(3);
    }));
    it('preview shouldnt be called if already has a file', testing_1.fakeAsync(function () {
        var file = {
            attachment_guid: 'guid',
            custom_data: {
                thumbnail_src: 'thumbnail/url/'
            }
        };
        service.load(file);
        service.preview('githubcom/releases');
        testing_1.tick(1000);
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalledTimes(0);
    }));
    it('preview should be called once', testing_1.fakeAsync(function () {
        service.preview('githubcom/releases');
        testing_1.tick(1000);
        service.preview('https://github.com/releases2');
        testing_1.tick(1000);
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalledTimes(1);
    }));
});
//# sourceMappingURL=attachment.spec.js.map
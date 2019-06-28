"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var mock_1 = require("../../../utils/mock");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var abbr_1 = require("../../../common/pipes/abbr");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var forms_1 = require("@angular/forms");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var attachment_service_mock_spec_1 = require("../../../../tests/attachment-service-mock.spec");
var modules_1 = require("./modules");
var session_1 = require("../../../services/session");
var attachment_1 = require("../../../services/attachment");
describe('ChannelModulesComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                abbr_1.AbbrPipe,
                modules_1.ChannelModulesComponent,
                mock_1.MockComponent({
                    selector: 'opspot-card',
                    inputs: ['object'],
                })
            ],
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                common_1.CommonModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: attachment_1.AttachmentService, useValue: attachment_service_mock_spec_1.attachmentServiceMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(modules_1.ChannelModulesComponent);
        client_mock_spec_1.clientMock.response = {};
        comp = fixture.componentInstance;
        comp.owner = {
            guid: 'guidguid',
            name: 'name',
            username: 'username',
            icontime: 11111,
            subscribers_count: 182,
            impressions: 18200,
            pinned_posts: ['a', 'b', 'c']
        };
        client_mock_spec_1.clientMock.response["api/v1/entities/owner/all/guidguid"] = {
            'status': 'success',
            'entities': [{}, {}, {}]
        };
        client_mock_spec_1.clientMock.response["api/v1/blog/owner/guidguid"] = {
            'status': 'success',
            'blogs': [{}, {}, {}]
        };
        client_mock_spec_1.clientMock.response["api/v1/entities/owner/image/guidguid"] = {
            'status': 'success',
            'entities': [{}, {}, {}]
        };
        client_mock_spec_1.clientMock.response["api/v1/entities/owner/video/guidguid"] = {
            'status': 'success',
            'entities': [{}, {}, {}]
        };
        client_mock_spec_1.clientMock.response["api/v1/entities/container/all/guidguid"] = {
            'status': 'success',
            'entities': [{}, {}, {}]
        };
        client_mock_spec_1.clientMock.response["api/v1/blog/container/guidguid"] = {
            'status': 'success',
            'blogs': [{}, {}, {}]
        };
        client_mock_spec_1.clientMock.response["api/v1/entities/container/image/guidguid"] = {
            'status': 'success',
            'entities': [{}, {}, {}]
        };
        client_mock_spec_1.clientMock.response["api/v1/entities/container/video/guidguid"] = {
            'status': 'success',
            'entities': [{}, {}, {}]
        };
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
    it('should load all entities', testing_1.fakeAsync(function () {
        comp.load();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.items.length).toBe(3);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/entities/owner/all/guidguid');
    }));
    it('should load blogs', testing_1.fakeAsync(function () {
        comp.type = 'blog';
        comp.load();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.items.length).toBe(3);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/blog/owner/guidguid');
    }));
    it('should load images', testing_1.fakeAsync(function () {
        comp.type = 'image';
        comp.load();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.items.length).toBe(3);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/entities/owner/image/guidguid');
    }));
    it('should load videos', testing_1.fakeAsync(function () {
        comp.type = 'video';
        comp.load();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.items.length).toBe(3);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/entities/owner/video/guidguid');
    }));
    it('should load all entities when owner not set', testing_1.fakeAsync(function () {
        comp.container = {
            guid: 'guidguid',
        };
        comp.owner = null;
        comp.load();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.items.length).toBe(3);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/entities/container/all/guidguid');
    }));
    it('should load blogs  when owner not set', testing_1.fakeAsync(function () {
        comp.container = {
            guid: 'guidguid',
        };
        comp.owner = null;
        comp.type = 'blog';
        comp.load();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.items.length).toBe(3);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/blog/container/guidguid');
    }));
    it('should load images when owner not set', testing_1.fakeAsync(function () {
        comp.owner = null;
        comp.container = {
            guid: 'guidguid',
        };
        comp.type = 'image';
        comp.load();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.items.length).toBe(3);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/entities/container/image/guidguid');
    }));
    it('should load videos when owner not set', testing_1.fakeAsync(function () {
        comp.owner = null;
        comp.container = {
            guid: 'guidguid',
        };
        comp.type = 'video';
        comp.load();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.items.length).toBe(3);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/entities/container/video/guidguid');
    }));
});
//# sourceMappingURL=modules.component.spec.js.map
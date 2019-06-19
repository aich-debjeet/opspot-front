"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var mock_1 = require("../../utils/mock");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var upload_mock_spec_1 = require("../../../tests/upload-mock.spec");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var material_mock_spec_1 = require("../../../tests/material-mock.spec");
var forms_1 = require("@angular/forms");
var material_switch_mock_spec_1 = require("../../../tests/material-switch-mock.spec");
var opspot_title_service_mock_spec_1 = require("../../mocks/services/ux/opspot-title.service.mock.spec");
var channel_component_1 = require("./channel.component");
var api_1 = require("../../services/api");
var session_1 = require("../../services/session");
var title_1 = require("../../services/ux/title");
var scroll_service_mock_spec_1 = require("../../../tests/scroll-service-mock.spec");
var scroll_1 = require("../../services/ux/scroll");
var opspot_recent_service_mock_spec_1 = require("../../../tests/opspot-recent-service-mock.spec");
var recent_1 = require("../../services/ux/recent");
var context_service_mock_spec_1 = require("../../../tests/context-service-mock.spec");
var context_service_1 = require("../../services/context.service");
var from_1 = require("rxjs/internal/observable/from");
describe('ChannelComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                channel_component_1.ChannelComponent,
                mock_1.MockComponent({
                    selector: 'm-channel--supporters',
                    inputs: ['channel'],
                }),
                mock_1.MockComponent({
                    selector: 'm-channel--subscriptions',
                    inputs: ['channel'],
                }),
                mock_1.MockComponent({
                    selector: 'm-channel--subscribers',
                    inputs: ['channel'],
                }),
                mock_1.MockComponent({
                    selector: 'm-channel--carousel',
                    inputs: ['banners', 'editMode'],
                }),
                mock_1.MockComponent({
                    selector: 'm-channel--feed',
                    inputs: ['user'],
                }),
                mock_1.MockComponent({
                    selector: 'm-channel--sidebar',
                    inputs: ['user', 'editing'],
                }),
                mock_1.MockComponent({
                    selector: 'm-channel--explicit-overlay',
                    inputs: ['channel']
                }),
            ],
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                common_1.CommonModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: api_1.Upload, useValue: upload_mock_spec_1.uploadMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: title_1.OpspotTitle, useValue: opspot_title_service_mock_spec_1.opspotTitleMock },
                { provide: scroll_1.ScrollService, useValue: scroll_service_mock_spec_1.scrollServiceMock },
                { provide: recent_1.RecentService, useValue: opspot_recent_service_mock_spec_1.recentServiceMock },
                { provide: context_service_1.ContextService, useValue: context_service_mock_spec_1.contextServiceMock },
                { provide: router_1.ActivatedRoute, useValue: { 'params': from_1.from([{ 'filter': 'feed', 'username': 'username' }]) } }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(channel_component_1.ChannelComponent);
        client_mock_spec_1.clientMock.response = {};
        upload_mock_spec_1.uploadMock.response = {};
        comp = fixture.componentInstance;
        comp.username = 'username';
        comp.user = { guid: 'guidguid', name: 'name', username: 'username', icontime: 11111, subscribers_count: 182, impressions: 18200 };
        comp.editing = false;
        fixture.detectChanges();
        client_mock_spec_1.clientMock.response["api/v1/channel/username"] = {
            'status': 'success',
            'channel': { guid: 'guidguid', name: 'name', username: 'username', icontime: 11111, subscribers_count: 182, impressions: 18200 }
        };
        client_mock_spec_1.clientMock.response['api/v1/channel/info'] = { status: 'success' };
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
    it('elements should be present in channel page, different filters should load the expected component', function () {
        var carousel = fixture.debugElement.query(platform_browser_1.By.css('m-channel--carousel'));
        var sidebar = fixture.debugElement.query(platform_browser_1.By.css('m-channel--sidebar'));
        var feed = fixture.debugElement.query(platform_browser_1.By.css('m-channel--feed'));
        expect(carousel).not.toBeNull();
        expect(sidebar).not.toBeNull();
        expect(feed).not.toBeNull();
        comp.filter = 'supporters';
        fixture.detectChanges();
        var supporters = fixture.debugElement.query(platform_browser_1.By.css('m-channel--supporters'));
        expect(supporters).not.toBeNull();
        comp.filter = 'subscribers';
        fixture.detectChanges();
        var subscribers = fixture.debugElement.query(platform_browser_1.By.css('m-channel--subscriptions'));
        expect(supporters).not.toBeNull();
        comp.filter = 'subscriptors';
        fixture.detectChanges();
        var subscriptors = fixture.debugElement.query(platform_browser_1.By.css('opspot-channel-subscriptors'));
        expect(supporters).not.toBeNull();
    });
    it('should load() on init', function () {
        comp.load();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/channel/username');
    });
    it('toggle editing should upload', testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.response['api/v1/channel/info'] = { status: 'success' };
        comp.editing = true;
        comp.toggleEditing();
        testing_1.tick();
        fixture.detectChanges();
        expect(comp.editing).toBe(false);
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toEqual('api/v1/channel/info');
    }));
    it('update carousel makes post call if arg is correct', function () {
        var arg = [{ guid: '1111', top: '111', file: {} }];
        comp.toggleEditing();
        fixture.detectChanges();
        expect(comp.editing).toBe(true);
        comp.updateCarousels(arg);
        fixture.detectChanges();
        expect(upload_mock_spec_1.uploadMock.post.calls.mostRecent().args[0]).toEqual('api/v1/channel/carousel');
    });
    it('remove carousel makes delete call if arg is correct', function () {
        var arg = { guid: '1111', top: '111', file: {} };
        comp.toggleEditing();
        fixture.detectChanges();
        expect(comp.editing).toBe(true);
        comp.removeCarousel(arg);
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toEqual('api/v1/channel/carousel/1111');
    });
    it('unblock should make the request ', function () {
        comp.unBlock();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toEqual('api/v1/block/guidguid');
    });
});
//# sourceMappingURL=channel.component.spec.js.map
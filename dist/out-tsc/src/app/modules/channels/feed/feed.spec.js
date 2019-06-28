"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var mock_1 = require("../../../utils/mock");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var upload_mock_spec_1 = require("../../../../tests/upload-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var forms_1 = require("@angular/forms");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var feed_1 = require("./feed");
var scroll_service_mock_spec_1 = require("../../../../tests/scroll-service-mock.spec");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var scroll_1 = require("../../../services/ux/scroll");
describe('ChannelFeed', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                feed_1.ChannelFeedComponent,
                mock_1.MockComponent({
                    selector: 'opspot-newsfeed-poster',
                    inputs: ['containerGuid', 'accessId', 'message'],
                }),
                mock_1.MockComponent({
                    selector: 'm-onboarding-feed',
                }),
                mock_1.MockComponent({
                    selector: 'm-newsfeed--boost-rotator',
                    inputs: ['interval', 'channel'],
                }),
                mock_1.MockComponent({
                    selector: 'opspot-activity',
                    inputs: ['object', 'boostToggle'],
                }),
                mock_1.MockComponent({
                    selector: 'infinite-scroll',
                    inputs: ['inProgress', 'moreData', 'inProgress'],
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
                { provide: scroll_1.ScrollService, useValue: scroll_service_mock_spec_1.scrollServiceMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(feed_1.ChannelFeedComponent);
        client_mock_spec_1.clientMock.response = {};
        comp = fixture.componentInstance;
        comp.user = {
            guid: 'guidguid',
            name: 'name',
            username: 'username',
            icontime: 11111,
            subscribers_count: 182,
            impressions: 18200,
            pinned_posts: ['a', 'b', 'c']
        };
        comp.feed = [{ guid: 'aaaa' }, { guid: 'aaaa' }, { guid: 'aaaa' }, { guid: 'aaaa' }];
        comp.openWireModal = false;
        fixture.detectChanges();
        client_mock_spec_1.clientMock.response["api/v1/newsfeed/personal/1000"] = {
            'status': 'success',
            'load-next': 'aaaa',
            'pinned': [{ guid: 'aaa3a' }],
            'activity': [{ guid: 'aaa3a' }, { guid: 'aaaa' }, { guid: 'aaaa' }, { guid: 'aaaa' }, { guid: 'aaaa' }]
        };
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
    it('poster should be on top if owner', function () {
        comp.user.guid = '1000';
        fixture.detectChanges();
        var poster = fixture.debugElement.query(platform_browser_1.By.css('opspot-newsfeed-poster'));
        var activities = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-activity'));
        expect(activities.length).toBe(0);
        expect(poster).not.toBeNull();
    });
    it('poster shouldnt be on top if not owner', function () {
        comp.user.guid = '10010';
        var poster = fixture.debugElement.query(platform_browser_1.By.css('opspot-newsfeed-poster'));
        var activities = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-activity'));
        expect(activities.length).toBe(0);
        expect(poster).toBeNull();
    });
    it('should render the activities when refresh, removing the existent ones', testing_1.fakeAsync(function () {
        comp.user.guid = '1000';
        comp.loadFeed(true);
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/newsfeed/personal/1000');
        testing_1.tick();
        fixture.detectChanges();
        var activities = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-activity'));
        expect(comp.feed.length).toBe(5);
        expect(comp.offset).toBe('aaaa');
        expect(activities.length).toBe(6);
    }));
    it('should render the activities, delete one when deleted', testing_1.fakeAsync(function () {
        comp.user.guid = '1000';
        comp.loadFeed(true);
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/newsfeed/personal/1000');
        testing_1.tick();
        comp.delete(comp.feed[2]);
        testing_1.tick();
        fixture.detectChanges();
        var activities = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-activity'));
        expect(comp.feed.length).toBe(4);
        expect(comp.offset).toBe('aaaa');
        expect(activities.length).toBe(5);
    }));
    it('should render the activities, prepend when posted', testing_1.fakeAsync(function () {
        comp.user.guid = '1000';
        comp.loadFeed(true);
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/newsfeed/personal/1000');
        testing_1.tick();
        comp.prepend(comp.feed[1]);
        testing_1.tick();
        fixture.detectChanges();
        var activities = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-activity'));
        expect(comp.feed.length).toBe(6);
        expect(comp.offset).toBe('aaaa');
        expect(activities.length).toBe(7);
    }));
    it('should add the activities when no refresh', testing_1.fakeAsync(function () {
        comp.user.guid = '1000';
        comp.loadFeed(false);
        var activities = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-activity'));
        fixture.detectChanges();
        expect(comp.feed.length).toBe(0);
        expect(activities.length).toBe(0);
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/newsfeed/personal/1000');
        fixture.detectChanges();
        activities = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-activity'));
        expect(comp.feed.length).toBe(5);
        expect(activities.length).toBe(5);
    }));
    it('should keep loading when scroll down', testing_1.fakeAsync(function () {
        comp.user.guid = '1000';
        comp.loadFeed(false);
        var activities = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-activity'));
        fixture.detectChanges();
        expect(comp.feed.length).toBe(0);
        expect(activities.length).toBe(0);
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/newsfeed/personal/1000');
        fixture.detectChanges();
        activities = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-activity'));
        expect(comp.feed.length).toBe(5);
        expect(comp.isOwner()).toBe(true);
        expect(activities.length).toBe(5);
        client_mock_spec_1.clientMock.response["api/v1/newsfeed/personal/1000"] = {
            'status': 'success',
            'activity': [{ guid: 'aaaa' }, { guid: 'aaaa' }]
        };
        comp.loadFeed();
        testing_1.tick();
        fixture.detectChanges();
        activities = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-activity'));
        expect(comp.feed.length).toBe(7);
        expect(activities.length).toBe(7);
        client_mock_spec_1.clientMock.response["api/v1/newsfeed/personal/1000"] = {
            'status': 'success',
        };
        comp.loadFeed();
        testing_1.tick();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.moreData).toBe(false);
    }));
});
//# sourceMappingURL=feed.spec.js.map
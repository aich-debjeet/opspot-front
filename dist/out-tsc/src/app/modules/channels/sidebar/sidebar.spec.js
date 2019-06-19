"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var mock_1 = require("../../../utils/mock");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var upload_mock_spec_1 = require("../../../../tests/upload-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var abbr_1 = require("../../../common/pipes/abbr");
var tags_1 = require("../../../common/pipes/tags");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var forms_1 = require("@angular/forms");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var sidebar_1 = require("./sidebar");
var autogrow_1 = require("../../../common/directives/autogrow");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var onboarding_service_1 = require("../../onboarding/channel/onboarding.service");
var storage_1 = require("../../../services/storage");
var storage_mock_spec_1 = require("../../../../tests/storage-mock.spec");
describe('ChannelSidebar', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                mock_1.MockDirective({ selector: '[mdlUpload]', inputs: ['mdlUpload', 'progress'] }),
                abbr_1.AbbrPipe,
                sidebar_1.ChannelSidebar,
                mock_1.MockComponent({
                    selector: 'm-channel--social-profiles',
                    inputs: ['user', 'editing'],
                }),
                tags_1.TagsPipe,
                mock_1.MockComponent({
                    selector: 'm-wire-channel',
                    inputs: ['channel', 'editing', 'rewards'],
                }),
                mock_1.MockComponent({
                    selector: 'opspot-button-boost',
                    inputs: ['object'],
                }),
                mock_1.MockComponent({
                    selector: 'opspot-button-user-dropdown',
                    inputs: ['user'],
                }),
                mock_1.MockComponent({
                    selector: 'm-channel--modules',
                    inputs: ['type', 'owner', 'linksTo', 'limit', 'container'],
                }),
                autogrow_1.AutoGrow,
                mock_1.MockComponent({
                    selector: 'opspot-avatar',
                    inputs: ['object', 'src', 'editMode', 'waitForDoneSignal'],
                }),
                mock_1.MockComponent({
                    selector: 'm-channel--badges',
                    inputs: ['user', 'badges'],
                }),
                mock_1.MockComponent({
                    selector: 'm-messenger--channel-button',
                    inputs: ['user'],
                }),
                mock_1.MockComponent({
                    selector: 'opspot-button-subscribe',
                    inputs: ['user'],
                }),
                mock_1.MockComponent({
                    selector: 'm-hashtags-selector',
                    inputs: ['tags', 'alignLeft'],
                    outputs: ['tagsChange', 'tagsAdded', 'tagsRemoved'],
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
                { provide: storage_1.Storage, useValue: storage_mock_spec_1.storageMock },
                {
                    provide: onboarding_service_1.ChannelOnboardingService, useValue: mock_1.MockService(onboarding_service_1.ChannelOnboardingService, {
                        checkProgress: Promise.resolve(),
                        onClose: new core_1.EventEmitter(),
                    })
                },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(sidebar_1.ChannelSidebar);
        client_mock_spec_1.clientMock.response = {};
        upload_mock_spec_1.uploadMock.response = {};
        comp = fixture.componentInstance;
        comp.user = {
            guid: 'guidguid',
            name: 'name',
            username: 'username',
            city: 'awasa',
            icontime: 11111,
            subscribers_count: 182,
            impressions: 18200
        };
        comp.editing = false;
        upload_mock_spec_1.uploadMock.response["api/v1/channel/avatar"] = {
            'status': 'success',
        };
        client_mock_spec_1.clientMock.response["api/v1/geolocation/list"] = {
            "status": "success",
            "results": [{
                    "address": { "city": "Wichita", "state": "Kansas, United States" },
                    "lat": 37.6650225,
                    "lon": -97.33538500000002
                }]
        };
        window.Opspot.user = {
            "guid": "732337264197111809",
            "type": "user",
            "subtype": false,
            "time_created": "1499978809",
            "time_updated": false,
            "container_guid": "0",
            "owner_guid": "0",
            "site_guid": false,
            "access_id": "2",
            "name": "opspot",
            "username": "opspot",
            "language": "en",
            "icontime": "1506690756",
            "legacy_guid": false,
            "featured_id": false,
            "banned": "no",
            "website": "",
            "dob": "",
            "gender": "",
            "city": "",
            "merchant": {},
            "boostProPlus": false,
            "fb": false,
            "mature": 0,
            "monetized": "",
            "signup_method": false,
            "social_profiles": [],
            "feature_flags": false,
            "programs": ["affiliate"],
            "plus": false,
            "verified": false,
            "disabled_boost": false,
            "show_boosts": false,
            "chat": true,
            "subscribed": false,
            "subscriber": false,
            "subscriptions_count": 1,
            "impressions": 10248,
            "boost_rating": "2",
            "spam": 0,
            "deleted": 0
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
    it('bio container should be present, username and name should be correct', function () {
        var bio = fixture.debugElement.query(platform_browser_1.By.css('.m-channel--bio'));
        var name = fixture.debugElement.query(platform_browser_1.By.css('.m-channel--name h2'));
        var username = fixture.debugElement.query(platform_browser_1.By.css('.m-channel--username h2'));
        var counters = fixture.debugElement.queryAll(platform_browser_1.By.css('.m-channel--stats a'));
        expect(username.nativeElement.innerText).toBe('@username');
        expect(name.nativeElement.innerText).toBe('name');
        expect(bio).not.toBeNull();
        expect(counters.length).toBe(2);
    });
    xit('bio container should not be editable if not the owner', function () {
        fixture.detectChanges();
        var edit_tick = fixture.debugElement.query(platform_browser_1.By.css('.opspot-button-edit'));
        expect(edit_tick).toBeNull();
    });
    it('bio container should be editable if its the owner', function () {
        comp.user.guid = '1000';
        var edit_tick = fixture.debugElement.query(platform_browser_1.By.css('.opspot-button-edit'));
        expect(edit_tick).toBeNull();
    });
    it('bio container should be editable if its the owner, should send event when saving, and returning to original state', function () {
        spyOn(comp, 'toggleEditing');
        comp.user.guid = '1000';
        fixture.detectChanges();
        var edit_tick = fixture.debugElement.query(platform_browser_1.By.css('.opspot-button-edit'));
        edit_tick.nativeElement.click();
        fixture.detectChanges();
        expect(comp.toggleEditing).toHaveBeenCalled();
    });
    xit('city in bio container should be editable if its the owner', function () {
        comp.user.guid = '1000';
        comp.editing = true;
        fixture.detectChanges();
        var city = fixture.debugElement.query(platform_browser_1.By.css('.m-channel-city-editor'));
        expect(city).not.toBeNull();
    });
    it('should show wire and token counters and rewards component', function () {
        var container = fixture.debugElement.query(platform_browser_1.By.css('m-wire-channel'));
        expect(container).not.toBeNull();
    });
    it('modules container should be present', function () {
        var mdules = fixture.debugElement.query(platform_browser_1.By.css('m-channel--modules'));
        expect(mdules).not.toBeNull();
    });
    it('should try to upload the avatar', testing_1.fakeAsync(function () {
        comp.upload_avatar({});
        fixture.detectChanges();
        expect(upload_mock_spec_1.uploadMock.post.calls.mostRecent().args[0]).toEqual('api/v1/channel/avatar');
        testing_1.tick();
        fixture.detectChanges();
        expect(comp.user.icontime).toBeGreaterThan(11111);
    }));
    it('should try to load the cities', testing_1.fakeAsync(function () {
        comp.findCity('');
        testing_1.tick(210);
        jasmine.clock().tick(210);
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/geolocation/list');
        testing_1.tick(210);
        jasmine.clock().tick(210);
        fixture.detectChanges();
        expect(comp.cities.length).toBe(1);
    }));
    it('should set the city', function () {
        comp.cities = [{
                "address": { "city": "Wichita", "state": "Kansas, United States" },
                "lat": 37.6650225,
                "lon": -97.33538500000002
            }];
        comp.setCity({ "address": { city: "Wichita", "state": "Kansas, United States" } });
        fixture.detectChanges();
        expect(comp.user.city).toBe("Wichita");
    });
    it('should set the city by town', function () {
        comp.cities = [{
                "address": { "town": "Wichita", "state": "Kansas, United States" },
                "lat": 37.6650225,
                "lon": -97.33538500000002
            }];
        comp.setCity({ "address": { town: "Wichita", "state": "Kansas, United States" } });
        fixture.detectChanges();
        comp.setSocialProfile([]);
        comp.isOwner();
        expect(comp.user.city).toBe("Wichita");
    });
    it('should emit event', function () {
        spyOn(comp.changeEditing, 'next').and.callThrough();
        comp.toggleEditing();
        fixture.detectChanges();
        expect(comp.changeEditing.next).toHaveBeenCalled();
    });
});
//# sourceMappingURL=sidebar.spec.js.map
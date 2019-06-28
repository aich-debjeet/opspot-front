"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var mock_1 = require("../../../utils/mock");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var forms_1 = require("@angular/forms");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var tile_component_1 = require("./tile.component");
var session_1 = require("../../../services/session");
describe('ChannelsTileComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                tile_component_1.ChannelsTileComponent,
                mock_1.MockComponent({
                    selector: 'm-channel--social-profiles',
                    inputs: ['user', 'editing'],
                }),
                mock_1.MockComponent({
                    selector: 'opspot-button-feature',
                    inputs: ['object'],
                }),
                mock_1.MockComponent({
                    selector: 'opspot-avatar',
                    inputs: ['object', 'src', 'editMode', 'waitForDoneSignal'],
                }),
                mock_1.MockComponent({
                    selector: 'm-channel--badges',
                    inputs: ['user', 'badges'],
                }),
                mock_1.MockComponent({
                    selector: 'opspot-button-subscribe',
                    inputs: ['user'],
                }),
                mock_1.MockComponent({
                    selector: 'm-safe-toggle',
                    inputs: ['entity'],
                }),
                mock_1.MockComponent({
                    selector: 'opspot-button-boost',
                    inputs: ['object'],
                }),
            ],
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                common_1.CommonModule
            ],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock }
            ]
        }).compileComponents(); // compile template and css
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(tile_component_1.ChannelsTileComponent);
        comp = fixture.componentInstance;
        comp.entity = { guid: 'guidguid', name: 'name', username: 'username', city: 'awasa', icontime: 11111, subscribers_count: 182, impressions: 18200 };
        window.Opspot.user = {
            "guid": "guidguid",
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
    it('Should load correctly', function () {
        var tile = fixture.debugElement.query(platform_browser_1.By.css('.m-channels--tile'));
        var subscribe = fixture.debugElement.query(platform_browser_1.By.css('opspot-button-subscribe'));
        var feature = fixture.debugElement.query(platform_browser_1.By.css('opspot-button-feature'));
        var boost = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-button-boost'));
        expect(tile).not.toBeNull();
        expect(subscribe).not.toBeNull();
        expect(boost).not.toBeNull();
        expect(feature).not.toBeNull();
    });
});
//# sourceMappingURL=tile.component.spec.js.map
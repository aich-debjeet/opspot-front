"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var verify_component_1 = require("./verify.component");
var tooltip_component_1 = require("../../../mocks/common/components/tooltip/tooltip.component");
var modal_1 = require("../../../mocks/common/components/modal/modal");
var testing_2 = require("@angular/router/testing");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
describe('PlusVerifyComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                verify_component_1.PlusVerifyComponent,
                tooltip_component_1.TooltipComponentMock,
                modal_1.ModalMock,
            ],
            imports: [
                testing_2.RouterTestingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock }
            ]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(verify_component_1.PlusVerifyComponent);
        comp = fixture.componentInstance;
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
        // Set up mock HTTP client
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v1/plus/verify'] = {
            'status': 'success',
            'channel': { guid: 'guidguid', name: 'name', username: 'username', icontime: 11111, subscribers_count: 182, impressions: 18200 }
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
        // reset jasmine clock after each test
        jasmine.clock().uninstall();
    });
    it('Should load correctly', function () {
        var modal = fixture.debugElement.query(platform_browser_1.By.css('m-modal'));
        expect(modal).not.toBeNull();
        expect(comp.form).not.toBeNull();
    });
    it('Should load correctly', function () {
        comp.submit({});
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toEqual('api/v1/plus/verify');
    });
});
//# sourceMappingURL=verify.component.spec.js.map
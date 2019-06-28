"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var client_1 = require("../../services/api/client");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var verify_1 = require("../../mocks/modules/plus/verify");
var footer_1 = require("../../mocks/modules/plus/footer");
var faq_1 = require("../../mocks/modules/plus/faq");
var subscription_1 = require("../../mocks/modules/plus/subscription");
var marketing_component_1 = require("./marketing.component");
var testing_2 = require("@angular/router/testing");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
describe('PlusMarketingComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                marketing_component_1.PlusMarketingComponent,
                subscription_1.PlusSubscription,
                footer_1.FooterComponentMock,
                verify_1.PlusVerify,
                faq_1.FaqMock
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
        fixture = testing_1.TestBed.createComponent(marketing_component_1.PlusMarketingComponent);
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
            "plus": true,
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
        client_mock_spec_1.clientMock.response['api/v1/plus'] = {
            'status': 'success',
            'active': false
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
        var marketing = fixture.debugElement.query(platform_browser_1.By.css('.m-marketing--hero'));
        var marketingInner = fixture.debugElement.query(platform_browser_1.By.css('.m-marketing--hero--inner'));
        expect(marketing).not.toBeNull();
        expect(marketingInner).not.toBeNull();
    });
});
//# sourceMappingURL=marketing.component.spec.js.map
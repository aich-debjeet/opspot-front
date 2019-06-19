"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var console_component_1 = require("./console.component");
var boost_service_1 = require("../boost.service");
var tooltip_component_1 = require("../../../mocks/common/components/tooltip/tooltip.component");
var testing_2 = require("@angular/router/testing");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var platform_browser_1 = require("@angular/platform-browser");
var DateSelectorComponentMock = /** @class */ (function () {
    function DateSelectorComponentMock() {
        this.dateChange = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateSelectorComponentMock.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateSelectorComponentMock.prototype, "date", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DateSelectorComponentMock.prototype, "dateChange", void 0);
    DateSelectorComponentMock = __decorate([
        core_1.Component({
            selector: 'm-date-selector',
            template: ''
        })
    ], DateSelectorComponentMock);
    return DateSelectorComponentMock;
}());
exports.DateSelectorComponentMock = DateSelectorComponentMock;
var BoostConsoleBoosterMock = /** @class */ (function () {
    function BoostConsoleBoosterMock() {
    }
    BoostConsoleBoosterMock.prototype.load = function (refresh) {
    };
    __decorate([
        core_1.Input('type'),
        __metadata("design:type", String)
    ], BoostConsoleBoosterMock.prototype, "type", void 0);
    BoostConsoleBoosterMock = __decorate([
        core_1.Component({
            selector: 'm-boost-console-booster',
            template: ''
        })
    ], BoostConsoleBoosterMock);
    return BoostConsoleBoosterMock;
}());
exports.BoostConsoleBoosterMock = BoostConsoleBoosterMock;
var ThirdPartyNetworksFacebookMock = /** @class */ (function () {
    function ThirdPartyNetworksFacebookMock() {
        this.done = new core_1.EventEmitter(true);
    }
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ThirdPartyNetworksFacebookMock.prototype, "done", void 0);
    ThirdPartyNetworksFacebookMock = __decorate([
        core_1.Component({
            selector: 'm-third-party-networks-facebook',
            template: ''
        })
    ], ThirdPartyNetworksFacebookMock);
    return ThirdPartyNetworksFacebookMock;
}());
exports.ThirdPartyNetworksFacebookMock = ThirdPartyNetworksFacebookMock;
var BoostConsoleNetworkListMock = /** @class */ (function () {
    function BoostConsoleNetworkListMock() {
    }
    BoostConsoleNetworkListMock.prototype.load = function (refresh) {
    };
    __decorate([
        core_1.Input('type'),
        __metadata("design:type", String)
    ], BoostConsoleNetworkListMock.prototype, "type", void 0);
    BoostConsoleNetworkListMock = __decorate([
        core_1.Component({
            selector: 'm-boost-console-network',
            template: ''
        })
    ], BoostConsoleNetworkListMock);
    return BoostConsoleNetworkListMock;
}());
exports.BoostConsoleNetworkListMock = BoostConsoleNetworkListMock;
var BoostConsoleP2PListMock = /** @class */ (function () {
    function BoostConsoleP2PListMock() {
    }
    BoostConsoleP2PListMock.prototype.load = function (refresh) {
    };
    __decorate([
        core_1.Input('filter'),
        __metadata("design:type", String)
    ], BoostConsoleP2PListMock.prototype, "filter", void 0);
    BoostConsoleP2PListMock = __decorate([
        core_1.Component({
            selector: 'm-boost-console-p2p',
            template: ''
        })
    ], BoostConsoleP2PListMock);
    return BoostConsoleP2PListMock;
}());
exports.BoostConsoleP2PListMock = BoostConsoleP2PListMock;
var BoostConsolePublisherMock = /** @class */ (function () {
    function BoostConsolePublisherMock() {
    }
    BoostConsolePublisherMock.prototype.load = function (refresh) {
    };
    BoostConsolePublisherMock.prototype.toggle = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BoostConsolePublisherMock.prototype, "filter", void 0);
    BoostConsolePublisherMock = __decorate([
        core_1.Component({
            selector: 'm-boost-publisher',
            template: ''
        })
    ], BoostConsolePublisherMock);
    return BoostConsolePublisherMock;
}());
exports.BoostConsolePublisherMock = BoostConsolePublisherMock;
describe('BoostConsoleComponent', function () {
    var comp;
    var fixture;
    function getBecomeAPublisher() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-boost-console--options-toggle > button'));
    }
    function getPointsCount() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-boost-console--overview-points-count > span'));
    }
    function getUSDCount() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-boost-console--overview-usd-count > span'));
    }
    function getPointEarnings() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-boost-console--overview-point-earnings > span'));
    }
    function getUSDEarnings() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-boost-console--overview-usd-earnings > span'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                DateSelectorComponentMock,
                tooltip_component_1.TooltipComponentMock,
                BoostConsoleBoosterMock,
                ThirdPartyNetworksFacebookMock,
                BoostConsoleNetworkListMock,
                BoostConsoleP2PListMock,
                BoostConsolePublisherMock,
                console_component_1.BoostConsoleComponent
            ],
            imports: [testing_2.RouterTestingModule],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                {
                    provide: router_1.ActivatedRoute,
                    useValue: {
                        params: rxjs_1.of({ type: 'newsfeed' }),
                        snapshot: { params: { type: 'newsfeed' } }
                    }
                },
                boost_service_1.BoostService
            ]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(console_component_1.BoostConsoleComponent);
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
});
//# sourceMappingURL=console.component.spec.js.map
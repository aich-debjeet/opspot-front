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
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var session_1 = require("../../../services/session");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var wire_component_1 = require("./wire.component");
var common_1 = require("@angular/common");
var tooltip_component_1 = require("../../../mocks/common/components/tooltip/tooltip.component");
var autogrow_1 = require("../../../common/directives/autogrow");
var upload_1 = require("../../../services/api/upload");
var upload_mock_spec_1 = require("../../../../tests/upload-mock.spec");
var WireLockScreenComponentMock = /** @class */ (function () {
    function WireLockScreenComponentMock() {
        this.update = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireLockScreenComponentMock.prototype, "entity", void 0);
    __decorate([
        core_1.Output('entityChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireLockScreenComponentMock.prototype, "update", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireLockScreenComponentMock.prototype, "preview", void 0);
    WireLockScreenComponentMock = __decorate([
        core_1.Component({
            selector: 'm-wire--lock-screen',
            template: ''
        })
    ], WireLockScreenComponentMock);
    return WireLockScreenComponentMock;
}());
exports.WireLockScreenComponentMock = WireLockScreenComponentMock;
var WireConsoleRewardsInputsComponentMock = /** @class */ (function () {
    function WireConsoleRewardsInputsComponentMock() {
        this.rewards = [];
        this.update = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireConsoleRewardsInputsComponentMock.prototype, "channel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WireConsoleRewardsInputsComponentMock.prototype, "rewards", void 0);
    __decorate([
        core_1.Output('rewardsChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireConsoleRewardsInputsComponentMock.prototype, "update", void 0);
    WireConsoleRewardsInputsComponentMock = __decorate([
        core_1.Component({
            selector: 'm-wire-console--rewards--inputs',
            template: ''
        })
    ], WireConsoleRewardsInputsComponentMock);
    return WireConsoleRewardsInputsComponentMock;
}());
exports.WireConsoleRewardsInputsComponentMock = WireConsoleRewardsInputsComponentMock;
var NotificationsToasterComponentMock = /** @class */ (function () {
    function NotificationsToasterComponentMock() {
        this.notifications = [];
    }
    NotificationsToasterComponentMock.prototype.listenForNotifications = function () {
    };
    NotificationsToasterComponentMock.prototype.closeNotification = function (notification) {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NotificationsToasterComponentMock.prototype, "notifications", void 0);
    NotificationsToasterComponentMock = __decorate([
        core_1.Component({
            selector: 'm-notifications--toaster',
            template: ''
        })
    ], NotificationsToasterComponentMock);
    return NotificationsToasterComponentMock;
}());
exports.NotificationsToasterComponentMock = NotificationsToasterComponentMock;
describe('SettingsWireComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                tooltip_component_1.TooltipComponentMock,
                WireConsoleRewardsInputsComponentMock,
                WireLockScreenComponentMock,
                material_mock_spec_1.MaterialMock,
                wire_component_1.SettingsWireComponent,
                autogrow_1.AutoGrow,
            ],
            imports: [testing_2.RouterTestingModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, common_1.CommonModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: upload_1.Upload, useValue: upload_mock_spec_1.uploadMock }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        window.Opspot = {
            user: {
                merchant: {
                    exclusive: null
                },
                wire_rewards: {
                    "description": "Subscribe to my reward tiers below and help support my content!",
                    "rewards": {
                        "tokens": [
                            {
                                "amount": 10,
                                "description": "reward"
                            }
                        ]
                    }
                }
            }
        };
        fixture = testing_1.TestBed.createComponent(wire_component_1.SettingsWireComponent);
        client_mock_spec_1.clientMock.response = {};
        comp = fixture.componentInstance;
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
    it('should have a topbar with a save button', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-layout--row'))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-layout--row > .m-btn'))).not.toBeNull();
    });
    it('should have a paywall section', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-settings--wire--paywall'))).not.toBeNull();
    });
    it('paywall section should have a subtext', function () {
        var p = fixture.debugElement.query(platform_browser_1.By.css('.m-settings--wire--paywall p'));
        expect(p).not.toBeNull();
        expect(p.nativeElement.textContent).toContain('The below description and preview image is what your subscribers will see on your exclusive posts until they become a supporter.');
    });
    it('paywall section should have a description input', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-settings--wire--paywall-intro input'))).not.toBeNull();
    });
    it('paywall section should have a background selector', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-settings--wire--paywall-background input'))).not.toBeNull();
    });
    it('paywall section should have a selected background preview', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-settings--wire--paywall-preview m-wire--lock-screen'))).not.toBeNull();
    });
});
//# sourceMappingURL=wire.component.spec.js.map
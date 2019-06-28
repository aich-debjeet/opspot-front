"use strict";
///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var signup_on_action_mock_1 = require("../../mocks/modules/modals/signup/signup-on-action.mock");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var upload_mock_spec_1 = require("../../../tests/upload-mock.spec");
var groups_join_button_1 = require("./groups-join-button");
var groups_service_1 = require("./groups-service");
var session_1 = require("../../services/session");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var testing_2 = require("@angular/router/testing");
var login_referrer_service_1 = require("../../services/login-referrer.service");
var login_referrer_service_mock_spec_1 = require("../../mocks/services/login-referrer-service-mock.spec");
describe('GroupsJoinButton', function () {
    var fixture;
    var comp;
    /** Helpers */
    function setGroup(props) {
        comp._group = Object.assign({
            guid: 1000,
            'is:banned': false,
            'is:awaiting': false,
            'is:invited': false,
            'is:member': false,
            membership: 2
        }, props);
    }
    function getJoinButtons() {
        return fixture.debugElement.queryAll(platform_browser_1.By.css('.m-btn--join-group'));
    }
    function getAcceptAndDeclineButtons() {
        return fixture.debugElement.queryAll(platform_browser_1.By.css('span > .m-btn'));
    }
    function getLeaveButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-btn.subscribed'));
    }
    function getCancelRequestButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-btn.awaiting'));
    }
    /** /Helpers */
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                signup_on_action_mock_1.SignupOnActionModalMock,
                groups_join_button_1.GroupsJoinButton
            ],
            imports: [
                testing_2.RouterTestingModule
            ],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: groups_service_1.GroupsService, deps: [client_mock_spec_1.clientMock, upload_mock_spec_1.uploadMock] },
                { provide: login_referrer_service_1.LoginReferrerService, useValue: login_referrer_service_mock_spec_1.loginReferrerServiceMock },
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(groups_join_button_1.GroupsJoinButton);
        comp = fixture.componentInstance;
        setGroup({});
        fixture.detectChanges();
    });
    it('should render a button to join', function () {
        setGroup({
            'is:banned': false,
            'is:awaiting': false,
            'is:invited': false,
            'is:member': false
        });
        fixture.detectChanges();
        expect(getJoinButtons().length).toBe(1);
    });
    it('should not render a button to join if banned', function () {
        setGroup({
            'is:banned': true,
            'is:awaiting': false,
            'is:invited': false,
            'is:member': false
        });
        fixture.detectChanges();
        expect(getJoinButtons().length).toBe(0);
    });
    it('should render a button to accept or decline an invitation', function () {
        setGroup({
            'is:banned': false,
            'is:awaiting': false,
            'is:invited': true,
            'is:member': false
        });
        fixture.detectChanges();
        expect(getAcceptAndDeclineButtons().length).toBe(2);
    });
    it('should render a button to leave', function () {
        setGroup({
            'is:banned': false,
            'is:awaiting': false,
            'is:invited': false,
            'is:member': true
        });
        fixture.detectChanges();
        expect(getLeaveButton()).toBeTruthy();
    });
    it('should render a button to cancel join request', function () {
        setGroup({
            'is:banned': false,
            'is:awaiting': true,
            'is:invited': false,
            'is:member': false
        });
        fixture.detectChanges();
        expect(getCancelRequestButton()).toBeTruthy();
    });
});
//# sourceMappingURL=groups-join-button.spec.js.map
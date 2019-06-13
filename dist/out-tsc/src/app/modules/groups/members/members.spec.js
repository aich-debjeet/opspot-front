"use strict";
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var hovercard_1 = require("../../../common/directives/hovercard");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var hovercard_2 = require("../../../services/hovercard");
var hovercard_mock_spec_1 = require("../../../mocks/services/hovercard-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var members_1 = require("./members");
describe('GroupsMembersModuleComponent', function () {
    var fixture;
    var membersComponent;
    var group = {
        'guid': '11111'
    };
    var successfulGroupResponse = {
        'load-next': '77792',
        'status': 'success',
        'members': [
            { 'guid': '77771', 'username': 'testuser1' },
            { 'guid': '77772', 'username': 'testuser2' },
            { 'guid': '77773', 'username': 'testuser3' },
            { 'guid': '77774', 'username': 'testuser4' },
            { 'guid': '77775', 'username': 'testuser5' },
            { 'guid': '77776', 'username': 'testuser6' },
            { 'guid': '77777', 'username': 'testuser7' },
            { 'guid': '77778', 'username': 'testuser8' },
            { 'guid': '77779', 'username': 'testuser9' },
            { 'guid': '77780', 'username': 'testuser10' },
            { 'guid': '77781', 'username': 'testuser11' },
            { 'guid': '77782', 'username': 'testuser12' },
            { 'guid': '77783', 'username': 'testuser13' },
            { 'guid': '77784', 'username': 'testuser14' },
            { 'guid': '77785', 'username': 'testuser15' },
            { 'guid': '77786', 'username': 'testuser16' },
            { 'guid': '77787', 'username': 'testuser17' },
            { 'guid': '77788', 'username': 'testuser18' },
            { 'guid': '77789', 'username': 'testuser19' },
            { 'guid': '77790', 'username': 'testuser20' },
            { 'guid': '77791', 'username': 'testuser21' }
        ]
    };
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                hovercard_1.Hovercard,
                members_1.GroupsMembersModuleComponent
            ],
            imports: [
                common_1.CommonModule,
                testing_2.RouterTestingModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: hovercard_2.HovercardService, useValue: hovercard_mock_spec_1.hovercardServiceMock }
            ]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(members_1.GroupsMembersModuleComponent);
        membersComponent = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v1/groups/membership/11111"] = successfulGroupResponse;
        membersComponent._group = group;
        membersComponent.linksTo =
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
    it('should have a title', function () {
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-group--members .mdl-card__title-text'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Members');
    });
    it('should link to the group members list page', function () {
        var inviteLink = fixture.debugElement.query(platform_browser_1.By.css('.m-group--members .mdl-card__title a'));
        expect(inviteLink).not.toBeNull();
        expect(inviteLink.nativeElement.textContent).toContain('Invite');
        expect(inviteLink.nativeElement.href).toContain("groups/profile/" + group.guid + "/members");
    });
    it('should fetch a list of group members', testing_1.fakeAsync(function () {
        spyOn(membersComponent, 'load').and.callThrough();
        client_mock_spec_1.clientMock.get.calls.reset();
        membersComponent._group = group;
        fixture.detectChanges();
        testing_1.tick();
        expect(membersComponent.load).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalledWith('api/v1/groups/membership/11111', { limit: 21 });
        expect(membersComponent.members).toEqual(successfulGroupResponse.members);
    }));
});
//# sourceMappingURL=members.spec.js.map
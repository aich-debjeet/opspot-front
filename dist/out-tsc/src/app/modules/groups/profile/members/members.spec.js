"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var members_1 = require("./members");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../../services/session");
var mock_1 = require("../../../../utils/mock");
var groups_service_1 = require("../../groups-service");
var client_service_1 = require("../../../../common/api/client.service");
var opspot_http_client_service_mock_1 = require("../../../../mocks/common/api/opspot-http-client.service.mock");
var groups_service_mock_1 = require("../../../../mocks/modules/groups/groups.service.mock");
var user = {
    guid: '1000',
    admin: true,
    plus: false,
    disabled_boost: false,
    username: 'test',
    boost_rating: 1,
};
var sessionConfig = {
    'isAdmin': user.admin,
    'isLoggedIn': true,
    'getLoggedInUser': user,
};
var sessionMock = mock_1.MockService(session_1.Session, sessionConfig);
describe('GroupsProfileMembers', function () {
    var comp;
    var fixture;
    function getSearchInput() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-groupMembers__search > input'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockComponent({
                    selector: 'opspot-groups-profile-members-invite',
                    template: '',
                    inputs: ['group'],
                    outputs: ['invited']
                }),
                mock_1.MockComponent({ selector: 'opspot-card-user', template: '<ng-content></ng-content>', inputs: ['object'] }),
                mock_1.MockComponent({ selector: 'opspot-groups-card-user-actions-button', template: '', inputs: ['group', 'user'] }),
                mock_1.MockDirective({ selector: 'infinite-scroll', inputs: ['moreData', 'inProgress'], outputs: ['load'] }),
                members_1.GroupsProfileMembers
            ],
            imports: [testing_2.RouterTestingModule, forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: sessionMock },
                { provide: client_service_1.OpspotHttpClient, useValue: opspot_http_client_service_mock_1.opspotHttpClientMock },
                { provide: groups_service_1.GroupsService, useValue: groups_service_mock_1.groupsServiceMock }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        fixture = testing_1.TestBed.createComponent(members_1.GroupsProfileMembers);
        comp = fixture.componentInstance;
        window.Opspot.cdn_url = 'http://dev.opspot.io/';
        opspot_http_client_service_mock_1.opspotHttpClientMock.response = {};
        opspot_http_client_service_mock_1.opspotHttpClientMock.response['api/v1/groups/membership/1234'] = {
            status: 'success',
            members: [
                { guid: '1', username: 'test1' },
                { guid: '2', username: 'test2' }
            ]
        };
        comp.canInvite = true;
        comp.group = {
            guid: '1234',
            'membership': 0,
            'is:owner': true,
            'is:member': true,
        };
        groups_service_mock_1.groupsServiceMock.group.next(comp.group);
        fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable().then(function () {
                fixture.detectChanges();
                done();
            });
        }
    });
    it('should have loaded the members', function () {
        expect(opspot_http_client_service_mock_1.opspotHttpClientMock.get).toHaveBeenCalled();
        expect(opspot_http_client_service_mock_1.opspotHttpClientMock.get.calls.mostRecent().args[0]).toBe('api/v1/groups/membership/1234');
    });
    it('should have a opspot-groups-profile-members-invite', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('opspot-groups-profile-members-invite'))).not.toBeNull();
    });
    it('should have a list of invitees from opspot-groups-profile-members-invite', function () {
        comp.invitees = [
            { guid: '3', username: 'test3', impressions: 3000, subscribers_count: 30 },
            { guid: '4', username: 'test4', impressions: 4000, subscribers_count: 40 },
        ];
        fixture.detectChanges();
        var list = fixture.debugElement.query(platform_browser_1.By.css('.m-search-inline-list'));
        expect(list).not.toBeNull();
        var img = fixture.debugElement.query(platform_browser_1.By.css('.m-search-inline-list img:first-child'));
        expect(img).not.toBeNull();
        expect(img.nativeElement.src).toContain('http://dev.opspot.io/icon/3/small');
        var body = fixture.debugElement.query(platform_browser_1.By.css('.m-search-inline-list .m-body'));
        expect(body).not.toBeNull();
        expect(body.nativeElement.children[0].textContent).toContain('test3');
    });
    it('should have a search input', function () {
        expect(getSearchInput()).not.toBeNull();
    });
    it('should have a list of members', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-groupMembers__memberCard'))).not.toBeNull();
        expect(fixture.debugElement.queryAll(platform_browser_1.By.css('.m-groupMembers__memberCard opspot-card-user')).length).toBe(2);
    });
    it('should have an infinite-scroll', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('infinite-scroll'))).not.toBeNull();
    });
});
//# sourceMappingURL=members.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var invite_1 = require("./invite");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../../../services/session");
var client_mock_spec_1 = require("../../../../../../tests/client-mock.spec");
var client_1 = require("../../../../../services/api/client");
var mock_1 = require("../../../../../utils/mock");
var groups_service_1 = require("../../../groups-service");
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
var groupsServiceMock = mock_1.MockService(groups_service_1.GroupsService, sessionConfig);
describe('GroupsProfileMembersInvite', function () {
    var comp;
    var fixture;
    function getSearchInput() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-search-inline > input'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                invite_1.GroupsProfileMembersInvite
            ],
            imports: [testing_2.RouterTestingModule, forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: groups_service_1.GroupsService, useValue: groupsServiceMock }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        fixture = testing_1.TestBed.createComponent(invite_1.GroupsProfileMembersInvite);
        comp = fixture.componentInstance;
        comp.group = {
            guid: 123
        };
        window.Opspot.cdn_url = 'http://dev.opspot.io/';
        client_mock_spec_1.clientMock.response = {};
        comp._group = {
            guid: '1234',
            name: 'test group',
            membership: 0,
            'is:owner': true,
            'is:member': true,
        };
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
    it('should have a title saying Invite to <<group name>>', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('h2')).nativeElement.textContent).toContain('Invite to test group');
    });
    it('should have a brief explanation', function () {
        var instructions = fixture.debugElement.queryAll(platform_browser_1.By.css('.m-groupMemberInvite__instructions > li'));
        expect(instructions.length).toBe(3);
        expect(instructions[0].nativeElement.textContent).toContain('You can only invite users who are your subscribers');
        expect(instructions[1].nativeElement.textContent).toContain('They will receive a notification to confirm they want to be a member of this group');
        expect(instructions[2].nativeElement.textContent).toContain('If the user was banned from the group, inviting them will lift the ban');
    });
    it('should have a search input', function () {
        expect(getSearchInput()).not.toBeNull();
    });
    it("should search for users after modifying the input's value", testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.response['api/v2/search/suggest/user'] = {
            status: 'success',
            entities: [
                { guid: '1', icontime: '1', username: 'test1', impressions: 1000, subscribers_count: 10 },
                { guid: '2', icontime: '2', username: 'test2', impressions: 2000, subscribers_count: 20 },
            ]
        };
        var input = getSearchInput();
        input.nativeElement.value = 'test';
        input.nativeElement.dispatchEvent(new Event('input'));
        input.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(800);
        fixture.detectChanges();
        expect(comp.users).toEqual([
            { guid: '1', icontime: '1', username: 'test1', impressions: 1000, subscribers_count: 10 },
            { guid: '2', icontime: '2', username: 'test2', impressions: 2000, subscribers_count: 20 },
        ]);
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toBe('api/v2/search/suggest/user');
    }));
    it('should have a list of users', function () {
        comp.users = [
            { guid: '1', icontime: '1', username: 'test1', impressions: 1000, subscribers_count: 10 },
            { guid: '2', icontime: '2', username: 'test2', impressions: 2000, subscribers_count: 20 },
        ];
        fixture.detectChanges();
        var img = fixture.debugElement.query(platform_browser_1.By.css('.m-search-inline-item img'));
        expect(img).not.toBeNull();
        expect(img.nativeElement.src).toContain('http://dev.opspot.io/icon/1/small/1');
        var body = fixture.debugElement.query(platform_browser_1.By.css('.m-search-inline-item .m-body'));
        expect(body).not.toBeNull();
        expect(body.nativeElement.children[0].textContent).toContain('test1');
    });
});
//# sourceMappingURL=invite.spec.js.map
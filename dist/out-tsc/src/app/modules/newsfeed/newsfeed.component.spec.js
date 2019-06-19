"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var newsfeed_component_1 = require("./newsfeed.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../services/session");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var upload_mock_spec_1 = require("../../../tests/upload-mock.spec");
var upload_1 = require("../../services/api/upload");
var context_service_1 = require("../../services/context.service");
var context_service_mock_spec_1 = require("../../../tests/context-service-mock.spec");
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var storage_1 = require("../../services/storage");
var storage_mock_spec_1 = require("../../../tests/storage-mock.spec");
var title_1 = require("../../services/ux/title");
var navigation_1 = require("../../services/navigation");
var navigation_service_mock_spec_1 = require("../../../tests/navigation-service-mock.spec");
var opspot_title_service_mock_spec_1 = require("../../mocks/services/ux/opspot-title.service.mock.spec");
var mock_1 = require("../../utils/mock");
var overlay_modal_service_mock_spec_1 = require("../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../services/ux/overlay-modal");
var newsfeed_service_1 = require("./services/newsfeed.service");
var newsfeed_service_mock_1 = require("../../mocks/modules/newsfeed/services/newsfeed-service.mock");
describe('NewsfeedComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockComponent({ selector: 'm-tooltip', inputs: ['icon'], template: '<ng-content></ng-content>' }),
                mock_1.MockComponent({ selector: 'm-newsfeed--dropdown', inputs: ['options'], template: '' }),
                mock_1.MockComponent({ selector: 'opspot-card-user', inputs: ['object'], template: '' }),
                mock_1.MockComponent({ selector: 'm-tagcloud', inputs: ['options'], template: '' }),
                mock_1.MockComponent({ selector: 'm-ads-boost', inputs: ['handler', 'limit'], template: '' }),
                mock_1.MockComponent({ selector: 'm-topbar--hashtags', inputs: ['enabled'], outputs: ['selectionChange'], template: '' }),
                mock_1.MockComponent({ selector: 'm-suggestions__sidebar' }),
                mock_1.MockDirective({ selector: '[mIfFeature]', inputs: ['mIfFeature'] }),
                newsfeed_component_1.NewsfeedComponent,
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: upload_1.Upload, useValue: upload_mock_spec_1.uploadMock },
                { provide: context_service_1.ContextService, useValue: context_service_mock_spec_1.contextServiceMock },
                {
                    provide: router_1.ActivatedRoute,
                    useValue: {
                        params: rxjs_1.of({}),
                        url: rxjs_1.of({ segments: [] }),
                        snapshot: { firstChild: { routeConfig: { path: '' } } }
                    }
                },
                { provide: storage_1.Storage, useValue: storage_mock_spec_1.storageMock },
                { provide: title_1.OpspotTitle, useValue: opspot_title_service_mock_spec_1.opspotTitleMock },
                { provide: navigation_1.Navigation, useValue: navigation_service_mock_spec_1.navigationMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
                { provide: newsfeed_service_1.NewsfeedService, useValue: newsfeed_service_mock_1.newsfeedServiceMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(newsfeed_component_1.NewsfeedComponent);
        comp = fixture.componentInstance; // NewsfeedComponent test instance
        client_mock_spec_1.clientMock.response = {};
        session_mock_spec_1.sessionMock.user.admin = false;
        session_mock_spec_1.sessionMock.loggedIn = true;
        fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable().then(function () {
                done();
            });
        }
        localStorage.clear();
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it("should have Top, Subscribed and BoostFeed sections in the toolbar", function () {
        var top = fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--navigation .m-topbar--navigation--item:nth-child(1) > span'));
        var topTooltip = fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--navigation .m-topbar--navigation--item:nth-child(1) > m-tooltip'));
        var subscribed = fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--navigation .m-topbar--navigation--item:nth-child(2) > span'));
        var subscribedTooltip = fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--navigation .m-topbar--navigation--item:nth-child(2) > m-tooltip'));
        var boostfeed = fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--navigation .m-topbar--navigation--item:nth-child(3) > span'));
        var boostfeedTooltip = fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--navigation .m-topbar--navigation--item:nth-child(3) > m-tooltip'));
        expect(top).not.toBeNull();
        expect(top.nativeElement.textContent).toContain('Top');
        expect(topTooltip.nativeElement.textContent).toContain('Top displays your top suggested content on Opspot based on hashtags');
        expect(subscribed).not.toBeNull();
        expect(subscribed.nativeElement.textContent).toContain('Subscribed');
        expect(subscribedTooltip.nativeElement.textContent).toContain('Your Newsfeed contains posts from channels that you are subscribed to, as well as boosted posts from the wider network');
        expect(boostfeed).not.toBeNull();
        expect(boostfeed.nativeElement.textContent).toContain('BoostFeed');
        expect(boostfeedTooltip.nativeElement.textContent).toContain('The Boostfeed only shows boosted posts from the wider network. To Boost your content, click the Boost icon on the topbar');
    });
    it('should have an m-newsfeed--dropdown', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-topbar--navigation m-newsfeed--dropdown'))).not.toBeNull();
    });
    it('should have a User card in the sidebar', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--sidebar opspot-card-user'))).not.toBeNull();
    });
    xit("should have an 'Upgrade to Plus' button in the sidebar if the user isn't part of the program yet", function () {
        session_mock_spec_1.sessionMock.user.plus = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--sidebar .m-newsfeed--upgrade-to-plus'))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--sidebar .m-newsfeed--upgrade-to-plus div i:first-child')).nativeElement.textContent).toContain('add_circle');
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--sidebar .m-newsfeed--upgrade-to-plus div')).nativeElement.textContent).toContain('Upgrade to Plus');
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--sidebar .m-newsfeed--upgrade-to-plus div i:last-child')).nativeElement.textContent).toContain('close');
        session_mock_spec_1.sessionMock.user.plus = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--sidebar .m-newsfeed--upgrade-to-plus'))).toBeNull();
    });
    xit("should allow to close the Upgrade to Plus button", function () {
        session_mock_spec_1.sessionMock.user.plus = false;
        fixture.detectChanges();
        spyOn(comp, 'hidePlusButton').and.callThrough();
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--sidebar .m-newsfeed--upgrade-to-plus div i:last-child'));
        button.nativeElement.click();
        fixture.detectChanges();
        expect(comp.hidePlusButton).toHaveBeenCalled();
        expect(comp.showPlusButton).toBeFalsy();
    });
    xit("should have a 'Buy Opspot Tokens' button in the sidebar", function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--sidebar .m-newsfeed--buy-tokens'))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--sidebar .m-newsfeed--buy-tokens div i:first-child')).nativeElement.textContent).toContain('account_balance');
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--sidebar .m-newsfeed--buy-tokens div')).nativeElement.textContent).toContain('Buy Opspot Tokens');
    });
    it('should have a right sidebar', function () {
        comp.showRightSidebar = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--boost-sidebar'))).not.toBeNull();
    });
    it('should have m-ads-boost in the right sidebar', function () {
        comp.showRightSidebar = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--boost-sidebar m-ads-boost'))).not.toBeNull();
    });
    it('should not have m-ads-boost in the right sidebar if the user is plus and has boosts disabled', function () {
        comp.showRightSidebar = true;
        session_mock_spec_1.sessionMock.user.plus = true;
        session_mock_spec_1.sessionMock.user.disabled_boost = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed--boost-sidebar m-ads-boost'))).not.toBeNull();
    });
    it('should have footer with links to different pages and a copyright in the right sidebar', function () {
        comp.showRightSidebar = true;
        fixture.detectChanges();
        var ul = fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed-footer ul.m-footer-nav')).nativeElement;
        expect(ul.children[0].children[0].textContent).toContain('Newsfeed');
        expect(ul.children[1].children[0].textContent).toContain('Discovery');
        expect(ul.children[2].children[0].textContent).toContain('Blogs');
        expect(ul.children[3].children[0].textContent).toContain('Groups');
        expect(ul.children[4].children[0].textContent).toContain('Help & Support Group');
        expect(ul.children[5].children[0].textContent).toContain('Admin');
        var copyright = fixture.debugElement.query(platform_browser_1.By.css('.m-newsfeed-footer .copyright'));
        expect(copyright).not.toBeNull();
        expect(copyright.nativeElement.textContent).toContain('© Opspot 2019');
    });
});
//# sourceMappingURL=newsfeed.component.spec.js.map
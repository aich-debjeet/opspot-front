"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var list_component_1 = require("./list.component");
var session_1 = require("../../services/session");
var client_1 = require("../../services/api/client");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var title_1 = require("../../services/ux/title");
var context_service_1 = require("../../services/context.service");
var of_1 = require("rxjs/internal/observable/of");
var router_1 = require("@angular/router");
var mock_1 = require("../../utils/mock");
var overlay_modal_service_mock_spec_1 = require("../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../services/ux/overlay-modal");
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
describe('BlogListComponent', function () {
    var comp;
    var fixture;
    function getNavigationItem(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".m-toolbar a.m-topbar--navigation--item:nth-child(" + i + ")"));
    }
    function getNavigationItemTooltip(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".m-toolbar a.m-topbar--navigation--item:nth-child(" + i + ") m-tooltip"));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockComponent({
                    selector: 'infinite-scroll',
                    inputs: ['inProgress', 'moreData', 'inProgress'],
                }),
                mock_1.MockComponent({
                    selector: 'm-tooltip',
                    template: '<ng-content></ng-content>',
                    inputs: ['icon']
                }),
                mock_1.MockComponent({
                    selector: 'm-topbar--navigation--options',
                    template: '',
                    inputs: ['options'],
                    outputs: ['change']
                }),
                mock_1.MockComponent({
                    selector: 'm-blog--tile',
                    template: '',
                    inputs: ['entity'],
                }),
                mock_1.MockComponent({
                    selector: 'm-topbar--hashtags',
                    template: '',
                    outputs: ['selectionChange'],
                    inputs: ['enabled'],
                }),
                list_component_1.BlogListComponent
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule, common_1.CommonModule, forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: title_1.OpspotTitle, useValue: mock_1.MockService(title_1.OpspotTitle) },
                { provide: context_service_1.ContextService, useValue: mock_1.MockService(context_service_1.ContextService) },
                { provide: router_1.ActivatedRoute, useValue: { params: of_1.of({ filter: 'trending' }) } },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(list_component_1.BlogListComponent);
        comp = fixture.componentInstance;
        comp.filter = 'trending';
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v2/entities/suggested/blogs'] = {
            status: 'success',
            entities: [
                {
                    guid: '1',
                    type: 'blog'
                },
                {
                    guid: '2',
                    type: 'blog'
                },
                {
                    guid: '3',
                    type: 'blog'
                },
                {
                    guid: '4',
                    type: 'blog'
                },
            ]
        };
        fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable()
                .then(function () {
                fixture.detectChanges();
                done();
            });
        }
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should have loaded the blogs', function () {
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toBe('api/v2/entities/suggested/blogs');
    });
    it('should have a topbar', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-toolbar'))).not.toBeNull();
        var nav1 = getNavigationItem(1);
        var tooltip1 = getNavigationItemTooltip(1);
        var nav2 = getNavigationItem(2);
        var tooltip2 = getNavigationItemTooltip(2);
        var nav3 = getNavigationItem(3);
        var tooltip3 = getNavigationItemTooltip(3);
        var nav4 = getNavigationItem(4);
        var tooltip4 = getNavigationItemTooltip(4);
        var options = fixture.debugElement.query(platform_browser_1.By.css('.m-toolbar m-topbar--navigation--options'));
        expect(nav1).not.toBeNull();
        expect(nav1.nativeElement.children[0].textContent).toContain('Top');
        expect(tooltip1).not.toBeNull();
        expect(tooltip1.nativeElement.textContent).toContain('Top displays the top content on Opspot');
        expect(nav2).not.toBeNull();
        expect(nav2.nativeElement.children[0].textContent).toContain('Subscriptions');
        expect(tooltip2).not.toBeNull();
        expect(tooltip2.nativeElement.textContent).toContain('Blogs from channels you are subscribed to');
        expect(nav3).not.toBeNull();
        expect(nav3.nativeElement.children[0].textContent).toContain('My Blogs');
        expect(tooltip3).not.toBeNull();
        expect(tooltip3.nativeElement.textContent).toContain('Your blogs');
        expect(nav4).not.toBeNull();
        expect(nav4.nativeElement.children[0].textContent).toContain('Write a new blog');
        expect(tooltip4).not.toBeNull();
        expect(tooltip4.nativeElement.textContent).toContain('Write a new Blog');
        expect(options).not.toBeNull();
    });
    it('should have a list of blogs in two columns', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-blog--list'))).not.toBeNull();
        var column1 = fixture.debugElement.query(platform_browser_1.By.css('.m-blog--list > .m-blog--list--column-0'));
        var column2 = fixture.debugElement.query(platform_browser_1.By.css('.m-blog--list > .m-blog--list--column-1'));
        expect(column1).not.toBeNull();
        expect(column1.nativeElement.children.length).toBe(2);
        expect(column2).not.toBeNull();
        expect(column2.nativeElement.children.length).toBe(2);
    });
    it('should have an infinite-scroll', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('infinite-scroll'))).not.toBeNull();
    });
});
//# sourceMappingURL=list.component.spec.js.map
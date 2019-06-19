"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var list_component_1 = require("./list.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../services/session");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var opspot_title_service_mock_spec_1 = require("../../mocks/services/ux/opspot-title.service.mock.spec");
var title_1 = require("../../services/ux/title");
var context_service_mock_spec_1 = require("../../../tests/context-service-mock.spec");
var context_service_1 = require("../../services/context.service");
var client_1 = require("../../services/api/client");
var mock_1 = require("../../utils/mock");
var router_1 = require("@angular/router");
var of_1 = require("rxjs/internal/observable/of");
var overlay_modal_service_mock_spec_1 = require("../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../services/ux/overlay-modal");
describe('ChannelsListComponent', function () {
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
                    selector: 'm-channels--tile',
                    template: '',
                    inputs: ['entity']
                }),
                mock_1.MockComponent({
                    selector: 'm-topbar--hashtags',
                    template: '',
                    inputs: ['enabled'],
                    outputs: ['selectionChange']
                }),
                list_component_1.ChannelsListComponent
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: title_1.OpspotTitle, useValue: opspot_title_service_mock_spec_1.opspotTitleMock },
                { provide: context_service_1.ContextService, useValue: context_service_mock_spec_1.contextServiceMock },
                { provide: router_1.ActivatedRoute, useValue: { params: of_1.of('all') } },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
            ]
        })
            .compileComponents();
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        fixture = testing_1.TestBed.createComponent(list_component_1.ChannelsListComponent);
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v1/entities/trending/channels'] = {
            status: 'success',
            entities: [
                {
                    guid: 123,
                    name: 'test1'
                },
                {
                    guid: 456,
                    name: 'test2'
                },
            ]
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
        expect(nav1).not.toBeNull();
        expect(nav1.nativeElement.children[0].textContent).toContain('Top');
        expect(tooltip1).not.toBeNull();
        expect(tooltip1.nativeElement.textContent).toContain('Top displays the top content on Opspot');
        expect(nav2).not.toBeNull();
        expect(nav2.nativeElement.children[0].textContent).toContain('Subscriptions');
        expect(tooltip2).not.toBeNull();
        expect(tooltip2.nativeElement.textContent).toContain('Channels you are subscribed to');
        expect(nav3).not.toBeNull();
        expect(nav3.nativeElement.children[0].textContent).toContain('Subscribers');
        expect(tooltip3).not.toBeNull();
        expect(tooltip3.nativeElement.textContent).toContain('Channels who are subscribed to you');
        expect(nav4).not.toBeNull();
        expect(nav4.nativeElement.children[0].textContent).toContain('Founders');
        expect(tooltip4).not.toBeNull();
        expect(tooltip4.nativeElement.textContent).toContain('Channels who invested in the Opspot Reg-CF Crowfunding campaign');
    });
    it('should have a list of channels', function () {
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('.m-channels--list m-channels--tile'));
        expect(tiles).not.toBeNull();
        expect(tiles.length).toBe(2);
    });
    it('should have an infinite-scroll', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('infinite-scroll'))).not.toBeNull();
    });
});
//# sourceMappingURL=list.component.spec.js.map
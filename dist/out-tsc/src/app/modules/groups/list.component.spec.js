"use strict";
///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
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
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var client_1 = require("../../services/api/client");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var title_1 = require("../../services/ux/title");
var session_1 = require("../../services/session");
var tooltip_component_1 = require("../../common/components/tooltip/tooltip.component");
var card_1 = require("../../mocks/modules/groups/card/card");
var list_component_1 = require("./list.component");
var context_service_1 = require("../../services/context.service");
var context_service_mock_spec_1 = require("../../../tests/context-service-mock.spec");
var mock_1 = require("../../utils/mock");
var overlay_modal_1 = require("../../services/ux/overlay-modal");
var overlay_modal_service_mock_spec_1 = require("../../../tests/overlay-modal-service-mock.spec");
var GroupsTileMock = /** @class */ (function () {
    function GroupsTileMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], GroupsTileMock.prototype, "entity", void 0);
    GroupsTileMock = __decorate([
        core_1.Component({
            selector: 'm-groups--tile',
            template: ''
        })
    ], GroupsTileMock);
    return GroupsTileMock;
}());
// Spec
describe('Groups List', function () {
    var fixture;
    var comp;
    /** Helpers */
    function getCreateAnchor() {
        return fixture.debugElement.queryAll(platform_browser_1.By.directive(router_1.RouterLinkWithHref))
            .find(function (el) { return el.properties['href'] === '/groups/create'; });
    }
    function getGroupTiles() {
        return fixture.debugElement.queryAll(platform_browser_1.By.css('m-groups--tile'));
    }
    function getInfiniteScroll() {
        return fixture.debugElement.query(platform_browser_1.By.css('infinite-scroll'));
    }
    /** /Helpers */
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                card_1.GroupsCardMock,
                mock_1.MockComponent({
                    selector: 'infinite-scroll',
                    inputs: ['inProgress', 'moreData', 'inProgress'],
                }),
                mock_1.MockComponent({
                    selector: 'm-topbar--navigation--options',
                    template: '',
                    inputs: ['options'],
                    outputs: ['change']
                }),
                mock_1.MockComponent({
                    selector: 'm-topbar--hashtags',
                    template: '',
                    inputs: ['enabled'],
                    outputs: ['selectionChange']
                }),
                list_component_1.GroupsListComponent,
                GroupsTileMock,
                tooltip_component_1.TooltipComponent,
            ],
            imports: [
                common_1.CommonModule,
                testing_2.RouterTestingModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: title_1.OpspotTitle, useClass: platform_browser_1.Title, deps: [platform_browser_1.Title] },
                { provide: context_service_1.ContextService, useValue: context_service_mock_spec_1.contextServiceMock },
                { provide: session_1.Session, useClass: session_1.Session },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
            ]
        }).compileComponents();
    }));
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(list_component_1.GroupsListComponent);
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v1/entities/trending/groups"] = {
            'status': 'success',
            'entities': [{ guid: "858049985139183618", type: "group", name: "nicos" }, { guid: "858049985139183618", type: "group", name: "nicos" }]
        };
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
    it('should render a list of groups and an infinite scroll', function () {
        comp.entities = [{ guid: "858049985139183618", type: "group", name: "nicos" }, { guid: "858049985139183618", type: "group", name: "nicos" }];
        fixture.detectChanges();
        expect(getGroupTiles().length).toBe(2);
        expect(getInfiniteScroll()).toBeTruthy();
    });
    it('should render a list of groups and do the load', function () {
        spyOn(comp, 'load').and.stub();
        fixture.detectChanges();
        comp.onOptionsChange({ rating: 2 });
        expect(comp.load).toHaveBeenCalled();
        expect(comp.rating).toBe(2);
    });
});
//# sourceMappingURL=list.component.spec.js.map
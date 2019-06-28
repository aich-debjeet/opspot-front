"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var console_component_1 = require("./console.component");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var infinite_scroll_mock_spec_1 = require("../../../../tests/infinite-scroll-mock.spec");
var opspot_card_mock_spec_1 = require("../../../../tests/opspot-card-mock.spec");
var opspot_card_comment_mock_spec_1 = require("../../../../tests/opspot-card-comment-mock.spec");
var forms_1 = require("@angular/forms");
/* tslint:disable */
describe('ReportConsoleComponent', function () {
    var comp;
    var fixture;
    var appeals;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_mock_spec_1.MaterialMock, infinite_scroll_mock_spec_1.InfiniteScrollMock, opspot_card_mock_spec_1.OpspotCardMock, opspot_card_comment_mock_spec_1.OpspotCardCommentMock, console_component_1.ReportConsoleComponent],
            imports: [forms_1.FormsModule, testing_2.RouterTestingModule],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(console_component_1.ReportConsoleComponent);
        client_mock_spec_1.clientMock.response = {};
        fixture.detectChanges();
        comp = fixture.componentInstance;
        appeals = [];
        client_mock_spec_1.clientMock.response["api/v1/entities/report/appeal/review"] = {
            "status": "success",
            "load-next": '',
            "data": [
                { "guid": "756593195889987599", "entity_guid": "755121974073626627", "entityObj": { "type": "comment" } },
                { "guid": "756593195889987599", "entity_guid": "755121974073626627", "entityObj": { "type": "comment" } },
                { "guid": "756593195889987599", "entity_guid": "755121974073626627", "entityObj": { "type": "comment" } }
            ]
        };
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
    it('should have 4 tabs', testing_1.fakeAsync(function () {
        var tabs = fixture.debugElement.queryAll(platform_browser_1.By.css('.m-report-console--tabs .mdl-tabs__tab'));
        expect(tabs.length).toBe(4);
    }));
    it('should load appeal textarea if filter is review', testing_1.fakeAsync(function () {
        var tabs = fixture.debugElement.queryAll(platform_browser_1.By.css('#appealContent'));
        expect(tabs).not.toBeNull();
    }));
    it("should load appeals", testing_1.fakeAsync(function () {
        comp.load();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[1]).toEqual({ limit: 12, offset: '' });
        expect(comp.appeals.length).toBe(3);
        fixture.detectChanges();
        var items = fixture.debugElement.queryAll(platform_browser_1.By.css('.m-report-console--item'));
        expect(items.length).toBe(3);
    }));
    it("should load appeals, and refresh", testing_1.fakeAsync(function () {
        comp.load();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[1]).toEqual({ limit: 12, offset: '' });
        expect(comp.appeals.length).toBe(3);
        comp.load(true);
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[1]).toEqual({ limit: 12, offset: '' });
        expect(comp.appeals.length).toBe(3);
    }));
});
//# sourceMappingURL=console.component.spec.js.map
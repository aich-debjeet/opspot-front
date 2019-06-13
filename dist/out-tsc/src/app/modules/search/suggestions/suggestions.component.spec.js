"use strict";
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var recent_1 = require("../../../services/ux/recent");
var recent_mock_spec_1 = require("../../../mocks/services/ux/recent-mock.spec");
var context_service_1 = require("../../../services/context.service");
var context_service_mock_spec_1 = require("../../../../tests/context-service-mock.spec");
var suggestions_component_1 = require("./suggestions.component");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
/* tslint:disable */
describe('SearchBarSuggestionsComponent', function () {
    var comp;
    var fixture;
    var recentResults = [
        { 'type': 'user', 'guid': 1111, 'username': 'test1' },
        { 'type': 'user', 'guid': 2222, 'username': 'test2' },
        { 'type': 'user', 'guid': 3333, 'username': 'test3' },
        { 'type': 'group', 'guid': 4444, 'name': 'test4' },
        { 'type': 'group', 'guid': 5555, 'name': 'test5' },
        { 'type': 'group', 'guid': 6666, 'name': 'test6' }
    ];
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                suggestions_component_1.SearchBarSuggestionsComponent
            ],
            imports: [
                common_1.CommonModule,
                testing_2.RouterTestingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: recent_1.RecentService, useValue: recent_mock_spec_1.recentServiceMock },
                { provide: context_service_1.ContextService, useValue: context_service_mock_spec_1.contextServiceMock }
            ]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(suggestions_component_1.SearchBarSuggestionsComponent);
        comp = fixture.componentInstance;
        spyOn(comp.session, 'getLoggedInUser').and.returnValue({ guid: 1234 });
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
    it('should load 6 recent search suggestions when no query', function () {
        recent_mock_spec_1.recentServiceMock.fetch.and.returnValue(recentResults);
        comp.loadRecent();
        expect(recent_mock_spec_1.recentServiceMock.fetch).toHaveBeenCalledWith('recent', 6);
        expect(comp.recent).toEqual(recentResults);
    });
    it('should hide suggestions when not active', function () {
        var el = fixture.debugElement.query(platform_browser_1.By.css('.m-search-bar-suggestions-list'));
        comp.active = false;
        comp.q = "hello world";
        fixture.detectChanges();
        expect(el.nativeElement.hidden).toBeTruthy();
    });
    it('should be visible when active', function () {
        var el = fixture.debugElement.query(platform_browser_1.By.css('.m-search-bar-suggestions-list'));
        comp.active = true;
        fixture.detectChanges();
        expect(el.nativeElement.hidden).toBeFalsy();
    });
});
//# sourceMappingURL=suggestions.component.spec.js.map
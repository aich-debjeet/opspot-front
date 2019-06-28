"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var booster_component_1 = require("./booster.component");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
var mock_1 = require("../../../../utils/mock");
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var router_1 = require("@angular/router");
var of_1 = require("rxjs/internal/observable/of");
describe('BoostConsoleBooster', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockComponent({ selector: 'opspot-card', inputs: ['object', 'hostClass'] }),
                mock_1.MockComponent({ selector: 'opspot-button', inputs: ['object', 'type'] }),
                booster_component_1.BoostConsoleBooster
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: api_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: router_1.ActivatedRoute, useValue: { parent: { url: of_1.of([{ path: 'newsfeed' }]) } } }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        fixture = testing_1.TestBed.createComponent(booster_component_1.BoostConsoleBooster);
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v1/newsfeed/personal'] = {
            status: 'success',
            activity: [
                { guid: '123' },
                { guid: '456' },
            ]
        };
        client_mock_spec_1.clientMock.response['api/v1/entities/owner'] = {
            status: 'success',
            entities: [
                { guid: '789' },
                { guid: '101112' },
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
    it('should have loaded the lists', function () {
        expect(comp.posts).toEqual([
            { guid: '123' },
            { guid: '456' },
        ]);
        expect(comp.media).toEqual([
            { guid: '789' },
            { guid: '101112' },
        ]);
    });
    it('should have a title', function () {
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-console-booster--cta span'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Boosting guarantees more views on your posts and content.');
    });
    it('should have a list of activities', function () {
        var list = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-console--booster--posts-list'));
        expect(list).not.toBeNull();
        expect(list.nativeElement.children.length).toBe(2);
    });
    it("should have a poster if the user hasn't posted anything yet", function () {
        fixture.detectChanges();
        comp.posts = [];
        fixture.detectChanges();
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-console-booster--content h3'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain("You have no content yet. Why don't you post something?");
        var poster = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-console-booster--content div:last-child'));
        expect(poster).not.toBeNull();
        expect(poster.nativeElement.hidden).toBeFalsy();
    });
});
//# sourceMappingURL=booster.component.spec.js.map
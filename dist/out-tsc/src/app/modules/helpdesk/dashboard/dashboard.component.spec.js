"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var dashboard_component_1 = require("./dashboard.component");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var mock_1 = require("../../../utils/mock");
describe('HelpdeskDashboardComponent', function () {
    var comp;
    var fixture;
    function getInput() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-helpdesk__dashboardInput input'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                dashboard_component_1.HelpdeskDashboardComponent,
                mock_1.MockComponent({
                    selector: 'm-helpdesk--dashboard--all',
                }),
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule, common_1.CommonModule, forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: router_1.ActivatedRoute, useValue: { params: rxjs_1.of({ uuid: 'uuid1' }) } }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v2/helpdesk/questions/top'] = {
            'status': 'success',
            questions: [
                {
                    uuid: 'uuid1',
                    'question': 'is this a test?',
                    'answer': 'yep',
                    category_uuid: 'category_uuid'
                },
                {
                    uuid: 'uuid2',
                    question: 'is this a test?',
                    answer: 'yep',
                    category_uuid: 'category_uuid'
                },
                {
                    uuid: 'uuid2',
                    question: 'is this a test?',
                    answer: 'yep',
                    category_uuid: 'category_uuid'
                },
            ]
        };
        fixture = testing_1.TestBed.createComponent(dashboard_component_1.HelpdeskDashboardComponent);
        comp = fixture.componentInstance;
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
    it("should have a 'How can we help you @username?' title", function () {
        var h2 = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdesk--dashboard--section h2'));
        expect(h2).not.toBeNull();
        expect(h2.nativeElement.textContent).toContain('How can we help you, @test?');
    });
    it("should have a search input", function () {
        var input = getInput();
        expect(input).not.toBeNull();
        input.nativeElement.value = 'test';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(comp.query).toBe('test');
    });
    it("should have a popular questions section", function () {
        var section = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdeskQuestions__questions'));
        expect(section).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-helpdeskQuestions__questions h4')).nativeElement.textContent).toContain('Popular Questions');
        var questions = fixture.debugElement.queryAll(platform_browser_1.By.css('.m-helpdeskQuestions__question'));
        expect(questions.length).toBe(3);
    });
    xit("should have a Help & Support group link", function () {
        var supportGroupLink = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdesk--dashboard--help-and-support'));
        expect(supportGroupLink).not.toBeNull();
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdesk--dashboard--help-and-support .m-helpdesk--dashboard--big-item--text'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Help & Support Group');
        var subtext = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdesk--dashboard--help-and-support .m-helpdesk--dashboard--big-item--subtext'));
        expect(subtext).not.toBeNull();
        expect(subtext.nativeElement.textContent).toContain('Get help from the wider Opspot community');
    });
    xit("should have a Token Sales & Enterprise item", function () {
        var tokenSales = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdesk--dashboard--token-sales-and-enterprise'));
        expect(tokenSales).not.toBeNull();
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdesk--dashboard--token-sales-and-enterprise .m-helpdesk--dashboard--big-item--text'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Token Sales & Enterprise');
        var subtext = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdesk--dashboard--token-sales-and-enterprise .m-helpdesk--dashboard--big-item--subtext'));
        expect(subtext).not.toBeNull();
        expect(subtext.nativeElement.textContent).toContain('Support with purchasing the Opspot Token or your hosted Opspot Node');
    });
});
//# sourceMappingURL=dashboard.component.spec.js.map
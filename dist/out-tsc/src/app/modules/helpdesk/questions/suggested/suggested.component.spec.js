"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var suggested_component_1 = require("./suggested.component");
var session_1 = require("../../../../services/session");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
var client_1 = require("../../../../services/api/client");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var safe_1 = require("../../../../common/pipes/safe");
describe('SuggestedQuestionsComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                safe_1.SafePipe,
                suggested_component_1.SuggestedQuestionsComponent,
            ],
            imports: [
                testing_2.RouterTestingModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
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
        client_mock_spec_1.clientMock.response['api/v2/helpdesk/categories/category/category_uuid'] = {
            'status': 'success',
            category: {
                uuid: 'category_uuid',
                title: 'category',
            }
        };
        fixture = testing_1.TestBed.createComponent(suggested_component_1.SuggestedQuestionsComponent);
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
    xit("should have a popular questions section", function () {
        var section = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdeskQuestions__categories'));
        expect(section).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-helpdesk--questions--popular-questions--title')).nativeElement.textContent).toContain('Popular questions');
        var questions = fixture.debugElement.queryAll(platform_browser_1.By.css('.m-helpdesk--questions--popular-questions--question'));
        expect(questions.length).toBe(3);
    });
});
//# sourceMappingURL=suggested.component.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var questions_component_1 = require("./questions.component");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var mock_1 = require("../../../utils/mock");
var safe_1 = require("../../../common/pipes/safe");
describe('QuestionsComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                safe_1.SafePipe,
                questions_component_1.QuestionsComponent,
                mock_1.MockComponent({
                    selector: 'm-helpdesk--questions--search',
                }),
                mock_1.MockComponent({
                    selector: 'm-helpdesk--questions--related',
                    inputs: ['question']
                }),
                mock_1.MockComponent({
                    selector: 'm-helpdesk--questions--suggested',
                    inputs: ['type', 'question']
                }),
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
                { provide: router_1.ActivatedRoute, useValue: { params: rxjs_1.of({ uuid: 'uuid1' }) } }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v2/helpdesk/questions/question/uuid1'] = {
            'status': 'success',
            question: {
                uuid: 'uuid1',
                question: 'is this a test?',
                answer: 'yep',
                category_uuid: 'category_uuid'
            },
        };
        fixture = testing_1.TestBed.createComponent(questions_component_1.QuestionsComponent);
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
    it("should have a 'Go Back' button", function () {
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdeskQuestions__goBack'));
        expect(button).not.toBeNull();
        expect(button.nativeElement.textContent).toContain('Back to Help Desk');
    });
    it("should have a Help & Support group link", function () {
        var button = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdeskQuestions__bigItem--help-and-support'));
        expect(button).not.toBeNull();
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdeskQuestions__bigItem--help-and-support .m-helpdeskQuestionsBigItem__title'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Help & Support Group');
        var subtext = fixture.debugElement.query(platform_browser_1.By.css('.m-helpdeskQuestions__bigItem--help-and-support .m-helpdeskQuestionsBigItem__subtext'));
        expect(subtext).not.toBeNull();
        expect(subtext.nativeElement.textContent).toContain('Get help from the wider Opspot community');
    });
    it("should have a main page section with the question, answer and the upvote and downvote buttons", function () {
        var question = fixture.debugElement.query(platform_browser_1.By.css('.m-page--main > .m-helpdeskQuestions__question'));
        expect(question).not.toBeNull();
        expect(question.nativeElement.textContent).toContain('is this a test?');
        var answer = fixture.debugElement.query(platform_browser_1.By.css('.m-page--main .m-helpdeskQuestions__answer'));
        expect(answer).not.toBeNull();
        expect(answer.nativeElement.textContent).toContain('yep');
        var voteButtons = fixture.debugElement.queryAll(platform_browser_1.By.css('.m-helpdeskQuestions__feedback > div'));
        expect(voteButtons.length).toBe(2);
    });
});
//# sourceMappingURL=questions.component.spec.js.map
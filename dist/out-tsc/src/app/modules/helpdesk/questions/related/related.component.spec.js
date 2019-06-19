"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var related_component_1 = require("./related.component");
var session_1 = require("../../../../services/session");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
var client_1 = require("../../../../services/api/client");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var mock_1 = require("../../../../utils/mock");
var safe_1 = require("../../../../common/pipes/safe");
describe('RelatedQuestionsComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                safe_1.SafePipe,
                related_component_1.RelatedQuestionsComponent,
                mock_1.MockComponent({
                    selector: 'opspot-activity',
                    inputs: ['object'],
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
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        client_mock_spec_1.clientMock.response = {};
        fixture = testing_1.TestBed.createComponent(related_component_1.RelatedQuestionsComponent);
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
});
//# sourceMappingURL=related.component.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var payouts_component_1 = require("./payouts.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../../services/session");
var session_mock_spec_1 = require("../../../../../tests/session-mock.spec");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var mock_1 = require("../../../../utils/mock");
var client_1 = require("../../../../services/api/client");
describe('BoostPublisherPayoutsComponent', function () {
    var comp;
    var fixture;
    function getButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('button'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                payouts_component_1.BoostPublisherPayoutsComponent
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(payouts_component_1.BoostPublisherPayoutsComponent);
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
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
    it("should a 'request payout' button", function () {
        fixture.detectChanges();
        var button = getButton();
        expect(button).not.toBeNull();
        expect(button.nativeElement.textContent).toContain('Request a payout');
    });
    it('should request a payout', function () {
        var button = getButton();
        var url = 'api/v1/payout';
        client_mock_spec_1.clientMock.response[url] = { status: 'success' };
        button.nativeElement.click();
        fixture.detectChanges();
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toBe(url);
    });
});
//# sourceMappingURL=payouts.component.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var card_component_1 = require("./card.component");
var boost_service_mock_spec_1 = require("../../../../mocks/modules/boost/boost.service.mock.spec");
var boost_service_1 = require("../../boost.service");
var token_pipe_1 = require("../../../../common/pipes/token.pipe");
var mock_1 = require("../../../../utils/mock");
describe('BoostConsoleCard', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockComponent({
                    selector: 'opspot-card',
                    template: '',
                    inputs: ['object', 'flags']
                }), token_pipe_1.TokenPipe,
                card_component_1.BoostConsoleCard
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule, common_1.CommonModule, forms_1.FormsModule],
        }).overrideComponent(card_component_1.BoostConsoleCard, {
            set: {
                providers: [
                    {
                        provide: boost_service_1.BoostService,
                        useValue: boost_service_mock_spec_1.boostServiceMock
                    }
                ]
            }
        }).compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(card_component_1.BoostConsoleCard);
        comp = fixture.componentInstance;
        comp.boost = {
            handler: 'newsfeed',
            destination: {
                username: 'test-user'
            },
            impressions: 3000,
            met_impressions: 1000,
            method: 'tokens',
            state: 'review',
            bid: 10000000000000000000,
            rejectiOn_reason: -1,
            postToFacebook: true,
            scheduledTs: 1525779264,
            entity: {}
        };
        comp.type = 'newsfeed';
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
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should have a opspot-card', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('opspot-card'))).toBeTruthy();
    });
    it('should show the impressions', function () {
        var impressions = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-card--impressions'));
        expect(impressions).not.toBeNull();
        expect(impressions.nativeElement.textContent).toContain('3,000 views');
    });
    it('should show met impressions', function () {
        var impressions = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-card--met-impressions'));
        expect(impressions).not.toBeNull();
        expect(impressions.nativeElement.textContent).toContain('1,000 views so far');
        comp.boost.state = 'completed';
        fixture.detectChanges();
        expect(impressions.nativeElement.textContent).toContain('1,000 views delivered');
    });
    it('should show the bid', function () {
        var bid = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-card--bid'));
        expect(bid).not.toBeNull();
        expect(bid.nativeElement.textContent).toContain('10 tokens');
    });
    it('should have a state', function () {
        var state = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-card--state'));
        expect(state).not.toBeNull();
        expect(state.nativeElement.textContent).toContain('review');
    });
    it('should have a facebook svg if postToFacebook', function () {
        var postToFacebook = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-card--post-to-facebook'));
        var svg = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-card--post-to-facebook svg'));
        expect(postToFacebook).not.toBeNull();
        expect(svg).not.toBeNull();
    });
    it('should show a button bar', function () {
        var buttons = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-card--manager-item--buttons'));
        expect(buttons).not.toBeNull();
        var revoke = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-card--manager-item--buttons button:nth-child(1)'));
        expect(revoke).not.toBeNull();
        expect(revoke.nativeElement.textContent).toContain('Revoke');
        revoke.nativeElement.click();
        expect(boost_service_mock_spec_1.boostServiceMock.revoke).toHaveBeenCalled();
        var reject = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-card--manager-item--buttons button:nth-child(2)'));
        expect(reject).not.toBeNull();
        expect(reject.nativeElement.textContent).toContain('Reject');
        reject.nativeElement.click();
        expect(boost_service_mock_spec_1.boostServiceMock.reject).toHaveBeenCalled();
        var accept = fixture.debugElement.query(platform_browser_1.By.css('.m-boost-card--manager-item--buttons button:nth-child(3)'));
        expect(accept).not.toBeNull();
        expect(accept.nativeElement.textContent).toContain('Accept');
        accept.nativeElement.click();
    });
});
//# sourceMappingURL=card.component.spec.js.map
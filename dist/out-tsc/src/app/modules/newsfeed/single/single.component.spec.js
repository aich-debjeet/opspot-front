"use strict";
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
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var single_component_1 = require("./single.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../services/session");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var upload_mock_spec_1 = require("../../../../tests/upload-mock.spec");
var upload_1 = require("../../../services/api/upload");
var context_service_1 = require("../../../services/context.service");
var context_service_mock_spec_1 = require("../../../../tests/context-service-mock.spec");
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var OpspotActivityMock = /** @class */ (function () {
    function OpspotActivityMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OpspotActivityMock.prototype, "focusedCommentGuid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotActivityMock.prototype, "object", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotActivityMock.prototype, "commentsToggle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotActivityMock.prototype, "showRatingToggle", void 0);
    OpspotActivityMock = __decorate([
        core_1.Component({
            selector: 'opspot-activity',
            template: ''
        })
    ], OpspotActivityMock);
    return OpspotActivityMock;
}());
var routerMock = new function () {
    this.navigate = jasmine.createSpy('navigate').and.stub();
};
describe('NewsfeedSingleComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [material_mock_spec_1.MaterialMock, OpspotActivityMock, single_component_1.NewsfeedSingleComponent],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: upload_1.Upload, useValue: upload_mock_spec_1.uploadMock },
                { provide: context_service_1.ContextService, useValue: context_service_mock_spec_1.contextServiceMock },
                {
                    provide: router_1.ActivatedRoute,
                    useValue: {
                        params: rxjs_1.of({ guid: 123 }),
                        snapshot: {
                            queryParamMap: router_1.convertToParamMap({})
                        }
                    }
                },
                { provide: router_1.Router, useValue: routerMock }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(single_component_1.NewsfeedSingleComponent);
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v1/newsfeed/single/123'] = {
            'status': 'success',
            "activity": {
                "guid": "123",
                "type": "activity",
                "time_created": "1525415052",
                "time_updated": "1525415052",
                "container_guid": "1234",
                "owner_guid": "1234",
                "access_id": "2",
                "message": "i'm a message",
                "ownerObj": {},
            }
        };
        session_mock_spec_1.sessionMock.user.admin = false;
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
    it("should have loaded the activity on component's init", function () {
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toBe('api/v1/newsfeed/single/123');
    });
    it("should show an error message together with mind's logo when there's an error", function () {
        comp.error = 'error';
        comp.inProgress = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-error-splash'))).not.toBeNull();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-error-splash img'))).not.toBeNull();
        var h3 = fixture.debugElement.query(platform_browser_1.By.css('.m-error-splash h3'));
        expect(h3).not.toBeNull();
        expect(h3.nativeElement.textContent).toContain('error');
        var span = fixture.debugElement.query(platform_browser_1.By.css('.m-error-splash span'));
        expect(span).not.toBeNull();
        expect(span.nativeElement.textContent).toContain('Please try again later');
    });
    it('it should show the activity', function () {
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.opspot-list opspot-activity'))).not.toBeNull();
    });
    it('it should show a spam notice if the activity was marked as spam', function () {
        comp.activity.spam = true;
        fixture.detectChanges();
        var spamNotice = fixture.debugElement.query(platform_browser_1.By.css('.m--spam-notice'));
        expect(spamNotice).not.toBeNull();
        expect(spamNotice.nativeElement.textContent).toContain('This activity is flagged as spam.');
        expect(spamNotice.nativeElement.textContent).toContain('If you wish to appeal, please contact us at info@ops.doesntexist.com.');
    });
    it('it should not show the appeal text if the user is an admin', function () {
        comp.activity.spam = true;
        session_mock_spec_1.sessionMock.user.admin = true;
        fixture.detectChanges();
        var spamNotice = fixture.debugElement.query(platform_browser_1.By.css('.m--spam-notice'));
        expect(spamNotice).not.toBeNull();
        expect(spamNotice.nativeElement.textContent).toContain('This activity is flagged as spam.');
        expect(spamNotice.nativeElement.textContent).not.toContain('If you wish to appeal, please contact us at info@ops.doesntexist.com.');
    });
});
//# sourceMappingURL=single.component.spec.js.map
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
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var mock_1 = require("../../../utils/mock");
var platform_browser_1 = require("@angular/platform-browser");
var boost_component_1 = require("./boost.component");
var session_1 = require("../../../services/session");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var client_1 = require("../../../services/api/client");
var navigation_1 = require("../../../services/navigation");
var navigation_service_mock_spec_1 = require("../../../../tests/navigation-service-mock.spec");
var title_1 = require("../../../services/ux/title");
var opspot_title_service_mock_spec_1 = require("../../../mocks/services/ux/opspot-title.service.mock.spec");
var upload_1 = require("../../../services/api/upload");
var upload_mock_spec_1 = require("../../../../tests/upload-mock.spec");
var storage_mock_spec_1 = require("../../../../tests/storage-mock.spec");
var storage_1 = require("../../../services/storage");
var context_service_1 = require("../../../services/context.service");
var context_service_mock_spec_1 = require("../../../../tests/context-service-mock.spec");
var NewsfeedBoostRotatorComponentMock = /** @class */ (function () {
    function NewsfeedBoostRotatorComponentMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NewsfeedBoostRotatorComponentMock.prototype, "interval", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NewsfeedBoostRotatorComponentMock.prototype, "channel", void 0);
    NewsfeedBoostRotatorComponentMock = __decorate([
        core_1.Component({
            selector: 'm-newsfeed--boost-rotator',
            template: ''
        })
    ], NewsfeedBoostRotatorComponentMock);
    return NewsfeedBoostRotatorComponentMock;
}());
var OpspotActivityMock = /** @class */ (function () {
    function OpspotActivityMock() {
        this.delete = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotActivityMock.prototype, "object", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotActivityMock.prototype, "boostToggle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotActivityMock.prototype, "boost", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OpspotActivityMock.prototype, "showBoostMenuOptions", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotActivityMock.prototype, "delete", void 0);
    OpspotActivityMock = __decorate([
        core_1.Component({
            selector: 'opspot-activity',
            template: ''
        })
    ], OpspotActivityMock);
    return OpspotActivityMock;
}());
describe('NewsfeedBoostComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockComponent({ selector: 'm-newsfeed--boost-rotator', template: '', inputs: ['interval', 'channel'] }),
                OpspotActivityMock,
                mock_1.MockComponent({
                    selector: 'infinite-scroll',
                    inputs: ['inProgress', 'moreData', 'inProgress'],
                }),
                boost_component_1.NewsfeedBoostComponent
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule, common_1.CommonModule, forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: title_1.OpspotTitle, useValue: opspot_title_service_mock_spec_1.opspotTitleMock },
                { provide: navigation_1.Navigation, useValue: navigation_service_mock_spec_1.navigationMock },
                { provide: upload_1.Upload, useValue: upload_mock_spec_1.uploadMock },
                { provide: storage_1.Storage, useValue: storage_mock_spec_1.storageMock },
                { provide: context_service_1.ContextService, useValue: context_service_mock_spec_1.contextServiceMock },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(boost_component_1.NewsfeedBoostComponent);
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v1/boost/fetch/newsfeed'] = {
            status: 'success',
            boosts: [
                {
                    'guid': '1',
                    'type': 'activity',
                    'time_created': '1525457795',
                    'time_updated': '1525457795',
                    'title': '',
                    'message': 'test',
                    'boosted': true,
                    'boosted_guid': '1'
                }, {
                    'guid': '2',
                    'type': 'activity',
                    'message': 'test2',
                    'boosted': true,
                    'boosted_guid': 2
                }
            ],
            'load-next': ''
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
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should have a boost rotator', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('m-newsfeed--boost-rotator'))).toBeTruthy();
    });
    it('should have an infinite-scroll', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('infinite-scroll'))).toBeTruthy();
    });
    it('should have a list of activities', function () {
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var call = client_mock_spec_1.clientMock.get.calls.mostRecent();
        expect(call.args[0]).toBe('api/v1/boost/fetch/newsfeed');
        expect(call.args[1]).toEqual({ limit: 12, offset: '' });
        expect(call.args[2]).toEqual({ cache: true });
        var list = fixture.debugElement.query(platform_browser_1.By.css('.opspot-list'));
        expect(list.nativeElement.children.length).toBe(4); // 2 activities + boost rotator + infinite-scroll
    });
});
//# sourceMappingURL=boost.component.spec.js.map
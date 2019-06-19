"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var tags_component_1 = require("./tags.component");
var material_mock_spec_1 = require("../../../../../tests/material-mock.spec");
var mock_1 = require("../../../../utils/mock");
var client_1 = require("../../../../services/api/client");
var client_mock_spec_1 = require("../../../../../tests/client-mock.spec");
var navigation_1 = require("../../../../services/navigation");
var navigation_service_mock_spec_1 = require("../../../../../tests/navigation-service-mock.spec");
var upload_1 = require("../../../../services/api/upload");
var upload_mock_spec_1 = require("../../../../../tests/upload-mock.spec");
var storage_1 = require("../../../../services/storage");
var storage_mock_spec_1 = require("../../../../../tests/storage-mock.spec");
var context_service_1 = require("../../../../services/context.service");
var context_service_mock_spec_1 = require("../../../../../tests/context-service-mock.spec");
var title_1 = require("../../../../services/ux/title");
var opspot_title_service_mock_spec_1 = require("../../../../mocks/services/ux/opspot-title.service.mock.spec");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
describe('NewsfeedTagsComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                mock_1.MockComponent({
                    selector: 'm-newsfeed--boost-rotator',
                    inputs: ['interval', 'channel']
                }),
                mock_1.MockComponent({
                    selector: 'opspot-activity',
                    inputs: ['object', 'boostToggle', 'showRatingToggle', 'boost', 'showBoostMenuOptions'],
                    outputs: ['delete']
                }),
                mock_1.MockComponent({
                    selector: 'infinite-scroll',
                    inputs: ['inProgress', 'moreData', 'inProgress'],
                }),
                tags_component_1.NewsfeedTagsComponent
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule, common_1.CommonModule, forms_1.FormsModule],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: title_1.OpspotTitle, useValue: opspot_title_service_mock_spec_1.opspotTitleMock },
                { provide: navigation_1.Navigation, useValue: navigation_service_mock_spec_1.navigationMock },
                { provide: upload_1.Upload, useValue: upload_mock_spec_1.uploadMock },
                { provide: storage_1.Storage, useValue: storage_mock_spec_1.storageMock },
                { provide: context_service_1.ContextService, useValue: context_service_mock_spec_1.contextServiceMock },
                {
                    provide: router_1.ActivatedRoute,
                    useValue: {
                        params: rxjs_1.of({ tag: 'hashtag' })
                    }
                }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(tags_component_1.NewsfeedTagsComponent);
        window.Opspot = {
            user: {
                guid: 1,
                name: 'test',
                opted_in_hashtags: 1
            }
        };
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response['api/v2/entities/suggested/activities'] = {
            status: 'success',
            entities: [
                {
                    'guid': '1',
                    'type': 'activity',
                    'time_created': '1525457795',
                    'time_updated': '1525457795',
                    'title': '',
                    'message': 'test',
                    'boosted': true,
                    'boosted_guid': '1'
                },
                {
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
    it('should have an infinite-scroll', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('infinite-scroll'))).toBeTruthy();
    });
    it('should have a list of activities', function () {
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var call = client_mock_spec_1.clientMock.get.calls.mostRecent();
        console.warn(comp);
        expect(call.args[0]).toBe('api/v2/entities/suggested/activities');
        expect(call.args[1]).toEqual({ limit: 12, offset: 0, hashtag: 'hashtag' });
        var list = fixture.debugElement.query(platform_browser_1.By.css('.opspot-list'));
        expect(list.nativeElement.children.length).toBe(3); // 2 activities + infinite-scroll
    });
});
//# sourceMappingURL=tags.component.spec.js.map
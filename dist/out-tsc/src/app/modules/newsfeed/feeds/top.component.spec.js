"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var mock_1 = require("../../../utils/mock");
var platform_browser_1 = require("@angular/platform-browser");
var top_component_1 = require("./top.component");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var upload_mock_spec_1 = require("../../../../tests/upload-mock.spec");
var navigation_service_mock_spec_1 = require("../../../../tests/navigation-service-mock.spec");
var upload_1 = require("../../../services/api/upload");
var navigation_1 = require("../../../services/navigation");
var opspot_title_service_mock_spec_1 = require("../../../mocks/services/ux/opspot-title.service.mock.spec");
var title_1 = require("../../../services/ux/title");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var session_1 = require("../../../services/session");
var storage_mock_spec_1 = require("../../../../tests/storage-mock.spec");
var context_service_1 = require("../../../services/context.service");
var context_service_mock_spec_1 = require("../../../../tests/context-service-mock.spec");
var client_1 = require("../../../services/api/client");
var storage_1 = require("../../../services/storage");
var settings_service_1 = require("../../settings/settings.service");
var settings_service_mock_spec_1 = require("../../../mocks/modules/settings/settings.service.mock.spec");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var newsfeed_service_1 = require("../services/newsfeed.service");
var newsfeed_service_mock_1 = require("../../../mocks/modules/newsfeed/services/newsfeed-service.mock");
describe('NewsfeedTopComponent', function () {
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
                mock_1.MockComponent({
                    selector: 'm-hashtags-selector',
                    inputs: ['tags', 'alignLeft'],
                    outputs: ['tagsChange', 'tagsAdded', 'tagsRemoved'],
                }),
                mock_1.MockComponent({
                    selector: 'opspot-newsfeed-poster',
                    inputs: ['containerGuid', 'accessId', 'message'],
                }),
                top_component_1.NewsfeedTopComponent
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
                { provide: settings_service_1.SettingsService, useValue: settings_service_mock_spec_1.settingsServiceMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
                { provide: newsfeed_service_1.NewsfeedService, useValue: newsfeed_service_mock_1.newsfeedServiceMock },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(top_component_1.NewsfeedTopComponent);
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
        session_mock_spec_1.sessionMock.user.boost_rating = 1;
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
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var call = client_mock_spec_1.clientMock.get.calls.mostRecent();
        expect(call.args[0]).toBe('api/v2/entities/suggested/activities');
        expect(call.args[1]).toEqual({ limit: 12, offset: '', rating: 1 });
        expect(call.args[2]).toEqual({ cache: true });
        var list = fixture.debugElement.query(platform_browser_1.By.css('.opspot-list'));
        expect(list.nativeElement.children.length).toBe(4); // poster + 2 activities + infinite-scroll
    });
    it("should reload the list if the user's content rating changed ", testing_1.fakeAsync(function () {
        client_mock_spec_1.clientMock.get.calls.reset();
        settings_service_mock_spec_1.settingsServiceMock.setRating(2);
        jasmine.clock().tick(10);
        fixture.detectChanges();
        expect(comp.rating).toBe(2);
        var call = client_mock_spec_1.clientMock.get.calls.mostRecent();
        expect(call.args[0]).toBe('api/v2/entities/suggested/activities');
        expect(call.args[1]).toEqual({ limit: 12, offset: '', rating: 2 });
        expect(call.args[2]).toEqual({ cache: true });
    }));
});
//# sourceMappingURL=top.component.spec.js.map
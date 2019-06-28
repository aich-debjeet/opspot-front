"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var abbr_1 = require("../../../common/pipes/abbr");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var forms_1 = require("@angular/forms");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var attachment_service_mock_spec_1 = require("../../../../tests/attachment-service-mock.spec");
var supporters_1 = require("./supporters");
var session_1 = require("../../../services/session");
var attachment_1 = require("../../../services/attachment");
var infinite_scroll_mock_spec_1 = require("../../../../tests/infinite-scroll-mock.spec");
var mock_1 = require("../../../utils/mock");
describe('ChannelSupporters', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                abbr_1.AbbrPipe,
                supporters_1.ChannelSupporters,
                mock_1.MockComponent({
                    selector: 'opspot-card',
                    inputs: ['object'],
                }),
                mock_1.MockComponent({
                    selector: 'opspot-card-user',
                    inputs: ['object'],
                }),
                mock_1.MockComponent({
                    selector: 'infinite-scroll',
                    inputs: ['inProgress', 'moreData', 'inProgress'],
                }),
            ],
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                common_1.CommonModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: attachment_1.AttachmentService, useValue: attachment_service_mock_spec_1.attachmentServiceMock },
                { provide: session_1.Session, useValue: infinite_scroll_mock_spec_1.InfiniteScrollMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(supporters_1.ChannelSupporters);
        client_mock_spec_1.clientMock.response = {};
        comp = fixture.componentInstance;
        comp.channel = {
            guid: 'guid',
            name: 'name',
            username: 'username',
            icontime: 11111,
            subscribers_count: 182,
            impressions: 18200,
            pinned_posts: ['a', 'b', 'c']
        };
        client_mock_spec_1.clientMock.response["api/v1/payments/subscribers/guid/exclusive"] = {
            'status': 'success',
            'subscribers': [{}, {}, {}]
        };
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
    it('should load all entities', testing_1.fakeAsync(function () {
        comp.load();
        fixture.detectChanges();
        testing_1.tick();
        expect(comp.users.length).toBe(3);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/payments/subscribers/guid/exclusive');
    }));
});
//# sourceMappingURL=supporters.spec.js.map
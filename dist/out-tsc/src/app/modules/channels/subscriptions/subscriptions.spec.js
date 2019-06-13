"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var abbr_1 = require("../../../common/pipes/abbr");
var forms_1 = require("@angular/forms");
var attachment_service_mock_spec_1 = require("../../../../tests/attachment-service-mock.spec");
var subscriptions_1 = require("./subscriptions");
var session_1 = require("../../../services/session");
var attachment_1 = require("../../../services/attachment");
var mock_1 = require("../../../utils/mock");
describe('ChannelSubscribers', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
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
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockDirective({ selector: '[mdlSwitch]', inputs: ['mdlSwitch', 'toggled'] }),
                abbr_1.AbbrPipe,
                subscriptions_1.ChannelSubscriptions,
            ],
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                common_1.CommonModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: attachment_1.AttachmentService, useValue: attachment_service_mock_spec_1.attachmentServiceMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(subscriptions_1.ChannelSubscriptions);
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
        client_mock_spec_1.clientMock.response["api/v1/subscribe/subscriptions/guid"] = {
            'status': 'success',
            'users': [{}, {}, {}]
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
        testing_1.tick();
        fixture.detectChanges();
        expect(comp.moreData).toBe(false);
        expect(comp.users.length).toBe(3);
        expect(fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-card-user')).length).toBe(3);
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/subscribe/subscriptions/guid');
    }));
    it('should have an infinite-scroll', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('infinite-scroll'))).toBeTruthy();
    });
});
//# sourceMappingURL=subscriptions.spec.js.map
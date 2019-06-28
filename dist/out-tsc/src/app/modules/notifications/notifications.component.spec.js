"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var client_1 = require("../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var notification_service_mock_spec_1 = require("../../../tests/notification-service-mock.spec");
var material_mock_spec_1 = require("../../../tests/material-mock.spec");
var notifications_component_1 = require("./notifications.component");
var title_1 = require("../../services/ux/title");
var notification_service_1 = require("./notification.service");
var session_1 = require("../../services/session");
var mock_1 = require("../../utils/mock");
var testing_2 = require("@angular/router/testing");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
describe('NotificationsComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                notifications_component_1.NotificationsComponent,
                mock_1.MockComponent({
                    selector: 'opspot-notification',
                    inputs: ['notification']
                }),
                mock_1.MockComponent({
                    selector: 'infinite-scroll',
                    inputs: ['inProgress', 'moreData', 'inProgress'],
                }),
                mock_1.MockComponent({
                    selector: 'm-tooltip',
                })
            ],
            imports: [testing_2.RouterTestingModule],
            providers: [
                {
                    provide: title_1.OpspotTitle,
                    useValue: {
                        setTitle: function () { }
                    }
                },
                { provide: notification_service_1.NotificationService, useValue: notification_service_mock_spec_1.notificationServiceMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(notifications_component_1.NotificationsComponent);
        client_mock_spec_1.clientMock.response = {};
        window.Opspot.notifications_count = 10;
        client_mock_spec_1.clientMock.response["api/v1/notifications/all"] = {
            'status': 'success',
            'notifications': [
                { "type": "notification", "guid": "843204301747658770", "notification_view": "group_activity" },
                { "type": "notification", "guid": "843204301747658770", "notification_view": "group_activity" },
                { "type": "notification", "guid": "843204301747658770", "notification_view": "group_activity" }
            ]
        };
        comp = fixture.componentInstance;
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
    it('Should load 3 elements', function () {
        fixture.detectChanges();
        expect(comp.notifications.length).toBe(3);
        var notifications = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-notification'));
        expect(notifications.length).toBe(3);
    });
    it('Should show the filters with tooltips', function () {
        fixture.detectChanges();
        var tooltips = fixture.debugElement.queryAll(platform_browser_1.By.css('m-tooltip'));
        expect(tooltips.length).toBe(6);
    });
    it('infinite scroll shouldnt be visible if visible false', function () {
        comp.visible = false;
        fixture.detectChanges();
        var notifications = fixture.debugElement.query(platform_browser_1.By.css('infinite-scroll'));
        expect(notifications).toBeNull();
    });
    it('infinite load on click', function () {
        window.Opspot.notifications_count = 10;
        fixture.detectChanges();
        var notifications = fixture.debugElement.query(platform_browser_1.By.css('.m-notifications--load-new a'));
        notifications.nativeElement.click();
        fixture.detectChanges();
        var call = client_mock_spec_1.clientMock.get.calls.mostRecent();
        expect(call.args[0]).toBe('api/v1/notifications/all');
    });
    it('should load notifications using the proper endpoint', function () {
        fixture.detectChanges();
        var call = client_mock_spec_1.clientMock.get.calls.mostRecent();
        expect(call.args[0]).toBe('api/v1/notifications/all');
        var notifications = fixture.debugElement.queryAll(platform_browser_1.By.css('opspot-notification'));
        expect(notifications.length).toBe(3);
    });
});
//# sourceMappingURL=notifications.component.spec.js.map
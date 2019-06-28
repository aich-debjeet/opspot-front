"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var client_1 = require("../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var flyout_component_1 = require("./flyout.component");
var mock_1 = require("../../utils/mock");
var testing_2 = require("@angular/router/testing");
describe('NotificationsFlyoutComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockComponent({
                    selector: 'opspot-notifications',
                    inputs: ['loadOnDemand', 'hidden', 'visible'],
                }, ['onVisible']),
                flyout_component_1.NotificationsFlyoutComponent,
            ],
            imports: [testing_2.RouterTestingModule],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(flyout_component_1.NotificationsFlyoutComponent);
        client_mock_spec_1.clientMock.response = {};
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
    it('Should use the onvisible method', function () {
        var notifications = fixture.debugElement.query(platform_browser_1.By.css('opspot-notifications'));
        expect(notifications).not.toBeNull();
    });
    it('Should emit close evt', function () {
        spyOn(comp.closeEvt, 'emit').and.callThrough();
        comp.close();
        expect(comp.closeEvt.emit).toHaveBeenCalled();
    });
    it('Should call onVisible', function () {
        comp.toggleLoad();
        expect(comp.notificationList.onVisible).toHaveBeenCalled();
    });
});
//# sourceMappingURL=flyout.component.spec.js.map
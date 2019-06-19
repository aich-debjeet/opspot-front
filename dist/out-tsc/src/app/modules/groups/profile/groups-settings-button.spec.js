"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var groups_settings_button_1 = require("./groups-settings-button");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../services/session");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var mock_1 = require("../../../utils/mock");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var groups_service_1 = require("../groups-service");
var groupsServiceMock = mock_1.MockService(groups_service_1.GroupsService);
describe('GroupsSettingsButton', function () {
    var comp;
    var fixture;
    function getButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('button'));
    }
    function getMenuItem(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".opspot-dropdown-menu .mdl-menu__item:nth-child(" + i + ")"));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockDirective({ selector: '[mdl]', inputs: ['mdl'] }),
                mock_1.MockComponent({
                    selector: 'm-modal',
                    template: '<ng-content></ng-content>',
                    inputs: ['open'],
                    outputs: ['closed']
                }),
                groups_settings_button_1.GroupsSettingsButton
            ],
            imports: [testing_2.RouterTestingModule, forms_1.FormsModule],
            providers: [
                { provide: groups_service_1.GroupsService, useValue: groupsServiceMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(groups_settings_button_1.GroupsSettingsButton);
        comp = fixture.componentInstance;
        comp._group = {
            guid: '1234',
            'is:muted': false,
            'is:creator': true
        };
        client_mock_spec_1.clientMock.response = {};
        fixture.detectChanges();
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should have a button and a menu', function () {
        var button = getButton();
        expect(button).not.toBeNull();
        expect(button.nativeElement.textContent).toContain('settings');
        expect(fixture.debugElement.query(platform_browser_1.By.css('.opspot-dropdown-menu'))).not.toBeNull();
    });
    it('should have button that lets you toggle the menu', function () {
        var menu = fixture.debugElement.query(platform_browser_1.By.css('.opspot-dropdown-menu'));
        expect(menu.nativeElement.hidden).toBeTruthy();
        getButton().nativeElement.click();
        fixture.detectChanges();
        expect(menu.nativeElement.hidden).toBeFalsy();
    });
    xit('should have an option to mute / unmute the group', testing_1.fakeAsync(function () {
        var mute = getMenuItem(1);
        var unmute = getMenuItem(2);
        expect(mute).not.toBeNull();
        expect(mute.nativeElement.textContent).toContain('Disable Notifications');
        expect(mute.nativeElement.hidden).toBeFalsy();
        expect(unmute).not.toBeNull();
        expect(unmute.nativeElement.textContent).toContain('Enable Notifications');
        expect(unmute.nativeElement.hidden).toBeTruthy();
        mute.nativeElement.click();
        fixture.detectChanges();
        jasmine.clock().tick(10);
        expect(groupsServiceMock.muteNotifications).toHaveBeenCalled();
        expect(mute.nativeElement.hidden).toBeTruthy();
        expect(unmute.nativeElement.hidden).toBeFalsy();
    }));
    xit('should have an option to feature / unfeature the group', testing_1.fakeAsync(function () {
        var feature = getMenuItem(3);
        expect(feature).not.toBeNull();
        expect(feature.nativeElement.textContent).toContain('Feature');
        feature.nativeElement.click();
        expect(comp.featureModalOpen).toBeTruthy();
        client_mock_spec_1.clientMock.response['api/v1/admin/feature/1234/not-selected'] = { status: 'success' };
        var modalButton = fixture.debugElement.query(platform_browser_1.By.css('m-modal .m-button-feature-modal button.mdl-button'));
        expect(modalButton).not.toBeNull();
        expect(modalButton.nativeElement.textContent).toContain('Feature');
        modalButton.nativeElement.click();
        fixture.detectChanges();
        jasmine.clock().tick(10);
        expect(client_mock_spec_1.clientMock.put).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.put.calls.mostRecent().args[0]).toBe('api/v1/admin/feature/1234/not-selected');
        expect(comp.group.featured).toBeTruthy();
        var unfeature = getMenuItem(3);
        expect(unfeature).not.toBeNull();
        expect(unfeature.nativeElement.textContent).toContain('Unfeature');
        client_mock_spec_1.clientMock.response['api/v1/admin/feature/1234'] = { status: 'success' };
        unfeature.nativeElement.click();
        expect(client_mock_spec_1.clientMock.delete).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toBe('api/v1/admin/feature/1234');
    }));
    it('should have an option to report', function () {
        var report = getMenuItem(4);
        expect(report).not.toBeNull();
        expect(report.nativeElement.textContent).toContain('Report');
        report.nativeElement.click();
        expect(overlay_modal_service_mock_spec_1.overlayModalServiceMock.present).toHaveBeenCalled();
    });
    it('should have an option to delete the group only if the user is a creator', function () {
        var group = {
            guid: '1234',
            'is:muted': false,
            'is:creator': true
        };
        var deleteGroup = getMenuItem(5);
        expect(deleteGroup).not.toBeNull();
        expect(deleteGroup.nativeElement.textContent).toContain('Delete Group');
        group['is:creator'] = false;
        comp._group = group;
        fixture.detectChanges();
        expect(getMenuItem(6)).toBeNull();
    });
    it('should delete the group', testing_1.fakeAsync(function () {
        var deleteGroup = getMenuItem(5);
        deleteGroup.nativeElement.click();
        fixture.detectChanges();
        expect(comp.isGoingToBeDeleted).toBeTruthy();
        var confirmButton = fixture.debugElement.query(platform_browser_1.By.css('m-modal button.mdl-button'));
        expect(confirmButton.nativeElement.textContent).toContain('Confirm');
        confirmButton.nativeElement.click();
        fixture.detectChanges();
        jasmine.clock().tick(10);
        expect(comp.group.deleted).toBeTruthy();
        expect(groupsServiceMock.deleteGroup).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=groups-settings-button.spec.js.map
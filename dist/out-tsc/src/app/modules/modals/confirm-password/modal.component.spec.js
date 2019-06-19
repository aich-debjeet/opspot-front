"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var modal_component_1 = require("./modal.component");
var client_1 = require("../../../services/api/client");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var abbr_1 = require("../../../common/pipes/abbr");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var token_pipe_1 = require("../../../common/pipes/token.pipe");
var session_1 = require("../../../services/session");
var forms_2 = require("@angular/forms");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
/* tslint:disable */
describe('ConfirmPasswordCreatorComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                abbr_1.AbbrPipe,
                token_pipe_1.TokenPipe,
                modal_component_1.ConfirmPasswordModalComponent,
            ],
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                forms_2.ReactiveFormsModule
            ],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(modal_component_1.ConfirmPasswordModalComponent);
        comp = fixture.componentInstance; // LoginForm test instance
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v2/settings/password/validate"] = {
            'status': 'success',
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
    it('should have a title, password should be initialized', function () {
        var title = fixture.debugElement.query(platform_browser_1.By.css('.m-confirm-password--modal'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Confirm password');
        expect(comp.form.value.password).toBe('');
    });
    it('password should update from form changes and call endpoint', testing_1.fakeAsync(function () {
        comp.form.controls['password'].setValue('value');
        expect(comp.form.value.password).toEqual('value');
        comp._opts = {
            onComplete: function () { }
        };
        fixture.detectChanges();
        comp.submit();
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toEqual('api/v2/settings/password/validate');
        expect(comp.overlayModal.dismiss).toHaveBeenCalled();
    }));
    it('password should update from form change and call endpoint', testing_1.fakeAsync(function () {
        comp.form.controls['password'].setValue('value');
        expect(comp.form.value.password).toEqual('value');
        client_mock_spec_1.clientMock.response["api/v2/settings/password/validate"] = {
            'status': 'failed',
        };
        comp.submit();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toEqual('api/v2/settings/password/validate');
    }));
});
//# sourceMappingURL=modal.component.spec.js.map
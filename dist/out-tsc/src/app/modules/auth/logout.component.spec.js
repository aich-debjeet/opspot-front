"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var logout_component_1 = require("./logout.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var session_1 = require("../../services/session");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var client_1 = require("../../services/api/client");
var router_1 = require("@angular/router");
var routerMock = new function () {
    this.navigate = jasmine.createSpy('navigate');
};
xdescribe('LogoutComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [logout_component_1.LogoutComponent],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: router_1.Router, useValue: routerMock },
            ]
        })
            .compileComponents();
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(logout_component_1.LogoutComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should logout just after instantiating', function () {
        expect(client_mock_spec_1.clientMock.delete).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toBe('api/v1/authenticate');
        expect(session_mock_spec_1.sessionMock.logout).toHaveBeenCalled();
        expect(routerMock.navigate).toHaveBeenCalled();
        expect(routerMock.navigate.calls.mostRecent().args[0]).toEqual(['/login']);
    });
});
//# sourceMappingURL=logout.component.spec.js.map
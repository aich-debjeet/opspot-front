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
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var session_1 = require("../../../services/session");
var overlay_modal_1 = require("../../../services/ux/overlay-modal");
var client_1 = require("../../../services/api/client");
var service_1 = require("../../../modules/modals/signup/service");
var platform_browser_1 = require("@angular/platform-browser");
var post_menu_component_1 = require("./post-menu.component");
var common_1 = require("@angular/common");
var overlay_modal_service_mock_spec_1 = require("../../../../tests/overlay-modal-service-mock.spec");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
/* tslint:disable */
/* Mock section */
var ModalShareMock = /** @class */ (function () {
    function ModalShareMock() {
        this.closed = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalShareMock.prototype, "open", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalShareMock.prototype, "url", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalShareMock.prototype, "embed", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalShareMock.prototype, "closed", void 0);
    ModalShareMock = __decorate([
        core_1.Component({
            selector: 'm-modal-share',
            template: ''
        })
    ], ModalShareMock);
    return ModalShareMock;
}());
var OpspotModalMock = /** @class */ (function () {
    function OpspotModalMock() {
        this.closed = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotModalMock.prototype, "open", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OpspotModalMock.prototype, "closed", void 0);
    OpspotModalMock = __decorate([
        core_1.Component({
            selector: 'm-modal',
            template: '<ng-content></ng-content>'
        })
    ], OpspotModalMock);
    return OpspotModalMock;
}());
var ModalReportMock = /** @class */ (function () {
    function ModalReportMock() {
        this.closed = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalReportMock.prototype, "open", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalReportMock.prototype, "object", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalReportMock.prototype, "closed", void 0);
    ModalReportMock = __decorate([
        core_1.Component({
            selector: 'm-modal-report',
            template: ''
        })
    ], ModalReportMock);
    return ModalReportMock;
}());
var ModalConfirmMock = /** @class */ (function () {
    function ModalConfirmMock() {
        this.closed = new core_1.EventEmitter();
        this.actioned = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalConfirmMock.prototype, "open", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalConfirmMock.prototype, "closeAfterAction", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ModalConfirmMock.prototype, "yesButton", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalConfirmMock.prototype, "closed", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ModalConfirmMock.prototype, "actioned", void 0);
    ModalConfirmMock = __decorate([
        core_1.Component({
            selector: 'm-modal-confirm',
            template: ''
        })
    ], ModalConfirmMock);
    return ModalConfirmMock;
}());
var scrollServiceMock = new function () {
    this.initOnScroll = jasmine.createSpy('initOnScroll').and.stub();
    this.open = jasmine.createSpy('open').and.stub();
    this.close = jasmine.createSpy('close').and.stub();
};
/* ENd of mock section */
describe('PostMenuComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                OpspotModalMock,
                ModalShareMock,
                ModalConfirmMock,
                ModalReportMock,
                post_menu_component_1.PostMenuComponent
            ],
            imports: [
                testing_2.RouterTestingModule,
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            providers: [
                { provide: service_1.SignupModalService, useValue: scrollServiceMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: overlay_modal_1.OverlayModalService, useValue: overlay_modal_service_mock_spec_1.overlayModalServiceMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(post_menu_component_1.PostMenuComponent);
        comp = fixture.componentInstance;
        comp.options = ["edit", "translate", "share", "follow", "unfollow", "feature", "unfeature", "delete", "report", "block"];
        comp.entity = {};
        // comp.opened = true;
        comp.entity.ownerObj = { guid: '1' };
        comp.cardMenuHandler();
        fixture.detectChanges();
    });
    it('should have dropdown', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.opspot-dropdown-menu'))).not.toBeNull();
    });
    it('should check if owner is blocked when opening dropdown', function () {
        expect(client_mock_spec_1.clientMock.get.calls.mostRecent().args[0]).toEqual('api/v1/block/1');
    });
    it('should put to owner when blocking', function () {
        comp.block();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.put.calls.mostRecent().args[0]).toEqual('api/v1/block/1');
    });
    it('should delete to owner when unblocking', function () {
        comp.unBlock();
        fixture.detectChanges();
        expect(client_mock_spec_1.clientMock.delete.calls.mostRecent().args[0]).toEqual('api/v1/block/1');
    });
});
//# sourceMappingURL=post-menu.component.spec.js.map
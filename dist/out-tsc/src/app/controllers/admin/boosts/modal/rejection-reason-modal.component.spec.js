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
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var rejection_reason_modal_component_1 = require("./rejection-reason-modal.component");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
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
describe('RejectionReasonModalComponent', function () {
    var comp;
    var fixture;
    var confirmButton;
    function getNoButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-modal-reasons--no-button'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [OpspotModalMock, rejection_reason_modal_component_1.RejectionReasonModalComponent],
            imports: [common_1.CommonModule, forms_1.FormsModule]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(rejection_reason_modal_component_1.RejectionReasonModalComponent);
        comp = fixture.componentInstance; // RejectionReasonModalComponent test instance
        comp.boost = {
            'guid': '123',
            '_id': '59ba98d3b13628293d705ff2',
            'entity': {
                'guid': '752893213072691218',
                'type': 'activity',
                'time_created': '1504879730',
                'time_updated': '1504879730',
                'container_guid': '732337264197111809',
                'owner_guid': '732337264197111809',
                'access_id': '2',
                'title': false,
                'blurb': false,
                'perma_url': false,
                'message': '',
                'ownerObj': {
                    'guid': '732337264197111809',
                    'type': 'user',
                    'access_id': '2',
                    'name': 'opspot',
                    'username': 'opspot',
                    'mature': '0',
                    'boost_rating': '1'
                },
            },
            'state': 'created',
            'rejection_reason': -1
        };
        comp.noButton = 'No';
        confirmButton = fixture.debugElement.query(platform_browser_1.By.css('.m-modal-confirm-buttons > button:first-child'));
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
    it('should have a m-modal component', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('m-modal'))).not.toBeNull();
    });
    it('should have a title', function () {
        var title = fixture.debugElement.query(platform_browser_1.By.css('h5.m-modal-reasons--title'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toContain('Specify a reason for the rejection');
    });
    it('should have a reasons list', function () {
        var list = fixture.debugElement.query(platform_browser_1.By.css('ul.m-modal-reasons--reasons'));
        expect(list).not.toBeNull();
    });
    it('clicking on a reason should select it', function () {
        spyOn(comp, 'selectReason').and.callThrough();
        var listItem = fixture.debugElement.query(platform_browser_1.By.css('ul.m-modal-reasons--reasons > li:first-child'));
        expect(listItem).not.toBeNull();
        listItem.nativeElement.click();
        fixture.detectChanges();
        expect(listItem.nativeElement.classList).toContain('selected');
        expect(comp.selectReason).toHaveBeenCalled();
    });
    it('should have a confirm button', function () {
        expect(confirmButton).not.toBeNull();
    });
    it('confirm button should be disabled if no reason is selected', function () {
        expect(confirmButton.nativeElement.disabled).toBeTruthy();
    });
    it('clicking on confirm button should call action()', function () {
        var listItem = fixture.debugElement.query(platform_browser_1.By.css('ul.m-modal-reasons--reasons > li:first-child'));
        listItem.nativeElement.click();
        fixture.detectChanges();
        spyOn(comp, 'action').and.stub();
        confirmButton.nativeElement.click();
        fixture.detectChanges();
        expect(comp.action).toHaveBeenCalled();
    });
    it('should have a no button', function () {
        expect(getNoButton()).not.toBeNull();
    });
    it('clicking on no button should call close()', function () {
        spyOn(comp, 'close').and.stub();
        getNoButton().nativeElement.click();
        fixture.detectChanges();
        expect(comp.close).toHaveBeenCalled();
    });
});
//# sourceMappingURL=rejection-reason-modal.component.spec.js.map
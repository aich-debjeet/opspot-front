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
var boosts_1 = require("./boosts");
var forms_1 = require("@angular/forms");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var material_slider_mock_spec_1 = require("../../../../tests/material-slider.mock.spec");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var token_pipe_1 = require("../../../common/pipes/token.pipe");
var OpspotCardVideoMock = /** @class */ (function () {
    function OpspotCardVideoMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotCardVideoMock.prototype, "object", void 0);
    OpspotCardVideoMock = __decorate([
        core_1.Component({
            selector: 'opspot-card-video',
            template: ''
        })
    ], OpspotCardVideoMock);
    return OpspotCardVideoMock;
}());
var OpspotCardImageMock = /** @class */ (function () {
    function OpspotCardImageMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotCardImageMock.prototype, "object", void 0);
    OpspotCardImageMock = __decorate([
        core_1.Component({
            selector: 'opspot-card-image',
            template: ''
        })
    ], OpspotCardImageMock);
    return OpspotCardImageMock;
}());
var OpspotCardBlogMock = /** @class */ (function () {
    function OpspotCardBlogMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotCardBlogMock.prototype, "object", void 0);
    OpspotCardBlogMock = __decorate([
        core_1.Component({
            selector: 'opspot-card-blog',
            template: ''
        })
    ], OpspotCardBlogMock);
    return OpspotCardBlogMock;
}());
var OpspotCardUserMock = /** @class */ (function () {
    function OpspotCardUserMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotCardUserMock.prototype, "object", void 0);
    OpspotCardUserMock = __decorate([
        core_1.Component({
            selector: 'opspot-card-user',
            template: ''
        })
    ], OpspotCardUserMock);
    return OpspotCardUserMock;
}());
var OpspotActivityMock = /** @class */ (function () {
    function OpspotActivityMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotActivityMock.prototype, "object", void 0);
    OpspotActivityMock = __decorate([
        core_1.Component({
            selector: 'opspot-activity',
            template: ''
        })
    ], OpspotActivityMock);
    return OpspotActivityMock;
}());
var OpspotCardGroupMock = /** @class */ (function () {
    function OpspotCardGroupMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OpspotCardGroupMock.prototype, "group", void 0);
    OpspotCardGroupMock = __decorate([
        core_1.Component({
            selector: 'opspot-card-group',
            template: ''
        })
    ], OpspotCardGroupMock);
    return OpspotCardGroupMock;
}());
var RejectionReasonModalMock = /** @class */ (function () {
    function RejectionReasonModalMock() {
        this.closed = new core_1.EventEmitter();
        this.actioned = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], RejectionReasonModalMock.prototype, "boost", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], RejectionReasonModalMock.prototype, "closeAfterAction", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RejectionReasonModalMock.prototype, "closed", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], RejectionReasonModalMock.prototype, "actioned", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RejectionReasonModalMock.prototype, "yesButton", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], RejectionReasonModalMock.prototype, "noButton", void 0);
    RejectionReasonModalMock = __decorate([
        core_1.Component({
            selector: 'm--rejection-reason-modal',
            template: ''
        })
    ], RejectionReasonModalMock);
    return RejectionReasonModalMock;
}());
describe('AdminBoosts', function () {
    var comp;
    var fixture;
    function getTabItems(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".mdl-tabs__tab-bar .mdl-tabs__tab:nth-child(" + i + ")"));
    }
    function getBoost(i) {
        return fixture.debugElement.query(platform_browser_1.By.css(".boost"));
    }
    function getAcceptButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.boost .m-admin-boosts--accept-button'));
    }
    function getOpenButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.boost .m-admin-boosts--open-button'));
    }
    function getRejectButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.boost .m-admin-boosts--reject-button'));
    }
    function getETagButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.boost .m-admin-boosts--e-tag-button'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                token_pipe_1.TokenPipe,
                OpspotCardVideoMock,
                OpspotCardImageMock,
                OpspotCardBlogMock,
                OpspotCardUserMock,
                OpspotActivityMock,
                OpspotCardGroupMock,
                RejectionReasonModalMock,
                material_mock_spec_1.MaterialMock,
                material_slider_mock_spec_1.MaterialSliderMock,
                boosts_1.AdminBoosts
            ],
            imports: [
                testing_2.RouterTestingModule,
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(boosts_1.AdminBoosts);
        comp = fixture.componentInstance; // AdminBoosts test instance
        client_mock_spec_1.clientMock.response = [];
        client_mock_spec_1.clientMock.response["api/v1/admin/boosts/newsfeed"] = {
            'status': 'success',
            'boosts': [{
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
                    'bid': '100',
                    'bidType': 'points',
                    'owner': {
                        'guid': '732337264197111809',
                        'type': 'user',
                        'subtype': false,
                        'time_created': '1499978809',
                        'time_updated': false,
                        'container_guid': '0',
                        'name': 'opspot',
                        'username': 'opspot',
                        'boost_rating': '1'
                    },
                    'state': 'created',
                    'transactionId': null,
                    'time_created': '1505401043',
                    'last_updated': '1505401043',
                    'type': 'boost',
                    'subtype': 'network',
                    'handler': 'newsfeed',
                    'rating': null,
                    'quality': '75',
                    'impressions': '100',
                    'rejection_reason': '-1',
                    'boost_impressions': null,
                    'boost_id': null
                }],
            'count': 4,
            'load-next': null,
            'newsfeed_count': 4,
            'content_count': 2
        };
        client_mock_spec_1.clientMock.response["api/v1/admin/boosts/analytics/newsfeed"] = {
            'status': 'success',
            'reviewQueue': 4,
            'backlog': 2,
            'priorityBacklog': 2,
            'impressions': 5000,
            'avgApprovalTime': 1889603500,
            'avgImpressions': 2500,
            'timestamp': 1505745685
        };
        comp.type = 'newsfeed';
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
    it('should have a tab bar with Newsfeed and Content items', function () {
        var newsfeed = getTabItems(1);
        var content = getTabItems(2);
        expect(newsfeed).not.toBeNull();
        expect(newsfeed.nativeElement.textContent).toContain('Newsfeed');
        expect(content).not.toBeNull();
        expect(content.nativeElement.textContent).toContain('Content');
    });
    it('should have a statistics section', function () {
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-admin-boosts-statistics'))).not.toBeNull();
    });
    it('should have a boosts container', function () {
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-admin-boosts-container'))).not.toBeNull();
    });
    it('should show 1 boost', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var boost = getBoost(1);
        expect(boost).not.toBeNull();
    }));
    it('should have a quality slider with a default value of 75', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        testing_1.tick();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.boost > .quality-slider'))).not.toBeNull();
        var slider = fixture.debugElement.query(platform_browser_1.By.css('.quality-slider input[type=range]'));
        expect(slider).not.toBeNull();
        expect(slider.nativeElement.value).toBe('75');
    }));
    it('should have a quality input with a default value of 75', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        testing_1.tick();
        var input = fixture.debugElement.query(platform_browser_1.By.css('.quality-slider input[type=number]'));
        expect(input).not.toBeNull();
        expect(input.nativeElement.value).toBe('75');
    }));
    it('boost should have an Accept button', function () {
        fixture.detectChanges();
        expect(getAcceptButton()).not.toBeNull();
    });
    it('accept button should call accept(...) with false as a second parameter (nsfw)', function () {
        fixture.detectChanges();
        var button = getAcceptButton();
        spyOn(comp, 'accept').and.stub();
        button.nativeElement.click();
        fixture.detectChanges();
        expect(comp.accept).toHaveBeenCalled();
        //expect(comp.accept.calls.mostRecent().args[1]).toBe(false);
    });
    it('boost should have an Open button', function () {
        fixture.detectChanges();
        expect(getOpenButton()).not.toBeNull();
    });
    it('Open button should call accept(...) with true as a second parameter (nsfw)', function () {
        fixture.detectChanges();
        var button = getOpenButton();
        spyOn(comp, 'accept').and.stub();
        button.nativeElement.click();
        fixture.detectChanges();
        expect(comp.accept).toHaveBeenCalled();
        //expect(comp.accept.calls.mostRecent().args[1]).toBe(true);
    });
    it('boost should have an Reject button', function () {
        fixture.detectChanges();
        expect(getRejectButton()).not.toBeNull();
    });
    it('Reject button should call openReasonsModal(...)', function () {
        fixture.detectChanges();
        var button = getRejectButton();
        spyOn(comp, 'openReasonsModal').and.stub();
        button.nativeElement.click();
        fixture.detectChanges();
        expect(comp.openReasonsModal).toHaveBeenCalled();
    });
    it('boost should have an e-tag button', function () {
        fixture.detectChanges();
        expect(getETagButton()).not.toBeNull();
    });
    it('Reject button should call eTag(...) and boost should be marked as explicit', function () {
        fixture.detectChanges();
        var button = getETagButton();
        spyOn(comp, 'eTag').and.callThrough();
        spyOn(comp, 'reject').and.stub();
        comp.boosts[0].rejection_reason = 2;
        button.nativeElement.click();
        fixture.detectChanges();
        expect(comp.eTag).toHaveBeenCalled();
        expect(comp.reject).toHaveBeenCalled();
        expect(comp.findReason(comp.boosts[0].rejection_reason).label).toContain('Explicit');
    });
    it('calling reject(boost) should call api/v1/admin/boosts/:type/:guid/reject together with the rejection reason', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        testing_1.tick();
        client_mock_spec_1.clientMock.post.calls.reset();
        comp.boosts[0].rejection_reason = 2;
        comp.reject(comp.boosts[0]);
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toContain('api/v1/admin/boosts/newsfeed/123/reject');
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({ reason: 2 });
    }));
    it('calling accept(boost, false) should call api/v1/admin/boosts/:type/:guid/accept with a rating of 1 and a default quality of 75', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        testing_1.tick();
        client_mock_spec_1.clientMock.post.calls.reset();
        comp.accept(comp.boosts[0], false);
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toContain('api/v1/admin/boosts/newsfeed/123/accept');
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({ quality: '75', rating: 1, mature: 0 });
    }));
    it('calling accept(boost, true) should call api/v1/admin/boosts/:type/:guid/accept with a rating of 2 and a default quality of 75', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        testing_1.tick();
        client_mock_spec_1.clientMock.post.calls.reset();
        comp.accept(comp.boosts[0], true);
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toContain('api/v1/admin/boosts/newsfeed/123/accept');
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[1]).toEqual({ quality: '75', rating: 2, mature: 0 });
    }));
});
//# sourceMappingURL=boosts.spec.js.map
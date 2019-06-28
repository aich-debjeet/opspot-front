"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var poster_component_1 = require("./poster.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../services/session");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var upload_1 = require("../../../services/api/upload");
var upload_mock_spec_1 = require("../../../../tests/upload-mock.spec");
var attachment_1 = require("../../../services/attachment");
var attachment_service_mock_spec_1 = require("../../../../tests/attachment-service-mock.spec");
var autogrow_1 = require("../../../common/directives/autogrow");
var upload_mock_1 = require("../../../mocks/common/directives/material/upload-mock");
var common_1 = require("@angular/common");
var mock_1 = require("../../../utils/mock");
var angular_text_input_autocomplete_1 = require("angular-text-input-autocomplete");
var selector_component_1 = require("../../hashtags/selector/selector.component");
var dropdown_component_1 = require("../../../common/components/dropdown/dropdown.component");
var tags_component_1 = require("../../hashtags/tags-input/tags.component");
var topbar_service_1 = require("../../hashtags/service/topbar.service");
var topbar_service_mock_1 = require("../../../mocks/modules/hashtags/service/topbar.service.mock");
var ThirdPartyNetworksSelectorMock = /** @class */ (function () {
    function ThirdPartyNetworksSelectorMock() {
    }
    ThirdPartyNetworksSelectorMock.prototype.inject = function (data) {
        return data;
    };
    ThirdPartyNetworksSelectorMock = __decorate([
        core_1.Component({
            selector: 'opspot-third-party-networks-selector',
            exportAs: 'thirdPartyNetworksSelector',
            template: '',
        })
    ], ThirdPartyNetworksSelectorMock);
    return ThirdPartyNetworksSelectorMock;
}());
describe('PosterComponent', function () {
    var comp;
    var fixture;
    function getTextarea() {
        return fixture.debugElement.query(platform_browser_1.By.css('textarea'));
    }
    function getMatureButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('.m-mature-button'));
    }
    function getPostButton() {
        return fixture.debugElement.query(platform_browser_1.By.css('button[type=submit]'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                autogrow_1.AutoGrow,
                material_mock_spec_1.MaterialMock,
                upload_mock_1.MaterialUploadMock,
                ThirdPartyNetworksSelectorMock,
                mock_1.MockComponent({
                    selector: 'm-wire-threshold-input',
                    inputs: ['threshold', 'disabled', 'enabled'],
                    outputs: ['thresholdChange']
                }),
                mock_1.MockComponent({ selector: 'opspot-rich-embed', inputs: ['src', 'preview', 'maxheight', 'cropimage'] }),
                mock_1.MockComponent({ selector: 'm-tooltip', template: '<ng-content></ng-content>' }),
                dropdown_component_1.DropdownComponent,
                tags_component_1.TagsInput,
                selector_component_1.HashtagsSelectorComponent,
                poster_component_1.PosterComponent,
            ],
            imports: [
                common_1.CommonModule,
                testing_2.RouterTestingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                angular_text_input_autocomplete_1.TextInputAutocompleteModule,
            ],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: upload_1.Upload, useValue: upload_mock_spec_1.uploadMock },
                { provide: attachment_1.AttachmentService, useValue: attachment_service_mock_spec_1.attachmentServiceMock },
                { provide: topbar_service_1.TopbarHashtagsService, useValue: topbar_service_mock_1.topbarHashtagsServiceMock },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(poster_component_1.PosterComponent);
        client_mock_spec_1.clientMock.response = {};
        window.Opspot.user = {
            "guid": "732337264197111809",
            "type": "user",
            "subtype": false,
            "time_created": "1499978809",
            "time_updated": false,
            "container_guid": "0",
            "owner_guid": "0",
            "site_guid": false,
            "access_id": "2",
            "name": "opspot",
            "username": "opspot",
            "language": "en",
            "icontime": "1506690756",
            "legacy_guid": false,
            "featured_id": false,
            "banned": "no",
            "website": "",
            "dob": "",
            "gender": "",
            "city": "",
            "merchant": {},
            "boostProPlus": false,
            "fb": false,
            "mature": 0,
            "monetized": "",
            "signup_method": false,
            "social_profiles": [],
            "feature_flags": false,
            "programs": ["affiliate"],
            "plus": false,
            "verified": false,
            "disabled_boost": false,
            "show_boosts": false,
            "chat": true,
            "subscribed": false,
            "subscriber": false,
            "subscriptions_count": 1,
            "impressions": 10248,
            "boost_rating": "2",
            "spam": 0,
            "deleted": 0
        };
        attachment_service_mock_spec_1.attachmentServiceMock.rich = true;
        comp = fixture.componentInstance;
        spyOn(comp.session, 'isLoggedIn').and.callFake(function () {
            return true;
        });
        spyOn(comp.session, 'getLoggedInUser').and.callFake(function () {
            return window.Opspot.user;
        });
        fixture.detectChanges();
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it("should show the user's avatar", function () {
        var img = fixture.debugElement.query(platform_browser_1.By.css('.post .mdl-card__supporting-text .opspot-avatar img'));
        expect(img).not.toBeNull();
        expect(img.nativeElement.src).toContain('icon/732337264197111809/medium/1506690756/');
    });
    it("should have a textarea", function () {
        expect(getTextarea()).not.toBeNull();
    });
    it('should have an attachment button', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.attachment-button'))).not.toBeNull();
    });
    it('should have an input for attachments', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('.attachment-button > input'))).not.toBeNull();
    });
    it('should have a mature toggle', function () {
        expect(getMatureButton()).not.toBeNull();
    });
    it('should have a wire threshold input', function () {
        expect(fixture.debugElement.query(platform_browser_1.By.css('m-wire-threshold-input'))).not.toBeNull();
    });
    it('should have a post button', function () {
        expect(getPostButton()).not.toBeNull();
    });
    it('clicking on the post button should call api/v1/newsfeed', testing_1.fakeAsync(function () {
        comp.meta.message = 'test #tags ';
        comp.hashtagsSelector.parseTags(comp.meta.message);
        fixture.detectChanges();
        client_mock_spec_1.clientMock.response['api/v1/newsfeed'] = { status: 'success' };
        spyOn(comp, 'post').and.callThrough();
        getPostButton().nativeElement.click();
        testing_1.tick();
        expect(comp.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post).toHaveBeenCalled();
        expect(client_mock_spec_1.clientMock.post.calls.mostRecent().args[0]).toEqual('api/v1/newsfeed');
    }));
});
//# sourceMappingURL=poster.component.spec.js.map
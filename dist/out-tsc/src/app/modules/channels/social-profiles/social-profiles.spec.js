"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var abbr_1 = require("../../../common/pipes/abbr");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var forms_1 = require("@angular/forms");
var material_switch_mock_spec_1 = require("../../../../tests/material-switch-mock.spec");
var social_profiles_1 = require("./social-profiles");
describe('ChannelSocialProfiles', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                material_switch_mock_spec_1.MaterialSwitchMock,
                abbr_1.AbbrPipe,
                social_profiles_1.ChannelSocialProfiles
            ],
            imports: [forms_1.FormsModule],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(social_profiles_1.ChannelSocialProfiles);
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
    it('not be editing by default', function () {
        var view = fixture.debugElement.query(platform_browser_1.By.css('.m-channel-social-profiles'));
        var editing = fixture.debugElement.query(platform_browser_1.By.css('.m-channel-social-profiles-editor'));
        expect(view).not.toBeNull();
        expect(editing).toBeNull();
    });
    it('show editing area when in editing mode', function () {
        comp.editing = true;
        fixture.detectChanges();
        var view = fixture.debugElement.query(platform_browser_1.By.css('.m-channel-social-profiles'));
        var editing = fixture.debugElement.query(platform_browser_1.By.css('.m-channel-social-profiles-editor'));
        expect(view.nativeElement.hidden).toBe(true);
        expect(editing).not.toBeNull();
    });
    it('should not have any social fields by default', function () {
        comp.editing = true;
        fixture.detectChanges();
        var field = fixture.debugElement.query(platform_browser_1.By.css('.m-channel-social-profile-input'));
        expect(comp.socialProfiles.length).toBe(0);
        expect(field).not.toBeNull();
    });
    it('should add a new field on clicking more', testing_1.fakeAsync(function () {
        comp.editing = true;
        fixture.detectChanges();
        var btn = fixture.debugElement.query(platform_browser_1.By.css('.m-social-profile-add'));
        btn.nativeElement.click();
        testing_1.tick();
        expect(comp.socialProfiles.length).toBe(1);
        var field = fixture.debugElement.query(platform_browser_1.By.css('.m-channel-social-profile-input'));
        expect(field).not.toBeNull();
    }));
    it('should allow me to add a new social field', testing_1.fakeAsync(function () {
        comp.editing = true;
        comp.newEmptySocialProfile();
        fixture.detectChanges();
        var inputField = fixture.debugElement.query(platform_browser_1.By.css('.m-channel-social-profile-input input'));
        inputField.nativeElement.value = 'ops.doesntexist.com/mark';
        inputField.nativeElement.dispatchEvent(new Event('input'));
        comp.editing = false;
        testing_1.tick();
        fixture.detectChanges();
        expect(comp.socialProfiles.length).toBe(1);
        var view = fixture.debugElement.query(platform_browser_1.By.css('.m-channel-social-profile-opspot'));
        expect(view).not.toBeNull();
    }));
    it('should be able to remove a social field', testing_1.fakeAsync(function () {
        comp.editing = true;
        comp.socialProfiles = [
            {
                key: 'soundcloud',
                value: 'soundcloud.com/mark'
            }
        ];
        fixture.detectChanges();
        var remove = fixture.debugElement.query(platform_browser_1.By.css('.m-channel-social-profile-input a'));
        remove.nativeElement.click();
        expect(comp.socialProfiles.length).toBe(0);
    }));
    it('should still support legacy made social links', testing_1.fakeAsync(function () {
        comp.editing = false;
        var profiles = comp.polyfillLegacy([
            {
                key: 'twitter',
                value: 'markeharding'
            },
            {
                key: 'twitter',
                value: 'twitter.com/markeharding'
            },
            {
                key: 'other',
                value: 'foobar.com'
            },
            {
                key: 'soundcloud',
                value: 'https://soundcloud.com/teamsesh'
            }
        ]);
        fixture.detectChanges();
        expect(profiles[0].key).toBe('twitter');
        expect(profiles[0].value).toBe('https://twitter.com/markeharding');
        expect(profiles[1].key).toBe('twitter');
        expect(profiles[1].value).toBe('twitter.com/markeharding');
        expect(profiles[2].key).toBe('other');
        expect(profiles[2].value).toBe('foobar.com');
        expect(profiles[3].key).toBe('soundcloud');
        expect(profiles[3].value).toBe('https://soundcloud.com/teamsesh');
    }));
    it('should support https social links', testing_1.fakeAsync(function () {
        comp.editing = false;
        var profiles = comp.polyfillLegacy([
            {
                key: 'soundcloud',
                value: 'https://soundcloud.com/teamsesh'
            }
        ]);
        fixture.detectChanges();
        expect(profiles[0].key).toBe('soundcloud');
        expect(profiles[0].value).toBe('https://soundcloud.com/teamsesh');
        var profileUrl = comp.getSocialProfileURL('https://soundcloud.com/teamsesh');
        expect(profileUrl).toBe('https://soundcloud.com/teamsesh');
    }));
});
//# sourceMappingURL=social-profiles.spec.js.map
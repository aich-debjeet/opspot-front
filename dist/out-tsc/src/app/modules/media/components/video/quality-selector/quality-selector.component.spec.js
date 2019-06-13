"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/router/testing");
var common_1 = require("@angular/common");
var quality_selector_component_1 = require("./quality-selector.component");
describe('OpspotVideoQualitySelector', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [quality_selector_component_1.OpspotVideoQualitySelector],
            imports: [
                forms_1.FormsModule,
                testing_2.RouterTestingModule,
                common_1.CommonModule
            ],
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function (done) {
        window.addEventListener = function () { };
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(quality_selector_component_1.OpspotVideoQualitySelector);
        comp = fixture.componentInstance;
        comp.qualities = [
            '720',
            '360',
            '128',
        ];
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
    it('should render a hidden slider, should show as many options as there srcs, and first one should be selected', function () {
        comp.current = '720';
        fixture.detectChanges();
        var wrapper = fixture.debugElement.query(platform_browser_1.By.css('.m-video--quality-control-wrapper'));
        var control = fixture.debugElement.query(platform_browser_1.By.css('.m-video--quality-control'));
        var icon = fixture.debugElement.query(platform_browser_1.By.css('.material-icons'));
        var selectedOption = fixture.debugElement.query(platform_browser_1.By.css('.m-video--selected-quality'));
        expect(control).not.toBeNull();
        expect(icon).not.toBeNull();
        expect(wrapper).not.toBeNull();
        expect(selectedOption).not.toBeNull();
        expect(selectedOption.nativeElement.innerText).toBe('720');
    });
    it('should change quality', function () {
        comp.current = '720';
        fixture.detectChanges();
        var selectedOptions = fixture.debugElement.queryAll(platform_browser_1.By.css('li'));
        selectedOptions[1].nativeElement.click();
        fixture.detectChanges();
        var selectedOption = fixture.debugElement.query(platform_browser_1.By.css('.m-video--selected-quality'));
        expect(selectedOption).not.toBeNull();
        expect(selectedOption.nativeElement.innerText).toBe('360');
    });
});
//# sourceMappingURL=quality-selector.component.spec.js.map
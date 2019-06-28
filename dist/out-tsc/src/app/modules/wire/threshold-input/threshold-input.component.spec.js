"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var threshold_input_component_1 = require("./threshold-input.component");
var forms_1 = require("@angular/forms");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../../services/api/client");
var platform_browser_1 = require("@angular/platform-browser");
var session_1 = require("../../../services/session");
var client_mock_spec_1 = require("../../../../tests/client-mock.spec");
var material_mock_spec_1 = require("../../../../tests/material-mock.spec");
var session_mock_spec_1 = require("../../../../tests/session-mock.spec");
var tooltip_component_1 = require("../../../mocks/common/components/tooltip/tooltip.component");
var dropdown_component_1 = require("../../../common/components/dropdown/dropdown.component");
describe('WireThresholdInputComponent', function () {
    var comp;
    var fixture;
    function getDropdown() {
        return fixture.debugElement.query(platform_browser_1.By.css('m-dropdown.m-topbar--navigation--options'));
    }
    function clickDropdown() {
        fixture.debugElement.query(platform_browser_1.By.css('.m-dropdown--label-container')).nativeElement.click();
        fixture.detectChanges();
    }
    function setRewards(value) {
        var rewards = {
            "description": "rewards",
            "rewards": {
                "points": [],
                "money": [],
                "tokens": [
                    {
                        "amount": 3,
                        "description": "test"
                    }
                ]
            }
        };
        session_mock_spec_1.sessionMock.user['wire_rewards'] = value ? rewards : null;
    }
    function getInput() {
        return fixture.debugElement.query(platform_browser_1.By.css('ul li.m-dropdown--list--item:last-child input'));
    }
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                tooltip_component_1.TooltipComponentMock,
                dropdown_component_1.DropdownComponent,
                threshold_input_component_1.WireThresholdInputComponent
            ],
            imports: [testing_2.RouterTestingModule, forms_1.ReactiveFormsModule, forms_1.FormsModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock }
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 1;
        fixture = testing_1.TestBed.createComponent(threshold_input_component_1.WireThresholdInputComponent);
        session_mock_spec_1.sessionMock.user = {
            "guid": "1234",
            "type": "user",
            "name": "opspot",
            "username": "opspot",
            "wire_rewards": {
                "description": "rewards",
                "rewards": {
                    "points": [],
                    "money": [],
                    "tokens": [
                        {
                            "amount": 3,
                            "description": "test"
                        }
                    ]
                }
            }
        };
        comp = fixture.componentInstance; // WireThresholdInputComponent test instance
        comp._threshold = {
            'type': 'tokens',
            'min': 0
        };
    });
    it('should have a m-dropdown', function () {
        expect(getDropdown()).not.toBeNull();
    });
    it('clicking on m-dropdown should open the threshold input', function () {
        clickDropdown();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-wire-threshold-input--toggle'))).not.toBeNull();
    });
    it('should have a label with a tooltip', function () {
        clickDropdown();
        var label = fixture.debugElement.query(platform_browser_1.By.css('.m-wire-threshold-input--toggle'));
        var tooltip = fixture.debugElement.query(platform_browser_1.By.css('.m-wire-threshold-input--toggle m-tooltip'));
        expect(label).not.toBeNull();
        expect(tooltip).not.toBeNull();
    });
    it('should have a list of rewards', function () {
        clickDropdown();
        expect(fixture.debugElement.query(platform_browser_1.By.css('ul.m-dropdown--list'))).not.toBeNull();
    });
    it('should just prompt to enter the threshold if no channel rewards are set', function () {
        setRewards(false);
        clickDropdown();
        var p = fixture.debugElement.query(platform_browser_1.By.css('p.m-wire-threshold-input--info'));
        expect(p).not.toBeNull();
        expect(p.nativeElement.textContent).toContain('Enter how many tokens users should send you in order to see this post.');
    });
    it('should prompt to select from one of the rewards categories if channel rewards are set', function () {
        setRewards(true);
        clickDropdown();
        var p = fixture.debugElement.query(platform_browser_1.By.css('p.m-wire-threshold-input--info'));
        expect(p).not.toBeNull();
        expect(p.nativeElement.textContent).toContain('Select from one of your rewards or enter a custom amount of tokens to restrict who can see this post.');
    });
    it('should prompt to select from one of the rewards categories if channel rewards are set', function () {
        setRewards(true);
        clickDropdown();
        var p = fixture.debugElement.query(platform_browser_1.By.css('p.m-wire-threshold-input--info'));
        expect(p).not.toBeNull();
        expect(p.nativeElement.textContent).toContain('Select from one of your rewards or enter a custom amount of tokens to restrict who can see this post.');
    });
    it('should have one reward (from the channel rewards)', function () {
        setRewards(true);
        clickDropdown();
        var rewardItem = fixture.debugElement.query(platform_browser_1.By.css('li.m-dropdown--list--item:not(.m-dropdown--list--custom-threshold)'));
        var amount = fixture.debugElement.query(platform_browser_1.By.css('li.m-dropdown--list--item:not(.m-dropdown--list--custom-threshold) b'));
        var description = fixture.debugElement.query(platform_browser_1.By.css('li.m-dropdown--list--item:not(.m-dropdown--list--custom-threshold) p'));
        expect(rewardItem).not.toBeNull();
        expect(amount).not.toBeNull();
        expect(amount.nativeElement.textContent).toContain('3 Tokens and Over');
        expect(description).not.toBeNull();
        expect(description.nativeElement.textContent).toContain('test');
    });
    it('should select the min threshold to the reward item that was clicked', function () {
        setRewards(true);
        clickDropdown();
        spyOn(comp, 'selectTier').and.callThrough();
        var rewardItem = fixture.debugElement.query(platform_browser_1.By.css('li.m-dropdown--list--item'));
        rewardItem.nativeElement.click();
        expect(comp.selectTier).toHaveBeenCalled();
        expect(comp.threshold.min).toBe(3);
    });
    it('should have a reward item that allows a custom amount', function () {
        clickDropdown();
        var rewardItem = fixture.debugElement.query(platform_browser_1.By.css('ul li.m-dropdown--list--custom-threshold'));
        var text = fixture.debugElement.query(platform_browser_1.By.css('ul li.m-dropdown--list--custom-threshold b'));
        var span = fixture.debugElement.query(platform_browser_1.By.css('ul li.m-dropdown--list--custom-threshold span'));
        var done = fixture.debugElement.query(platform_browser_1.By.css('ul li.m-dropdown--list--custom-threshold i:not(.m-wire-threshold-input--type)'));
        expect(rewardItem).not.toBeNull();
        expect(text.nativeElement.textContent).toContain('Visible to supporters who send over');
        expect(getInput()).not.toBeNull();
        expect(span.nativeElement.textContent).toContain('Tokens');
        expect(done).not.toBeNull();
    });
    it("should change the threshold's min amount when changing the input", function () {
        comp._threshold = {
            'type': 'tokens',
            'min': 0
        };
        clickDropdown();
        var input = getInput().nativeElement;
        input.value = '10';
        input.dispatchEvent(new Event('input'));
        expect(comp.threshold.min).toBe(10);
    });
    it("should support threshold's min amount with decimals", function () {
        comp._threshold = {
            'type': 'tokens',
            'min': 0
        };
        clickDropdown();
        var input = getInput().nativeElement;
        input.value = '0.1';
        input.dispatchEvent(new Event('input'));
        expect(comp.threshold.min).toBe(0.1);
        input.value = '0.01';
        input.dispatchEvent(new Event('input'));
        expect(comp.threshold.min).toBe(0.01);
    });
    it("should support threshold's min amount with 3 decimals max", function () {
        comp._threshold = {
            'type': 'tokens',
            'min': 0
        };
        clickDropdown();
        var input = getInput().nativeElement;
        input.value = '0.001';
        input.dispatchEvent(new Event('input'));
        expect(comp.threshold.min).toBe(0.001);
        input.value = '0.0001';
        input.dispatchEvent(new Event('input'));
        expect(comp.threshold.min).toBe(0);
    });
    it("should close the dropdown when clicking on done", function () {
        clickDropdown();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-dropdown--list-container')).nativeElement.hidden).toBeFalsy();
        var done = fixture.debugElement.query(platform_browser_1.By.css('ul li.m-dropdown--list--custom-threshold i:not(.m-wire-threshold-input--type)'));
        done.nativeElement.click();
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.m-dropdown--list-container')).nativeElement.hidden).toBeTruthy();
    });
});
//# sourceMappingURL=threshold-input.component.spec.js.map
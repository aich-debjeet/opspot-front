"use strict";
///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var context_service_1 = require("../../services/context.service");
var context_service_mock_spec_1 = require("../../../tests/context-service-mock.spec");
var session_1 = require("../../services/session");
var bar_component_1 = require("./bar.component");
var forms_1 = require("@angular/forms");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
// Mocks
var SearchBarSuggestionsMock = /** @class */ (function () {
    function SearchBarSuggestionsMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchBarSuggestionsMock.prototype, "q", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SearchBarSuggestionsMock.prototype, "active", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SearchBarSuggestionsMock.prototype, "disabled", void 0);
    SearchBarSuggestionsMock = __decorate([
        core_1.Component({
            selector: 'm-search--bar-suggestions',
            template: ''
        })
    ], SearchBarSuggestionsMock);
    return SearchBarSuggestionsMock;
}());
// Spec
describe('Search', function () {
    var fixture;
    var comp;
    // Helpers
    var _tickWaitFor = function (ms) {
        fixture.detectChanges();
        testing_1.tick();
        jasmine.clock().tick(ms);
    };
    // Setup
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                SearchBarSuggestionsMock,
                bar_component_1.SearchBarComponent
            ],
            imports: [
                common_1.CommonModule,
                testing_2.RouterTestingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
                { provide: context_service_1.ContextService, useValue: context_service_mock_spec_1.contextServiceMock }
            ]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(bar_component_1.SearchBarComponent);
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
    // Tests
    it("should handle the current url that's not /search", testing_1.fakeAsync(function () {
        comp.handleUrl('/newsfeed');
        _tickWaitFor(100);
        expect(comp.q).toBeFalsy();
        expect(comp.id).toBeFalsy();
        expect(comp.hasSearchContext).toBe(false);
        expect(comp.suggestionsDisabled).toBe(false);
        comp.handleUrl('/something/search');
        _tickWaitFor(100);
        expect(comp.q).toBeFalsy();
        expect(comp.id).toBeFalsy();
        expect(comp.hasSearchContext).toBe(false);
        expect(comp.suggestionsDisabled).toBe(false);
    }));
    it('should handle the current /search url', testing_1.fakeAsync(function () {
        comp.handleUrl('/search;q=test');
        _tickWaitFor(100);
        expect(comp.q).toBe('test');
        expect(comp.id).toBeFalsy();
        expect(comp.hasSearchContext).toBeTruthy();
        expect(comp.searchContext).toBe('');
        expect(comp.suggestionsDisabled).toBe(true);
    }));
    it('should handle the current /search url with type', testing_1.fakeAsync(function () {
        comp.handleUrl('/search;q=test;type=karmatest');
        _tickWaitFor(100);
        expect(comp.q).toBe('test');
        expect(comp.id).toBeFalsy();
        expect(comp.hasSearchContext).toBeTruthy();
        expect(comp.searchContext).toBe('karmatest');
        expect(comp.suggestionsDisabled).toBe(true);
    }));
    it('should handle the current /search url with type and container id', testing_1.fakeAsync(function () {
        comp.handleUrl('/search;q=test;id=5000');
        _tickWaitFor(100);
        expect(comp.q).toBe('test');
        expect(comp.id).toBe('5000');
        expect(comp.hasSearchContext).toBeTruthy();
        expect(comp.searchContext).toBe('5000');
        expect(comp.suggestionsDisabled).toBe(true);
    }));
    it('should set active when focus is called', function () {
        comp.active = false;
        comp.focus();
        expect(comp.active).toBeTruthy();
    });
    it('should unset active a bit later after blur is called', testing_1.fakeAsync(function () {
        comp.active = true;
        comp.blur();
        _tickWaitFor(200);
        expect(comp.active).toBeFalsy();
    }));
    it('should search', testing_1.fakeAsync(function () {
        spyOn(comp.router, 'navigate').and.stub();
        comp.q = 'test';
        comp.id = '';
        comp.search();
        testing_1.tick();
        expect(comp.router.navigate).toHaveBeenCalledWith(['search', { q: 'test', ref: 'top' }]);
    }));
    it('should search with container id', testing_1.fakeAsync(function () {
        spyOn(comp.router, 'navigate').and.stub();
        comp.q = 'test';
        comp.id = '5000';
        comp.search();
        testing_1.tick();
        expect(comp.router.navigate).toHaveBeenCalledWith(['search', { q: 'test', ref: 'top', 'id': '5000' }]);
    }));
    it('should search when pressing enter', function () {
        spyOn(comp, 'search').and.stub();
        spyOn(comp, 'unsetFocus').and.stub();
        comp.keyup({ keyCode: 13 });
        expect(comp.search).toHaveBeenCalled();
        expect(comp.unsetFocus).toHaveBeenCalled();
    });
});
//# sourceMappingURL=bar.component.spec.js.map
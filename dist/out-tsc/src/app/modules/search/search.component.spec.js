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
var platform_browser_1 = require("@angular/platform-browser");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var client_1 = require("../../services/api/client");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var title_1 = require("../../services/ux/title");
var storage_1 = require("../../services/storage");
var storage_mock_spec_1 = require("../../../tests/storage-mock.spec");
var session_1 = require("../../services/session");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var search_component_1 = require("./search.component");
var mock_1 = require("../../utils/mock");
var tooltip_component_1 = require("../../mocks/common/components/tooltip/tooltip.component");
var bound_switch_component_1 = require("../../mocks/common/components/material/bound-switch.component");
// Internal mocks
var SearchHybridListComponentMock = /** @class */ (function () {
    function SearchHybridListComponentMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchHybridListComponentMock.prototype, "entities", void 0);
    SearchHybridListComponentMock = __decorate([
        core_1.Component({
            selector: 'm-search--hybrid-list',
            template: ''
        })
    ], SearchHybridListComponentMock);
    return SearchHybridListComponentMock;
}());
var SearchSimpleListComponentMock = /** @class */ (function () {
    function SearchSimpleListComponentMock() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchSimpleListComponentMock.prototype, "entities", void 0);
    SearchSimpleListComponentMock = __decorate([
        core_1.Component({
            selector: 'm-search--simple-list',
            template: ''
        })
    ], SearchSimpleListComponentMock);
    return SearchSimpleListComponentMock;
}());
// Spec
describe('Search', function () {
    var fixture;
    var comp;
    // Helpers
    // Setup
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                mock_1.MockComponent({
                    selector: 'infinite-scroll',
                    inputs: ['inProgress', 'moreData', 'inProgress'],
                }),
                mock_1.MockComponent({
                    selector: 'm-topbar--navigation--options',
                    template: '',
                    inputs: ['options'],
                    outputs: ['change']
                }),
                tooltip_component_1.TooltipComponentMock,
                bound_switch_component_1.MaterialBoundSwitchComponentMock,
                SearchHybridListComponentMock,
                SearchSimpleListComponentMock,
                search_component_1.SearchComponent
            ],
            imports: [
                common_1.CommonModule,
                testing_2.RouterTestingModule
            ],
            providers: [
                { provide: client_1.Client, useValue: client_mock_spec_1.clientMock },
                { provide: title_1.OpspotTitle, useClass: platform_browser_1.Title, deps: [platform_browser_1.Title] },
                { provide: storage_1.Storage, useValue: storage_mock_spec_1.storageMock },
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock }
            ]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(search_component_1.SearchComponent);
        comp = fixture.componentInstance;
        client_mock_spec_1.clientMock.response = {};
        client_mock_spec_1.clientMock.response["api/v2/search"] = {
            status: 'success',
            entities: [5000, 5001]
        };
        client_mock_spec_1.clientMock.response["api/v2/search/top"] = {
            status: 'success',
            entities: {
                user: [1000, 1001],
                group: [2000, 2001],
                activity: [5000, 5001]
            }
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
    // Tests
    it('should search', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '';
        comp.q = 'test';
        comp.type = 'activity';
        comp.container = '';
        comp.mature = false;
        comp.paywall = true;
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(true);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var args = client_mock_spec_1.clientMock.get.calls.mostRecent().args;
        expect(args[0]).toBe("api/v2/search");
        expect(args[1]).toEqual({
            q: 'test',
            container: '',
            limit: 12,
            offset: '',
            taxonomies: 'activity',
            rating: 2,
            mature: 0,
        });
    }));
    it('should search top', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '';
        comp.q = 'test';
        comp.type = '';
        comp.container = '';
        comp.mature = false;
        comp.paywall = true;
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(true);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var args = client_mock_spec_1.clientMock.get.calls.mostRecent().args;
        expect(args[0]).toBe("api/v2/search/top");
        expect(args[1]).toEqual({
            q: 'test',
            container: '',
            limit: 12,
            offset: '',
            sort: '',
            rating: 2,
            mature: 0,
        });
    }));
    it('should search latest', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '';
        comp.q = 'test';
        comp.type = 'latest';
        comp.container = '';
        comp.mature = false;
        comp.paywall = true;
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(true);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var args = client_mock_spec_1.clientMock.get.calls.mostRecent().args;
        expect(args[0]).toBe("api/v2/search/top");
        expect(args[1]).toEqual({
            q: 'test',
            container: '',
            limit: 12,
            offset: '',
            sort: 'latest',
            rating: 2,
            mature: 0,
        });
    }));
    it('should search and concat results', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '';
        comp.q = 'test';
        comp.type = 'activity';
        comp.container = '';
        comp.mature = false;
        comp.paywall = true;
        comp.entities = [4998, 4999];
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(false);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        testing_1.tick();
        expect(comp.entities).toEqual([4998, 4999, 5000, 5001]);
    }));
    it('should search and replace results', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '';
        comp.q = 'test';
        comp.type = 'activity';
        comp.container = '';
        comp.mature = false;
        comp.paywall = true;
        comp.entities = [4998, 4999];
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(true);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        testing_1.tick();
        expect(comp.entities).toEqual([5000, 5001]);
    }));
    it('should search with an offset', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '123';
        comp.q = 'test';
        comp.type = 'activity';
        comp.container = '';
        comp.mature = false;
        comp.paywall = true;
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(false);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var args = client_mock_spec_1.clientMock.get.calls.mostRecent().args;
        expect(args[0]).toBe("api/v2/search");
        expect(args[1]).toEqual({
            q: 'test',
            container: '',
            limit: 12,
            offset: '123',
            taxonomies: 'activity',
            rating: 2,
            mature: 0,
        });
    }));
    it('should search top and replace results', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '';
        comp.q = 'test';
        comp.type = '';
        comp.container = '';
        comp.mature = false;
        comp.paywall = true;
        comp.hybridEntities = {
            user: [999],
            group: [1999],
            'object:video': [],
            'object:image': [],
            'object:blog': [],
            activity: [4999]
        };
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(true);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        testing_1.tick();
        expect(comp.hybridEntities.user).toEqual([1000, 1001]);
        expect(comp.hybridEntities.group).toEqual([2000, 2001]);
        expect(comp.hybridEntities.activity).toEqual([5000, 5001]);
    }));
    it('should search top and concat results', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '';
        comp.q = 'test';
        comp.type = '';
        comp.container = '';
        comp.mature = false;
        comp.paywall = true;
        comp.hybridEntities = {
            user: [999],
            group: [1999],
            'object:video': [],
            'object:image': [],
            'object:blog': [],
            activity: [4999]
        };
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(false);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        testing_1.tick();
        expect(comp.hybridEntities.user).toEqual([999, 1000, 1001]);
        expect(comp.hybridEntities.group).toEqual([1999, 2000, 2001]);
        expect(comp.hybridEntities.activity).toEqual([4999, 5000, 5001]);
    }));
    it('should search with an offset', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '123';
        comp.q = 'test';
        comp.type = 'activity';
        comp.container = '';
        comp.mature = false;
        comp.paywall = true;
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(false);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var args = client_mock_spec_1.clientMock.get.calls.mostRecent().args;
        expect(args[0]).toBe("api/v2/search");
        expect(args[1]).toEqual({
            q: 'test',
            container: '',
            limit: 12,
            offset: '123',
            taxonomies: 'activity',
            rating: 2,
            mature: 0,
        });
    }));
    it('should search within a container', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '';
        comp.q = 'test';
        comp.type = 'activity';
        comp.container = '1000';
        comp.mature = false;
        comp.paywall = true;
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(true);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var args = client_mock_spec_1.clientMock.get.calls.mostRecent().args;
        expect(args[0]).toBe("api/v2/search");
        expect(args[1]).toEqual({
            q: 'test',
            container: '1000',
            limit: 12,
            offset: '',
            taxonomies: 'activity',
            rating: 2,
            mature: 0,
        });
    }));
    it('should search excluding mature or exclusive', testing_1.fakeAsync(function () {
        comp.inProgress = false;
        comp.offset = '';
        comp.q = 'test';
        comp.type = 'activity';
        comp.container = '';
        comp.mature = false;
        comp.paywall = false;
        client_mock_spec_1.clientMock.get.calls.reset();
        comp.search(true);
        fixture.detectChanges();
        testing_1.tick();
        expect(client_mock_spec_1.clientMock.get).toHaveBeenCalled();
        var args = client_mock_spec_1.clientMock.get.calls.mostRecent().args;
        expect(args[0]).toBe("api/v2/search");
        expect(args[1]).toEqual({
            q: 'test',
            container: '',
            limit: 12,
            offset: '',
            taxonomies: 'activity',
            mature: 0,
            paywall: 0,
            rating: 2,
        });
    }));
    it('should toggle mature', function () {
        comp.mature = false;
        comp.toggleMature();
        expect(comp.mature).toBe(true);
        comp.toggleMature();
        expect(comp.mature).toBe(false);
    });
    it('should toggle paywall', function () {
        comp.paywall = false;
        comp.togglePaywall();
        expect(comp.paywall).toBe(true);
        comp.togglePaywall();
        expect(comp.paywall).toBe(false);
    });
    it('should load options from storage', function () {
        storage_mock_spec_1.storageMock.set('search:options', JSON.stringify({ mature: true, paywall: true }));
        comp.loadOptions();
        expect(comp.mature).toBe(true);
        expect(comp.paywall).toBe(true);
    });
    it('should save options to storage', function () {
        storage_mock_spec_1.storageMock.destroy('search:options');
        comp.mature = true;
        comp.paywall = true;
        comp.saveOptions();
        var savedOptions = storage_mock_spec_1.storageMock.get('search:options');
        expect(savedOptions).toBe(JSON.stringify({ mature: true, paywall: true }));
    });
    it('should test for refs', function () {
        comp.ref = '';
        expect(comp.hasRef('test')).toBe(false);
        comp.ref = 'test';
        expect(comp.hasRef('test')).toBe(true);
        comp.ref = 'test-subtest';
        expect(comp.hasRef('test')).toBe(true);
        expect(comp.hasRef('subtest')).toBe(true);
        comp.ref = 'supertest-test';
        expect(comp.hasRef('supertest')).toBe(true);
        expect(comp.hasRef('test')).toBe(true);
        expect(comp.hasRef('subtest')).toBe(false);
        comp.ref = 'test';
        expect(comp.hasRef('not-a-spec')).toBe(false);
    });
});
//# sourceMappingURL=search.component.spec.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var experiment_directive_1 = require("./experiment.directive");
var experiments_service_1 = require("./experiments.service");
var client_service_1 = require("../../common/api/client.service");
var client_mock_spec_1 = require("../../../tests/client-mock.spec");
var storage_1 = require("../../services/storage");
var ExperimentsTestComponent = /** @class */ (function () {
    function ExperimentsTestComponent() {
    }
    ExperimentsTestComponent = __decorate([
        core_1.Component({
            template: "\n    <div *mExperiment=\"'homepage';bucket:'base';\" class=\"homepage-bucket-base\"></div>\n    <div *mExperiment=\"'homepage';bucket:'variant1';\" class=\"homepage-bucket-variant1\"></div>\n  ",
        })
    ], ExperimentsTestComponent);
    return ExperimentsTestComponent;
}());
describe('Directive: ExperimentDirective', function () {
    var fixture;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    experiments_service_1.ExperimentsService,
                    { provide: client_service_1.Client, useValue: client_mock_spec_1.clientMock },
                    storage_1.Storage,
                ],
                declarations: [
                    experiment_directive_1.ExperimentDirective,
                    ExperimentsTestComponent
                ],
            })
                .compileComponents();
            client_mock_spec_1.clientMock.response = {};
            return [2 /*return*/];
        });
    }); });
    it('should load base', testing_1.fakeAsync(function () {
        var url = "api/v2/experiments/homepage";
        client_mock_spec_1.clientMock.response = {
            status: 'success',
            bucketId: 'base'
        };
        fixture = testing_1.TestBed.createComponent(ExperimentsTestComponent);
        fixture.detectChanges();
        jasmine.clock().tick(100);
        testing_1.tick();
        expect(!!fixture.debugElement.query(platform_browser_1.By.css('.homepage-bucket-base'))).toBe(true);
        expect(!!fixture.debugElement.query(platform_browser_1.By.css('.homepage-bucket-variant1'))).toBe(false);
    }));
});
//# sourceMappingURL=experiment.directive.spec.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var common_module_1 = require("../../common/common.module");
var client_service_1 = require("../../common/api/client.service");
var storage_1 = require("../../services/storage");
var experiment_directive_1 = require("./experiment.directive");
var experiments_service_1 = require("./experiments.service");
var ExperimentsModule = /** @class */ (function () {
    function ExperimentsModule() {
    }
    ExperimentsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
            ],
            declarations: [
                experiment_directive_1.ExperimentDirective,
            ],
            exports: [
                experiment_directive_1.ExperimentDirective,
            ],
            providers: [
                {
                    provide: experiments_service_1.ExperimentsService,
                    useFactory: function (_client, _storage) { return new experiments_service_1.ExperimentsService(_client, _storage); },
                    deps: [client_service_1.Client, storage_1.Storage],
                }
            ],
        })
    ], ExperimentsModule);
    return ExperimentsModule;
}());
exports.ExperimentsModule = ExperimentsModule;
//# sourceMappingURL=experiments.module.js.map
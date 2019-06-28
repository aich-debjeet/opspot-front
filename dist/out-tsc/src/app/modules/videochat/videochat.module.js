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
var videochat_component_1 = require("./videochat.component");
var videochat_service_1 = require("./videochat.service");
var router_1 = require("@angular/router");
var VideoChatModule = /** @class */ (function () {
    function VideoChatModule() {
    }
    VideoChatModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.CommonModule,
                router_1.RouterModule,
            ],
            declarations: [
                videochat_component_1.VideoChatComponent,
            ],
            exports: [
                videochat_component_1.VideoChatComponent,
            ],
            providers: [
                videochat_service_1.VideoChatService,
            ]
        })
    ], VideoChatModule);
    return VideoChatModule;
}());
exports.VideoChatModule = VideoChatModule;
//# sourceMappingURL=videochat.module.js.map
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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var list_options_1 = require("../../../services/list-options");
var inline_editor_component_1 = require("../../../common/components/editors/inline-editor.component");
var recommended_service_1 = require("../components/video/recommended.service");
var MediaEditComponent = /** @class */ (function () {
    function MediaEditComponent(session, client, upload, router, route) {
        this.session = session;
        this.client = client;
        this.upload = upload;
        this.router = router;
        this.route = route;
        this.entity = {
            title: '',
            description: '',
            subtype: '',
            license: 'all-rights-reserved',
            mature: false
        };
        this.licenses = list_options_1.LICENSES;
        this.access = list_options_1.ACCESS;
    }
    MediaEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.opspot = window.Opspot;
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['guid']) {
                _this.guid = params['guid'];
                _this.load();
            }
        });
    };
    MediaEditComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    MediaEditComponent.prototype.load = function () {
        var _this = this;
        this.inProgress = true;
        this.client.get('api/v1/entities/entity/' + this.guid, { children: false })
            .then(function (response) {
            _this.inProgress = false;
            console.log(response);
            if (response.entity) {
                if (!response.entity.description)
                    response.entity.description = '';
                if (!response.entity.license)
                    response.entity.license = 'all-rights-reserved';
                response.entity.mature = response.entity.flags && response.entity.flags.mature ? 1 : 0;
                _this.entity = response.entity;
            }
        });
    };
    MediaEditComponent.prototype.save = function () {
        var _this = this;
        this.inlineEditor.prepareForSave().then(function () {
            _this.client.post('api/v1/media/' + _this.guid, _this.entity)
                .then(function (response) {
                console.log(response);
                _this.router.navigate(['/media', _this.guid]);
            })
                .catch(function (e) {
                _this.error = 'There was an error while trying to update';
            });
        });
    };
    MediaEditComponent.prototype.setThumbnail = function (file) {
        console.log(file);
        this.entity.file = file.source;
        this.entity.thumbnail = file.seconds;
    };
    __decorate([
        core_1.ViewChild('inlineEditor'),
        __metadata("design:type", inline_editor_component_1.InlineEditorComponent)
    ], MediaEditComponent.prototype, "inlineEditor", void 0);
    MediaEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-media--edit',
            templateUrl: 'edit.component.html',
            providers: [{
                    provide: recommended_service_1.RecommendedService,
                    useFactory: recommended_service_1.RecommendedService._,
                    deps: [api_1.Client]
                }],
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            api_1.Upload,
            router_1.Router,
            router_1.ActivatedRoute])
    ], MediaEditComponent);
    return MediaEditComponent;
}());
exports.MediaEditComponent = MediaEditComponent;
//# sourceMappingURL=edit.component.js.map
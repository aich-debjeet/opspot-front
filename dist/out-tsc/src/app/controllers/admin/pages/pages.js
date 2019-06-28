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
var inline_editor_component_1 = require("../../../common/components/editors/inline-editor.component");
var AdminPages = /** @class */ (function () {
    function AdminPages(client, upload, route) {
        this.client = client;
        this.upload = upload;
        this.route = route;
        this.pages = [];
        this.page = {
            title: 'New Page',
            body: '',
            path: '',
            menuContainer: 'footer',
            header: false,
            headerTop: 0,
            subtype: 'page'
        };
        this.path = '';
        this.status = 'saved';
    }
    AdminPages.prototype.ngOnInit = function () {
        var _this = this;
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            _this.path = params['path'];
            _this.load();
        });
    };
    AdminPages.prototype.ngOnDestroy = function () {
        this.paramsSubscription.unsubscribe();
    };
    AdminPages.prototype.load = function () {
        var _this = this;
        this.client.get('api/v1/admin/pages')
            .then(function (response) {
            _this.pages = response.pages;
        });
    };
    AdminPages.prototype.save = function (page, allowHeaderUpload) {
        var _this = this;
        if (allowHeaderUpload === void 0) { allowHeaderUpload = true; }
        this.status = 'saving';
        this.editor.prepareForSave().then(function () {
            _this.client.post('api/v1/admin/pages', {
                title: page.title,
                body: page.body,
                path: page.path,
                menuContainer: page.menuContainer,
                subtype: page.subtype
            })
                .then(function (response) {
                if (allowHeaderUpload) {
                    _this.uploadHeader(page);
                }
                _this.status = 'saved';
            });
        });
    };
    AdminPages.prototype.delete = function (page) {
        if (!confirm("Are you sure you want to delete " + page.path + "? This action cannot be undone.")) {
            return;
        }
        if (page.subtype === 'link') {
            this.newLink();
        }
        else {
            this.newPage();
        }
        this.client.delete("api/v1/admin/pages/?path=" + page.path);
        var i;
        for (i in this.pages) {
            if (page.path === this.pages[i].path) {
                this.pages.splice(i, 1);
                break;
            }
        }
    };
    AdminPages.prototype.setPage = function (page) {
        this.page = page;
    };
    AdminPages.prototype.setHeader = function (banner) {
        this.headerFile = banner.file;
        this.page.header = true;
        this.page.headerTop = banner.top;
    };
    AdminPages.prototype.uploadHeader = function (page) {
        this.upload.post('api/v1/admin/pages/' + page.path + '/header', [this.headerFile], {
            headerTop: page.headerTop,
            path: page.path
        });
    };
    AdminPages.prototype.newPage = function () {
        this.page = {
            title: 'New Page',
            body: '<p><br></p>',
            path: 'new',
            menuContainer: 'footer',
            header: false,
            headerTop: 0,
            subtype: 'page'
        };
        this.editor.reset();
        this.pages.push(this.page);
    };
    AdminPages.prototype.newLink = function () {
        this.page = {
            title: 'New Link',
            body: '',
            path: 'http://',
            menuContainer: 'footer',
            header: false,
            headerTop: 0,
            subtype: 'link'
        };
        this.editor.reset();
        this.pages.push(this.page);
    };
    __decorate([
        core_1.ViewChild('inlineEditor'),
        __metadata("design:type", inline_editor_component_1.InlineEditorComponent)
    ], AdminPages.prototype, "editor", void 0);
    AdminPages = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-admin-pages',
            templateUrl: 'pages.html'
        }),
        __metadata("design:paramtypes", [api_1.Client, api_1.Upload, router_1.ActivatedRoute])
    ], AdminPages);
    return AdminPages;
}());
exports.AdminPages = AdminPages;
//# sourceMappingURL=pages.js.map
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
var title_1 = require("../../../services/ux/title");
var list_options_1 = require("../../../services/list-options");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var inline_editor_component_1 = require("../../../common/components/editors/inline-editor.component");
var threshold_input_component_1 = require("../../wire/threshold-input/threshold-input.component");
var selector_component_1 = require("../../hashtags/selector/selector.component");
var BlogEdit = /** @class */ (function () {
    function BlogEdit(session, client, upload, router, route, title) {
        var _this = this;
        this.session = session;
        this.client = client;
        this.upload = upload;
        this.router = router;
        this.route = route;
        this.title = title;
        this.opspot = window.Opspot;
        this.blog = {
            guid: 'new',
            title: '',
            description: '<p><br></p>',
            time_created: Date.now(),
            access_id: 2,
            tags: [],
            license: 'attribution-sharealike-cc',
            fileKey: 'header',
            mature: 0,
            monetized: 0,
            published: 0,
            wire_threshold: null,
            custom_meta: {
                title: '',
                description: '',
                author: ''
            },
            slug: ''
        };
        this.banner_top = 0;
        this.banner_prompt = false;
        this.editing = true;
        this.canSave = true;
        this.inProgress = false;
        this.validThreshold = true;
        this.error = '';
        this.pendingUploads = [];
        this.licenses = list_options_1.LICENSES;
        this.access = list_options_1.ACCESS;
        this.getCategories();
        window.addEventListener('attachment-preview-loaded', function (event) {
            _this.pendingUploads.push(event.detail.timestamp);
        });
        window.addEventListener('attachment-upload-finished', function (event) {
            _this.pendingUploads.splice(_this.pendingUploads.findIndex(function (value) {
                return value === event.detail.timestamp;
            }), 1);
        });
    }
    BlogEdit.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.session.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }
        this.title.setTitle('New Blog');
        this.paramsSubscription = this.route.params.subscribe(function (params) {
            if (params['guid']) {
                _this.guid = params['guid'];
                _this.blog = {
                    guid: 'new',
                    title: '',
                    description: '<p><br></p>',
                    access_id: 2,
                    category: '',
                    license: '',
                    fileKey: 'header',
                    mature: 0,
                    monetized: 0,
                    published: 0,
                    wire_threshold: null,
                    custom_meta: {
                        title: '',
                        description: '',
                        author: ''
                    },
                    slug: '',
                    tags: [],
                };
                _this.banner = void 0;
                _this.banner_top = 0;
                _this.banner_prompt = false;
                _this.editing = true;
                _this.canSave = true;
                if (_this.guid !== 'new') {
                    _this.load();
                }
            }
        });
    };
    BlogEdit.prototype.ngOnDestroy = function () {
        if (this.paramsSubscription) {
            this.paramsSubscription.unsubscribe();
        }
    };
    BlogEdit.prototype.getCategories = function () {
        this.categories = [];
        for (var category in window.Opspot.categories) {
            this.categories.push({
                id: category,
                label: window.Opspot.categories[category],
                selected: false
            });
        }
        this.categories.sort(function (a, b) { return a.label > b.label ? 1 : -1; });
    };
    BlogEdit.prototype.load = function () {
        var _this = this;
        this.client.get('api/v1/blog/' + this.guid, {})
            .then(function (response) {
            if (response.blog) {
                _this.blog = response.blog;
                _this.guid = response.blog.guid;
                _this.title.setTitle(_this.blog.title);
                //this.hashtagsSelector.setTags(this.blog.tags);
                // draft
                if (!_this.blog.published && response.blog.draft_access_id) {
                    _this.blog.access_id = response.blog.draft_access_id;
                }
                if (!_this.blog.category)
                    _this.blog.category = '';
                if (!_this.blog.license)
                    _this.blog.license = '';
            }
        });
    };
    BlogEdit.prototype.onTagsChange = function (tags) {
        this.blog.tags = tags;
    };
    BlogEdit.prototype.onTagsAdded = function (tags) {
    };
    BlogEdit.prototype.onTagsRemoved = function (tags) {
    };
    BlogEdit.prototype.validate = function () {
        this.error = '';
        if (!this.blog.description) {
            this.error = 'error:no-description';
            return false;
        }
        if (!this.blog.title) {
            this.error = 'error:no-title';
            return false;
        }
        return true;
    };
    BlogEdit.prototype.save = function () {
        var _this = this;
        if (!this.canSave)
            return;
        if (!this.validate())
            return;
        this.inlineEditor.prepareForSave().then(function () {
            var blog = Object.assign({}, _this.blog);
            // only allowed props
            blog.mature = blog.mature ? 1 : 0;
            blog.monetization = blog.monetization ? 1 : 0;
            blog.monetized = blog.monetized ? 1 : 0;
            _this.inProgress = true;
            _this.canSave = false;
            _this.check_for_banner().then(function () {
                _this.upload.post('api/v1/blog/' + _this.guid, [_this.banner], blog)
                    .then(function (response) {
                    _this.router.navigate(response.route ? ['/' + response.route] : ['/blog/view', response.guid]);
                    _this.canSave = true;
                    _this.inProgress = false;
                })
                    .catch(function (e) {
                    _this.canSave = true;
                    _this.inProgress = false;
                });
            })
                .catch(function () {
                _this.client.post('api/v1/blog/' + _this.guid, _this.blog)
                    .then(function (response) {
                    if (response.guid) {
                        _this.router.navigate(response.route ? ['/' + response.route] : ['/blog/view', response.guid]);
                    }
                    _this.inProgress = false;
                    _this.canSave = true;
                })
                    .catch(function (e) {
                    _this.inProgress = false;
                    _this.canSave = true;
                });
            });
        });
    };
    BlogEdit.prototype.add_banner = function (banner) {
        var self = this;
        this.banner = banner.file;
        this.blog.header_top = banner.top;
    };
    //this is a nasty hack because people don't want to click save on a banner ;@
    BlogEdit.prototype.check_for_banner = function () {
        var _this = this;
        if (!this.banner)
            this.banner_prompt = true;
        return new Promise(function (resolve, reject) {
            if (_this.banner)
                return resolve(true);
            setTimeout(function () {
                if (_this.banner)
                    return resolve(true);
                else
                    return reject(false);
            }, 100);
        });
    };
    BlogEdit.prototype.toggleMonetized = function () {
        if (this.blog.mature) {
            return;
        }
        this.blog.monetized = this.blog.monetized ? 0 : 1;
    };
    BlogEdit.prototype.checkMonetized = function () {
        if (this.blog.mature) {
            this.blog.monetized = 0;
        }
    };
    BlogEdit.prototype.onCategoryClick = function (category) {
        category.selected = !category.selected;
        if (!this.blog.hasOwnProperty('categories') || !this.blog.categories) {
            this.blog['categories'] = [];
        }
        if (category.selected) {
            this.blog.categories.push(category.id);
        }
        else {
            this.blog.categories.splice(this.blog.categories.indexOf(category.id), 1);
        }
    };
    __decorate([
        core_1.ViewChild('inlineEditor'),
        __metadata("design:type", inline_editor_component_1.InlineEditorComponent)
    ], BlogEdit.prototype, "inlineEditor", void 0);
    __decorate([
        core_1.ViewChild('thresholdInput'),
        __metadata("design:type", threshold_input_component_1.WireThresholdInputComponent)
    ], BlogEdit.prototype, "thresholdInput", void 0);
    __decorate([
        core_1.ViewChild('hashtagsSelector'),
        __metadata("design:type", selector_component_1.HashtagsSelectorComponent)
    ], BlogEdit.prototype, "hashtagsSelector", void 0);
    BlogEdit = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-blog-edit',
            host: {
                'class': 'm-blog'
            },
            templateUrl: 'edit.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, api_1.Upload, router_1.Router, router_1.ActivatedRoute, title_1.OpspotTitle])
    ], BlogEdit);
    return BlogEdit;
}());
exports.BlogEdit = BlogEdit;
//# sourceMappingURL=edit.js.map
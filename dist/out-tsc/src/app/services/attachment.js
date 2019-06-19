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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_1 = require("./api");
var session_1 = require("./session");
var AttachmentService = /** @class */ (function () {
    function AttachmentService(session, clientService, uploadService) {
        this.session = session;
        this.clientService = clientService;
        this.uploadService = uploadService;
        this.meta = {};
        this.attachment = {};
        this.container = {};
        this.accessId = 2;
        this.previewTimeout = null;
        this.pendingDelete = false;
        this.xhr = null;
        this.reset();
    }
    AttachmentService._ = function (session, client, upload) {
        return new AttachmentService(session, client, upload);
    };
    AttachmentService.prototype.load = function (object) {
        if (!object) {
            return;
        }
        this.reset();
        if (object.perma_url) {
            this.meta.is_rich = 1;
            this.meta.thumbnail = object.thumbnail_src || '';
            this.meta.title = object.title || '';
            this.meta.url = object.perma_url || '';
            this.meta.description = object.description || '';
        }
        if (object.attachment_guid) {
            this.meta.attachment_guid = object.attachment_guid;
            if (object.custom_data && object.custom_data.thumbnail_src) {
                this.attachment.preview = object.custom_data.thumbnail_src;
            }
            if (object.custom_data && object.custom_data[0] && object.custom_data[0].src) {
                this.attachment.preview = object.custom_data[0].src;
            }
        }
        this.meta.mature = this.parseMaturity(object);
    };
    AttachmentService.prototype.setContainer = function (container) {
        if ((typeof container === 'string') || typeof container === 'number') {
            this.container = { guid: container };
        }
        else {
            this.container = container;
        }
        this.meta.container_guid = this.container.guid;
        return this;
    };
    AttachmentService.prototype.getContainer = function () {
        return this.container;
    };
    AttachmentService.prototype.isPendingDelete = function () {
        return this.pendingDelete;
    };
    AttachmentService.prototype.setPendingDelete = function (value) {
        this.pendingDelete = value;
    };
    AttachmentService.prototype.setAccessId = function (access_id) {
        this.accessId = access_id;
        this.meta.access_id = access_id;
        return this;
    };
    AttachmentService.prototype.getAccessId = function () {
        return this.accessId;
    };
    AttachmentService.prototype.setHidden = function (hidden) {
        this.meta.hidden = hidden ? 1 : 0;
    };
    AttachmentService.prototype.isHidden = function () {
        return !!this.meta.hidden;
    };
    AttachmentService.prototype.setMature = function (mature) {
        this.meta.mature = mature ? 1 : 0;
        return this;
    };
    AttachmentService.prototype.isMature = function () {
        return !!this.meta.mature;
    };
    AttachmentService.prototype.toggleMature = function () {
        return this.setMature(!this.isMature());
    };
    AttachmentService.prototype.upload = function (fileInput) {
        var _this = this;
        this.reset();
        this.attachment.progress = 0;
        this.attachment.mime = '';
        var file = fileInput ? fileInput.files[0] : null;
        if (!file) {
            return Promise.reject(null);
        }
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = new XMLHttpRequest();
        return this.checkFileType(file)
            .then(function () {
            // Upload and return the GUID
            return _this.uploadService.post('api/v1/media', [file], _this.meta, function (progress) {
                _this.attachment.progress = progress;
            }, _this.xhr);
        })
            .then(function (response) {
            _this.meta.attachment_guid = response.guid ? response.guid : null;
            if (!_this.meta.attachment_guid) {
                throw 'No GUID';
            }
            return Promise.resolve(_this.meta.attachment_guid);
        })
            .catch(function (e) {
            _this.meta.attachment_guid = null;
            _this.attachment.progress = 0;
            _this.attachment.preview = null;
            return Promise.reject(e);
        });
    };
    AttachmentService.prototype.abort = function () {
        if (this.xhr) {
            this.xhr.abort();
            this.xhr = null;
            this.attachment.progress = 0;
            this.attachment.mime = '';
            this.attachment.preview = null;
        }
    };
    AttachmentService.prototype.remove = function (fileInput) {
        var _this = this;
        this.attachment.progress = 0;
        this.attachment.mime = '';
        this.attachment.preview = null;
        if (!this.meta.attachment_guid) {
            return Promise.reject('No GUID');
        }
        return this.clientService.delete('api/v1/media/' + this.meta.attachment_guid)
            .then(function () {
            _this.meta.attachment_guid = null;
        })
            .catch(function (e) {
            _this.meta.attachment_guid = null;
            throw e;
        });
    };
    AttachmentService.prototype.has = function () {
        return !!this.meta.attachment_guid || this.isRich();
    };
    AttachmentService.prototype.hasFile = function () {
        return !!this.attachment.preview || this.getMime() === 'video';
    };
    AttachmentService.prototype.getUploadProgress = function () {
        return this.attachment.progress ? this.attachment.progress : 0;
    };
    AttachmentService.prototype.getPreview = function () {
        return this.attachment.preview;
    };
    AttachmentService.prototype.getMime = function () {
        return this.attachment.mime;
    };
    AttachmentService.prototype.isRich = function () {
        return !!this.meta.is_rich;
    };
    AttachmentService.prototype.getMeta = function () {
        return this.meta;
    };
    AttachmentService.prototype.exportMeta = function () {
        var result = {};
        for (var prop in this.meta) {
            if (this.meta.hasOwnProperty(prop)) {
                result[prop] = this.meta[prop];
            }
        }
        return result;
    };
    AttachmentService.prototype.reset = function () {
        this.attachment = {
            preview: null,
            progress: 0,
            mime: '',
            richUrl: null
        };
        this.meta = {
            is_rich: 0,
            title: '',
            description: '',
            thumbnail: '',
            url: '',
            attachment_guid: null,
            mature: 0,
            container_guid: this.getContainer().guid,
            access_id: this.getAccessId()
        };
    };
    AttachmentService.prototype.resetRich = function () {
        this.meta.is_rich = 0;
        this.meta.thumbnail = '';
        this.meta.title = '';
        this.meta.url = '';
        this.meta.description = '';
    };
    AttachmentService.prototype.preview = function (content, detectChangesFn) {
        var _this = this;
        var match = content.match(/(\b(https?|ftp|file):\/\/[^\s\]\)]+)/ig), url;
        if (!match) {
            return;
        }
        if (this.attachment.preview) {
            return;
        }
        if (match instanceof Array) {
            url = match[0];
        }
        else {
            url = match;
        }
        if (!url.length) {
            return;
        }
        if (url === this.attachment.richUrl) {
            return;
        }
        this.meta.is_rich = 1;
        if (this.previewTimeout) {
            clearTimeout(this.previewTimeout);
        }
        this.attachment.richUrl = url;
        if (detectChangesFn)
            detectChangesFn();
        this.previewTimeout = window.setTimeout(function () {
            _this.resetRich();
            _this.meta.is_rich = 1;
            if (detectChangesFn)
                detectChangesFn();
            _this.clientService.get('api/v1/newsfeed/preview', { url: url })
                .then(function (data) {
                if (!data) {
                    _this.resetRich();
                    if (detectChangesFn)
                        detectChangesFn();
                    return;
                }
                if (data.meta) {
                    _this.meta.url = url;
                    _this.meta.title = data.meta.title || _this.meta.url;
                    _this.meta.description = data.meta.description || '';
                }
                else {
                    _this.meta.url = url;
                    _this.meta.title = url;
                }
                if (data.links && data.links.thumbnail && data.links.thumbnail[0]) {
                    _this.meta.thumbnail = data.links.thumbnail[0].href;
                }
                if (detectChangesFn)
                    detectChangesFn();
            })
                .catch(function (e) {
                _this.resetRich();
                if (detectChangesFn)
                    detectChangesFn();
            });
        }, 600);
    };
    AttachmentService.prototype.parseMaturity = function (object) {
        if (typeof object === 'undefined') {
            return false;
        }
        if (typeof object.flags !== 'undefined') {
            return !!object.flags.mature;
        }
        if (typeof object.mature !== 'undefined') {
            return !!object.mature;
        }
        if (typeof object.custom_data !== 'undefined' && typeof object.custom_data[0] !== 'undefined') {
            return !!object.custom_data[0].mature;
        }
        if (typeof object.custom_data !== 'undefined') {
            return !!object.custom_data.mature;
        }
        return false;
    };
    AttachmentService.prototype.isForcefullyShown = function (object) {
        if (!object) {
            return false;
        }
        if (object.mature_visibility) {
            return true;
        }
        return false;
    };
    AttachmentService.prototype.shouldBeBlurred = function (object) {
        if (!object) {
            return false;
        }
        if (typeof object.mature_visibility === 'undefined') {
            var user = this.session.getLoggedInUser();
            if (user &&
                this.parseMaturity(object) &&
                (user.mature)) {
                object.mature_visibility = true;
            }
        }
        if (this.isForcefullyShown(object)) {
            return false;
        }
        return this.parseMaturity(object);
    };
    AttachmentService.prototype.checkFileType = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (file.type && file.type.indexOf('video/') === 0) {
                _this.attachment.mime = 'video';
                _this.checkVideoDuration(file).then(function (duration) {
                    if (duration > window.Opspot.max_video_length) {
                        return reject({ message: 'Error: Video duration exceeds ' + window.Opspot.max_video_length / 60 + ' minutes' });
                    }
                    resolve();
                }).catch(function (error) {
                    resolve(); //resolve regardless and forward to backend job
                    //reject(error);
                });
            }
            else if (file.type && file.type.indexOf('image/') === 0) {
                _this.attachment.mime = 'image';
                var reader_1 = new FileReader();
                reader_1.onloadend = function () {
                    _this.attachment.preview = reader_1.result;
                    resolve();
                };
                reader_1.readAsDataURL(file);
            }
            else {
                _this.attachment.mime = 'unknown';
            }
        });
    };
    AttachmentService.prototype.checkVideoDuration = function (file) {
        return new Promise(function (resolve, reject) {
            var videoElement = document.createElement('video');
            var timeout = 0;
            videoElement.preload = 'metadata';
            videoElement.onloadedmetadata = function () {
                if (timeout !== 0)
                    window.clearTimeout(timeout);
                window.URL.revokeObjectURL(videoElement.src);
                resolve(videoElement.duration);
            };
            videoElement.addEventListener('error', function (error) {
                if (timeout !== 0)
                    window.clearTimeout(timeout);
                window.URL.revokeObjectURL(this.src);
                reject({ message: 'Error: Video format not supported' });
            });
            videoElement.src = URL.createObjectURL(file);
            // bypass the 'onloadendmetadata' event, which sometimes does never get called in IE
            timeout = window.setTimeout(function () {
                resolve(0); // 0 so it's less windows.Opspot.max_video_length
            }, 5000);
        });
    };
    AttachmentService = __decorate([
        __param(0, core_1.Inject(session_1.Session)), __param(1, core_1.Inject(api_1.Client)), __param(2, core_1.Inject(api_1.Upload)),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, api_1.Upload])
    ], AttachmentService);
    return AttachmentService;
}());
exports.AttachmentService = AttachmentService;
//# sourceMappingURL=attachment.js.map
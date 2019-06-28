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
var list_options_1 = require("../../services/list-options");
var title_1 = require("../../services/ux/title");
var session_1 = require("../../services/session");
var upload_1 = require("../../services/api/upload");
var client_1 = require("../../services/api/client");
var Capture = /** @class */ (function () {
    function Capture(session, _upload, client, router, title) {
        this.session = session;
        this._upload = _upload;
        this.client = client;
        this.router = router;
        this.title = title;
        this.uploads = [];
        this.postMeta = {}; //TODO: make this object
        this.albums = [];
        this.offset = '';
        this.inProgress = false;
        this.dragging = false;
        this.default_maturity = 0;
        this.default_license = 'all-rights-reserved';
        this.licenses = list_options_1.LICENSES;
        this.access = list_options_1.ACCESS;
    }
    Capture.prototype.ngOnInit = function () {
        if (!this.session.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
        else {
            this.getAlbums();
        }
        this.title.setTitle('Capture');
    };
    Capture.prototype.getAlbums = function () {
        var self = this;
        this.client.get('api/v1/media/albums/list', { limit: 5, offset: this.offset })
            .then(function (response) {
            if (!response.entities)
                return;
            console.log(response);
            self.albums = response.entities;
        });
    };
    Capture.prototype.createAlbum = function (album) {
        var self = this;
        this.inProgress = true;
        this.client.post('api/v1/media/albums', { title: album.value })
            .then(function (response) {
            self.albums.unshift(response.album);
            self.postMeta.album_guid = response.album.guid;
            self.inProgress = false;
            album.value = '';
        });
    };
    Capture.prototype.selectAlbum = function (album) {
        this.postMeta.album_guid = album.guid;
    };
    Capture.prototype.deleteAlbum = function (album) {
        if (confirm('Are you sure?')) {
            var i = void 0;
            for (i in this.albums) {
                if (album.guid === this.albums[i].guid)
                    this.albums.splice(i, 1);
            }
            this.client.delete('api/v1/media/albums/' + album.guid);
        }
    };
    /**
     * Add a file to the upload queue
     */
    Capture.prototype.add = function (file) {
        var self = this;
        for (var i = 0; i < file.files.length; i++) {
            var data = {
                guid: null,
                state: 'created',
                progress: 0,
                license: this.default_license || 'all-rights-reserved',
                mature: this.default_maturity || 0
            };
            var fileInfo = file.files[i];
            if (fileInfo.type && fileInfo.type.indexOf('image') > -1) {
                data.type = 'image';
            }
            else if (fileInfo.type && fileInfo.type.indexOf('video') > -1) {
                data.type = 'video';
            }
            else if (fileInfo.type && fileInfo.type.indexOf('audio') > -1) {
                data.type = 'audio';
            }
            else {
                data.type = 'unknown';
            }
            data.name = fileInfo.name;
            data.title = data.name;
            var upload_i = this.uploads.push(data) - 1;
            this.uploads[upload_i].index = upload_i;
            this.upload(this.uploads[upload_i], fileInfo);
        }
    };
    Capture.prototype.upload = function (data, fileInfo) {
        var self = this;
        this._upload.post('api/v1/media', [fileInfo], this.uploads[data.index], function (progress) {
            self.uploads[data.index].progress = progress;
            if (progress === 100) {
                self.uploads[data.index].state = 'uploaded';
            }
        })
            .then(function (response) {
            self.uploads[data.index].guid = response.guid;
            self.uploads[data.index].state = 'complete';
            self.uploads[data.index].progress = 100;
        })
            .catch(function (e) {
            self.uploads[data.index].state = 'failed';
            console.error(e);
        });
    };
    Capture.prototype.modify = function (index) {
        var _this = this;
        this.uploads[index].state = 'uploaded';
        //we don't always have a guid ready, so keep checking for one
        var promise = new Promise(function (resolve, reject) {
            if (_this.uploads[index].guid) {
                setTimeout(function () { resolve(); }, 300);
                return;
            }
            var interval = setInterval(function () {
                if (_this.uploads[index].guid) {
                    resolve();
                    clearInterval(interval);
                }
            }, 1000);
        });
        promise.then(function () {
            _this.client.post('api/v1/media/' + _this.uploads[index].guid, _this.uploads[index])
                .then(function (response) {
                console.log('response from modify', response);
                _this.uploads[index].state = 'complete';
            });
        });
    };
    /**
     * Publish our uploads to an album
     */
    Capture.prototype.publish = function () {
        var _this = this;
        if (!this.postMeta.album_guid)
            return alert('You must select an album first');
        var self = this;
        var guids = this.uploads.map(function (upload) {
            if (upload.guid !== null || upload.guid !== 'null' || !upload.guid)
                return upload.guid;
        });
        this.client.post('api/v1/media/albums/' + this.postMeta.album_guid, { guids: guids })
            .then(function (response) {
            self.router.navigate(['/media', _this.postMeta.album_guid]);
        })
            .catch(function (e) {
            alert('there was a problem.');
        });
    };
    /**
     * Make sure the browser doesn't freak
     */
    Capture.prototype.dragover = function (e) {
        e.preventDefault();
        this.dragging = true;
    };
    /**
     * Tell the app we have stopped dragging
     */
    Capture.prototype.dragleave = function (e) {
        e.preventDefault();
        console.log(e);
        if (e.layerX < 0)
            this.dragging = false;
    };
    Capture.prototype.drop = function (e) {
        e.preventDefault();
        this.dragging = false;
        this.add(e.dataTransfer);
    };
    Capture = __decorate([
        core_1.Component({
            selector: 'opspot-capture',
            host: {
                '(dragover)': 'dragover($event)',
                '(dragleave)': 'dragleave($event)',
                '(drop)': 'drop($event)'
            },
            templateUrl: 'capture.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, upload_1.Upload, client_1.Client, router_1.Router, title_1.OpspotTitle])
    ], Capture);
    return Capture;
}());
exports.Capture = Capture;
//# sourceMappingURL=capture.js.map
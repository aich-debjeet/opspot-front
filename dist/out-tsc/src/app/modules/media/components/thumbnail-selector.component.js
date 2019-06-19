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
var ThumbnailEvent = /** @class */ (function () {
    function ThumbnailEvent(source, seconds) {
        this.source = source;
        this.seconds = seconds;
    }
    return ThumbnailEvent;
}());
exports.ThumbnailEvent = ThumbnailEvent;
var ThumbnailSelectorComponent = /** @class */ (function () {
    function ThumbnailSelectorComponent(_element) {
        this._element = _element;
        this.src = [];
        this.thumbnailSec = 0;
        this.thumbnail = new core_1.EventEmitter();
        this.inProgress = false;
        this.thumbnailSrc = '';
        this.originalThumbnailSrc = '';
        this.thumbnailFromFile = false;
        this.thumbnailNotChanged = true;
        this.selectedThumbnail = -1;
        this.thumbnails = [];
    }
    Object.defineProperty(ThumbnailSelectorComponent.prototype, "entity", {
        set: function (value) {
            this._entity = value;
            this.src = this._entity.src['360.mp4'];
            if (this.element)
                this.element.src = this.src;
        },
        enumerable: true,
        configurable: true
    });
    ThumbnailSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.element = this._element.nativeElement.getElementsByTagName('video')[0];
        if (this.src)
            this.element.src = this.src;
        this.originalThumbnailSrc = this.thumbnailSrc;
        this.element.addEventListener('loadedmetadata', function () {
            _this.element.currentTime = 0;
            _this.inProgress = false;
            _this.thumbnails = _this.getThumbnails();
        });
    };
    ThumbnailSelectorComponent.prototype.getThumbnails = function () {
        //old system took thumbs every 10 seconds, new system takes 3 throughout
        var length = this._entity.time_created < 1523620800 ? Math.round(this.element.duration / 10) : Math.round(Math.floor(this.element.duration));
        var secs = [
            1,
            Math.round(length / 2),
            length - 1,
        ];
        return this.getThumbnailUrls(secs);
    };
    ThumbnailSelectorComponent.prototype.getThumbnailUrls = function (nums) {
        var thumbs = [];
        for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
            var num = nums_1[_i];
            var number = ("00000" + num).slice(-5); //adds padding to the number: 10 would become 00010
            thumbs.push("" + window.Opspot.cinemr_url + this._entity.cinemr_guid + "/thumbnail-" + number + ".png");
        }
        return thumbs;
    };
    ThumbnailSelectorComponent.prototype.selectThumbnail = function (index) {
        var img = document.querySelector(".m-thumbnail-selector--thumbnails-list > img:nth-child(" + (index + 1) + ")");
        this.selectedThumbnail = index;
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.width = 1280;
            this.canvas.height = 720;
        }
        this.canvas.getContext('2d').drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.thumbnail.next(new ThumbnailEvent(this.canvas.toDataURL("image/jpeg"), this.thumbnailSec));
    };
    ThumbnailSelectorComponent.prototype.uploadThumbnail = function (event) {
        this.thumbnailInput.nativeElement.click();
    };
    ThumbnailSelectorComponent.prototype.addNewThumbnail = function (event) {
        var _this = this;
        this.inProgress = true;
        var element = event.target ? event.target : event.srcElement;
        this.thumbnailFile = element ? element.files[0] : null;
        // read file
        var reader = new FileReader();
        reader.onloadend = function () {
            // create a canvas
            _this.canvas = document.createElement('canvas');
            _this.canvas.width = 1280;
            _this.canvas.height = 720;
            var img = document.createElement('img');
            var index = _this.thumbnailFromFile ? _this.thumbnails.length - 1 : _this.thumbnails.length;
            _this.thumbnails[index] = typeof reader.result === 'string' ? reader.result : reader.result.toString();
            _this.selectedThumbnail = index;
            img.src = typeof reader.result === 'string' ? reader.result : reader.result.toString();
            img.onload = function () {
                _this.thumbnailSec = 0.1;
                _this.canvas.getContext('2d').drawImage(img, 0, 0, _this.canvas.width, _this.canvas.height);
                _this.thumbnailSrc = _this.canvas.toDataURL("image/jpeg");
                _this.thumbnailFromFile = true;
                _this.thumbnailNotChanged = false;
                _this.thumbnail.next(new ThumbnailEvent(_this.thumbnailSrc, _this.thumbnailSec));
                _this.inProgress = false;
            };
        };
        reader.readAsDataURL(this.thumbnailFile);
        element.value = "";
    };
    __decorate([
        core_1.ViewChild('thumbnailInput'),
        __metadata("design:type", core_1.ElementRef)
    ], ThumbnailSelectorComponent.prototype, "thumbnailInput", void 0);
    ThumbnailSelectorComponent = __decorate([
        core_1.Component({
            selector: 'opspot-media-thumbnail-selector',
            inputs: ['entity', 'thumbnailSrc', 'thumbnailFromFile'],
            outputs: ['thumbnail'],
            templateUrl: 'thumbnail-selector.component.html'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], ThumbnailSelectorComponent);
    return ThumbnailSelectorComponent;
}());
exports.ThumbnailSelectorComponent = ThumbnailSelectorComponent;
//# sourceMappingURL=thumbnail-selector.component.js.map
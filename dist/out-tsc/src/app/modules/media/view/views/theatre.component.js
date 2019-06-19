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
var rxjs_1 = require("rxjs");
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var recommended_service_1 = require("../../components/video/recommended.service");
var MediaTheatreComponent = /** @class */ (function () {
    function MediaTheatreComponent(session, client, router, recommended) {
        this.session = session;
        this.client = client;
        this.router = router;
        this.recommended = recommended;
        this.object = {};
        this.nextVideo = {};
        this.counterSeconds = 0;
        this.counterLimit = 10;
        this.opspot = window.Opspot;
    }
    Object.defineProperty(MediaTheatreComponent.prototype, "_object", {
        set: function (value) {
            if (!value.guid)
                return;
            this.object = value;
        },
        enumerable: true,
        configurable: true
    });
    MediaTheatreComponent.prototype.getThumbnail = function () {
        var url = this.object.paywalled || (this.object.wire_threshold && this.object.wire_threshold !== '0') ? this.opspot.site_url : this.opspot.cdn_url;
        return url + ("fs/v1/thumbnail/" + this.object.guid + "/xlarge");
    };
    MediaTheatreComponent.prototype.prev = function () {
        var pos = this.object['album_children_guids'].indexOf(this.object.guid) - 1;
        //go from the top if less than 0
        if (pos <= 0)
            pos = this.object['album_children_guids'].length - 1;
        this.router.navigate(['/media', this.object['album_children_guids'][pos]]);
    };
    MediaTheatreComponent.prototype.next = function () {
        var pos = this.object['album_children_guids'].indexOf(this.object.guid);
        //bump up if less than 0
        if (pos <= 0)
            pos = 1;
        //bump one up if we are in the same position as ourself
        if (this.object['album_children_guids'][pos] === this.object.guid)
            pos++;
        //reset back to 0 if we are are the end
        if (pos >= this.object['album_children_guids'].length)
            pos = 0;
        this.router.navigate(['/media', this.object['album_children_guids'][pos]]);
    };
    MediaTheatreComponent.prototype.isAlbum = function () {
        return this.object.container_guid !== this.object.owner_guid
            && this.object.album_children_guids
            && this.object.album_children_guids.length > 1;
    };
    MediaTheatreComponent.prototype.loadNext = function () {
        this.nextVideo = this.recommended.getFirstRecommended();
        var observableTimer = rxjs_1.timer(2000, 1000);
        //this.timerSubscribe = observableTimer.subscribe(t => this.tickerFunc(t));
    };
    MediaTheatreComponent.prototype.tickerFunc = function (t) {
        this.ticks = parseInt(t);
        if (this.counterSeconds >= this.counterLimit) {
            this.cancelCountdown();
            this.router.navigate(['/media', this.nextVideo.guid]);
        }
        else {
            this.counterSeconds = this.counterSeconds + 1;
        }
    };
    MediaTheatreComponent.prototype.cancelCountdown = function () {
        this.counterSeconds = 0;
        this.timerSubscribe.unsubscribe();
    };
    MediaTheatreComponent.prototype.ngOnDestroy = function () {
        if (this.timerSubscribe) {
            this.timerSubscribe.unsubscribe();
        }
    };
    MediaTheatreComponent = __decorate([
        core_1.Component({
            selector: 'm-media--theatre',
            inputs: ['_object: object'],
            template: "\n    <i class=\"material-icons left\"\n      (click)=\"prev()\"\n      [hidden]=\"!isAlbum()\">\n        keyboard_arrow_left\n    </i>\n    <div class=\"m-media-stage\" *ngIf=\"object.subtype == 'image'\"\n      [class.m-media-stage--has-nav]=\"isAlbum()\"\n    >\n      <img [src]=\"getThumbnail()\"/>\n    </div>\n    <div class=\"m-media-stage\" *ngIf=\"object.subtype == 'video'\"\n      [class.m-media-stage--has-nav]=\"isAlbum()\"\n    >\n      <div *ngIf=\"counterSeconds > 0\" class=\"m-media-theatre--next-countdown\">\n        <span>\n          <ng-container i18n=\"@@MEDIA__THEATRE__COUNTDOWN_NEXT_IN\">\n            Loading the next video in <strong>{{counterLimit - counterSeconds}}</strong> seconds.\n          </ng-container>\n          <a (click)=\"cancelCountdown()\"><strong i18n=\"@@M__ACTION__CANCEL\">Cancel</strong></a>.\n        </span>\n      </div>\n      <m-video\n      [poster]=\"object.thumbnail_src\"\n\t    [autoplay]=\"!object.monetized\"\n      [muted]=\"false\"\n      (finished)=\"loadNext()\"\n\t    [src]=\"[{ res: '720', uri: object.src['720.mp4'] }, { res: '360', uri: object.src['360.mp4'] }]\"\n        [torrent]=\"[{ res: '720', key: object.guid + '/720.mp4' }, { res: '360', key: object.guid + '/360.mp4' }]\"\n        [log]=\"object.guid\"\n        [playCount]=\"false\"\n        #player>\n        <video-ads [player]=\"player\" *ngIf=\"object.monetized\"></video-ads>\n      \n      </m-video>\n\n    </div>\n    <i class=\"material-icons right\"\n      (click)=\"next()\"\n      [hidden]=\"!isAlbum()\">\n        keyboard_arrow_right\n    </i>\n    <ng-content></ng-content>\n  "
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            router_1.Router,
            recommended_service_1.RecommendedService])
    ], MediaTheatreComponent);
    return MediaTheatreComponent;
}());
exports.MediaTheatreComponent = MediaTheatreComponent;
//# sourceMappingURL=theatre.component.js.map
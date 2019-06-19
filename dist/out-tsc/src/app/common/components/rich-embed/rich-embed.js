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
var platform_browser_1 = require("@angular/platform-browser");
var rich_embed_1 = require("../../../services/rich-embed");
var media_proxy_url_1 = require("../../../helpers/media-proxy-url");
var OpspotRichEmbed = /** @class */ (function () {
    function OpspotRichEmbed(sanitizer, service, cd) {
        this.sanitizer = sanitizer;
        this.service = service;
        this.cd = cd;
        this.type = '';
        this.src = {};
        this.preview = {};
        this.maxheight = 320;
        this.inlineEmbed = null;
        this.embeddedInline = false;
        this.cropImage = false;
    }
    Object.defineProperty(OpspotRichEmbed.prototype, "_src", {
        set: function (value) {
            if (!value) {
                return;
            }
            this.src = Object.assign({}, value);
            this.type = 'src';
            if (this.src.thumbnail_src) {
                this.src.thumbnail_src = media_proxy_url_1.default(this.src.thumbnail_src);
            }
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpspotRichEmbed.prototype, "_preview", {
        set: function (value) {
            if (!value) {
                return;
            }
            this.preview = Object.assign({}, value);
            this.type = 'preview';
            if (this.preview.thumbnail) {
                this.preview.thumbnail = media_proxy_url_1.default(this.preview.thumbnail);
            }
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    OpspotRichEmbed.prototype.init = function () {
        // Inline Embedding
        var inlineEmbed = this.parseInlineEmbed(this.inlineEmbed);
        if (inlineEmbed && inlineEmbed.id && this.inlineEmbed && this.inlineEmbed.id) {
            // Do not replace if ID codes are the same
            // This is needed because angular sometimes replaces the innerHTML
            // of the embedded player and restarts the videos
            if (inlineEmbed.id === this.inlineEmbed.id) {
                return;
            }
        }
        this.inlineEmbed = inlineEmbed;
    };
    OpspotRichEmbed.prototype.action = function ($event) {
        var _this = this;
        if (this.inlineEmbed && !this.embeddedInline) {
            $event.preventDefault();
            $event.stopPropagation();
            this.embeddedInline = true;
            if (this.inlineEmbed.htmlProvisioner) {
                this.inlineEmbed.htmlProvisioner()
                    .then(function (html) {
                    _this.inlineEmbed.html = html;
                    _this.detectChanges();
                });
                // @todo: catch any error here and forcefully window.open to destination
            }
        }
    };
    OpspotRichEmbed.prototype.parseInlineEmbed = function (current) {
        var _this = this;
        if (!this.src || !this.src.perma_url) {
            return null;
        }
        var url = this.src.perma_url, origin = window.location.host, matches;
        if (url === this.lastInlineEmbedParsed) {
            return current;
        }
        this.lastInlineEmbedParsed = url;
        // YouTube
        var youtube = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/i;
        if ((matches = youtube.exec(url)) !== null) {
            if (matches[1]) {
                return {
                    id: "video-youtube-" + matches[1],
                    className: 'm-rich-embed-video m-rich-embed-video-iframe m-rich-embed-video-youtube',
                    html: this.sanitizer.bypassSecurityTrustHtml("<iframe\n          src=\"https://www.youtube.com/embed/" + matches[1] + "?controls=2&modestbranding=1&origin=" + origin + "&rel=0\"\n          frameborder=\"0\"\n          allowfullscreen></iframe>"),
                    playable: true
                };
            }
        }
        // Vimeo
        var vimeo = /^(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/i;
        if ((matches = vimeo.exec(url)) !== null) {
            if (matches[1]) {
                return {
                    id: "video-vimeo-" + matches[1],
                    className: 'm-rich-embed-video m-rich-embed-video-iframe m-rich-embed-video-vimeo',
                    html: this.sanitizer.bypassSecurityTrustHtml("<iframe\n          src=\"https://player.vimeo.com/video/" + matches[1] + "?autoplay=1&title=0&byline=0&portrait=0\"\n          frameborder=\"0\"\n          webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"),
                    playable: true
                };
            }
        }
        // SoundCloud
        var soundcloud = /^(?:https?:\/\/)?(?:www\.)?soundcloud\.com\/([a-z0-9\-\/]+)/i;
        if ((matches = soundcloud.exec(url)) !== null) {
            if (matches[1]) {
                return {
                    id: "audio-soundcloud-" + matches[1],
                    className: 'm-rich-embed-audio m-rich-embed-audio-iframe m-rich-embed-audio-soundcloud',
                    htmlProvisioner: function () {
                        return _this.service.soundcloud(url, _this.maxheight)
                            .then(function (response) {
                            if (!response.id) {
                                return 'Error on soundcloud embed';
                            }
                            return _this.sanitizer.bypassSecurityTrustHtml("<iframe\n                width=\"100%\" height=\"400\" scrolling=\"no\" frameborder=\"no\"\n                src=\"https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F" + response.id + "&show_artwork=true&auto_play=true&show_comments=true\">\n                </iframe>");
                        });
                    },
                    playable: true
                };
            }
        }
        // Spotify
        var spotify = /^(?:https?:\/\/)?open\.spotify\.com\/track\/([a-z0-9]+)/i;
        if ((matches = spotify.exec(url)) !== null) {
            if (matches[1]) {
                return {
                    id: "audio-spotify-" + matches[1],
                    className: 'm-rich-embed-audio m-rich-embed-audio-iframe m-rich-embed-audio-spotify',
                    html: this.sanitizer.bypassSecurityTrustHtml("<iframe\n          style=\"height: " + this.maxheight + "px;\"\n          src=\"https://embed.spotify.com/?uri=spotify:track:" + matches[1] + "\"\n          frameborder=\"0\" allowtransparency=\"true\"></iframe>"),
                    playable: true
                };
            }
        }
        // Giphy
        var giphy = /^(?:https?:\/\/)?(?:www\.)?giphy\.com\/gifs\/([a-z0-9\-]+)/i;
        if ((matches = giphy.exec(url)) !== null) {
            if (matches[1]) {
                var idTokens = matches[1].split('-'), id = idTokens.pop();
                if (!id) {
                    return null;
                }
                return {
                    id: "image-giphy-" + matches[1],
                    className: 'm-rich-embed-image m-rich-embed-image-iframe m-rich-embed-image-giphy',
                    html: this.sanitizer.bypassSecurityTrustHtml("<iframe src=\"//giphy.com/embed/" + id + "\"\n          frameBorder=\"0\" class=\"giphy-embed\" allowFullScreen></iframe>"),
                    playable: true
                };
            }
        }
        // No match
        return null;
    };
    OpspotRichEmbed.prototype.hasInlineContentLoaded = function () {
        return this.embeddedInline && this.inlineEmbed && this.inlineEmbed.html;
    };
    OpspotRichEmbed.prototype.detectChanges = function () {
        this.cd.markForCheck();
        this.cd.detectChanges();
    };
    OpspotRichEmbed = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-rich-embed',
            inputs: ['_src: src', '_preview: preview', 'maxheight', 'cropImage'],
            templateUrl: 'rich-embed.html'
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer, rich_embed_1.RichEmbedService, core_1.ChangeDetectorRef])
    ], OpspotRichEmbed);
    return OpspotRichEmbed;
}());
exports.OpspotRichEmbed = OpspotRichEmbed;
//# sourceMappingURL=rich-embed.js.map
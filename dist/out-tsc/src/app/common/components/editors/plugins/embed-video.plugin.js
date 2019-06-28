"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var EmbedVideo = /** @class */ (function () {
    function EmbedVideo(options) {
        this.updated = false;
        this.urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        this.options = __assign({}, options);
        this.button = document.createElement('button');
        this.button.className = 'medium-editor-action';
        this.button.innerHTML = options.buttonText || "</>";
        this.button.onclick = this.handleClick.bind(this);
    }
    EmbedVideo.prototype.init = function () {
        var _this = this;
        this.$element = document.querySelector('.medium-editor-element');
        this.base.subscribe('editableInput', function () {
            if (_this.updated) {
                return;
            }
            _this.updated = true;
            var $embeds = _this.$element.querySelectorAll('.medium-insert-embeds');
            for (var i = 0; i < $embeds.length; ++i) {
                var item = $embeds[i];
                item.setAttribute('contenteditable', false);
                if (!item.querySelector('.medium-insert-embeds-overlay')) {
                    var div = document.createElement('div');
                    div.classList.add('medium-insert-embeds-overlay');
                    item.appendChild(div);
                }
            }
        });
        this.events();
    };
    EmbedVideo.prototype.getButton = function () {
        return this.button;
    };
    EmbedVideo.prototype.createP = function () {
        var p = document.createElement('p');
        p.innerHTML = '<br>';
        return p;
    };
    EmbedVideo.prototype.insertHTML = function (html) {
        var sel = window.getSelection(), range;
        var div = this.getHTML(html);
        var lastP = this.createP();
        if (window.getSelection()) {
            range = sel.getRangeAt(0);
        }
        if (this.$place) {
            var p = document.createElement('p');
            p.appendChild(div);
            this.$place.parentNode.replaceChild(p, this.$place);
            p.parentNode.insertBefore(this.createP(), p);
            if (p.nextElementSibling) {
                p.parentNode.insertBefore(this.createP(), p.nextElementSibling);
            }
            else {
                p.parentNode.appendChild(lastP);
            }
            return;
        }
        if (sel.rangeCount) {
            range.deleteContents();
            range.collapse(true);
            range.insertNode(this.createP());
            range.insertNode(div);
        }
        // Move the caret immediately after the inserted div
        range.insertNode(this.createP());
        range.setStartAfter(lastP);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    };
    EmbedVideo.prototype.getHTML = function (html) {
        var div = document.createElement('div');
        div.classList.add('medium-insert-embeds');
        div.setAttribute('contenteditable', 'false');
        div.innerHTML = "\n        <figure>\n          <div class=\"medium-insert-embed\">\n            " + html + "\n          </div>\n        </figure>\n        <div class=\"medium-insert-embeds-overlay\"></div>";
        return div;
    };
    EmbedVideo.prototype.handleClick = function (event) {
        var src = this.window.getSelection().toString().trim();
        if (this.urlRegex.exec(src)) {
            this.processLink(src);
            this.base.checkContentChanged();
        }
    };
    EmbedVideo.prototype.events = function () {
        var _this = this;
        this.base.subscribe('action-videos', function (data, editable) {
            var $place = _this.$element.querySelector('.medium-insert-active');
            if (_this.urlRegex.exec(data.link)) {
                _this.$place = $place;
                _this.processLink(data.link);
                _this.base.checkContentChanged();
            }
        });
    };
    ;
    EmbedVideo.prototype.prepare = function () {
        var elements = this.$element.querySelectorAll('.medium-insert-embeds-overlay');
        for (var i = 0; i < elements.length; ++i) {
            var item = elements[i];
            item.remove();
        }
        elements = this.$element.querySelectorAll('.medium-insert-embeds');
        for (var i = 0; i < elements.length; ++i) {
            var item = elements[i];
            item.setAttribute('contenteditable', 'false');
        }
    };
    EmbedVideo.prototype.processLink = function (src) {
        var url = src.trim();
        if (url === '') {
            return;
        }
        this.parseUrl(url);
    };
    EmbedVideo.prototype.parseUrl = function (url, pasted) {
        if (pasted === void 0) { pasted = null; }
        return __awaiter(this, void 0, void 0, function () {
            var html, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = url.replace(/\n?/g, '');
                        html = url.replace(/^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9\-_]+)(.*)?$/, '<div class="video video-youtube"><iframe width="892" height="520" src="//www.youtube.com/embed/$7" frameborder="0" allowfullscreen></iframe></div>')
                            .replace(/^https?:\/\/vimeo\.com(\/.+)?\/([0-9]+)$/, '<div class="video video-vimeo"><iframe src="//player.vimeo.com/video/$2" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>')
                            .replace(/^https?:\/\/instagram\.com\/p\/(.+)\/?$/, '<span class="instagram"><iframe src="//instagram.com/p/$1/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe></span>')
                            .replace(/^https?:\/\/www\.opspot\.com\/media\/([0-9]+)\/?$/, "<span class=\"opspot\"><iframe src=\"https://www.ops.doesntexist.com/api/v1/embed/$1\" width=\"720\" height=\"320\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></video></iframe></span>")
                            .replace(/^https?:\/\/www\.opspot\.com\/api\/v1\/embed\/([0-9]+)\/?$/, "<span class=\"opspot\"><iframe src=\"https://www.ops.doesntexist.com/api/v1/embed/$1\" width=\"720\" height=\"320\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></video></iframe></span>");
                        if (!url.match(/^(https?:\/\/)?(www\.)?(m\.)?soundcloud\.com\/[\w\-\.]+(\/)+[\w\-\.]+\/?$/g)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getSoundcloudEmbed(url)];
                    case 2:
                        html = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        html = url;
                        return [3 /*break*/, 4];
                    case 4:
                        if (html === url) {
                            return [2 /*return*/, false];
                        }
                        if (this.options.storeMeta) {
                            html += '<div class="medium-insert-embeds-meta"><script type="text/json">' + JSON.stringify({}) + '</script></div>';
                        }
                        if (pasted) {
                            this.embed(html, url);
                        }
                        else {
                            this.embed(html);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EmbedVideo.prototype.embed = function (html, pastedUrl) {
        if (pastedUrl === void 0) { pastedUrl = null; }
        var $div;
        if (!html) {
            alert('Incorrect URL format specified');
            return false;
        }
        if (html.indexOf('</script>') > -1) {
            $div = document.createElement('div')
                .setAttribute('data-embed-code', document.createElement('div').innerText = html.innerHTML);
            $div.innerHTML = html;
            html = document.createElement('div').appendChild($div).innerHTML;
        }
        this.insertHTML(html);
    };
    EmbedVideo.prototype.getSoundcloudEmbed = function (url) {
        return new Promise(function (resolve, reject) {
            JSONP.send("http://soundcloud.com/oembed?format=js&url=" + url + "&callback=getSoundcloudEmbed", {
                callbackName: 'getSoundcloudEmbed',
                onSuccess: function (json) {
                    resolve(json.html);
                },
                onTimeout: function () {
                    reject();
                },
                timeout: 10
            });
        });
    };
    return EmbedVideo;
}());
exports.EmbedVideo = EmbedVideo;
var JSONP = /** @class */ (function () {
    function JSONP() {
    }
    JSONP.send = function (src, options) {
        var callback_name = options.callbackName || 'callback', on_success = options.onSuccess || function () {
        }, on_timeout = options.onTimeout || function () {
        }, timeout = options.timeout || 10; // sec
        var timeout_trigger = window.setTimeout(function () {
            window[callback_name] = function () {
            };
            on_timeout();
            document.getElementsByTagName('head')[0].removeChild(script);
        }, timeout * 1000);
        window[callback_name] = function (data) {
            window.clearTimeout(timeout_trigger);
            on_success(data);
            document.getElementsByTagName('head')[0].removeChild(script);
        };
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = src;
        document.getElementsByTagName('head')[0].appendChild(script);
    };
    return JSONP;
}());
//# sourceMappingURL=embed-video.plugin.js.map
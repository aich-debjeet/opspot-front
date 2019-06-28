"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TagsPipe = /** @class */ (function () {
    function TagsPipe() {
        this.results = [];
        /**
         * Tags
         */
        this.tags = {
            url: {
                rule: /(\b(https?|ftp|file):\/\/[^\s\]]+)/gim,
                replace: function (m) {
                    return "<a href=\"" + m.match[1] + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + m.match[1] + "</a>";
                }
            },
            mail: {
                rule: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gim,
                replace: function (m) {
                    return "<a href=\"mailto:" + m.match[0] + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + m.match[0] + "</a>";
                }
            },
            hash: {
                rule: /(^|\s||)#(\w+)/gim,
                replace: function (m) {
                    return m.match[1] + "<a href=\"/newsfeed/tag/" + m.match[2] + ";ref=hashtag\">#" + m.match[2] + "</a>";
                }
            },
            at: {
                rule: /(^|\s|\W)@(\w*[a-zA-Z_-]+\w*)/gim,
                replace: function (m) {
                    return m.match[1] + "<a class=\"tag\" href=\"/" + m.match[2] + "\" target=\"_blank\">@" + m.match[2] + "</a>";
                }
            }
        };
    }
    /**
     * Push a match to results array
     * @param match
     */
    TagsPipe.prototype.push = function (match) {
        // ignore match inside others
        if (this.results.findIndex(function (m) { return match.start >= m.start && match.end <= m.end; }) !== -1) {
            return;
        }
        this.results.push(match);
    };
    /**
     * Parse tags
     * @param tag
     * @param value
     */
    TagsPipe.prototype.parse = function (tag, value) {
        var match;
        while ((match = this.tags[tag].rule.exec(value)) !== null) {
            this.push({
                type: tag,
                start: match.index,
                end: match.index + match[0].length,
                match: match
            });
        }
    };
    /**
     * Replace tags
     * @param str
     */
    TagsPipe.prototype.replace = function (str) {
        var _this = this;
        this.results.forEach(function (m) {
            str = str.replace(m.match[0], _this.tags[m.type].replace(m, str));
        });
        return str;
    };
    TagsPipe.prototype.transform = function (value) {
        this.results = [];
        // Order is important. Url and Mail first, then smaller matches (hash and at).
        this.parse('url', value);
        this.parse('mail', value);
        this.parse('hash', value);
        this.parse('at', value);
        if (this.results.length === 0) {
            return value;
        }
        /* Sort by the start points and then build the string by pushing the individual string segments onto an array,
         then joining it at the end to avoid a chain of string concatenations. (O=n^2) */
        this.results.sort(function (a, b) { return a.start - b.start; });
        var html = [];
        var copyStartIndex = 0;
        for (var i = 0; i < this.results.length; i++) {
            var tag = this.results[i];
            html.push(value.substring(copyStartIndex, tag.start));
            html.push(this.tags[tag.type].replace(tag));
            copyStartIndex = tag.end;
            if (i == this.results.length - 1) {
                html.push(value.substring(copyStartIndex));
            }
        }
        return html.join('');
    };
    TagsPipe = __decorate([
        core_1.Pipe({
            name: 'tags'
        })
        /**
         * Tags pipe
         */
    ], TagsPipe);
    return TagsPipe;
}());
exports.TagsPipe = TagsPipe;
//# sourceMappingURL=tags.js.map
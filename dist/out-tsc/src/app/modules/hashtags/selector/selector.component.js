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
var HashtagsSelectorComponent = /** @class */ (function () {
    function HashtagsSelectorComponent() {
        this.alignLeft = false;
        this.tags = [];
        this.tagsValues = [];
        this.tagsChange = new core_1.EventEmitter();
        this.tagsAdded = new core_1.EventEmitter();
        this.tagsRemoved = new core_1.EventEmitter();
    }
    HashtagsSelectorComponent.prototype.parseTags = function (message) {
        var regex = /(^|\s||)#(\w+)/gim;
        var tags = [];
        var match;
        while ((match = regex.exec(message)) !== null) {
            tags.push({
                value: match[2],
                index: match.index,
                length: match.length,
                checked: true,
            });
        }
        this.tags = tags;
        this.extractValues();
    };
    Object.defineProperty(HashtagsSelectorComponent.prototype, "enabled", {
        get: function () {
            return this.tags.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HashtagsSelectorComponent.prototype, "_tags", {
        // Set the tags from the upstream
        set: function (tags) {
            var different = false;
            if (tags.length !== this.tags.length) {
                different = true;
            }
            else {
                for (var i = 0; i < tags.length; ++i) {
                    if (this.tags[i].value !== tags[i]) {
                        different = true;
                        break;
                    }
                }
            }
            if (!different)
                return;
            this.tags = tags.map(function (tag) {
                return { value: tag, selected: true };
            });
            this.tagsValues = this.tags.slice(0);
        },
        enumerable: true,
        configurable: true
    });
    HashtagsSelectorComponent.prototype.setTags = function (tags) {
        var _this = this;
        var removed = [];
        var added = [];
        // get removed elements
        var difference = this.tags.filter(function (item) { return tags.findIndex(function (i) { return i.value === item.value; }) === -1; });
        for (var _i = 0, difference_1 = difference; _i < difference_1.length; _i++) {
            var tag = difference_1[_i];
            removed.push(tag);
            this.tags.splice(this.tags.indexOf(tag), 1);
        }
        if (removed.length > 0) {
            removed.sort(function (a, b) { return a.index - b.index; });
            this.tagsRemoved.emit(removed);
        }
        // get added elements
        var difference2 = tags.filter(function (item) { return _this.tags.findIndex(function (i) { return i.value === item.value; }) === -1; });
        for (var _a = 0, difference2_1 = difference2; _a < difference2_1.length; _a++) {
            var tag = difference2_1[_a];
            this.tags.push(tag);
            added.push(tag);
        }
        if (added.length > 0) {
            this.tagsAdded.emit(added);
        }
        this.extractValues();
        this.tagsChange.emit(this.tags.map(function (item) { return item.value; }));
    };
    HashtagsSelectorComponent.prototype.extractValues = function () {
        this.tagsValues = this.tags.slice(0);
        // this.tagsValues = this.tags.map((item) => item.value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], HashtagsSelectorComponent.prototype, "alignLeft", void 0);
    __decorate([
        core_1.Output('tagsChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], HashtagsSelectorComponent.prototype, "tagsChange", void 0);
    __decorate([
        core_1.Output('tagsAdded'),
        __metadata("design:type", core_1.EventEmitter)
    ], HashtagsSelectorComponent.prototype, "tagsAdded", void 0);
    __decorate([
        core_1.Output('tagsRemoved'),
        __metadata("design:type", core_1.EventEmitter)
    ], HashtagsSelectorComponent.prototype, "tagsRemoved", void 0);
    __decorate([
        core_1.Input('tags'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HashtagsSelectorComponent.prototype, "_tags", null);
    HashtagsSelectorComponent = __decorate([
        core_1.Component({
            selector: 'm-hashtags-selector',
            templateUrl: 'selector.component.html',
        })
    ], HashtagsSelectorComponent);
    return HashtagsSelectorComponent;
}());
exports.HashtagsSelectorComponent = HashtagsSelectorComponent;
//# sourceMappingURL=selector.component.js.map
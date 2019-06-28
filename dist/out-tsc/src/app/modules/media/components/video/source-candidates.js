"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOURCE_CANDIDATE_PICK_LINEAR = 1;
exports.SOURCE_CANDIDATE_PICK_ZIGZAG = 2;
var SourceCandidates = /** @class */ (function () {
    function SourceCandidates() {
        this.candidates = {};
        this.blacklist = [];
    }
    SourceCandidates.prototype.setSource = function (type, values) {
        this.candidates[type] = values;
    };
    SourceCandidates.prototype.markAsClean = function () {
        this.blacklist = [];
        this.lastBlacklistedType = void 0;
    };
    SourceCandidates.prototype.setAsBlacklisted = function (type, value) {
        this.blacklist.push({ type: type, value: value });
        this.lastBlacklistedType = type;
        // console.log('[sourcecandidates] blacklisted', { type, value }, JSON.stringify(this), this);
    };
    SourceCandidates.prototype.isBlacklisted = function (type, value) {
        return this.blacklist.findIndex(function (item) { return item.type === type && item.value === value; }) > -1;
    };
    SourceCandidates.prototype.empty = function () {
        this.candidates = {};
        this.markAsClean();
    };
    SourceCandidates.prototype.pick = function (typePriorities, strategy) {
        if (strategy === void 0) { strategy = exports.SOURCE_CANDIDATE_PICK_LINEAR; }
        switch (strategy) {
            case exports.SOURCE_CANDIDATE_PICK_ZIGZAG:
                return this._pickZigZag(typePriorities);
            case exports.SOURCE_CANDIDATE_PICK_LINEAR:
            default:
                return this._pickLinear(typePriorities);
        }
    };
    SourceCandidates.prototype._pickZigZag = function (typePriorities) {
        var _this = this;
        var reorderedTypePriorities = typePriorities;
        if (this.lastBlacklistedType) {
            var index = reorderedTypePriorities.findIndex(function (type) { return type === _this.lastBlacklistedType; });
            if (index > -1) {
                reorderedTypePriorities.push.apply(reorderedTypePriorities, reorderedTypePriorities.splice(index, 1));
            }
        }
        return this._pickLinear(reorderedTypePriorities);
    };
    SourceCandidates.prototype._pickLinear = function (typePriorities) {
        var _this = this;
        var _loop_1 = function (type) {
            if (!this_1.candidates[type]) {
                return "continue";
            }
            var candidates = this_1.candidates[type].filter(function (value) { return !_this.isBlacklisted(type, value); });
            if (candidates.length > 0) {
                return { value: {
                        type: type,
                        value: candidates[0],
                    } };
            }
        };
        var this_1 = this;
        for (var _i = 0, typePriorities_1 = typePriorities; _i < typePriorities_1.length; _i++) {
            var type = typePriorities_1[_i];
            var state_1 = _loop_1(type);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return void 0;
    };
    return SourceCandidates;
}());
exports.SourceCandidates = SourceCandidates;
//# sourceMappingURL=source-candidates.js.map
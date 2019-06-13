"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeNode = /** @class */ (function () {
    function TreeNode(data, idField, labelField, childrenField, treeModel, parent) {
        if (parent === void 0) { parent = null; }
        var _this = this;
        this.children = [];
        this.original = data;
        this.id = data[idField] || '';
        this.label = data[labelField] || '';
        this.parent = parent;
        (data[childrenField] || []).forEach(function (item) {
            var node = new TreeNode(item, idField, labelField, childrenField, treeModel, _this);
            _this.children.push(node);
        });
        this.treeModel = treeModel;
    }
    Object.defineProperty(TreeNode.prototype, "isHidden", {
        get: function () {
            return this.treeModel.isHidden(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isExpanded", {
        get: function () {
            return this.treeModel.isExpanded(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isLeaf", {
        get: function () {
            return !this.children || this.children.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "level", {
        get: function () {
            return this.parent ? this.parent.level + 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.toggleExpansion = function () {
        if (this.isExpanded) {
            this.collapse();
        }
        else {
            this.expand();
        }
    };
    TreeNode.prototype.collapse = function () {
        this.treeModel.collapseNode(this);
    };
    TreeNode.prototype.expand = function () {
        this.treeModel.expandNode(this);
    };
    TreeNode.prototype.ensureVisible = function () {
        if (this.parent) {
            this.parent.expand();
            this.parent.ensureVisible();
        }
        return this;
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=tree-node.model.js.map
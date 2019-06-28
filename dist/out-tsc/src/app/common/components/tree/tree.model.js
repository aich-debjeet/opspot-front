"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tree_node_model_1 = require("./tree-node.model");
var TreeModel = /** @class */ (function () {
    function TreeModel() {
        this.nodes = [];
        this.hiddenNodes = [];
        this.expandedNodes = [];
        this.updated = new core_1.EventEmitter();
    }
    TreeModel.prototype.setData = function (data) {
        var _this = this;
        (data || []).forEach(function (item) {
            var node = new tree_node_model_1.TreeNode(item, 'id', 'label', 'children', _this);
            _this.nodes.push(node);
        });
    };
    TreeModel.prototype.isHidden = function (node) {
        return this.hiddenNodes.findIndex(function (item) {
            return item === node;
        }) !== -1;
    };
    TreeModel.prototype.isExpanded = function (node) {
        return this.expandedNodes.findIndex(function (item) {
            return item === node;
        }) !== -1;
    };
    TreeModel.prototype.toggleExpansion = function (node) {
        var index = this.expandedNodes.findIndex(function (item) {
            return item === node;
        });
        if (index !== -1) {
            this.expandedNodes.splice(index, 1);
        }
        else {
            this.expandedNodes.push(node);
        }
    };
    TreeModel.prototype.expandNode = function (node) {
        var index = this.expandedNodes.findIndex(function (item) {
            return item === node;
        });
        if (index === -1) {
            this.expandedNodes.push(node);
        }
    };
    TreeModel.prototype.collapseNode = function (node) {
        var index = this.expandedNodes.findIndex(function (item) {
            return item === node;
        });
        if (index !== -1) {
            this.expandedNodes.splice(index, 1);
        }
    };
    TreeModel.prototype.hideNode = function (node) {
        var index = this.hiddenNodes.findIndex(function (item) {
            return item === node;
        });
        if (index === -1) {
            this.hiddenNodes.push(node);
        }
    };
    TreeModel.prototype.showNode = function (node) {
        var index = this.hiddenNodes.findIndex(function (item) {
            return item === node;
        });
        if (index !== -1) {
            this.hiddenNodes.splice(index, 1);
        }
    };
    TreeModel.prototype.clearExpandedNodes = function () {
        this.expandedNodes = [];
    };
    TreeModel.prototype.clearFilter = function () {
        this.hiddenNodes = [];
    };
    TreeModel.prototype.filterNodes = function (filter) {
        var _this = this;
        if (filter === void 0) { filter = ''; }
        if (filter === '') {
            this.clearFilter();
            return;
        }
        var filterFn;
        filterFn = function (node) { return node.label.toLowerCase().indexOf(filter.toLowerCase()) !== -1; };
        this.nodes.forEach(function (node) { return _this._filterNode(node, filterFn); });
    };
    TreeModel.prototype._filterNode = function (node, filterFn) {
        var _this = this;
        // if node passes function then it's visible
        var isVisible = filterFn(node);
        if (node.children) {
            // if one of node's children passes filter then this node is also visible
            node.children.forEach(function (child) {
                if (_this._filterNode(child, filterFn)) {
                    isVisible = true;
                }
            });
        }
        if (isVisible) {
            this.showNode(node);
            node.ensureVisible();
        }
        else {
            this.hideNode(node);
        }
        return isVisible;
    };
    return TreeModel;
}());
exports.TreeModel = TreeModel;
//# sourceMappingURL=tree.model.js.map
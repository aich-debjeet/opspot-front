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
var tree_model_1 = require("./tree.model");
var tree_node_model_1 = require("./tree-node.model");
var TreeComponent = /** @class */ (function () {
    function TreeComponent() {
        this.treeModel = new tree_model_1.TreeModel();
        this.nodes = [];
        this.itemClicked = new core_1.EventEmitter();
    }
    Object.defineProperty(TreeComponent.prototype, "collection", {
        set: function (value) {
            if (value && value.length > 0 && value[0] instanceof tree_node_model_1.TreeNode) {
                this.nodes = value;
            }
            else {
                this.treeModel.setData(value);
                this.nodes = this.treeModel.nodes;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeComponent.prototype, "filter", {
        set: function (filter) {
            var _this = this;
            if (filter !== this._filter) {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                this.timeout = setTimeout(function () {
                    _this.treeModel.clearExpandedNodes();
                    _this.treeModel.filterNodes(filter);
                    _this._filter = filter;
                }, 200);
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.onItemClicked = function (item) {
        this.itemClicked.emit(item);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", tree_model_1.TreeModel)
    ], TreeComponent.prototype, "treeModel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TreeComponent.prototype, "collection", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TreeComponent.prototype, "filter", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeComponent.prototype, "itemClicked", void 0);
    TreeComponent = __decorate([
        core_1.Component({
            selector: 'm--tree',
            template: "\n    <span *ngIf=\"nodes.length === 0\"><i i18n=\"No results on a tree view@@COMMON__TREE__NO_RESULTS\">No results found</i></span>\n    <ng-container *ngFor=\"let item of nodes\">\n      <ng-container *ngIf=\"!item.isHidden\">\n        <div class=\"m-tree--items\" [style.padding-left.px]=\"item.level * 10\">\n          <span [style.visibility]=\"item.isLeaf ? 'hidden' : 'visible'\">\n            <span class=\"m-tree--items-icon\" *ngIf=\"item.isExpanded\" (click)=\"item.toggleExpansion()\">\n              -\n            </span>\n            <span class=\"m-tree--items-icon\" *ngIf=\"!item.isExpanded\" (click)=\"item.toggleExpansion()\">\n              +\n            </span>\n          </span>\n          <span class=\"m-tree--items--label\" (click)=\"onItemClicked(item)\">\n          {{item.label}}\n        </span>\n        </div>\n        <m--tree class=\"m-tree--sub-item\" *ngIf=\"!item.isLeaf && item.isExpanded && !item.isHidden\"\n          [collection]=\"item.children\" [treeModel]=\"treeModel\"\n          (itemClicked)=\"onItemClicked($event)\"></m--tree>\n      </ng-container>\n    </ng-container>\n  "
        })
    ], TreeComponent);
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=tree.component.js.map
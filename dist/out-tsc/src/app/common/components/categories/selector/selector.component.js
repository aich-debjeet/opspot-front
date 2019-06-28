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
var CategoriesSelectorComponent = /** @class */ (function () {
    function CategoriesSelectorComponent() {
        this.selected = [];
        this.categories = [];
        this.menuOpened = false;
        this.q = '';
        this.onSelected = new core_1.EventEmitter();
        this.categories = window.Opspot.categories;
    }
    CategoriesSelectorComponent.prototype.search = function (value) {
        this.q = value;
        this.openMenu();
    };
    CategoriesSelectorComponent.prototype.select = function (item) {
        var index = this.selected.findIndex(function (selected) {
            return selected === item.original;
        });
        if (index === -1) {
            this.selected.push(item.original);
        }
        this.onSelected.emit(this.selected);
        this.closeMenu();
    };
    CategoriesSelectorComponent.prototype.openMenu = function () {
        this.menuOpened = true;
        var inputRect = this.input.nativeElement.getBoundingClientRect();
        var listRect = this.list.nativeElement.getBoundingClientRect();
        this.list.nativeElement.style.minWidth = inputRect.width + 'px';
        this.list.nativeElement.style.height = Math.max(window.innerHeight - listRect.top - 100, 100) + 'px';
    };
    CategoriesSelectorComponent.prototype.closeMenu = function () {
        this.menuOpened = false;
    };
    __decorate([
        core_1.ViewChild('input', { read: core_1.ElementRef }),
        __metadata("design:type", core_1.ElementRef)
    ], CategoriesSelectorComponent.prototype, "input", void 0);
    __decorate([
        core_1.ViewChild('list', { read: core_1.ElementRef }),
        __metadata("design:type", core_1.ElementRef)
    ], CategoriesSelectorComponent.prototype, "list", void 0);
    __decorate([
        core_1.Output('selected'),
        __metadata("design:type", core_1.EventEmitter)
    ], CategoriesSelectorComponent.prototype, "onSelected", void 0);
    __decorate([
        core_1.HostListener('blur'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CategoriesSelectorComponent.prototype, "closeMenu", null);
    CategoriesSelectorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-categories--selector',
            templateUrl: 'selector.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], CategoriesSelectorComponent);
    return CategoriesSelectorComponent;
}());
exports.CategoriesSelectorComponent = CategoriesSelectorComponent;
//# sourceMappingURL=selector.component.js.map
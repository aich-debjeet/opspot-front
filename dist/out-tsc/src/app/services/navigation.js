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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var Navigation = /** @class */ (function () {
    function Navigation(location) {
        this.location = location;
    }
    Navigation._ = function (location) {
        return new Navigation(location);
    };
    Navigation.prototype.getItems = function (container) {
        if (container === void 0) { container = 'sidebar'; }
        var navigation = window.Opspot.navigation;
        var items = navigation[container];
        if (!items)
            return [];
        var path = this.location.path();
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var itemIndex = path.indexOf(item.path.toLowerCase());
            if (path === item.path || (path && itemIndex > -1 && itemIndex < 2)) {
                item.active = true;
                item.params = { ts: Date.now() };
            }
            else
                item.active = false;
            // a recursive function needs creating here
            // a bit messy and only allows 1 tier
            if (item.submenus) {
                for (var _a = 0, _b = item.submenus; _a < _b.length; _a++) {
                    var subitem = _b[_a];
                    var sub_path = subitem.path;
                    for (var p in subitem.params) {
                        if (subitem.params[p])
                            sub_path += '/' + subitem.params[p];
                    }
                    if (path && path.indexOf(sub_path.toLowerCase()) > -1) {
                        item.active = true; // activate parent aswell
                        subitem.active = true;
                        path += ';ts=' + Date.now();
                    }
                    else {
                        subitem.active = false;
                    }
                }
            }
        }
        return items;
    };
    Navigation.prototype.setCounter = function (name, count) {
        if (count === void 0) { count = 1; }
        for (var i in window.Opspot.navigation.sidebar) {
            var item = window.Opspot.navigation.sidebar[i];
            if (item.name === 'Messenger' && this.location.path().indexOf(item.path.toLowerCase()) === -1) {
                item.extras.counter = count;
            }
        }
    };
    Navigation = __decorate([
        __param(0, core_1.Inject(common_1.Location)),
        __metadata("design:paramtypes", [common_1.Location])
    ], Navigation);
    return Navigation;
}());
exports.Navigation = Navigation;
//# sourceMappingURL=navigation.js.map
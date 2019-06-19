"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sidebar = /** @class */ (function () {
    function Sidebar() {
    }
    Sidebar._ = function () {
        return new Sidebar();
    };
    Sidebar.prototype.open = function () {
        var self = this;
        var drawer = document.getElementsByTagName('opspot-sidebar')[0];
        if (drawer.classList.contains('is-visible')) {
            return this.close();
        }
        drawer.classList.add('is-visible');
        //we have a delay so we don't close after click
        setTimeout(function () {
            var listener = function (e) {
                drawer.classList.remove('is-visible');
                document.removeEventListener('click', listener);
            };
            document.addEventListener('click', listener);
        }, 300);
    };
    Sidebar.prototype.close = function () {
        var drawer = document.getElementsByTagName('opspot-sidebar')[0];
        drawer.classList.remove('is-visible');
    };
    return Sidebar;
}());
exports.Sidebar = Sidebar;
//# sourceMappingURL=sidebar.js.map
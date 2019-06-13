"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sesions
 */
var core_1 = require("@angular/core");
var Session = /** @class */ (function () {
    function Session() {
        this.loggedinEmitter = new core_1.EventEmitter();
        this.userEmitter = new core_1.EventEmitter();
    }
    Session._ = function () {
        return new Session();
    };
    /**
     * Return if loggedin, with an optional listener
     */
    Session.prototype.isLoggedIn = function (observe) {
        if (observe === void 0) { observe = null; }
        if (observe) {
            this.loggedinEmitter.subscribe({
                next: function (is) {
                    if (is)
                        observe(true);
                    else
                        observe(false);
                }
            });
        }
        if (window.Opspot.LoggedIn)
            return true;
        return false;
    };
    Session.prototype.isAdmin = function () {
        if (!this.isLoggedIn)
            return false;
        if (window.Opspot.Admin)
            return true;
        return false;
    };
    /**
     * Get the loggedin user
     */
    Session.prototype.getLoggedInUser = function (observe) {
        if (observe === void 0) { observe = null; }
        if (observe) {
            this.userEmitter.subscribe({
                next: function (user) {
                    observe(user);
                }
            });
        }
        if (window.Opspot.user)
            return window.Opspot.user;
        return false;
    };
    /**
     * Emit login event
     */
    Session.prototype.login = function (user) {
        if (user === void 0) { user = null; }
        //clear stale local storage
        window.localStorage.clear();
        this.userEmitter.next(user);
        window.Opspot.user = user;
        if (user.admin === true)
            window.Opspot.Admin = true;
        window.Opspot.LoggedIn = true;
        this.loggedinEmitter.next(true);
    };
    /**
     * Emit logout event
     */
    Session.prototype.logout = function () {
        this.userEmitter.next(null);
        delete window.Opspot.user;
        window.Opspot.LoggedIn = false;
        window.Opspot.Admin = false;
        window.localStorage.clear();
        this.loggedinEmitter.next(false);
    };
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.js.map
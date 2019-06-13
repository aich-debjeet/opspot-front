"use strict";
/**
 * Created by Nicolas on 10/10/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMock = new function () {
    var _this = this;
    this.user = {
        guid: '1000',
        admin: true,
        plus: false,
        disabled_boost: false,
        username: 'test',
        show_boosts: true,
    };
    this.loggedIn = true;
    this.isAdmin = function () {
        return _this.user.admin;
    };
    this.getLoggedInUser = function () {
        return _this.user;
    };
    this.isLoggedIn = function (fn) {
        return _this.loggedIn;
    };
    this.login = jasmine.createSpy('login');
    this.logout = jasmine.createSpy('logout');
};
//# sourceMappingURL=session-mock.spec.js.map
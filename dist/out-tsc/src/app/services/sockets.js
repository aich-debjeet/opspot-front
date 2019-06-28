"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var io = require("socket.io-client");
var SocketsService = /** @class */ (function () {
    function SocketsService(session, nz) {
        var _this = this;
        this.session = session;
        this.nz = nz;
        this.SOCKET_IO_SERVER = window.Opspot.socket_server;
        this.LIVE_ROOM_NAME = 'live';
        this.registered = false;
        this.subscriptions = {};
        this.rooms = [];
        nz.runOutsideAngular(function () {
            _this.setUp();
        });
    }
    SocketsService._ = function (session, nz) {
        return new SocketsService(session, nz);
    };
    SocketsService.prototype.setUp = function () {
        var _this = this;
        if (this.socket) {
            this.socket.destroy();
        }
        this.socket = io.connect(this.SOCKET_IO_SERVER, {
            // 'reconnect': true,
            'reconnection': true,
            'timeout': 40000,
            'autoConnect': true
        });
        this.rooms = [];
        this.registered = false;
        this.setUpDefaultListeners();
        if (this.session.isLoggedIn()) {
            this.socket.connect();
        }
        this.session.isLoggedIn(function (is) {
            if (is) {
                _this.reconnect();
            }
            else {
                _this.disconnect();
                _this.rooms = [];
                _this.registered = false;
            }
        });
        return this;
    };
    SocketsService.prototype.setUpDefaultListeners = function () {
        var _this = this;
        this.socket.on('connect', function () {
            _this.nz.run(function () {
                console.log("[ws]::connected to " + _this.SOCKET_IO_SERVER);
                _this.join(_this.LIVE_ROOM_NAME + ":" + window.Opspot.user.guid);
            });
        });
        this.socket.on('disconnect', function () {
            _this.nz.run(function () {
                console.log("[ws]::disconnected from " + _this.SOCKET_IO_SERVER);
                _this.registered = false;
            });
        });
        this.socket.on('registered', function (guid) {
            console.log('[ws]::registered');
            _this.nz.run(function () {
                _this.registered = true;
                _this.socket.emit('join', _this.rooms);
            });
        });
        this.socket.on('error', function (e) {
            _this.nz.run(function () {
                console.error('[ws]::error', e);
            });
        });
        // -- Rooms
        this.socket.on('rooms', function (rooms) {
            console.log('rooms', rooms);
            _this.nz.run(function () {
                _this.rooms = rooms;
            });
        });
        this.socket.on('joined', function (room, rooms) {
            _this.nz.run(function () {
                console.log("[ws]::joined", room, rooms);
                _this.rooms = rooms;
            });
        });
        this.socket.on('left', function (room, rooms) {
            _this.nz.run(function () {
                console.log("[ws]::left", room, rooms);
                _this.rooms = rooms;
            });
        });
    };
    SocketsService.prototype.reconnect = function () {
        console.log('[ws]::reconnect');
        this.registered = false;
        this.socket.disconnect();
        this.socket.connect();
        return this;
    };
    SocketsService.prototype.disconnect = function () {
        console.log('[ws]::disconnect');
        this.registered = false;
        this.socket.disconnect();
        return this;
    };
    SocketsService.prototype.emit = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.nz.runOutsideAngular(function () {
            _this.socket.emit.apply(_this.socket, args);
        });
        return this;
    };
    SocketsService.prototype.subscribe = function (name, callback) {
        var _this = this;
        if (!this.subscriptions[name]) {
            this.subscriptions[name] = new core_1.EventEmitter();
            this.nz.runOutsideAngular(function () {
                _this.socket.on(name, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    _this.nz.run(function () {
                        _this.subscriptions[name].next(args);
                    });
                });
            });
        }
        return this.subscriptions[name].subscribe({
            next: function (args) { callback.apply(_this, args); }
        });
    };
    SocketsService.prototype.join = function (room) {
        if (!room) {
            return this;
        }
        if (!this.registered || !this.socket.connected) {
            this.rooms.push(room);
            return this;
        }
        return this.emit('join', room);
    };
    SocketsService.prototype.leave = function (room) {
        if (!room) {
            return this;
        }
        return this.emit('leave', room);
    };
    return SocketsService;
}());
exports.SocketsService = SocketsService;
//# sourceMappingURL=sockets.js.map
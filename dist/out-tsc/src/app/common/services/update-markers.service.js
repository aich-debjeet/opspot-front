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
var client_service_1 = require("../api/client.service");
var session_1 = require("../../../app/services/session");
var rxjs_1 = require("rxjs");
var sockets_1 = require("../../services/sockets");
var operators_1 = require("rxjs/operators");
var UpdateMarkersService = /** @class */ (function () {
    function UpdateMarkersService(http, session, sockets) {
        this.http = http;
        this.session = session;
        this.sockets = sockets;
        this.isLoggedIn = false;
        this.markersSubject = new rxjs_1.BehaviorSubject([]);
        this.entityGuids$ = [];
        this.entityGuidsSockets$ = [];
        this.data = [];
        this.muted = [];
    }
    UpdateMarkersService.prototype.get = function () {
        return this.http.get('api/v2/notifications/markers', {
            type: 'group',
        })
            .pipe(operators_1.map(function (response) { return response.markers; }));
    };
    Object.defineProperty(UpdateMarkersService.prototype, "markers", {
        get: function () {
            var _this = this;
            if (!this.markers$) {
                this.markers$ = this.markersSubject.asObservable();
                this.isLoggedIn = this.session.isLoggedIn(function (is) {
                    _this.isLoggedIn = is;
                    _this.fetch();
                });
                this.emitToEntityGuids();
                this.fetch();
            }
            return this.markers$;
        },
        enumerable: true,
        configurable: true
    });
    UpdateMarkersService.prototype.fetch = function () {
        var _this = this;
        if (this.isLoggedIn) {
            this.get()
                .subscribe(function (markers) {
                _this.data = markers; //cache
                for (var i in _this.data) {
                    if (_this.data[i].disabled === true)
                        _this.muted.push(_this.data[i].entity_guid);
                }
                _this.markersSubject.next(markers);
            });
        }
        else {
            this.clear();
        }
    };
    UpdateMarkersService.prototype.listen = function () {
        this.emitToEntityGuids();
    };
    UpdateMarkersService.prototype.clear = function () {
        // clean subscriptions
        this.entityGuidsSockets$.forEach(function (sub) {
            sub.unsubscribe();
        });
        this.entityGuidsSockets$ = [];
        this.entityGuids$ = [];
        this.data = [];
    };
    UpdateMarkersService.prototype.markAsRead = function (opts) {
        if (!opts.entity_guid)
            throw "entity guid must be set";
        if (!opts.entity_type)
            throw "entity type must be set";
        if (!opts.marker)
            throw "marker must be set";
        this.http.post('api/v2/notifications/markers/read', opts)
            .subscribe(function (res) { return null; }, function (err) { return console.warn(err); });
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].entity_guid == opts.entity_guid) {
                this.data[i].read_timestamp = Date.now() / 1000;
            }
        }
        this.markersSubject.next(this.data);
    };
    UpdateMarkersService.prototype.mute = function (entity_guid) {
        if (this.muted.indexOf(entity_guid) > -1)
            return;
        this.muted.push(entity_guid);
        console.log(this.muted);
    };
    UpdateMarkersService.prototype.unmute = function (entity_guid) {
        for (var i = 0; i < this.muted.length; i++) {
            if (this.muted[i] == entity_guid)
                this.muted.splice(i, 1);
        }
    };
    UpdateMarkersService.prototype.getByEntityGuid = function (entity_guid) {
        var _this = this;
        if (!this.entityGuids$[entity_guid]) {
            this.entityGuids$[entity_guid] = new rxjs_1.BehaviorSubject({});
        }
        if (!this.entityGuidsSockets$[entity_guid]) {
            this.sockets.join("marker:" + entity_guid);
            this.entityGuidsSockets$[entity_guid] = this.sockets.subscribe("marker:" + entity_guid, function (marker) {
                marker = JSON.parse(marker);
                var entity_guid = marker.entity_guid;
                if (_this.muted.indexOf(entity_guid) > -1)
                    return; //muted, so take no action
                //this.entityGuids$[entity_guid].next(marker);
                var found = false;
                for (var i in _this.data) {
                    if (_this.data[i].entity_guid === entity_guid
                        && _this.data[i].marker === marker.marker) {
                        _this.data[i].updated_timestamp = marker.updated_timestamp;
                        found = true;
                    }
                }
                if (!found) {
                    _this.data.push(marker);
                }
                _this.markersSubject.next(_this.data);
            });
        }
        return this.entityGuids$[entity_guid];
    };
    UpdateMarkersService.prototype.emitToEntityGuids = function () {
        var _this = this;
        this.markersSubject
            .pipe(operators_1.concatAll())
            .subscribe(function (marker) {
            var subject = _this.getByEntityGuid(marker.entity_guid);
            subject.next(marker);
        });
    };
    UpdateMarkersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [client_service_1.OpspotHttpClient,
            session_1.Session,
            sockets_1.SocketsService])
    ], UpdateMarkersService);
    return UpdateMarkersService;
}());
exports.UpdateMarkersService = UpdateMarkersService;
//# sourceMappingURL=update-markers.service.js.map
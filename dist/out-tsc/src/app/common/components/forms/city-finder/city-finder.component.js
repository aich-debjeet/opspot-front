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
var api_1 = require("../../../../services/api");
var session_1 = require("../../../../services/session");
var CityFinderComponent = /** @class */ (function () {
    function CityFinderComponent(session, client, upload) {
        this.session = session;
        this.client = client;
        this.upload = upload;
        this.error = '';
        this.inProgress = false;
        this.city = '';
        this.cities = [];
        this.done = new core_1.EventEmitter();
    }
    CityFinderComponent.prototype.findCity = function (q) {
        var _this = this;
        if (this.searching) {
            clearTimeout(this.searching);
        }
        this.searching = setTimeout(function () {
            _this.client.get('api/v1/geolocation/list', { q: q })
                .then(function (response) {
                _this.cities = response.results;
            });
        }, 100);
    };
    CityFinderComponent.prototype.setCity = function (row) {
        var _this = this;
        this.cities = [];
        if (row.address.city)
            window.Opspot.user.city = row.address.city;
        if (row.address.town)
            window.Opspot.user.city = row.address.town;
        this.city = window.Opspot.user.city;
        this.inProgress = true;
        this.client.post('api/v1/channel/info', {
            coordinates: row.lat + ',' + row.lon,
            city: window.Opspot.user.city
        })
            .then(function (response) {
            _this.inProgress = false;
            _this.done.next(true);
        });
    };
    CityFinderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-form-city-finder',
            outputs: ['done'],
            templateUrl: 'city-finder.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, api_1.Client, api_1.Upload])
    ], CityFinderComponent);
    return CityFinderComponent;
}());
exports.CityFinderComponent = CityFinderComponent;
//# sourceMappingURL=city-finder.component.js.map
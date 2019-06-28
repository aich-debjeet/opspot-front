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
var api_1 = require("../../../services/api");
var update_markers_service_1 = require("../../../common/services/update-markers.service");
var GroupsCard = /** @class */ (function () {
    function GroupsCard(client, updateMarkers) {
        this.client = client;
        this.updateMarkers = updateMarkers;
        this.hasMarker = false;
        this.opspot = window.Opspot;
    }
    GroupsCard.prototype.ngOnInit = function () {
        var _this = this;
        this.$updateMarker = this.updateMarkers.markers.subscribe(function (markers) {
            if (!markers)
                return;
            _this.hasMarker = markers
                .filter(function (marker) {
                return (marker.read_timestamp < marker.updated_timestamp)
                    && (marker.entity_guid == _this.group.guid);
            })
                .length;
        });
    };
    GroupsCard.prototype.ngOnDestroy = function () {
        this.$updateMarker.unsubscribe();
    };
    GroupsCard = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-card-group',
            inputs: ['group'],
            templateUrl: 'card.html'
        }),
        __metadata("design:paramtypes", [api_1.Client,
            update_markers_service_1.UpdateMarkersService])
    ], GroupsCard);
    return GroupsCard;
}());
exports.GroupsCard = GroupsCard;
//# sourceMappingURL=card.js.map
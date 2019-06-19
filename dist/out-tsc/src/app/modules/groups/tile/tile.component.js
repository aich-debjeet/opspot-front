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
var session_1 = require("../../../services/session");
var update_markers_service_1 = require("../../../common/services/update-markers.service");
var GroupsTileComponent = /** @class */ (function () {
    function GroupsTileComponent(session, updateMarkers) {
        this.session = session;
        this.updateMarkers = updateMarkers;
        this.opspot = window.Opspot;
        this.hasMarker = false;
    }
    GroupsTileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.$updateMarker = this.updateMarkers.markers.subscribe(function (markers) {
            if (!markers)
                return;
            _this.hasMarker = markers
                .filter(function (marker) {
                return (marker.read_timestamp < marker.updated_timestamp)
                    && (marker.entity_guid == _this.entity.guid);
            })
                .length;
        });
    };
    GroupsTileComponent.prototype.ngOnDestroy = function () {
        this.$updateMarker.unsubscribe();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], GroupsTileComponent.prototype, "entity", void 0);
    GroupsTileComponent = __decorate([
        core_1.Component({
            selector: 'm-groups--tile',
            templateUrl: 'tile.component.html',
        }),
        __metadata("design:paramtypes", [session_1.Session,
            update_markers_service_1.UpdateMarkersService])
    ], GroupsTileComponent);
    return GroupsTileComponent;
}());
exports.GroupsTileComponent = GroupsTileComponent;
//# sourceMappingURL=tile.component.js.map
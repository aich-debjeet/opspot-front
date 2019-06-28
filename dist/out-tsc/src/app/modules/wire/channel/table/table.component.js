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
var creator_component_1 = require("../../creator/creator.component");
var overlay_modal_1 = require("../../../../services/ux/overlay-modal");
var session_1 = require("../../../../services/session");
var WireChannelTableComponent = /** @class */ (function () {
    function WireChannelTableComponent(session, overlayModal) {
        this.session = session;
        this.overlayModal = overlayModal;
        this.rewards = [];
        this.rewardsChangeEmitter = new core_1.EventEmitter();
        this.editing = false;
        this.editingChange = new core_1.EventEmitter();
    }
    Object.defineProperty(WireChannelTableComponent.prototype, "_rewards", {
        set: function (rewards) {
            this.rewards = rewards;
            if (!this.rewards) {
                this.rewards = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WireChannelTableComponent.prototype, "_editing", {
        set: function (value) {
            this.editing = value;
            if (this.editing && !this.rewards.length) {
                this.addTier();
            }
            else if (!this.editing) {
                this.rewardsChangeEmitter.emit(this.rewards);
            }
        },
        enumerable: true,
        configurable: true
    });
    WireChannelTableComponent.prototype.addTier = function () {
        this.editing = true;
        this.editingChange.next(true);
        this.rewards.push({
            amount: '',
            description: ''
        });
    };
    WireChannelTableComponent.prototype.setAmount = function (index, value) {
        this.rewards[index].amount = value;
    };
    WireChannelTableComponent.prototype.setDescription = function (index, value) {
        this.rewards[index].description = value;
    };
    WireChannelTableComponent.prototype.getAmountPlaceholder = function () {
        var placeholder;
        switch (this.type) {
            case 'points':
                placeholder = '1,000';
                break;
            case 'money':
                placeholder = '5';
                break;
            case 'tokens':
                placeholder = '1';
                break;
        }
        return placeholder;
    };
    WireChannelTableComponent.prototype.openWireModal = function (reward) {
        var user = this.session.getLoggedInUser();
        if (user.guid !== this.channel.guid) {
            var creator = this.overlayModal.create(creator_component_1.WireCreatorComponent, this.channel, {
                default: {
                    min: reward.amount,
                    type: this.type
                },
                disableThresholdCheck: true
            });
            creator.present();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WireChannelTableComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WireChannelTableComponent.prototype, "channel", void 0);
    __decorate([
        core_1.Input('rewards'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], WireChannelTableComponent.prototype, "_rewards", null);
    __decorate([
        core_1.Output('rewardsChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireChannelTableComponent.prototype, "rewardsChangeEmitter", void 0);
    __decorate([
        core_1.Input('editing'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], WireChannelTableComponent.prototype, "_editing", null);
    __decorate([
        core_1.Output('editingChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], WireChannelTableComponent.prototype, "editingChange", void 0);
    WireChannelTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-wire-channel-table',
            templateUrl: 'table.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session, overlay_modal_1.OverlayModalService])
    ], WireChannelTableComponent);
    return WireChannelTableComponent;
}());
exports.WireChannelTableComponent = WireChannelTableComponent;
//# sourceMappingURL=table.component.js.map
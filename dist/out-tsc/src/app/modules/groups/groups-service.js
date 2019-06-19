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
var api_1 = require("../../services/api");
var update_markers_service_1 = require("../../common/services/update-markers.service");
var rxjs_1 = require("rxjs");
var GroupsService = /** @class */ (function () {
    function GroupsService(clientService, uploadService, updateMarkers) {
        this.clientService = clientService;
        this.uploadService = uploadService;
        this.updateMarkers = updateMarkers;
        this.base = 'api/v1/groups/';
        this.infiniteInProgress = false;
        this.group = new rxjs_1.BehaviorSubject(null);
        this.$group = this.group.asObservable();
    }
    GroupsService._ = function (client, upload, updateMarkers) {
        return new GroupsService(client, upload, updateMarkers);
    };
    // Group
    GroupsService.prototype.load = function (guid) {
        var _this = this;
        return this.clientService.get(this.base + "group/" + guid)
            .then(function (response) {
            if (response.group) {
                _this.group.next(response.group);
                return response.group;
            }
            throw 'E_LOADING';
        });
    };
    GroupsService.prototype.save = function (group) {
        var endpoint = this.base + "group";
        if (group.guid) {
            endpoint += "/" + group.guid;
        }
        this.group.next(group);
        return this.clientService.post(endpoint, group)
            .then(function (response) {
            if (response.guid) {
                return response.guid;
            }
            throw 'E_SAVING';
        });
    };
    GroupsService.prototype.upload = function (group, files) {
        var uploads = [];
        if (files.banner) {
            uploads.push(this.uploadService.post(this.base + "group/" + group.guid + "/banner", [
                files.banner
            ], {
                banner_position: group.banner_position
            }));
        }
        if (files.avatar) {
            uploads.push(this.uploadService.post(this.base + "group/" + group.guid + "/avatar", [
                files.avatar
            ]));
        }
        return Promise.all(uploads);
    };
    GroupsService.prototype.deleteGroup = function (group) {
        return this.clientService.delete(this.base + "group/" + group.guid)
            .then(function (response) {
            return !!response.done;
        })
            .catch(function (e) {
            return false;
        });
    };
    // Membership
    GroupsService.prototype.join = function (group, target) {
        if (target === void 0) { target = null; }
        var endpoint = this.base + "membership/" + group.guid;
        if (target) {
            endpoint += "/" + target;
        }
        return this.clientService.put(endpoint)
            .then(function (response) {
            if (response.done) {
                return true;
            }
            throw response.error ? response.error : 'Internal error';
        });
    };
    GroupsService.prototype.leave = function (group, target) {
        if (target === void 0) { target = null; }
        var endpoint = this.base + "membership/" + group.guid;
        if (target) {
            endpoint += "/" + target;
        }
        return this.clientService.delete(endpoint)
            .then(function (response) {
            if (response.done) {
                return true;
            }
            throw response.error ? response.error : 'Internal error';
        });
    };
    GroupsService.prototype.acceptRequest = function (group, target) {
        // Same endpoint as join
        return this.join(group, target);
    };
    GroupsService.prototype.rejectRequest = function (group, target) {
        // Same endpoint as leave
        return this.leave(group, target);
    };
    GroupsService.prototype.kick = function (group, user) {
        return this.clientService.post(this.base + "membership/" + group.guid + "/kick", { user: user })
            .then(function (response) {
            return !!response.done;
        })
            .catch(function (e) {
            return false;
        });
    };
    GroupsService.prototype.ban = function (group, user) {
        return this.clientService.post(this.base + "membership/" + group.guid + "/ban", { user: user })
            .then(function (response) {
            return !!response.done;
        })
            .catch(function (e) {
            return false;
        });
    };
    GroupsService.prototype.cancelRequest = function (group) {
        return this.clientService.post(this.base + "membership/" + group.guid + "/cancel")
            .then(function (response) {
            return !!response.done;
        })
            .catch(function (e) {
            return false;
        });
    };
    // Notifications
    GroupsService.prototype.muteNotifications = function (group) {
        this.updateMarkers.mute(group.guid);
        return this.clientService.post(this.base + "notifications/" + group.guid + "/mute")
            .then(function (response) {
            return !!response['is:muted'];
        })
            .catch(function (e) {
            return false;
        });
    };
    GroupsService.prototype.unmuteNotifications = function (group) {
        this.updateMarkers.unmute(group.guid);
        return this.clientService.post(this.base + "notifications/" + group.guid + "/unmute")
            .then(function (response) {
            return !!response['is:muted'];
        })
            .catch(function (e) {
            return true;
        });
    };
    // Management
    GroupsService.prototype.grantOwnership = function (group, user) {
        return this.clientService.put(this.base + "management/" + group.guid + "/" + user)
            .then(function (response) {
            return !!response.done;
        })
            .catch(function (e) {
            return false;
        });
    };
    GroupsService.prototype.revokeOwnership = function (group, user) {
        return this.clientService.delete(this.base + "management/" + group.guid + "/" + user)
            .then(function (response) {
            return !response.done;
        })
            .catch(function (e) {
            return true;
        });
    };
    // Moderation
    GroupsService.prototype.grantModerator = function (group, user) {
        return this.clientService.put(this.base + "management/" + group.guid + "/" + user + "/moderator")
            .then(function (response) {
            return !!response.done;
        })
            .catch(function (e) {
            return false;
        });
    };
    GroupsService.prototype.revokeModerator = function (group, user) {
        return this.clientService.delete(this.base + "management/" + group.guid + "/" + user + "/moderator")
            .then(function (response) {
            return !response.done;
        })
            .catch(function (e) {
            return true;
        });
    };
    // Invitations
    GroupsService.prototype.canInvite = function (user) {
        return this.clientService.post(this.base + "invitations/check", { user: user })
            .then(function (response) {
            if (response.done) {
                return user;
            }
            throw 'E_NOT_DONE';
        });
    };
    GroupsService.prototype.invite = function (group, invitee) {
        return this.clientService.put(this.base + "invitations/" + group.guid, { guid: invitee.guid })
            .then(function (response) {
            if (response.done) {
                return true;
            }
            throw response.error ? response.error : 'Internal error';
        })
            .catch(function (e) {
            throw typeof e === 'string' ? e : 'Connectivity error';
        });
    };
    GroupsService.prototype.acceptInvitation = function (group) {
        return this.clientService.post(this.base + "invitations/" + group.guid + "/accept")
            .then(function (response) {
            return !!response.done;
        })
            .catch(function (e) {
            return false;
        });
    };
    GroupsService.prototype.declineInvitation = function (group) {
        return this.clientService.post(this.base + "invitations/" + group.guid + "/decline")
            .then(function (response) {
            return !!response.done;
        })
            .catch(function (e) {
            return false;
        });
    };
    GroupsService.prototype.getReviewCount = function (guid) {
        return this.clientService.get(this.base + "review/" + guid + "/count")
            .then(function (response) {
            if (typeof response['adminqueue:count'] !== 'undefined') {
                return parseInt(response['adminqueue:count'], 10);
            }
            throw 'E_COUNT';
        });
    };
    GroupsService.prototype.setExplicit = function (guid, value) {
        return this.clientService.post("api/v1/entities/explicit/" + guid, { value: value })
            .then(function (response) {
            return !!response.done;
        });
    };
    GroupsService = __decorate([
        __param(0, core_1.Inject(api_1.Client)),
        __param(1, core_1.Inject(api_1.Upload)),
        __param(2, core_1.Inject(update_markers_service_1.UpdateMarkersService)),
        __metadata("design:paramtypes", [api_1.Client,
            api_1.Upload,
            update_markers_service_1.UpdateMarkersService])
    ], GroupsService);
    return GroupsService;
}());
exports.GroupsService = GroupsService;
//# sourceMappingURL=groups-service.js.map
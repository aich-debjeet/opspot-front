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
var sockets_1 = require("../../../services/sockets");
var storage_1 = require("../../../services/storage");
var api_1 = require("../../../services/api");
var session_1 = require("../../../services/session");
var dockpanes_component_1 = require("../dockpanes/dockpanes.component");
var encryption_service_1 = require("../encryption/encryption.service");
var service_1 = require("../sounds/service");
var MessengerUserlist = /** @class */ (function () {
    function MessengerUserlist(session, client, sockets, encryption, dockpanes) {
        this.session = session;
        this.client = client;
        this.sockets = sockets;
        this.encryption = encryption;
        this.dockpanes = dockpanes;
        this.sounds = new service_1.MessengerSounds();
        this.conversations = [];
        this.offset = '';
        this.setup = false;
        this.hasMoreData = true;
        this.inProgress = false;
        this.cb = Date.now();
        this.opened_ribbon = false;
        this.opspot = window.Opspot;
        this.storage = new storage_1.Storage();
        this.socketSubscriptions = {
            touchConversation: null
        };
        this.userListToggle = false;
    }
    MessengerUserlist.prototype.ngOnInit = function () {
        if (this.session.isLoggedIn()) {
            if (this.userListToggle)
                this.load({ refresh: true });
            this.listen();
            this.autoRefresh();
        }
    };
    MessengerUserlist.prototype.load = function (opts) {
        var _this = this;
        Object.assign({
            limit: 12,
            offset: '',
            refresh: false
        }, opts);
        if (this.inProgress && !opts.refresh)
            return false;
        this.inProgress = true;
        if (opts.refresh) {
            this.offset = '';
            this.cb = Date.now();
        }
        this.client.get('api/v2/messenger/conversations', opts)
            .then(function (response) {
            if (!response.conversations) {
                _this.hasMoreData = false;
                _this.inProgress = false;
                return false;
            }
            if (opts.refresh) {
                _this.conversations = response.conversations;
            }
            else {
                _this.conversations = _this.conversations.concat(response.conversations);
            }
            _this.offset = response['load-next'];
            _this.inProgress = false;
        })
            .catch(function (error) {
            console.log('got error' + error);
            _this.inProgress = false;
        });
    };
    MessengerUserlist.prototype.search = function (q) {
        var _this = this;
        if (this.search_timeout)
            clearTimeout(this.search_timeout);
        this.conversations = [];
        if (typeof q.value !== 'undefined') {
            q = q.value;
        }
        if (!q) {
            return this.load({ refresh: true });
        }
        this.search_timeout = setTimeout(function () {
            _this.inProgress = true;
            _this.client.get('api/v2/messenger/search', {
                q: q,
                limit: 24
            })
                .then(function (response) {
                if (!response.conversations) {
                    _this.hasMoreData = false;
                    _this.inProgress = false;
                    return false;
                }
                _this.conversations = response.conversations;
                _this.offset = response['load-next'];
                _this.inProgress = false;
            })
                .catch(function (error) {
                console.log('got error' + error);
                _this.inProgress = false;
            });
        }, 300);
    };
    MessengerUserlist.prototype.openConversation = function (conversation) {
        conversation.open = true;
        this.dockpanes.open(conversation);
    };
    MessengerUserlist.prototype.listen = function () {
        var _this = this;
        this.socketSubscriptions.touchConversation = this.sockets.subscribe('touchConversation', function (guid) {
            for (var i in _this.dockpanes.conversations) {
                if (_this.dockpanes.conversations[i].guid === guid) {
                    _this.dockpanes.conversations[i].unread = true;
                    return;
                }
            }
            _this.client.get("api/v2/messenger/conversations/" + guid)
                .then(function (response) {
                _this.openConversation(response);
            });
        });
    };
    MessengerUserlist.prototype.unListen = function () {
        for (var sub in this.socketSubscriptions) {
            if (this.socketSubscriptions[sub]) {
                this.socketSubscriptions[sub].unsubscribe();
            }
        }
    };
    MessengerUserlist.prototype.ribbonToggle = function () {
        if (!this.userListToggle) {
            this.userListToggle = true;
        }
        this.opened_ribbon = !this.opened_ribbon;
    };
    MessengerUserlist.prototype.toggle = function () {
        this.userListToggle = !this.userListToggle;
        if (this.userListToggle)
            this.load({ refresh: true });
    };
    MessengerUserlist.prototype.autoRefresh = function () {
        var _this = this;
        setInterval(function () {
            if (!_this.userListToggle)
                return;
            _this.client.get('api/v2/messenger/conversations', { limit: 12 })
                .then(function (response) {
                if (!response.conversations) {
                    return false;
                }
                for (var j = 0; j < response.conversations.length; j++) {
                    for (var i = 0; i < _this.conversations.length; i++) {
                        if (_this.conversations[i].guid === response.conversations[j].guid) {
                            _this.conversations[i] = response.conversations[j];
                        }
                    }
                }
            });
        }, 30000); // refresh 30 seconds
    };
    MessengerUserlist.prototype.logout = function () {
        this.encryption.logout();
        this.dockpanes.closeAll();
    };
    MessengerUserlist.prototype.openPane = function () {
        this.userListToggle = true;
    };
    MessengerUserlist.prototype.ngOnDestroy = function () {
        this.unListen();
    };
    MessengerUserlist = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-messenger--userlist',
            templateUrl: 'userlist.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            sockets_1.SocketsService,
            encryption_service_1.MessengerEncryptionService,
            dockpanes_component_1.MessengerConversationDockpanesService])
    ], MessengerUserlist);
    return MessengerUserlist;
}());
exports.MessengerUserlist = MessengerUserlist;
var conversation_component_1 = require("../conversation/conversation.component");
exports.MessengerConversation = conversation_component_1.MessengerConversation;
//# sourceMappingURL=userlist.component.js.map
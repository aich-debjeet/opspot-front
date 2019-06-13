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
var session_1 = require("../../../services/session");
var sockets_1 = require("../../../services/sockets");
var encryption_service_1 = require("../encryption/encryption.service");
var dockpanes_service_1 = require("../dockpanes/dockpanes.service");
var service_1 = require("../sounds/service");
var MessengerConversation = /** @class */ (function () {
    function MessengerConversation(session, client, sockets, cd, renderer, encryption, dockpanes) {
        this.session = session;
        this.client = client;
        this.sockets = sockets;
        this.cd = cd;
        this.renderer = renderer;
        this.encryption = encryption;
        this.dockpanes = dockpanes;
        this.opspot = window.Opspot;
        this.sounds = new service_1.MessengerSounds();
        this.participants = [];
        this.messages = [];
        this.offset = '';
        this.open = false;
        this.inProgress = false;
        this.live = true;
        this.scrollEmitter = new core_1.EventEmitter();
        this.message = '';
        this.showMessages = true; //TODO: find a better way to work out if encryption has been set
        this.blockingActionInProgress = false;
        this.chatNotice = '';
        this.socketSubscriptions = {
            pushConversationMessage: null,
            clearConversation: null,
            connect: null,
            disconnect: null,
            block: null,
            unblock: null
        };
        this.focused = true;
        this.blocked = false;
        this.unavailable = false;
        this.invalid = false;
        this.invitable = null;
        this.invited = false;
        this.buildTabId();
    }
    MessengerConversation.prototype.ngOnInit = function () {
        if (this.conversation.messages) {
            this.messages = this.conversation.messages;
        }
        else if (this.encryption.isOn() && this.conversation.open) {
            this.initialLoad();
        }
        else if (!this.encryption.isOn()) {
            this.showMessages = false;
        }
        this.listen();
    };
    MessengerConversation.prototype.ngOnDestroy = function () {
        this.unListen();
    };
    MessengerConversation.prototype.initialLoad = function () {
        this.load({ limit: 8 });
    };
    MessengerConversation.prototype.load = function (opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        opts = Object.assign({
            limit: 12,
            offset: '',
            finish: ''
        }, opts);
        var scrollView = opts.container;
        delete opts.container;
        if (!opts.finish)
            this.inProgress = true;
        this.client.get('api/v2/messenger/conversations/' + this.conversation.guid, opts)
            .then(function (response) {
            _this.inProgress = false;
            if (!response.messages) {
                return false;
            }
            if (opts.finish) {
                _this.messages = _this.messages.concat(response.messages);
                _this.scrollEmitter.next(true);
            }
            else if (opts.offset) {
                var scrollTop = scrollView.scrollTop;
                var scrollHeight = scrollView.scrollHeight;
                if (_this.messages.length) {
                    response.messages.pop();
                }
                _this.messages = response.messages.concat(_this.messages);
                _this.offset = response['load-previous'];
                _this.cd.detectChanges();
                scrollView.scrollTop = scrollTop + scrollView.scrollHeight - scrollHeight;
            }
            else {
                _this.messages = response.messages;
                _this.offset = response['load-previous'];
                _this.scrollEmitter.next(true);
            }
            if (_this.conversation.open) {
                _this.conversation.unread = false;
            }
            _this.blocked = !!response.blocked;
            _this.unavailable = !!response.unavailable;
            _this.invitable = response.invitable || null;
        })
            .catch(function () {
            _this.inProgress = false;
        });
    };
    MessengerConversation.prototype.listen = function () {
        var _this = this;
        if (this.conversation.socketRoomName) {
            this.sockets.join(this.conversation.socketRoomName);
            this.socketSubscriptions.pushConversationMessage = this.sockets.subscribe('pushConversationMessage', function (guid, message) {
                if (guid !== _this.conversation.guid)
                    return;
                var fromSelf = false;
                if (_this.session.getLoggedInUser().guid === message.ownerObj.guid) {
                    if (_this.tabId === message.tabId) {
                        return;
                    }
                    fromSelf = true;
                }
                _this.load({ finish: message.guid });
                if (!fromSelf) {
                    _this.invalid = false;
                    if (!_this.focused && document.title.indexOf('\u2022') === -1)
                        document.title = '\u2022 ' + document.title;
                    _this.sounds.play('new');
                }
            });
            this.socketSubscriptions.clearConversation = this.sockets.subscribe('clearConversation', function (guid, actor) {
                if (guid !== _this.conversation.guid)
                    return;
                _this.messages = [];
                _this.chatNotice = actor.name + " cleared chat history";
                _this.invalid = false;
            });
            this.socketSubscriptions.block = this.sockets.subscribe('block', function (guid) {
                if (!_this.hasParticipant(guid))
                    return;
                _this.blocked = true;
            });
            this.socketSubscriptions.unblock = this.sockets.subscribe('unblock', function (guid) {
                if (!_this.hasParticipant(guid))
                    return;
                _this.blocked = false;
            });
            this.socketSubscriptions.connect = this.sockets.subscribe('connect', function () {
                _this.live = true;
            });
            this.socketSubscriptions.disconnect = this.sockets.subscribe('disconnect', function () {
                _this.live = false;
            });
        }
    };
    MessengerConversation.prototype.unListen = function () {
        if (this.conversation.socketRoomName) {
            this.sockets.leave(this.conversation.socketRoomName);
        }
        for (var sub in this.socketSubscriptions) {
            if (this.socketSubscriptions[sub]) {
                this.socketSubscriptions[sub].unsubscribe();
            }
        }
    };
    MessengerConversation.prototype.send = function (e) {
        var _this = this;
        e.preventDefault();
        if (this.blocked || !this.message) {
            return;
        }
        var newLength = this.messages.push({
            optimisticGuess: true,
            owner: this.session.getLoggedInUser(),
            message: this.message,
            time_created: Math.floor(Date.now() / 1000)
        }), currentIndex = newLength - 1;
        this.client.post('api/v2/messenger/conversations/' + this.conversation.guid, {
            message: this.message,
            encrypt: true,
            tabId: this.tabId
        })
            .then(function (response) {
            if (response.message) {
                _this.messages[currentIndex] = response.message;
            }
            else if (response.unavailable) {
                _this.unavailable = true;
            }
            else if (response.invalid) {
                _this.invalid = true;
            }
            setTimeout(function () { return _this.scrollEmitter.next(true); }, 50);
        })
            .catch(function (e) {
            console.error('Error while reading conversation', e);
        });
        this.message = '';
        this.scrollEmitter.next(true);
    };
    MessengerConversation.prototype.deleteHistory = function () {
        var _this = this;
        if (!confirm('All messages will be deleted for all parties. You cannot UNDO this action. Are you sure?')) {
            // TODO: Maybe a non-process-blocking popup?
            return;
        }
        this.messages = []; // Optimistic
        this.blockingActionInProgress = true;
        this.client.delete('api/v2/messenger/conversations/' + this.conversation.guid, {})
            .then(function (response) {
            _this.blockingActionInProgress = false;
        })
            .catch(function (e) {
            console.error('Error when deleting history', e);
            _this.blockingActionInProgress = false;
        });
    };
    MessengerConversation.prototype.block = function () {
        var _this = this;
        if (!this.conversation || !this.conversation.participants) {
            return;
        }
        if (!this.blocked) {
            if (!confirm('This action will block all parties site-wide. Are you sure?')) {
                // TODO: Maybe a non-process-blocking popup?
                return;
            }
        }
        this.blockingActionInProgress = true;
        var blocks = [], newState = !this.blocked;
        this.conversation.participants.forEach(function (participant) {
            if (_this.blocked) {
                blocks.push(_this.client.delete("api/v1/block/" + participant.guid, {}));
            }
            else {
                blocks.push(_this.client.put("api/v1/block/" + participant.guid, {}));
            }
        });
        Promise.all(blocks)
            .then(function (response) {
            _this.blockingActionInProgress = false;
            _this.blocked = newState;
        })
            .catch(function (e) {
            console.error('Error when toggling block on participants', e);
            _this.blockingActionInProgress = false;
        });
    };
    MessengerConversation.prototype.invite = function () {
        var _this = this;
        if (!this.invitable || !this.invitable.length) {
            return;
        }
        this.invited = true;
        this.invitable.forEach(function (participant) {
            _this.client.put("api/v2/messenger/conversations/invite/" + participant.guid);
        });
    };
    MessengerConversation.prototype.onFocus = function (e) {
        this.focused = true;
        if (document.title.indexOf('\u2022') === 0) {
            document.title = document.title.substr(1);
        }
    };
    MessengerConversation.prototype.onBlur = function (e) {
        this.focused = false;
    };
    MessengerConversation.prototype.buildTabId = function () {
        this.tabId = (Math.random() + 1).toString(36).substring(7);
    };
    MessengerConversation.prototype.hasParticipant = function (guid) {
        if (!this.conversation || !this.conversation.participants) {
            return false;
        }
        var has = false;
        this.conversation.participants.forEach(function (participant) {
            if (participant.guid === guid) {
                has = true;
            }
        });
        return has;
    };
    MessengerConversation = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-messenger--conversation',
            host: {
                '(window:focus)': 'onFocus($event)',
                '(window:blur)': 'onBlur($event)'
            },
            inputs: ['conversation'],
            templateUrl: 'conversation.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            sockets_1.SocketsService,
            core_1.ChangeDetectorRef,
            core_1.Renderer,
            encryption_service_1.MessengerEncryptionService,
            dockpanes_service_1.MessengerConversationDockpanesService])
    ], MessengerConversation);
    return MessengerConversation;
}());
exports.MessengerConversation = MessengerConversation;
//# sourceMappingURL=conversation.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = require("../../../services/storage");
var MessengerConversationDockpanesService = /** @class */ (function () {
    function MessengerConversationDockpanesService(storage, session) {
        var _this = this;
        this.storage = storage;
        this.session = session;
        this.conversations = [];
        this.session.getLoggedInUser(function (user) { return _this.onLogOut(user); });
        this.loadFromCache();
        setInterval(function () {
            _this.syncFromCache();
        }, 1000);
    }
    MessengerConversationDockpanesService._ = function (session) {
        return new MessengerConversationDockpanesService(new storage_1.Storage(), session);
    };
    MessengerConversationDockpanesService.prototype.open = function (conversation) {
        conversation.open = true;
        conversation.unread = false;
        for (var i = 0; i < this.conversations.length; i++) {
            if (this.conversations[i].guid === conversation.guid) {
                this.conversations[i] = conversation;
                return;
            }
        }
        this.conversations.unshift(conversation);
        this.saveToCache();
    };
    MessengerConversationDockpanesService.prototype.close = function (conversation, saveToCache) {
        if (saveToCache === void 0) { saveToCache = true; }
        for (var i = 0; i < this.conversations.length; i++) {
            if (this.conversations[i].guid === conversation.guid) {
                this.conversations.splice(i, 1);
            }
        }
        if (saveToCache) {
            this.saveToCache();
        }
    };
    MessengerConversationDockpanesService.prototype.toggle = function (conversation) {
        for (var i = 0; i < this.conversations.length; i++) {
            if (this.conversations[i].guid === conversation.guid) {
                this.conversations[i].open = !this.conversations[i].open;
            }
        }
        this.saveToCache();
    };
    MessengerConversationDockpanesService.prototype.closeAll = function () {
        this.conversations.splice(0, this.conversations.length);
        this.saveToCache();
    };
    MessengerConversationDockpanesService.prototype.syncFromCache = function () {
        // Only sync closed conversations
        var savedConversations = JSON.parse(this.storage.get('messenger-dockpanes')), conversations = this.conversations, savedConversationGuids = [], closedConversations = [];
        if (!savedConversations) {
            return;
        }
        for (var i = 0; i < savedConversations.length; i++) {
            savedConversationGuids.push(savedConversations[i].guid);
        }
        for (var i = 0; i < conversations.length; i++) {
            if (savedConversationGuids.indexOf(conversations[i].guid) === -1) {
                closedConversations.push(conversations[i]);
            }
        }
        for (var i = 0; i < closedConversations.length; i++) {
            this.close(closedConversations[i], false);
        }
    };
    MessengerConversationDockpanesService.prototype.loadFromCache = function () {
        var conversations = JSON.parse(this.storage.get('messenger-dockpanes'));
        if (conversations)
            this.conversations = conversations;
    };
    MessengerConversationDockpanesService.prototype.saveToCache = function () {
        var conversations = this.conversations;
        for (var i = 0; i < conversations.length; i++) {
            delete conversations[i].messages;
        }
        this.storage.set('messenger-dockpanes', JSON.stringify(conversations));
    };
    MessengerConversationDockpanesService.prototype.onLogOut = function (user) {
        if (user === null) {
            this.conversations = [];
        }
    };
    return MessengerConversationDockpanesService;
}());
exports.MessengerConversationDockpanesService = MessengerConversationDockpanesService;
//# sourceMappingURL=dockpanes.service.js.map
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
var encryption_service_1 = require("./encryption.service");
var MessengerEncryption = /** @class */ (function () {
    function MessengerEncryption(session, client, encryption) {
        this.session = session;
        this.client = client;
        this.encryption = encryption;
        this.on = new core_1.EventEmitter(true);
        this.inProgress = false;
        this.error = '';
        this.username = '';
    }
    MessengerEncryption.prototype.ngOnInit = function () {
        this.username = "@" + this.session.getLoggedInUser().username || 'user';
    };
    MessengerEncryption.prototype.unlock = function (password) {
        var _this = this;
        this.inProgress = true;
        this.error = '';
        this.encryption.unlock(password.value)
            .then(function () {
            password.value = '';
            _this.on.next(true);
            _this.inProgress = false;
        })
            .catch(function () {
            _this.error = 'Wrong password. Please try again.';
            _this.inProgress = false;
        });
    };
    MessengerEncryption.prototype.setup = function (password, password2) {
        var _this = this;
        if (password.value !== password2.value) {
            this.error = 'Your passwords must match';
            return;
        }
        this.inProgress = true;
        this.error = '';
        this.encryption.doSetup(password.value)
            .then(function () {
            password.value = '';
            password2.value = '';
            _this.on.next(true);
            _this.inProgress = false;
        })
            .catch(function () {
            _this.error = 'Sorry, there was a problem.';
            _this.inProgress = false;
        });
    };
    MessengerEncryption.prototype.rekey = function (password, password2) {
        var _this = this;
        if (password.value !== password2.value) {
            this.error = 'Your passwords must match';
            return;
        }
        this.error = '';
        this.inProgress = true;
        this.encryption.rekey(password.value)
            .then(function () {
            password.value = '';
            password2.value = '';
            _this.on.next(true);
            _this.inProgress = false;
        })
            .catch(function () {
            _this.error = 'Sorry, there was a problem';
            _this.inProgress = false;
        });
    };
    MessengerEncryption = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'm-messenger--encryption',
            host: {
                'class': 'm-messenger--encryption'
            },
            outputs: ['on'],
            templateUrl: 'encryption.component.html'
        }),
        __metadata("design:paramtypes", [session_1.Session,
            api_1.Client,
            encryption_service_1.MessengerEncryptionService])
    ], MessengerEncryption);
    return MessengerEncryption;
}());
exports.MessengerEncryption = MessengerEncryption;
//# sourceMappingURL=encryption.component.js.map
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
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent() {
        this.opspot = window.Opspot;
        this.banners = [];
        this.editing = false;
        this.src = '';
        this.modified = []; //all banners should be exported to here on the done event, and sent to parent
        this.done_event = new core_1.EventEmitter();
        this.delete_event = new core_1.EventEmitter();
        this.done = false; //if set to true, tells the child component to return "added"
        this.rotate = true; //if set to true enabled rotation
        this.interval = 3000; //the interval for each banner to stay before rotating
        this.index = 0; //the current visible index of the carousel.
        this.run();
    }
    Object.defineProperty(CarouselComponent.prototype, "_banners", {
        /**
         * A list of banners are sent from the parent, if done are sent a blank one is entered
         */
        set: function (value) {
            if (value) {
                this.banners = value;
            }
            else {
                this.banners.push({
                    src: null
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "_editMode", {
        /**
         * If the parent set edit mode
         */
        set: function (value) {
            console.log('[carousel]: edit mode event received');
            //was in edit more, now settings not in edit more
            if (this.editing && !value) {
                console.log('[carousel]: edit mode ended');
                this._done();
                return;
            }
            this.editing = value;
            if (!this.editing) {
                return;
            }
            console.log('[carousel]: edit mode enabled');
            this.rotate = false;
            this.done = false;
            var blank_banner = false;
            for (var i in this.banners) {
                if (!this.banners[i].src)
                    blank_banner = true;
            }
            if (!blank_banner) {
                this.banners.push({
                    src: null
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Fired when the child component adds a new banner
     */
    CarouselComponent.prototype.added = function (value, index) {
        console.log(this.banners[index].guid, value.file);
        if (!this.banners[index].guid && !value.file)
            return; //this is our 'add new' post
        //detect if we have changed
        var changed = false;
        if (value.top !== this.banners[index].top)
            changed = false;
        if (value.file)
            changed = true;
        if (!changed)
            return;
        if (!this.banners[index].src) {
            this.banners[index].src = value.file;
        }
        this.modified.push({
            guid: this.banners[index].guid,
            index: index,
            file: value.file,
            top: value.top
        });
    };
    CarouselComponent.prototype.delete = function (index) {
        this.delete_event.next(this.banners[index]);
        this.banners.splice(index, 1);
        if (this.banners.length === 0) {
            this.banners.push({ src: null });
        }
        this.next();
    };
    /**
     * Once we retreive all the modified banners, we fire back to the parent the new list
     */
    CarouselComponent.prototype._done = function () {
        var _this = this;
        this.editing = false; //this should update each banner (I'd prefer even driven but change detection works..)
        this.done = true;
        console.log('[carousel]: received done event');
        //after one second?
        setTimeout(function () {
            _this.done_event.next(_this.modified);
            _this.modified = [];
            var blank_banner = false;
            for (var i in _this.banners) {
                if (!_this.banners[i].src)
                    blank_banner = i;
            }
            if (blank_banner !== false) {
                _this.banners.splice(blank_banner, 1);
                _this.next();
            }
        }, 1000);
    };
    CarouselComponent.prototype.prev = function () {
        var max = this.banners.length - 1;
        if (this.index === 0)
            this.index = max;
        else
            this.index--;
        this.run(); //resets the carousel
    };
    CarouselComponent.prototype.next = function () {
        var max = this.banners.length - 1;
        if (this.index >= max)
            this.index = 0;
        else
            this.index++;
        this.run(); //resets the carousel
    };
    CarouselComponent.prototype.run = function () {
        var _this = this;
        if (this.rotate_timeout)
            clearTimeout(this.rotate_timeout);
        this.rotate_timeout = setTimeout(function () {
            if (_this.rotate) {
                var max = _this.banners.length - 1;
                if (_this.index >= max)
                    _this.index = 0;
                else
                    _this.index++;
            }
            _this.run();
        }, this.interval);
    };
    CarouselComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.rotate_timeout);
    };
    CarouselComponent = __decorate([
        core_1.Component({
            selector: 'm-channel--carousel',
            inputs: ['_banners: banners', '_editMode: editMode'],
            outputs: ['done_event: done', 'delete_event: delete'],
            template: "\n    <i class=\"material-icons left\" (click)=\"prev()\" [hidden]=\"banners.length <= 1\">keyboard_arrow_left</i>\n    <div *ngFor=\"let banner of banners; let i = index\">\n      <opspot-banner\n        [src]=\"banner.src\"\n        [top]=\"banner.top_offset\"\n        [overlay]=\"true\"\n        [ngClass]=\"{'is-hidden': i != index, 'edit-mode': editing}\"\n        [editMode]=\"editing\"\n        [done]=\"done\"\n        (added)=\"added($event, i)\"\n        ></opspot-banner>\n\n        <div class=\"delete-button\" (click)=\"delete(i)\" [hidden]=\"i != index || !editing\">\n          <button class=\"mdl-button mdl-button--raised mdl-button--colored material-icons\">X</button>\n        </div>\n      </div>\n    <i class=\"material-icons right\" (click)=\"next()\" [hidden]=\"banners.length <= 1\">keyboard_arrow_right</i>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], CarouselComponent);
    return CarouselComponent;
}());
exports.CarouselComponent = CarouselComponent;
//# sourceMappingURL=carousel.component.js.map
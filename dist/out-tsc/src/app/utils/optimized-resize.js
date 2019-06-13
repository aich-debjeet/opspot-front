"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptimizedResize = /** @class */ (function () {
    function OptimizedResize() {
        this.callbacks = [];
        this.running = false;
    }
    OptimizedResize.prototype.isRunning = function () {
        return this.running;
    };
    // fired on resize event
    OptimizedResize.prototype.resize = function () {
        if (!this.running) {
            this.running = true;
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(this.runCallbacks.bind(this));
            }
            else {
                setTimeout(this.runCallbacks.bind(this), 66);
            }
        }
    };
    // run the actual callbacks
    OptimizedResize.prototype.runCallbacks = function () {
        this.callbacks.forEach(function (callback) {
            callback();
        });
        this.running = false;
    };
    // adds callback to loop
    OptimizedResize.prototype.addCallback = function (callback) {
        if (callback) {
            this.callbacks.push(callback);
        }
    };
    // public method to add additional callback
    OptimizedResize.prototype.add = function (callback) {
        if (!this.callbacks.length) {
            window.addEventListener('resize', this.resize.bind(this));
        }
        this.addCallback(callback);
    };
    return OptimizedResize;
}());
exports.optimizedResize = new OptimizedResize();
//# sourceMappingURL=optimized-resize.js.map
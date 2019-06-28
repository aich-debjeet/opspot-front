"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
function Mock(opts) {
    if (opts === void 0) { opts = {}; }
    return function (target, propertyKey, descriptor) {
        console.log(descriptor);
        return descriptor;
    };
}
exports.Mock = Mock;
function MockComponent(options, spies) {
    if (spies === void 0) { spies = []; }
    var metadata = {
        selector: options.selector,
        template: options.template || '',
        inputs: options.inputs,
        outputs: options.outputs
    };
    var component = /** @class */ (function () {
        function _() {
        }
        return _;
    }());
    if (options.outputs) {
        for (var _i = 0, _a = options.outputs; _i < _a.length; _i++) {
            var output = _a[_i];
            component.prototype[output] = new core_1.EventEmitter();
        }
    }
    for (var _b = 0, spies_1 = spies; _b < spies_1.length; _b++) {
        var spy = spies_1[_b];
        component.prototype[spy] = jasmine.createSpy(spy);
    }
    return core_1.Component(metadata)(component);
}
exports.MockComponent = MockComponent;
function MockDirective(options, spies) {
    if (spies === void 0) { spies = []; }
    var metadata = {
        selector: options.selector,
        inputs: options.inputs,
        outputs: options.outputs
    };
    var directive = /** @class */ (function () {
        function _() {
        }
        return _;
    }());
    if (options.outputs) {
        for (var _i = 0, _a = options.outputs; _i < _a.length; _i++) {
            var output = _a[_i];
            directive.prototype[output] = new core_1.EventEmitter();
        }
    }
    for (var _b = 0, spies_2 = spies; _b < spies_2.length; _b++) {
        var spy = spies_2[_b];
        directive.prototype[spy] = jasmine.createSpy(spy);
    }
    return core_1.Directive(metadata)(directive);
}
exports.MockDirective = MockDirective;
function MockService(obj, config) {
    if (config === void 0) { config = null; }
    var spies = {};
    var keys = Object.keys(obj.prototype);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var value = null;
        if (config && config[key]) {
            value = config[key];
        }
        spies[key] = jasmine.createSpy(key).and.returnValue(value);
    }
    return new Proxy(__assign({}, spies, { _config: config }), {
        get: function (target, prop) {
            //if spy exists, return it
            if (target.hasOwnProperty(prop.toString())) {
                return target[prop];
            }
            else if (prop.toString() === '$quoted$') {
                return [];
            }
            // if a custom return value exists, create a spy and then return it
            if (target['_config'] && target['_config'][prop]) {
                target[prop] = jasmine.createSpy(prop.toString()).and.returnValue(target['_config'][prop]);
                return target[prop];
            }
            return null;
        },
        set: function (target, prop, value, receiver) {
            target[prop] = jasmine.createSpy(prop.toString()).and.returnValue(value);
            return true;
        }
    });
}
exports.MockService = MockService;
//# sourceMappingURL=mock.js.map
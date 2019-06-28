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
var yargs_1 = require("yargs");
var child_process_1 = require("child_process");
var path_1 = require("path");
var fs_1 = require("fs");
var APP_SRC = path_1.join(__dirname, '..', 'src');
// SHELL RUNNER
var run = function (cmd, env, outputAsResult) {
    if (env === void 0) { env = {}; }
    if (outputAsResult === void 0) { outputAsResult = true; }
    var shell = process.env.ComSpec || process.env.SHELL || false, opts = {
        env: __assign({}, process.env, env),
        maxBuffer: 1024 * 1024,
        stdio: (outputAsResult ? 'pipe' : 'inherit')
    };
    if (shell) {
        opts['shell'] = shell;
    }
    console.info("[run] " + cmd + " (" + JSON.stringify(env) + ")");
    var result = child_process_1.execSync(cmd, opts);
    if (result instanceof Buffer) {
        result = result.toString();
    }
    return result;
};
// TRANSFORMER
function transform(source, output) {
    fs_1.statSync(source); // check if exists
    var fileContent = fs_1.readFileSync(source).toString();
    fileContent = fileContent
        .replace(/\&#10;/g, "\n")
        .replace(/\&#13;/g, "\n")
        .replace(/<x\s+(.*?)\s*\/>/g, "{{$1}}")
        .replace(/{{id="INTERPOLATION" equiv-text="[^"]+"}}/g, '%1$s')
        .replace(/{{id="INTERPOLATION_([0-9]+)" equiv-text="[^"]+"}}/g, function (substring, match_1) {
        var idx = parseInt(match_1) + 1;
        if (idx < 2) {
            process.exit(1);
        }
        return "%" + idx + "$s";
    });
    fs_1.writeFileSync(output, fileContent);
}
module.exports = function () { return function (cb) {
    run("node_modules/.bin/ng xi18n --i18nFormat xlf", {}, false);
    transform(path_1.join(APP_SRC, 'messages.xlf'), path_1.join(APP_SRC, 'locale', yargs_1.argv.output || 'Default.xliff'));
    fs_1.unlinkSync(path_1.join(APP_SRC, 'messages.xlf'));
    cb();
}; };
//# sourceMappingURL=extract.i18n.xlf.js.map
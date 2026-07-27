"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = exports.EditorModule = void 0;
var kernel_js_1 = require("../../kernel/core/kernel.js");
var EditorModule = /** @class */ (function () {
    function EditorModule() {
        console.log("[PrimordiaOS] Editor Module Loaded");
    }
    EditorModule.prototype.select = function (entityId) {
        kernel_js_1.Kernel.emit("editor.select", { entityId: entityId });
    };
    EditorModule.prototype.transform = function (entityId, transform) {
        kernel_js_1.Kernel.emit("editor.transform", { entityId: entityId, transform: transform });
    };
    EditorModule.prototype.notify = function (message) {
        kernel_js_1.Kernel.emit("editor.notify", { message: message });
    };
    return EditorModule;
}());
exports.EditorModule = EditorModule;
exports.Editor = new EditorModule();
kernel_js_1.Kernel.registerModule("editor", exports.Editor);

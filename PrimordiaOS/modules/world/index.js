"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = exports.WorldModule = void 0;
var kernel_js_1 = require("../../kernel/core/kernel.js");
var WorldModule = /** @class */ (function () {
    function WorldModule() {
        console.log("[PrimordiaOS] World Module Loaded");
    }
    WorldModule.prototype.spawn = function (entityType, params) {
        if (params === void 0) { params = {}; }
        kernel_js_1.Kernel.emit("world.spawn", { entityType: entityType, params: params });
    };
    WorldModule.prototype.destroy = function (entityId) {
        kernel_js_1.Kernel.emit("world.destroy", { entityId: entityId });
    };
    WorldModule.prototype.update = function (entityId, data) {
        kernel_js_1.Kernel.emit("world.update", { entityId: entityId, data: data });
    };
    return WorldModule;
}());
exports.WorldModule = WorldModule;
exports.World = new WorldModule();
kernel_js_1.Kernel.registerModule("world", exports.World);

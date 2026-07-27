"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Physics = exports.PhysicsModule = void 0;
var kernel_js_1 = require("../../kernel/core/kernel.js");
var PhysicsModule = /** @class */ (function () {
    function PhysicsModule() {
        console.log("[PrimordiaOS] Physics Module Loaded");
    }
    PhysicsModule.prototype.applyForce = function (entityId, vector) {
        kernel_js_1.Kernel.emit("physics.force", { entityId: entityId, vector: vector });
    };
    PhysicsModule.prototype.syncState = function (state) {
        kernel_js_1.Kernel.emit("physics.sync", { state: state });
    };
    return PhysicsModule;
}());
exports.PhysicsModule = PhysicsModule;
exports.Physics = new PhysicsModule();
kernel_js_1.Kernel.registerModule("physics", exports.Physics);

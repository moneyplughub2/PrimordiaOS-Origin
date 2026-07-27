"use strict";
// PrimordiaOS Kernel — Core State + Module Registry + Event Bus
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kernel = exports.PrimordiaKernel = void 0;
var PrimordiaKernel = /** @class */ (function () {
    function PrimordiaKernel() {
        this.modules = new Map();
        this.events = [];
        this.ready = false;
    }
    PrimordiaKernel.prototype.registerModule = function (name, module) {
        this.modules.set(name, module);
        console.log("[PrimordiaOS] Module registered: ".concat(name));
    };
    PrimordiaKernel.prototype.emit = function (event, payload) {
        if (payload === void 0) { payload = {}; }
        this.events.push({ event: event, payload: payload, ts: Date.now() });
        console.log("[PrimordiaOS] Event: ".concat(event), payload);
    };
    PrimordiaKernel.prototype.getModule = function (name) {
        return this.modules.get(name);
    };
    PrimordiaKernel.prototype.markReady = function () {
        this.ready = true;
        console.log("[PrimordiaOS] Kernel is now READY.");
    };
    return PrimordiaKernel;
}());
exports.PrimordiaKernel = PrimordiaKernel;
exports.Kernel = new PrimordiaKernel();

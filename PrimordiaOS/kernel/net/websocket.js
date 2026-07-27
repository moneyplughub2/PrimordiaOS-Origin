"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimordiaWebSocket = void 0;
var ws_1 = require("ws");
var kernel_js_1 = require("../core/kernel.js");
var PrimordiaWebSocket = /** @class */ (function () {
    function PrimordiaWebSocket() {
        this.ws = null;
    }
    PrimordiaWebSocket.prototype.start = function (url) {
        if (url === void 0) { url = "ws://localhost:7777"; }
        console.log("[PrimordiaOS] Connecting to Unreal WebSocket: ".concat(url));
        this.ws = new ws_1.default(url);
        this.ws.on("open", function () {
            console.log("[PrimordiaOS] WebSocket Connected.");
            kernel_js_1.Kernel.emit("ws.connected");
        });
        this.ws.on("message", function (msg) {
            console.log("[PrimordiaOS] WS Message:", msg.toString());
            kernel_js_1.Kernel.emit("ws.message", { raw: msg.toString() });
        });
        this.ws.on("close", function () {
            console.log("[PrimordiaOS] WebSocket Closed.");
            kernel_js_1.Kernel.emit("ws.closed");
        });
        this.ws.on("error", function (err) {
            console.log("[PrimordiaOS] WebSocket Error:", err);
            kernel_js_1.Kernel.emit("ws.error", { error: err });
        });
    };
    PrimordiaWebSocket.prototype.send = function (data) {
        if (!this.ws || this.ws.readyState !== ws_1.default.OPEN) {
            console.log("[PrimordiaOS] WS not ready, cannot send.");
            return;
        }
        this.ws.send(JSON.stringify(data));
    };
    return PrimordiaWebSocket;
}());
exports.PrimordiaWebSocket = PrimordiaWebSocket;

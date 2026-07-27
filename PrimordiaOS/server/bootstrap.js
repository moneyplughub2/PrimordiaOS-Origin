"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPrimordiaServer = startPrimordiaServer;
var ws_1 = require("ws");
var kernel_js_1 = require("../kernel/core/kernel.js");
// Load modules
require("../modules/world/world.js");
require("../modules/physics/physics.js");
require("../modules/editor/editor.js");
require("../modules/worldbuilder/worldbuilder.js");
var PORT = 7777;
function startPrimordiaServer() {
    console.log("[PrimordiaOS] Bootstrapping server...");
    // Initialize kernel
    kernel_js_1.Kernel.init();
    // Start WebSocket server
    var wss = new ws_1.WebSocketServer({ port: PORT });
    console.log("[PrimordiaOS] WS Server running on port ".concat(PORT));
    wss.on("connection", function (ws) {
        console.log("[PrimordiaOS] Unreal connected");
        ws.on("message", function (msg) {
            console.log("[PrimordiaOS] Unreal →", msg.toString());
            // Parse incoming JSON
            var data;
            try {
                data = JSON.parse(msg.toString());
            }
            catch (err) {
                console.log("[PrimordiaOS] ERROR: Invalid JSON");
                return;
            }
            // Send to kernel
            var result = kernel_js_1.Kernel.handleIntent(data);
            // Send result back to Unreal
            ws.send(JSON.stringify(result));
        });
    });
}
startPrimordiaServer();

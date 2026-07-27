"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldBuilder = void 0;
var kernel_js_1 = require("../../kernel/core/kernel.js");
exports.WorldBuilder = {
    name: "worldbuilder",
    init: function () {
        console.log("[PrimordiaOS] WorldBuilder Module Loaded");
        kernel_js_1.Kernel.register("worldbuilder", this);
    },
    // Build a simple chamber
    buildChamber: function () {
        return {
            action: "world.spawn",
            entity: "chamber",
            params: {
                components: [
                    {
                        type: "plane",
                        size: { x: 2000, y: 2000, z: 1 },
                        location: { x: 0, y: 0, z: 0 }
                    },
                    {
                        type: "wall",
                        size: { x: 2000, y: 50, z: 600 },
                        location: { x: 0, y: -1000, z: 300 }
                    },
                    {
                        type: "wall",
                        size: { x: 2000, y: 50, z: 600 },
                        location: { x: 0, y: 1000, z: 300 }
                    },
                    {
                        type: "wall",
                        size: { x: 50, y: 2000, z: 600 },
                        location: { x: -1000, y: 0, z: 300 }
                    },
                    {
                        type: "wall",
                        size: { x: 50, y: 2000, z: 600 },
                        location: { x: 1000, y: 0, z: 300 }
                    }
                ]
            }
        };
    },
    // Build a cosmic cathedral
    buildCathedral: function () {
        return {
            action: "world.spawn",
            entity: "cathedral",
            params: {
                style: "cosmic",
                arches: 12,
                stained_glass: true,
                spires: 6,
                glow: "nebula",
                location: { x: 0, y: 0, z: 0 }
            }
        };
    },
    // Build a glowing cube grid
    buildCubeGrid: function (size, spacing) {
        if (size === void 0) { size = 10; }
        if (spacing === void 0) { spacing = 200; }
        var cubes = [];
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                cubes.push({
                    type: "cube",
                    location: {
                        x: x * spacing,
                        y: y * spacing,
                        z: 200
                    },
                    style: "glowing"
                });
            }
        }
        return {
            action: "world.spawn",
            entity: "cube_grid",
            params: { cubes: cubes }
        };
    },
    // Natural language router
    interpret: function (text) {
        text = text.toLowerCase();
        if (text.includes("chamber"))
            return this.buildChamber();
        if (text.includes("cathedral"))
            return this.buildCathedral();
        if (text.includes("cube grid"))
            return this.buildCubeGrid();
        return {
            action: "nl.error",
            entity: null,
            params: {
                input: text,
                explanation: "WorldBuilder could not interpret this request."
            }
        };
    }
};
exports.WorldBuilder.init();

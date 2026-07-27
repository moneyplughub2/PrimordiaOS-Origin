import { Kernel } from "../../kernel/core/kernel.js";

export const WorldBuilder = {
  build(payload: any) {
    console.log("[WorldBuilder] build", payload);
    return { ok: true, msg: "World built" };
  }
};

Kernel.register("worldbuilder", WorldBuilder);

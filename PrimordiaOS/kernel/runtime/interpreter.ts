import { antigravity } from "./antigravity.js";
import { Kernel } from "../core/kernel.js";
import { World } from "../../modules/world/index.js";
import { Physics } from "../../modules/physics/index.js";
import { Editor } from "../../modules/editor/index.js";

export async function interpretSentence(input) {
  const intent = await antigravity(input);

  switch (intent.action) {
    case "world.spawn":
      World.spawn(intent.entity, intent.params);
      break;

    case "world.update":
      World.update(intent.entity, intent.params);
      break;

    case "physics.force":
      Physics.applyForce(intent.entity, intent.params);
      break;

    case "editor.select":
      Editor.select(intent.entity);
      break;

    default:
      Kernel.emit("nl.unknown", { raw: input, intent });
  }
}

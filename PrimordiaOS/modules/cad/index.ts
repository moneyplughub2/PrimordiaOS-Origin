// modules/cad/index.ts
import { Express } from "express";
import { registerCADRoutes } from "./cad.routes";

export function initCADModule(app: Express) {
  registerCADRoutes(app);
}

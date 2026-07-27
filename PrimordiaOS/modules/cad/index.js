import { registerCADRoutes } from "./cad.routes";
export function initCADModule(app) {
    registerCADRoutes(app);
}

import { Express, Request, Response } from "express";
import {
  createCADRoot,
  listCADRoots,
  getCADRoot,
  setCADParam,
  getCADParams,
  addCADFile,
  getCADFiles,
  recordCADOps,
  getCADOps,
  recordCADSim,
  getCADSims,
  recordCADCAM,
  getCADCAM,
  setCADRegistry,
  getCADRegistry,
  updateCADStatus,
} from "./cad.service";
import { CADSim, CADCAM } from "./cad.types";

export function registerCADRoutes(app: Express) {
  // List all CAD roots
  app.get("/cad", (req: Request, res: Response) => {
    res.json(listCADRoots());
  });

  // Create CAD root
  app.post("/cad/build", (req: Request, res: Response) => {
    const { type, title } = req.body;
    const root = createCADRoot(type, title);
    res.json(root);
  });

  // Get CAD root
  app.get("/cad/:id", (req: Request, res: Response) => {
    const root = getCADRoot(req.params.id);
    if (!root) return res.status(404).json({ error: "Not found" });
    res.json(root);
  });

  // Update status
  app.post("/cad/:id/status", (req: Request, res: Response) => {
    const { status } = req.body;
    const root = updateCADStatus(req.params.id, status);
    if (!root) return res.status(404).json({ error: "Not found" });
    res.json(root);
  });

  // Params
  app.post("/cad/:id/params", (req: Request, res: Response) => {
    const { key, value, unit, constraint } = req.body;
    const param = setCADParam(req.params.id, key, value, unit, constraint);
    res.json(param);
  });

  app.get("/cad/:id/params", (req: Request, res: Response) => {
    res.json(getCADParams(req.params.id));
  });

  // Files
  app.post("/cad/:id/files", (req: Request, res: Response) => {
    const { type, path, hash, size, generated_by } = req.body;
    const file = addCADFile(
      req.params.id,
      type,
      path,
      hash,
      size,
      generated_by
    );
    res.json(file);
  });

  app.get("/cad/:id/files", (req: Request, res: Response) => {
    res.json(getCADFiles(req.params.id));
  });

  // Ops
  app.post("/cad/:id/ops", (req: Request, res: Response) => {
    const { op_type, agent, input_params, output_files, status, logs } =
      req.body;
    const op = recordCADOps(
      req.params.id,
      op_type,
      agent,
      input_params || [],
      output_files || [],
      status,
      logs || ""
    );
    res.json(op);
  });

  app.get("/cad/:id/ops", (req: Request, res: Response) => {
    res.json(getCADOps(req.params.id));
  });

  // Sim
  app.post("/cad/:id/simulate", (req: Request, res: Response) => {
    const payload: CADSim = {
      id: "",
      cad_id: req.params.id,
      sim_type: req.body.sim_type,
      input_file: req.body.input_file,
      result_json: req.body.result_json,
      recommended_changes: req.body.recommended_changes || [],
      world_state: req.body.world_state || {},
      timestamp: 0,
    };
    const sim = recordCADSim(payload);
    res.json(sim);
  });

  app.get("/cad/:id/simulate", (req: Request, res: Response) => {
    res.json(getCADSims(req.params.id));
  });

  // CAM
  app.post("/cad/:id/cam", (req: Request, res: Response) => {
    const payload: CADCAM = {
      id: "",
      cad_id: req.params.id,
      machine: req.body.machine,
      material: req.body.material,
      strategy: req.body.strategy,
      output_file: req.body.output_file,
      time_estimate: req.body.time_estimate || 0,
      material_usage: req.body.material_usage || 0,
      timestamp: 0,
    };
    const cam = recordCADCAM(payload);
    res.json(cam);
  });

  app.get("/cad/:id/cam", (req: Request, res: Response) => {
    res.json(getCADCAM(req.params.id));
  });

  // Registry
  app.post("/cad/:id/registry", (req: Request, res: Response) => {
    const { key, value } = req.body;
    const entry = setCADRegistry(req.params.id, key, value);
    res.json(entry);
  });

  app.get("/cad/:id/registry", (req: Request, res: Response) => {
    const { key } = req.query;
    res.json(getCADRegistry(req.params.id, key as string | undefined));
  });
}

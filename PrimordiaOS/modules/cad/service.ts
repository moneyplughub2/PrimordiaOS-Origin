import {
  CADRoot,
  CADParam,
  CADFile,
  CADOps,
  CADSim,
  CADCAM,
  CADLineage,
  CADRegistry,
  CADType,
  CADStatus,
  CADOpsType,
} from "./cad.types";
import {
  cadRoots,
  cadParams,
  cadFiles,
  cadOps,
  cadSims,
  cadCams,
  cadLineages,
  cadRegistry,
  genId,
} from "./cad.store";

const now = () => Date.now();

// ROOT

export function createCADRoot(
  type: CADType,
  title: string,
  status: CADStatus = "draft"
): CADRoot {
  const root: CADRoot = {
    id: genId(),
    type,
    title,
    status,
    version: 1,
    created_at: now(),
    updated_at: now(),
  };
  cadRoots.push(root);
  return root;
}

export function updateCADStatus(
  cad_id: string,
  status: CADStatus
): CADRoot | null {
  const root = cadRoots.find((r) => r.id === cad_id);
  if (!root) return null;
  root.status = status;
  root.version += 1;
  root.updated_at = now();
  return root;
}

export function getCADRoot(cad_id: string): CADRoot | null {
  return cadRoots.find((r) => r.id === cad_id) || null;
}

export function listCADRoots(): CADRoot[] {
  return cadRoots;
}

// PARAMS

export function setCADParam(
  cad_id: string,
  key: string,
  value: number | string,
  unit?: string,
  constraint?: string
): CADParam {
  let param = cadParams.find((p) => p.cad_id === cad_id && p.key === key);
  if (!param) {
    param = {
      id: genId(),
      cad_id,
      key,
      value,
      unit,
      constraint,
      editable: true,
    };
    cadParams.push(param);
  } else {
    param.value = value;
    param.unit = unit;
    param.constraint = constraint;
  }
  return param;
}

export function getCADParams(cad_id: string): CADParam[] {
  return cadParams.filter((p) => p.cad_id === cad_id);
}

// FILES

export function addCADFile(
  cad_id: string,
  type: CADFile["type"],
  path: string,
  hash: string,
  size: number,
  generated_by: CADFile["generated_by"]
): CADFile {
  const file: CADFile = {
    id: genId(),
    cad_id,
    type,
    path,
    hash,
    size,
    generated_by,
  };
  cadFiles.push(file);
  return file;
}

export function getCADFiles(cad_id: string): CADFile[] {
  return cadFiles.filter((f) => f.cad_id === cad_id);
}

// OPS

export function recordCADOps(
  cad_id: string,
  op_type: CADOpsType,
  agent: CADOps["agent"],
  input_params: string[],
  output_files: string[],
  status: CADOps["status"],
  logs: string
): CADOps {
  const op: CADOps = {
    id: genId(),
    cad_id,
    op_type,
    agent,
    input_params,
    output_files,
    status,
    logs,
    timestamp: now(),
  };
  cadOps.push(op);
  return op;
}

export function getCADOps(cad_id: string): CADOps[] {
  return cadOps.filter((o) => o.cad_id === cad_id);
}

// SIM

export function recordCADSim(sim: CADSim): CADSim {
  const entry = { ...sim, id: genId(), timestamp: now() };
  cadSims.push(entry);
  return entry;
}

export function getCADSims(cad_id: string): CADSim[] {
  return cadSims.filter((s) => s.cad_id === cad_id);
}

// CAM

export function recordCADCAM(cam: CADCAM): CADCAM {
  const entry = { ...cam, id: genId(), timestamp: now() };
  cadCams.push(entry);
  return entry;
}

export function getCADCAM(cad_id: string): CADCAM[] {
  return cadCams.filter((c) => c.cad_id === cad_id);
}

// LINEAGE

export function recordCADLineage(
  cad_id: string,
  parent_id: string,
  change_summary: string,
  diff_params: string[],
  diff_files: string[]
): CADLineage {
  const entry: CADLineage = {
    id: genId(),
    cad_id,
    parent_id,
    change_summary,
    diff_params,
    diff_files,
    timestamp: now(),
  };
  cadLineages.push(entry);
  return entry;
}

export function getCADLineage(cad_id: string): CADLineage[] {
  return cadLineages.filter((l) => l.cad_id === cad_id);
}

// REGISTRY

export function setCADRegistry(
  cad_id: string,
  key: string,
  value: any
): CADRegistry {
  let entry = cadRegistry.find(
    (r) => r.cad_id === cad_id && r.key === key
  );
  if (!entry) {
    entry = {
      id: genId(),
      cad_id,
      key,
      value,
      updated_at: now(),
    };
    cadRegistry.push(entry);
  } else {
    entry.value = value;
    entry.updated_at = now();
  }
  return entry;
}

export function getCADRegistry(
  cad_id: string,
  key?: string
): CADRegistry[] {
  return cadRegistry.filter(
    (r) => r.cad_id === cad_id && (key ? r.key === key : true)
  );
}

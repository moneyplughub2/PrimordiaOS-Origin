export type CADType = "part" | "assembly" | "sketch" | "cam" | "sim";

export type CADStatus =
  | "draft"
  | "built"
  | "simulated"
  | "optimized"
  | "exported";

export interface CADRoot {
  id: string;
  type: CADType;
  title: string;
  status: CADStatus;
  version: number;
  created_at: number;
  updated_at: number;
}

export interface CADParam {
  id: string;
  cad_id: string;
  key: string;
  value: number | string;
  unit?: string;
  constraint?: string;
  editable: boolean;
}

export type CADFileType =
  | "step"
  | "stl"
  | "fcad_script"
  | "preview"
  | "fusion_archive";

export interface CADFile {
  id: string;
  cad_id: string;
  type: CADFileType;
  path: string;
  hash: string;
  size: number;
  generated_by: "freecad" | "fusion" | "mcp";
}

export type CADOpsType =
  | "build"
  | "simulate"
  | "optimize"
  | "export"
  | "cam";

export type CADOpsStatus = "pending" | "running" | "done" | "failed";

export interface CADOps {
  id: string;
  cad_id: string;
  op_type: CADOpsType;
  agent: "freecad_mcp" | "fusion_api" | "unreal_bridge";
  input_params: string[];
  output_files: string[];
  status: CADOpsStatus;
  logs: string;
  timestamp: number;
}

export type CADSimType =
  | "stress"
  | "physics"
  | "collision"
  | "thermal";

export interface CADSim {
  id: string;
  cad_id: string;
  sim_type: CADSimType;
  input_file: string;
  result_json: any;
  recommended_changes: string[];
  world_state: any;
  timestamp: number;
}

export interface CADCAM {
  id: string;
  cad_id: string;
  machine: string;
  material: string;
  strategy: string;
  output_file: string;
  time_estimate: number;
  material_usage: number;
  timestamp: number;
}

export interface CADLineage {
  id: string;
  cad_id: string;
  parent_id: string;
  change_summary: string;
  diff_params: string[];
  diff_files: string[];
  timestamp: number;
}

export interface CADRegistry {
  id: string;
  cad_id: string;
  key: string;
  value: any;
  updated_at: number;
}

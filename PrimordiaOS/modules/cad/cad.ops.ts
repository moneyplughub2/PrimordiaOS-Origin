export interface CADOps {
  id: string;
  cad_id: string;
  op_type: "build" | "simulate" | "optimize" | "export" | "cam";
  agent: "freecad_mcp" | "fusion_api" | "unreal_bridge";
  input_params: string[];
  output_files: string[];
  status: "pending" | "running" | "done" | "failed";
  logs: string;
  timestamp: number;
}

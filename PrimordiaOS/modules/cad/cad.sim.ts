export interface CADSim {
  id: string;
  cad_id: string;
  sim_type: "stress" | "physics" | "collision" | "thermal";
  input_file: string;
  result_json: any;
  recommended_changes: string[];
  world_state: any;
  timestamp: number;
}

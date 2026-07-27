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

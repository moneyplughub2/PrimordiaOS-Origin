export interface CADLineage {
  id: string;
  cad_id: string;
  parent_id: string;
  change_summary: string;
  diff_params: string[];
  diff_files: string[];
  timestamp: number;
}

export interface CADFile {
  id: string;
  cad_id: string;
  type: "step" | "stl" | "fcad_script" | "preview" | "fusion_archive";
  path: string;
  hash: string;
  size: number;
  generated_by: "freecad" | "fusion" | "mcp";
}

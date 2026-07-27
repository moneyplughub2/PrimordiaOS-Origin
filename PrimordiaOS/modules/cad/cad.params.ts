export interface CADParam {
  id: string;
  cad_id: string;
  key: string;
  value: number | string;
  unit?: string;
  constraint?: string;
  editable: boolean;
}

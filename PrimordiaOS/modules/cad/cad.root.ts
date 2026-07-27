export interface CADRoot {
  id: string;
  type: "part" | "assembly" | "sketch" | "cam" | "sim";
  title: string;
  status: "draft" | "built" | "simulated" | "optimized" | "exported";
  version: number;
  created_at: number;
  updated_at: number;
}

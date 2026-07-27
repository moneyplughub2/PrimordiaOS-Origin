import {
  CADRoot,
  CADParam,
  CADFile,
  CADOps,
  CADSim,
  CADCAM,
  CADLineage,
  CADRegistry,
} from "./cad.types";

export const cadRoots: CADRoot[] = [];
export const cadParams: CADParam[] = [];
export const cadFiles: CADFile[] = [];
export const cadOps: CADOps[] = [];
export const cadSims: CADSim[] = [];
export const cadCams: CADCAM[] = [];
export const cadLineages: CADLineage[] = [];
export const cadRegistry: CADRegistry[] = [];

export const genId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

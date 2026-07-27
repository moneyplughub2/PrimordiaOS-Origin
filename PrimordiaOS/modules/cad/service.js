import { cadRoots, cadParams, cadFiles, cadOps, cadSims, cadCams, cadLineages, cadRegistry, genId, } from "./cad.store";
const now = () => Date.now();
// ROOT
export function createCADRoot(type, title, status = "draft") {
    const root = {
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
export function updateCADStatus(cad_id, status) {
    const root = cadRoots.find((r) => r.id === cad_id);
    if (!root)
        return null;
    root.status = status;
    root.version += 1;
    root.updated_at = now();
    return root;
}
export function getCADRoot(cad_id) {
    return cadRoots.find((r) => r.id === cad_id) || null;
}
export function listCADRoots() {
    return cadRoots;
}
// PARAMS
export function setCADParam(cad_id, key, value, unit, constraint) {
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
    }
    else {
        param.value = value;
        param.unit = unit;
        param.constraint = constraint;
    }
    return param;
}
export function getCADParams(cad_id) {
    return cadParams.filter((p) => p.cad_id === cad_id);
}
// FILES
export function addCADFile(cad_id, type, path, hash, size, generated_by) {
    const file = {
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
export function getCADFiles(cad_id) {
    return cadFiles.filter((f) => f.cad_id === cad_id);
}
// OPS
export function recordCADOps(cad_id, op_type, agent, input_params, output_files, status, logs) {
    const op = {
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
export function getCADOps(cad_id) {
    return cadOps.filter((o) => o.cad_id === cad_id);
}
// SIM
export function recordCADSim(sim) {
    const entry = { ...sim, id: genId(), timestamp: now() };
    cadSims.push(entry);
    return entry;
}
export function getCADSims(cad_id) {
    return cadSims.filter((s) => s.cad_id === cad_id);
}
// CAM
export function recordCADCAM(cam) {
    const entry = { ...cam, id: genId(), timestamp: now() };
    cadCams.push(entry);
    return entry;
}
export function getCADCAM(cad_id) {
    return cadCams.filter((c) => c.cad_id === cad_id);
}
// LINEAGE
export function recordCADLineage(cad_id, parent_id, change_summary, diff_params, diff_files) {
    const entry = {
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
export function getCADLineage(cad_id) {
    return cadLineages.filter((l) => l.cad_id === cad_id);
}
// REGISTRY
export function setCADRegistry(cad_id, key, value) {
    let entry = cadRegistry.find((r) => r.cad_id === cad_id && r.key === key);
    if (!entry) {
        entry = {
            id: genId(),
            cad_id,
            key,
            value,
            updated_at: now(),
        };
        cadRegistry.push(entry);
    }
    else {
        entry.value = value;
        entry.updated_at = now();
    }
    return entry;
}
export function getCADRegistry(cad_id, key) {
    return cadRegistry.filter((r) => r.cad_id === cad_id && (key ? r.key === key : true));
}

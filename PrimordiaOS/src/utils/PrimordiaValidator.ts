// ────────────────────────────────────────────────────────────
//  PrimordiaValidator.ts
//  Ensures required fields exist before routing
// ────────────────────────────────────────────────────────────

export const PrimordiaValidator = {
  validatePayload(payload: any) {
    if (!payload) throw new Error("Payload is missing");

    if (!payload.row_id) throw new Error("row_id is required");
    if (!payload.video_url) throw new Error("video_url is required");

    return true;
  },
};

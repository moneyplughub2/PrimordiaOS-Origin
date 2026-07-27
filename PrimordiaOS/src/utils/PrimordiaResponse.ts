// ────────────────────────────────────────────────────────────
//  PrimordiaResponse.ts
//  Standardized OS-level responses for PrimordiaRouter
// ────────────────────────────────────────────────────────────

export const PrimordiaResponse = {
  success(post_id: string | null, status: string) {
    return {
      success: true,
      post_id,
      status,
    };
  },

  failure(status: string) {
    return {
      success: false,
      post_id: null,
      status,
    };
  },
};

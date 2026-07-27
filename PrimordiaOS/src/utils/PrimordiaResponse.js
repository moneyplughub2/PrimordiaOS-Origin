// ────────────────────────────────────────────────────────────
//  PrimordiaResponse.ts
//  Standardized OS-level responses for PrimordiaRouter
// ────────────────────────────────────────────────────────────
export const PrimordiaResponse = {
    success(post_id, status) {
        return {
            success: true,
            post_id,
            status,
        };
    },
    failure(status) {
        return {
            success: false,
            post_id: null,
            status,
        };
    },
};

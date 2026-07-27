// ────────────────────────────────────────────────────────────
//  PrimordiaNormalizer.ts
//  Normalizes tags, captions, and other fields
// ────────────────────────────────────────────────────────────

export const PrimordiaNormalizer = {
  normalizeTags(tags: string) {
    return tags.trim();
  },
};

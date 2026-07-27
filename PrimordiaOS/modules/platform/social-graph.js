export const Social = {
  enabled() {
    return ["tiktok", "youtube", "instagram"];
  },
  profileFor(platform) {
    console.log("[PrimordiaOS] Fetching profile for:", platform);
    return { platform, handle: "@Primordial_Origin" };
  }
};

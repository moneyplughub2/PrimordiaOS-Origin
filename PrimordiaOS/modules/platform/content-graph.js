export const Content = {
  all() {
    console.log("[PrimordiaOS] Loading content graph...");
    return [
      { id: "primordia-vfx-pack-1", type: "product", status: "draft" },
      { id: "cosmic-boot-sequence", type: "scene", status: "idea" }
    ];
  },
  findById(id) {
    console.log("[PrimordiaOS] Finding content by id:", id);
    return { id, type: "unknown", status: "unknown" };
  }
};

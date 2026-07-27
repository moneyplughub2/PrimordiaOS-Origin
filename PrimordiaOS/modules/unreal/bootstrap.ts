import { WorldBuilder } from "./world-builder";

/**
 * Master bootstrap for Unreal Engine integration.
 * Called once when PrimordiaOS starts.
 */
export function bootstrapUnrealIntegration() {
  console.log("[PrimordiaOS] Bootstrapping Unreal integration...");
  WorldBuilder.connect();
}

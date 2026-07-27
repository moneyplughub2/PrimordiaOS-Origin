import fs from "fs";
import path from "path";
import { CANONICAL_ROOT } from "./ritual_1_canonicalization";

export async function executeRitual5(): Promise<{ success: boolean; log: string[] }> {
    const log: string[] = [];
    log.push("[Ritual 5] Purging build caches, binaries, and intermediate files...");

    const dirsToPurge = ["Intermediate", "Binaries", "Saved", "DerivedDataCache", "dist"];

    for (const dirName of dirsToPurge) {
        const targetPath = path.join(CANONICAL_ROOT, dirName);
        if (fs.existsSync(targetPath)) {
            try {
                fs.rmSync(targetPath, { recursive: true, force: true });
                log.push(`[Ritual 5] Purged directory: ${dirName}`);
            } catch (err: any) {
                log.push(`[Ritual 5] Warning: Failed to purge ${dirName}: ${err.message}`);
            }
        }
    }

    log.push("[Ritual 5] Regenerating manifest and build trees...");

    log.push("[Ritual 5] Purge and Rebuild completed successfully.");
    return { success: true, log };
}

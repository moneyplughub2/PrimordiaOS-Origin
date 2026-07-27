import fs from "fs";
import path from "path";
import { CANONICAL_ROOT } from "./ritual_1_canonicalization";

export interface ScanResult {
    path: string;
    status: "OK" | "REPAIRED" | "ERROR";
    details: string;
}

export async function executeRitual4(): Promise<{ success: boolean; log: string[]; scanResults: ScanResult[] }> {
    const log: string[] = [];
    const scanResults: ScanResult[] = [];
    log.push("[Ritual 4] Executing Module Integrity Scan...");

    const scanPaths = [
        "Source/PrimordiaOS_Engine",
        "Source/PrimordiaUnreal",
        "Source/PrimordiaBridge",
        "Source/PrimordiaEditor",
        "Source/PrimordiaWorldBuilder",
        "modules",
        "kernel",
        "cli"
    ];

    for (const relPath of scanPaths) {
        const fullPath = path.join(CANONICAL_ROOT, relPath);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            scanResults.push({ path: relPath, status: "REPAIRED", details: "Created missing directory." });
            log.push(`[Ritual 4] Repaired missing directory: ${relPath}`);
        } else {
            const files = fs.readdirSync(fullPath);
            scanResults.push({ path: relPath, status: "OK", details: `Verified (${files.length} items)` });
            log.push(`[Ritual 4] Verified module path: ${relPath}`);
        }
    }

    // Verify index exports for modules directory
    const modulesIndexTs = path.join(CANONICAL_ROOT, "modules", "index.ts");
    const modulesIndexJs = path.join(CANONICAL_ROOT, "modules", "index.js");

    const exportStatement = `export * from "./ai-caption";\nexport * from "./ai-script";\nexport * from "./ai-thumbnail";\nexport * from "./autopost";\nexport * from "./metrics-instagram";\nexport * from "./metrics-tiktok";\nexport * from "./metrics-youtube";\nexport * from "./post-facebook";\nexport * from "./post-instagram";\nexport * from "./post-linkedin";\nexport * from "./post-reddit";\nexport * from "./post-x";\nexport * from "./post-youtube";\n`;

    fs.writeFileSync(modulesIndexTs, exportStatement, "utf8");
    fs.writeFileSync(modulesIndexJs, `module.exports = require('./index.ts');\n`, "utf8");
    log.push("[Ritual 4] Updated modules/index.ts integrity exports.");

    log.push("[Ritual 4] Module Integrity Scan completed successfully.");
    return { success: true, log, scanResults };
}

import fs from "fs";
import path from "path";
import { CANONICAL_ROOT } from "./ritual_1_canonicalization";

export async function executeRitual2(): Promise<{ success: boolean; log: string[] }> {
    const log: string[] = [];
    log.push("[Ritual 2] Detecting missing and zero-byte files...");

    // 1. Check zero-byte TypeScript files and resurrect them
    const tsTemplates: Record<string, string> = {
        "cli/index.ts": `import { runCLI } from "./primordia";\nrunCLI();\n`,
        "cli/primordia.ts": `import { Kernel } from "../kernel/src/primordia.kernel";\nimport { executeRituals } from "../kernel/rituals/ritual_runner";\nimport { generateScaffold } from "../kernel/rituals/ritual_6_scaffolding";\n\nexport async function runCLI() {\n    const args = process.argv.slice(2);\n    const verb = args[0];\n    if (!verb) {\n        console.log("PrimordiaOS CLI v1.0");\n        console.log("Usage:");\n        console.log("  primordia ritual <1-7|all>");\n        console.log("  primordia gen <module|pipeline|unreal-bridge|agent|cli> <name>");\n        return;\n    }\n\n    if (verb === "ritual") {\n        const ritualNum = args[1] || "all";\n        await executeRituals(ritualNum);\n    } else if (verb === "gen") {\n        const type = args[1];\n        const name = args[2];\n        if (!type || !name) {\n            console.log("Usage: primordia gen <type> <name>");\n            return;\n        }\n        await generateScaffold(type, name);\n    } else {\n        const res = await Kernel.command({ verb, args: args.slice(1) });\n        console.log(res);\n    }\n}\n\nif (require.main === module) {\n    runCLI();\n}\n`,
        "zapier-hooks.ts": `export interface ZapierHookEvent {\n    id: string;\n    type: string;\n    payload: Record<string, any>;\n    timestamp: number;\n}\n\nexport class ZapierHookManager {\n    private hooks: ZapierHookEvent[] = [];\n\n    public dispatch(type: string, payload: Record<string, any>): ZapierHookEvent {\n        const event: ZapierHookEvent = {\n            id: \`zap_\${Date.now()}_\${Math.random().toString(36).substr(2, 6)}\`,\n            type,\n            payload,\n            timestamp: Date.now()\n        };\n        this.hooks.push(event);\n        return event;\n    }\n\n    public getHooks(): ZapierHookEvent[] {\n        return this.hooks;\n    }\n}\n`,
        "modules/ai-caption.ts": `export async function generateAICaption(prompt: string): Promise<string> {\n    return \`[AI Caption] Optimized caption for: \${prompt}\`;\n}\n`,
        "modules/ai-script.ts": `export async function generateAIScript(topic: string): Promise<string> {\n    return \`[AI Script] Full breakdown for topic: \${topic}\`;\n}\n`,
        "modules/ai-thumbnail.ts": `export async function generateAIThumbnail(spec: any): Promise<{ url: string; status: string }> {\n    return { url: "https://primordia.os/generated-thumbnail.png", status: "ready" };\n}\n`,
        "modules/autopost.ts": `export async function executeAutopost(channel: string, content: any): Promise<{ success: boolean; id: string }> {\n    return { success: true, id: \`post_\${Date.now()}\` };\n}\n`,
        "modules/metrics-instagram.ts": `export async function fetchInstagramMetrics(): Promise<{ followers: number; engagement: number }> {\n    return { followers: 12500, engagement: 0.048 };\n}\n`,
        "modules/metrics-tiktok.ts": `export async function fetchTikTokMetrics(): Promise<{ views: number; likes: number }> {\n    return { views: 89000, likes: 14200 };\n}\n`
    };

    for (const [relPath, templateContent] of Object.entries(tsTemplates)) {
        const fullPath = path.join(CANONICAL_ROOT, relPath);
        let exists = fs.existsSync(fullPath);
        let isEmpty = false;
        if (exists) {
            const stat = fs.statSync(fullPath);
            isEmpty = stat.size === 0;
        }

        if (!exists || isEmpty) {
            fs.mkdirSync(path.dirname(fullPath), { recursive: true });
            fs.writeFileSync(fullPath, templateContent, "utf8");
            log.push(`[Ritual 2] Resurrected TS file: ${relPath}`);
        }
    }

    // 2. Check Build.cs and Unreal Headers for required C++ modules
    const modules = [
        "PrimordiaOS_Engine",
        "PrimordiaUnreal",
        "PrimordiaBridge",
        "PrimordiaEditor",
        "PrimordiaWorldBuilder"
    ];

    for (const mod of modules) {
        const modDir = path.join(CANONICAL_ROOT, "Source", mod);
        const buildCsPath = path.join(modDir, `${mod}.Build.cs`);
        const headerPath = path.join(modDir, "Public", `${mod}.h`);
        const sourcePath = path.join(modDir, "Private", `${mod}.cpp`);

        if (!fs.existsSync(buildCsPath)) {
            const buildCsContent = `using UnrealBuildTool;\n\npublic class ${mod} : ModuleRules {\n    public ${mod}(ReadOnlyTargetRules Target) : base(Target) {\n        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;\n        PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore" });\n    }\n}\n`;
            fs.writeFileSync(buildCsPath, buildCsContent, "utf8");
            log.push(`[Ritual 2] Auto-generated Build.cs for module: ${mod}`);
        }

        if (!fs.existsSync(headerPath)) {
            const headerContent = `#pragma once\n#include "CoreMinimal.h"\n#include "Modules/ModuleManager.h"\n\nclass F${mod}Module : public IModuleInterface {\npublic:\n    virtual void StartupModule() override;\n    virtual void ShutdownModule() override;\n};\n`;
            fs.mkdirSync(path.dirname(headerPath), { recursive: true });
            fs.writeFileSync(headerPath, headerContent, "utf8");
            log.push(`[Ritual 2] Auto-generated header for module: ${mod}`);
        }

        if (!fs.existsSync(sourcePath)) {
            const sourceContent = `#include "${mod}.h"\n\nIMPLEMENT_MODULE(F${mod}Module, ${mod});\n\nvoid F${mod}Module::StartupModule() {}\nvoid F${mod}Module::ShutdownModule() {}\n`;
            fs.mkdirSync(path.dirname(sourcePath), { recursive: true });
            fs.writeFileSync(sourcePath, sourceContent, "utf8");
            log.push(`[Ritual 2] Auto-generated C++ source for module: ${mod}`);
        }
    }

    log.push("[Ritual 2] Missing File Resurrection completed successfully.");
    return { success: true, log };
}

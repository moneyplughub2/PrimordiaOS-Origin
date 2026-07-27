import fs from "fs";
import path from "path";
import { CANONICAL_ROOT } from "./ritual_1_canonicalization";

export async function generateScaffold(type: string, name: string): Promise<{ success: boolean; log: string[]; filePath?: string }> {
    const log: string[] = [];
    const formattedName = name.toLowerCase().replace(/[^a-z0-9_-]/g, "");
    const pascalName = name
        .replace(/[-_]+/g, " ")
        .replace(/(?:^|\s)\S/g, a => a.toUpperCase())
        .replace(/\s+/g, "");

    log.push(`[Ritual 6] Scaffolding invocation: type='${type}', name='${name}'`);

    let targetFile = "";
    let codeContent = "";

    switch (type.toLowerCase()) {
        case "module":
            targetFile = path.join(CANONICAL_ROOT, "modules", `${formattedName}.ts`);
            codeContent = `export interface ${pascalName}Config {\n    enabled: boolean;\n    options?: Record<string, any>;\n}\n\nexport class ${pascalName}Module {\n    public async execute(input: any): Promise<any> {\n        console.log("[${pascalName}Module] Executing with input:", input);\n        return { ok: true, module: "${formattedName}", timestamp: Date.now() };\n    }\n}\n`;
            break;

        case "pipeline":
            targetFile = path.join(CANONICAL_ROOT, "pipelines", `${formattedName}-pipeline.ts`);
            codeContent = `export class ${pascalName}Pipeline {\n    public name = "${formattedName}";\n\n    public async run(data: any): Promise<any> {\n        console.log("[Pipeline: ${pascalName}] Processing data step 1...");\n        return { status: "completed", data };\n    }\n}\n`;
            break;

        case "unreal-bridge":
        case "unrealbridge":
            targetFile = path.join(CANONICAL_ROOT, "Source", "PrimordiaBridge", "Public", `BP_${pascalName}Bridge.h`);
            codeContent = `#pragma once\n#include "CoreMinimal.h"\n#include "UObject/NoExportTypes.h"\n#include "BP_${pascalName}Bridge.generated.h"\n\nUCLASS(Blueprintable, BlueprintType)\nclass PRIMORDIABRIDGE_API UBP_${pascalName}Bridge : public UObject {\n    GENERATED_BODY()\npublic:\n    UFUNCTION(BlueprintCallable, Category = "Primordia|Bridge")\n    void TriggerEvent(FString EventName, FString Payload);\n};\n`;
            break;

        case "agent":
            targetFile = path.join(CANONICAL_ROOT, "agents", `${formattedName}-agent.ts`);
            codeContent = `export class ${pascalName}Agent {\n    public id = "${formattedName}_agent";\n\n    public async handleTask(task: { verb: string; payload: any }): Promise<any> {\n        console.log(\`[\${this.id}] Handling task verb: \${task.verb}\`);\n        return { agentId: this.id, result: "SUCCESS" };\n    }\n}\n`;
            break;

        case "cli":
        case "command":
            targetFile = path.join(CANONICAL_ROOT, "cli", "commands", `${formattedName}.ts`);
            codeContent = `export async function handle${pascalName}Command(args: string[]): Promise<void> {\n    console.log("[CLI: ${formattedName}] Executed with args:", args);\n}\n`;
            break;

        default:
            log.push(`[Ritual 6] Error: Unknown scaffolding type '${type}'`);
            return { success: false, log };
    }

    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, codeContent, "utf8");
    log.push(`[Ritual 6] Successfully generated scaffold: ${path.relative(CANONICAL_ROOT, targetFile)}`);

    return { success: true, log, filePath: targetFile };
}

export async function executeRitual6(): Promise<{ success: boolean; log: string[] }> {
    const log: string[] = [];
    log.push("[Ritual 6] Initializing Scaffolding Generators...");
    log.push("[Ritual 6] Available generators: module, pipeline, unreal-bridge, agent, cli");
    log.push("[Ritual 6] Scaffolding Engine ready for invocation via 'primordia gen <type> <name>'");
    return { success: true, log };
}

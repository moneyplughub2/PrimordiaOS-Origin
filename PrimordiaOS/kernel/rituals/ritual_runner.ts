import { executeRitual1 } from "./ritual_1_canonicalization";
import { executeRitual2 } from "./ritual_2_resurrection";
import { executeRitual3 } from "./ritual_3_unreal_descriptor";
import { executeRitual4 } from "./ritual_4_module_scan";
import { executeRitual5 } from "./ritual_5_purge_rebuild";
import { executeRitual6 } from "./ritual_6_scaffolding";
import { executeRitual7 } from "./ritual_7_kernel_sync";

export async function executeRituals(selection: string = "all"): Promise<void> {
    console.log("=======================================================");
    console.log("   PRIMORDIAOS KERNEL RITUALS v1 EXECUTOR");
    console.log("=======================================================");

    const target = selection.toLowerCase();

    if (target === "1" || target === "all") {
        console.log("\n>>> Executing Ritual 1: Path Canonicalization...");
        const res = await executeRitual1();
        res.log.forEach(l => console.log("  ", l));
    }

    if (target === "2" || target === "all") {
        console.log("\n>>> Executing Ritual 2: Missing File Resurrection...");
        const res = await executeRitual2();
        res.log.forEach(l => console.log("  ", l));
    }

    if (target === "3" || target === "all") {
        console.log("\n>>> Executing Ritual 3: Unreal Descriptor Regeneration...");
        const res = await executeRitual3();
        res.log.forEach(l => console.log("  ", l));
    }

    if (target === "4" || target === "all") {
        console.log("\n>>> Executing Ritual 4: Module Integrity Scan...");
        const res = await executeRitual4();
        res.log.forEach(l => console.log("  ", l));
    }

    if (target === "5" || target === "all") {
        console.log("\n>>> Executing Ritual 5: Purge and Rebuild...");
        const res = await executeRitual5();
        res.log.forEach(l => console.log("  ", l));
    }

    if (target === "6" || target === "all") {
        console.log("\n>>> Executing Ritual 6: Scaffolding Invocation...");
        const res = await executeRitual6();
        res.log.forEach(l => console.log("  ", l));
    }

    if (target === "7" || target === "all") {
        console.log("\n>>> Executing Ritual 7: Kernel Sync...");
        const res = await executeRitual7();
        res.log.forEach(l => console.log("  ", l));
    }

    console.log("\n=======================================================");
    console.log("   ALL SELECTED RITUALS EXECUTED SUCCESSFULLY");
    console.log("=======================================================");
}

if (typeof require !== 'undefined' && require.main === module) {
    const selection = process.argv[2] || "all";
    executeRituals(selection);
} else {
    const selection = process.argv[2] || "all";
    executeRituals(selection);
}

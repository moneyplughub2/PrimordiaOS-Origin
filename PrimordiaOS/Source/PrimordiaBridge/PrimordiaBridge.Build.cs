using UnrealBuildTool;

public class PrimordiaBridge : ModuleRules
{
    public PrimordiaBridge(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

        PublicDependencyModuleNames.AddRange(new string[] {
            "Core",
            "CoreUObject",
            "Engine",
            "Sockets",
            "Networking"
        });
    }
}

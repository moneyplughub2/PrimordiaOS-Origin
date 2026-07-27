using UnrealBuildTool;

public class PrimordiaBridge : ModuleRules
{
    public PrimordiaBridge(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

        PublicDependencyModuleNames.AddRange(
            new string[]
            {
                "Core",
                "CoreUObject",
                "Engine",
                "Json",
                "JsonUtilities",
                "Sockets",
                "Networking"
            }
        );

        PrivateDependencyModuleNames.AddRange(
            new string[]
            {
            }
        );

        PublicIncludePaths.AddRange(
            new string[]
            {
                "PrimordiaBridge/Public"
            }
        );

        PrivateIncludePaths.AddRange(
            new string[]
            {
                "PrimordiaBridge/Private"
            }
        );
    }
}

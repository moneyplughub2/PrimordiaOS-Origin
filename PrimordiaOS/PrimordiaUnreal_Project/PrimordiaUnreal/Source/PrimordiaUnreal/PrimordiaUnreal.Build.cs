using UnrealBuildTool;

public class PrimordiaUnreal : ModuleRules
{
    public PrimordiaUnreal(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

        PublicDependencyModuleNames.AddRange(
            new string[]
            {
                "Core",
                "CoreUObject",
                "Engine",
                "InputCore",
                "EnhancedInput",
                "UMG",
                "Slate",
                "SlateCore",
                "Projects",
                "DeveloperSettings",
                "ApplicationCore",
                "RenderCore",
                "RHI"
            }
        );

        PrivateDependencyModuleNames.AddRange(
            new string[]
            {
                "Json",
                "JsonUtilities",
                "HTTP",
                "WebSockets",
                "Networking",
                "Sockets",
                "MovieScene",
                "MovieRenderPipelineCore",
                "MovieRenderPipelineEditor"
            }
        );

        PublicIncludePaths.AddRange(
            new string[]
            {
                "PrimordiaUnreal/Public"
            }
        );

        PrivateIncludePaths.AddRange(
            new string[]
            {
                "PrimordiaUnreal/Private"
            }
        );
    }
}

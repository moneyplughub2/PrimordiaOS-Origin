using UnrealBuildTool;
using System.Collections.Generic;

public class PrimordiaUnrealEditorTarget : TargetRules
{
	public PrimordiaUnrealEditorTarget(TargetInfo Target) : base(Target)
	{
		Type = TargetType.Editor;
		DefaultBuildSettings = BuildSettingsVersion.V7;
		IncludeOrderVersion = EngineIncludeOrderVersion.Latest;
		bOverrideBuildEnvironment = true;
		ExtraModuleNames.Add("PrimordiaUnreal");
	}
}

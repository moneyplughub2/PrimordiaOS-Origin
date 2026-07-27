using UnrealBuildTool;
using System.Collections.Generic;

public class PrimordiaUnrealTarget : TargetRules
{
	public PrimordiaUnrealTarget(TargetInfo Target) : base(Target)
	{
		Type = TargetType.Game;
		DefaultBuildSettings = BuildSettingsVersion.V7;
		IncludeOrderVersion = EngineIncludeOrderVersion.Latest;
		bOverrideBuildEnvironment = true;
		ExtraModuleNames.Add("PrimordiaUnreal");
	}
}

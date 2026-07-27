#include "PrimordiaOS_Engine.h"
#include "Logging/LogMacros.h"

DEFINE_LOG_CATEGORY_STATIC(LogPrimordiaEngine, Log, All);

void FPrimordiaOS_EngineModule::StartupModule()
{
    UE_LOG(LogPrimordiaEngine, Log, TEXT("PrimordiaOS Engine Module Loaded"));
}

void FPrimordiaOS_EngineModule::ShutdownModule()
{
    UE_LOG(LogPrimordiaEngine, Log, TEXT("PrimordiaOS Engine Module Unloaded"));
}

IMPLEMENT_MODULE(FPrimordiaOS_EngineModule, PrimordiaOS_Engine);

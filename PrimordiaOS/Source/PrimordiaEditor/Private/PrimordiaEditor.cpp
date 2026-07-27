#include "PrimordiaEditor.h"
#include "Logging/LogMacros.h"

DEFINE_LOG_CATEGORY_STATIC(LogPrimordiaEditor, Log, All);

void FPrimordiaEditorModule::StartupModule()
{
    UE_LOG(LogPrimordiaEditor, Log, TEXT("Primordia Editor Module Loaded"));
}

void FPrimordiaEditorModule::ShutdownModule()
{
    UE_LOG(LogPrimordiaEditor, Log, TEXT("Primordia Editor Module Unloaded"));
}

IMPLEMENT_MODULE(FPrimordiaEditorModule, PrimordiaEditor);

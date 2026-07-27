#pragma once

#include "CoreMinimal.h"
#include "Modules/ModuleManager.h"

class FPrimordiaWorldBuilderModule : public IModuleInterface
{
public:
    virtual void StartupModule() override;
    virtual void ShutdownModule() override;

    void SpawnActor(UWorld* World, const FVector& Location);
};

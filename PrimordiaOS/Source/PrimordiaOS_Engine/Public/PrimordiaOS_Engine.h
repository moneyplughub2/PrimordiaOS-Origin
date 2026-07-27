#pragma once

#include "Modules/ModuleManager.h"

class FPrimordiaOS_EngineModule : public IModuleInterface
{
public:
    virtual void StartupModule() override;
    virtual void ShutdownModule() override;
};

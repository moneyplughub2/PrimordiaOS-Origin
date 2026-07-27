#include "PrimordiaWorldBuilder.h"
#include "Engine/World.h"
#include "GameFramework/Actor.h"

DEFINE_LOG_CATEGORY_STATIC(LogPrimordiaWorldBuilder, Log, All);

void FPrimordiaWorldBuilderModule::StartupModule()
{
    UE_LOG(LogPrimordiaWorldBuilder, Log, TEXT("Primordia WorldBuilder Module Loaded"));
}

void FPrimordiaWorldBuilderModule::ShutdownModule()
{
    UE_LOG(LogPrimordiaWorldBuilder, Log, TEXT("Primordia WorldBuilder Module Unloaded"));
}

void FPrimordiaWorldBuilderModule::SpawnActor(UWorld* World, const FVector& Location)
{
    if (!World) return;

    FActorSpawnParameters Params;
    AActor* Actor = World->SpawnActor<AActor>(AActor::StaticClass(), Location, FRotator::ZeroRotator, Params);

    UE_LOG(LogPrimordiaWorldBuilder, Log, TEXT("Spawned Actor at %s"), *Location.ToString());
}

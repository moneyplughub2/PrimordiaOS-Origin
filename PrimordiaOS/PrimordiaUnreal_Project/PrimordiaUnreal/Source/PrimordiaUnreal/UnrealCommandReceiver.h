#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "UnrealCommandReceiver.generated.h"

UCLASS()
class PRIMORDIAUNREAL_API AUnrealCommandReceiver : public AActor
{
    GENERATED_BODY()

public:
    AUnrealCommandReceiver();

protected:
    virtual void BeginPlay() override;

public:
    virtual void Tick(float DeltaTime) override;

private:
    void StartServer();
    void HandleRequest(const FString& Content);
};

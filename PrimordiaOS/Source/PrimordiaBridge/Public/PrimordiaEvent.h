#pragma once
#include "CoreMinimal.h"
#include "PrimordiaEvent.generated.h"

USTRUCT(BlueprintType)
struct FPrimordiaEvent
{
    GENERATED_BODY()

    UPROPERTY(BlueprintReadWrite)
    FString Event;

    UPROPERTY(BlueprintReadWrite)
    FString TxId;

    UPROPERTY(BlueprintReadWrite)
    int64 Timestamp;

    UPROPERTY(BlueprintReadWrite)
    FString Agent;

    UPROPERTY(BlueprintReadWrite)
    float Confidence;

    UPROPERTY(BlueprintReadWrite)
    FString Reasoning;

    UPROPERTY(BlueprintReadWrite)
    TMap<FString, float> Payload;
};

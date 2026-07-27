#include "PrimordiaBridge.h"
#include "PrimordiaEvent.h"
#include "Json.h"
#include "JsonUtilities.h"

void UPrimordiaBridge::HandleIncomingMessage(const FString& Message)
{
    TSharedPtr<FJsonObject> JsonObject;
    TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(Message);

    if (!FJsonSerializer::Deserialize(Reader, JsonObject))
    {
        UE_LOG(LogTemp, Warning, TEXT("PrimordiaBridge: Failed to parse JSON message."));
        return;
    }

    FPrimordiaEvent Event;

    Event.Event = JsonObject->GetStringField("event");
    Event.TxId = JsonObject->GetStringField("tx_id");
    Event.Timestamp = JsonObject->GetIntegerField("timestamp");
    Event.Agent = JsonObject->GetStringField("agent");
    Event.Confidence = JsonObject->GetNumberField("confidence");
    Event.Reasoning = JsonObject->GetStringField("reasoning");

    const TSharedPtr<FJsonObject>* PayloadObj;
    if (JsonObject->TryGetObjectField("payload", PayloadObj))
    {
        for (const auto& Pair : (*PayloadObj)->Values)
        {
            if (Pair.Value->Type == EJson::Number)
            {
                Event.Payload.Add(Pair.Key, Pair.Value->AsNumber());
            }
        }
    }

    OnPrimordiaEventReceived.Broadcast(Event);
}

#include "UnrealCommandReceiver.h"
#include "HttpServerModule.h"
#include "HttpServerRequest.h"
#include "HttpServerResponse.h"
#include "Json.h"
#include "JsonUtilities.h"

AUnrealCommandReceiver::AUnrealCommandReceiver()
{
    PrimaryActorTick.bCanEverTick = true;
}

void AUnrealCommandReceiver::BeginPlay()
{
    Super::BeginPlay();
    StartServer();
}

void AUnrealCommandReceiver::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);
}

void AUnrealCommandReceiver::StartServer()
{
    FHttpServerModule& HttpServer = FHttpServerModule::Get();

    const uint32 Port = 7777;

    HttpServer.GetHttpRouter(Port)->BindRoute(
        FHttpPath(TEXT("/unreal/command")),
        EHttpServerRequestVerbs::VERB_POST,
        [this](const FHttpServerRequest& Request, const FHttpResultCallback& OnComplete)
        {
            FString Content = FString(UTF8_TO_TCHAR(Request.Body.GetData()));
            HandleRequest(Content);

            TSharedRef<FHttpServerResponse> Response = FHttpServerResponse::Create(
                TEXT("{\"status\":\"ok\"}"),
                TEXT("application/json")
            );

            OnComplete(Response);
            return true;
        }
    );

    HttpServer.StartAllListeners();
}

void AUnrealCommandReceiver::HandleRequest(const FString& Content)
{
    UE_LOG(LogTemp, Warning, TEXT("PrimordiaUnreal received: %s"), *Content);
}

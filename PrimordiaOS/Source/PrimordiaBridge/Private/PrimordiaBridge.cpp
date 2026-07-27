#include "PrimordiaBridge.h"
#include "Sockets.h"
#include "SocketSubsystem.h"
#include "Networking.h"

DEFINE_LOG_CATEGORY_STATIC(LogPrimordiaBridge, Log, All);

FSocket* PrimordiaSocket = nullptr;

void FPrimordiaBridgeModule::StartupModule()
{
    UE_LOG(LogPrimordiaBridge, Log, TEXT("Primordia Bridge Module Loaded"));
    StartSocket();
}

void FPrimordiaBridgeModule::ShutdownModule()
{
    UE_LOG(LogPrimordiaBridge, Log, TEXT("Primordia Bridge Module Unloaded"));

    if (PrimordiaSocket)
    {
        PrimordiaSocket->Close();
        ISocketSubsystem::Get(PLATFORM_SOCKETSUBSYSTEM)->DestroySocket(PrimordiaSocket);
        PrimordiaSocket = nullptr;
    }
}

void FPrimordiaBridgeModule::StartSocket()
{
    PrimordiaSocket = ISocketSubsystem::Get(PLATFORM_SOCKETSUBSYSTEM)->CreateSocket(NAME_Stream, TEXT("PrimordiaSocket"), false);

    FIPv4Address IP(127,0,0,1);
    TSharedRef<FInternetAddr> Addr = ISocketSubsystem::Get(PLATFORM_SOCKETSUBSYSTEM)->CreateInternetAddr();
    Addr->SetIp(IP.Value);
    Addr->SetPort(7777);

    bool Connected = PrimordiaSocket->Connect(*Addr);

    if (Connected)
    {
        UE_LOG(LogPrimordiaBridge, Log, TEXT("Connected to PrimordiaOS WebSocket Bridge"));
    }
    else
    {
        UE_LOG(LogPrimordiaBridge, Error, TEXT("Failed to connect to PrimordiaOS Bridge"));
    }
}

void FPrimordiaBridgeModule::SendToPrimordia(const FString& Message)
{
    if (!PrimordiaSocket) return;

    FTCHARToUTF8 Converter(*Message);
    int32 Sent = 0;

    PrimordiaSocket->Send((uint8*)Converter.Get(), Converter.Length(), Sent);
}
